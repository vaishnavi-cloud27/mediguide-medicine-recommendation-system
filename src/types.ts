export interface MedicineRecommendation {
  genericName: string;
  brandExamples?: string[];
  composition: string;
  typicalDosage: string;
  commonSideEffects: string[];
  alternatives: string[];
  prescriptionRequired: boolean;
}

export interface DiseasePrediction {
  disease: string;
  confidence: number;
  description: string;
  severityLevel: 'mild' | 'moderate' | 'high' | 'emergency';
  contributingSymptoms: string[];
  medicines: MedicineRecommendation[];
  precautions: string[];
  dietTips: string[];
  exerciseTips: string[];
}

export interface AllergyWarning {
  allergen: string;
  conflictingMedicine: string;
  warningMessage: string;
  severity: 'high' | 'moderate';
}

export interface InteractionWarning {
  medicationA: string;
  medicationB: string;
  interactionText: string;
  severity: 'high' | 'moderate' | 'low';
}

export interface RedFlagAlert {
  isTriggered: boolean;
  emergencySymptoms: string[];
  emergencyMessage: string;
}

export interface PredictionResponse {
  source?: 'gemini-ai' | 'clinical-decision-engine';
  predictions: DiseasePrediction[];
  allergyWarnings: AllergyWarning[];
  interactionWarnings: InteractionWarning[];
  redFlagAlert: RedFlagAlert;
}

export interface HistoryRecord {
  id: string;
  timestamp: string;
  symptoms: string[];
  age?: number;
  allergies?: string[];
  currentMedications?: string[];
  result: PredictionResponse;
}
