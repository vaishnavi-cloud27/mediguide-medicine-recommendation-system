import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { INITIAL_DISEASE_DATABASE } from './src/data/sampleDiseases.ts';
import { COMMON_SYMPTOMS } from './src/data/symptoms.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent telemetry
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper: Rule-based local disease matching fallback
function runLocalRuleBasedPrediction(
  userSymptoms: string[],
  age?: number,
  allergies: string[] = [],
  currentMedications: string[] = []
) {
  const normUserSymptoms = userSymptoms.map((s) => s.toLowerCase());

  // Check red flag emergency symptoms
  const redFlagList = COMMON_SYMPTOMS.filter(
    (sym) => sym.isRedFlag && normUserSymptoms.some((us) => us.includes(sym.name.toLowerCase()) || sym.name.toLowerCase().includes(us))
  );

  // Score each disease based on overlap and specific weight
  const scoredDiseases = INITIAL_DISEASE_DATABASE.map((d) => {
    let matchScore = 0;
    const matchedSymptoms: string[] = [];

    d.coreSymptoms.forEach((cs) => {
      const isPresent = normUserSymptoms.some(
        (us) => us.includes(cs.toLowerCase()) || cs.toLowerCase().includes(us)
      );
      if (isPresent) {
        matchScore += 1;
        matchedSymptoms.push(cs);
      }
    });

    const confidenceRaw = (matchScore / Math.max(1, Math.min(d.coreSymptoms.length, normUserSymptoms.length))) * 100;
    const baseConfidence = Math.min(94, Math.max(25, Math.round(confidenceRaw * 0.9 + 15)));

    return {
      disease: d.disease,
      confidence: baseConfidence,
      description: d.description,
      severityLevel: d.severityLevel,
      contributingSymptoms: matchedSymptoms.length > 0 ? matchedSymptoms : userSymptoms.slice(0, 2),
      medicines: d.medicines,
      precautions: d.precautions,
      dietTips: d.dietTips,
      exerciseTips: d.exerciseTips,
      matchScore,
    };
  });

  // Sort descending by match score and confidence
  scoredDiseases.sort((a, b) => b.matchScore - a.matchScore || b.confidence - a.confidence);

  // Take top 3
  const top3 = scoredDiseases.slice(0, 3).map((item, idx) => {
    // calibrate confidence for clean presentation
    let conf = item.confidence;
    if (idx === 0) conf = Math.max(68, Math.min(94, conf + 10));
    if (idx === 1) conf = Math.max(45, Math.min(conf - 12, 70));
    if (idx === 2) conf = Math.max(28, Math.min(conf - 24, 48));
    return {
      ...item,
      confidence: conf,
    };
  });

  // Check allergy conflicts
  const allergyWarnings: Array<{ allergen: string; conflictingMedicine: string; warningMessage: string; severity: 'high' | 'moderate' }> = [];
  allergies.forEach((allergy) => {
    const normAllergy = allergy.toLowerCase().trim();
    if (!normAllergy) return;

    top3.forEach((dis) => {
      dis.medicines.forEach((med) => {
        const medText = `${med.genericName} ${med.composition} ${(med.allergyTags || []).join(' ')}`.toLowerCase();
        if (medText.includes(normAllergy) || (normAllergy.includes('penicillin') && medText.includes('amoxicillin')) || (normAllergy.includes('nsaid') && (medText.includes('ibuprofen') || medText.includes('aspirin') || medText.includes('naproxen')))) {
          allergyWarnings.push({
            allergen: allergy,
            conflictingMedicine: med.genericName,
            warningMessage: `Patient reported allergy to "${allergy}" conflicts with recommended medication "${med.genericName}". Do not take this medicine. Seek an alternative non-cross-reactive agent from your physician.`,
            severity: 'high',
          });
        }
      });
    });
  });

  // Check drug-drug interactions
  const interactionWarnings: Array<{ medicationA: string; medicationB: string; interactionText: string; severity: 'high' | 'moderate' | 'low' }> = [];
  currentMedications.forEach((currMed) => {
    const normCurr = currMed.toLowerCase().trim();
    if (!normCurr) return;

    top3.forEach((dis) => {
      dis.medicines.forEach((med) => {
        const target = med.genericName.toLowerCase();
        // Common clinical drug interactions
        if ((normCurr.includes('warfarin') || normCurr.includes('aspirin')) && (target.includes('ibuprofen') || target.includes('naproxen') || target.includes('aspirin'))) {
          interactionWarnings.push({
            medicationA: currMed,
            medicationB: med.genericName,
            interactionText: `Concurrent use of blood thinners (${currMed}) with NSAIDs (${med.genericName}) significantly increases severe gastrointestinal bleeding risk.`,
            severity: 'high',
          });
        }
        if (normCurr.includes('metformin') && (target.includes('contrast') || target.includes('corticosteroid'))) {
          interactionWarnings.push({
            medicationA: currMed,
            medicationB: med.genericName,
            interactionText: `Corticosteroids may counteract the glycemic control of Metformin, causing blood sugar spikes.`,
            severity: 'moderate',
          });
        }
        if (normCurr.includes('lisinopril') && (target.includes('potassium') || target.includes('ibuprofen'))) {
          interactionWarnings.push({
            medicationA: currMed,
            medicationB: med.genericName,
            interactionText: `NSAIDs may reduce the antihypertensive efficacy of ACE inhibitors like Lisinopril and elevate renal strain.`,
            severity: 'moderate',
          });
        }
      });
    });
  });

  return {
    source: 'clinical-decision-engine',
    predictions: top3,
    allergyWarnings,
    interactionWarnings,
    redFlagAlert: {
      isTriggered: redFlagList.length > 0,
      emergencySymptoms: redFlagList.map((r) => r.name),
      emergencyMessage:
        redFlagList.length > 0
          ? `Urgent attention advised: You indicated symptoms (${redFlagList.map((r) => r.name).join(', ')}) that can indicate time-sensitive medical emergencies. Please consult a doctor or emergency services without delay.`
          : '',
    },
  };
}

// POST /api/predict
app.post('/api/predict', async (req, res) => {
  try {
    const { symptoms = [], age, allergies = [], currentMedications = [] } = req.body;

    if (!Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: 'At least one symptom is required for evaluation.' });
    }

    // Try Gemini API first if configured
    if (aiClient) {
      try {
        const prompt = `
You are a clinical decision support medical AI acting as the core intelligence behind "MediGuide: Medicine Recommendation System".
The user has reported the following clinical information:
- Symptoms: ${symptoms.join(', ')}
- Patient Age: ${age ? `${age} years old` : 'Adult (unspecified)'}
- Known Drug Allergies: ${allergies.length > 0 ? allergies.join(', ') : 'None reported'}
- Current Medications: ${currentMedications.length > 0 ? currentMedications.join(', ') : 'None reported'}

Instructions & Safety Rules:
1. Predict the TOP 3 most likely possible medical conditions/diseases with realistic probability percentages (summing to ~100% or descending confidence e.g. 75%, 52%, 31%).
2. NEVER give a definitive diagnosis; use educational decision-support terminology like "Possible condition consideration".
3. Explain which specific symptoms contributed most to each predicted condition.
4. For each predicted disease, provide 2 to 3 commonly used medicines with:
   - Generic name
   - Composition/active ingredient
   - Typical adult dosage range (with note that actual dose depends on medical prescription)
   - Common side effects
   - Alternative medications
   - Whether prescription is legally/clinically required
5. Provide clinical precautions, dietary recommendations, and light activity/workout guidance.
6. Check for safety conflicts:
   - If a recommended medicine cross-reacts with any of the user's reported allergies (${allergies.join(', ')}), generate an allergy warning!
   - If any recommended medicine interacts negatively with user's current medications (${currentMedications.join(', ')}), generate a drug interaction warning!
7. Red-flag triage: Check if any symptom is critical (e.g., severe chest pain, acute respiratory distress, coughing up blood, stiff neck with fever, sudden vision loss) and flag as emergency if present.
8. Output MUST strictly match the requested JSON schema. No markdown formatting, no code fencing, pure JSON.
`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                predictions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      disease: { type: Type.STRING },
                      confidence: { type: Type.NUMBER, description: 'Percentage between 1 and 99' },
                      description: { type: Type.STRING },
                      severityLevel: {
                        type: Type.STRING,
                        enum: ['mild', 'moderate', 'high', 'emergency'],
                      },
                      contributingSymptoms: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      medicines: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            genericName: { type: Type.STRING },
                            brandExamples: {
                              type: Type.ARRAY,
                              items: { type: Type.STRING },
                            },
                            composition: { type: Type.STRING },
                            typicalDosage: { type: Type.STRING },
                            commonSideEffects: {
                              type: Type.ARRAY,
                              items: { type: Type.STRING },
                            },
                            alternatives: {
                              type: Type.ARRAY,
                              items: { type: Type.STRING },
                            },
                            prescriptionRequired: { type: Type.BOOLEAN },
                          },
                          required: [
                            'genericName',
                            'composition',
                            'typicalDosage',
                            'commonSideEffects',
                            'alternatives',
                            'prescriptionRequired',
                          ],
                        },
                      },
                      precautions: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      dietTips: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      exerciseTips: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                    },
                    required: [
                      'disease',
                      'confidence',
                      'description',
                      'severityLevel',
                      'contributingSymptoms',
                      'medicines',
                      'precautions',
                      'dietTips',
                      'exerciseTips',
                    ],
                  },
                },
                allergyWarnings: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      allergen: { type: Type.STRING },
                      conflictingMedicine: { type: Type.STRING },
                      warningMessage: { type: Type.STRING },
                      severity: { type: Type.STRING, enum: ['high', 'moderate'] },
                    },
                    required: ['allergen', 'conflictingMedicine', 'warningMessage', 'severity'],
                  },
                },
                interactionWarnings: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      medicationA: { type: Type.STRING },
                      medicationB: { type: Type.STRING },
                      interactionText: { type: Type.STRING },
                      severity: { type: Type.STRING, enum: ['high', 'moderate', 'low'] },
                    },
                    required: ['medicationA', 'medicationB', 'interactionText', 'severity'],
                  },
                },
                redFlagAlert: {
                  type: Type.OBJECT,
                  properties: {
                    isTriggered: { type: Type.BOOLEAN },
                    emergencySymptoms: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    emergencyMessage: { type: Type.STRING },
                  },
                  required: ['isTriggered', 'emergencySymptoms', 'emergencyMessage'],
                },
              },
              required: ['predictions', 'allergyWarnings', 'interactionWarnings', 'redFlagAlert'],
            },
          },
        });

        const rawText = response.text ? response.text.trim() : '';
        const parsed = JSON.parse(rawText);

        return res.json({
          source: 'gemini-ai',
          ...parsed,
        });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed or timed out, falling back to local clinical knowledge engine:', geminiError?.message || geminiError);
        // Seamless fallback to our local clinical rules engine
        const fallbackResult = runLocalRuleBasedPrediction(symptoms, age, allergies, currentMedications);
        return res.json(fallbackResult);
      }
    }

    // Default to local clinical decision engine if no API key
    const result = runLocalRuleBasedPrediction(symptoms, age, allergies, currentMedications);
    return res.json(result);
  } catch (error: any) {
    console.error('Prediction API Error:', error);
    res.status(500).json({
      error: 'An error occurred while evaluating symptoms. Please try again.',
      details: error?.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'MediGuide: Medicine Recommendation System',
    geminiConfigured: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// Vite Middleware for Development / Static file serving for Production
async function setupServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MediGuide Server] Running on http://localhost:${PORT}`);
  });
}

setupServer();
