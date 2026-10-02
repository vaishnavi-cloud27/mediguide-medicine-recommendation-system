export interface MedicineItem {
  genericName: string;
  brandExamples: string[];
  composition: string;
  typicalDosage: string;
  commonSideEffects: string[];
  alternatives: string[];
  prescriptionRequired: boolean;
  allergyTags?: string[]; // e.g. ['penicillin', 'nsaid', 'aspirin', 'sulfa']
}

export interface DiseaseRecord {
  id: string;
  disease: string;
  description: string;
  severityLevel: 'mild' | 'moderate' | 'high' | 'emergency';
  coreSymptoms: string[]; // symptom names or ids that strongly match
  medicines: MedicineItem[];
  precautions: string[];
  dietTips: string[];
  exerciseTips: string[];
}

export const INITIAL_DISEASE_DATABASE: DiseaseRecord[] = [
  {
    id: 'common_cold',
    disease: 'Common Cold (Viral Upper Respiratory Infection)',
    description: 'A mild viral infectious disease of the upper respiratory tract primarily affecting the nose, throat, and sinuses.',
    severityLevel: 'mild',
    coreSymptoms: ['Runny / Stuffy Nose', 'Sore Throat', 'Frequent Sneezing', 'Cough', 'Headache', 'General Body Weakness'],
    medicines: [
      {
        genericName: 'Paracetamol (Acetaminophen)',
        brandExamples: ['Tylenol', 'Crocin', 'Calpol', 'Panadol'],
        composition: 'Acetaminophen 500mg/650mg',
        typicalDosage: '500mg to 650mg orally every 4 to 6 hours as needed (Max 3,000mg/24h)',
        commonSideEffects: ['Mild nausea', 'Liver enzyme elevation if overdosed', 'Allergic rash (rare)'],
        alternatives: ['Ibuprofen (if non-allergic)', 'Naproxen'],
        prescriptionRequired: false,
        allergyTags: ['paracetamol', 'acetaminophen']
      },
      {
        genericName: 'Cetirizine Hydrochloride',
        brandExamples: ['Zyrtec', 'Cetzine', 'Alerid'],
        composition: 'Cetirizine HCl 10mg',
        typicalDosage: '10mg once daily in the evening',
        commonSideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue', 'Dizziness'],
        alternatives: ['Loratadine', 'Fexofenadine', 'Levocetirizine'],
        prescriptionRequired: false,
        allergyTags: ['antihistamine']
      },
      {
        genericName: 'Dextromethorphan HBr Syrup',
        brandExamples: ['Robitussin', 'Benylin DM', 'Ascoril D'],
        composition: 'Dextromethorphan HBr 15mg/5mL',
        typicalDosage: '10mL to 20mL orally every 6 to 8 hours for dry cough',
        commonSideEffects: ['Mild dizziness', 'Stomach upset', 'Drowsiness'],
        alternatives: ['Guaifenesin (for productive wet cough)', 'Honey & warm saline gargles'],
        prescriptionRequired: false,
        allergyTags: []
      }
    ],
    precautions: [
      'Get plenty of bed rest to allow your immune system to clear the virus.',
      'Perform warm saline water gargles 3-4 times daily for throat relief.',
      'Stay isolated or wear a mask around vulnerable family members.',
      'Avoid unprescribed antibiotics; antibiotics do not kill cold viruses.'
    ],
    dietTips: [
      'Drink plenty of warm fluids like ginger tea, warm lemon water, and clear vegetable broths.',
      'Consume vitamin C-rich foods (oranges, kiwi, amla, bell peppers).',
      'Avoid icy cold beverages and excessive dairy if it thickens mucus.'
    ],
    exerciseTips: [
      'Engage in gentle stretching or short leisurely walks if feeling up to it.',
      'Avoid high-intensity cardio or gym workouts until fever and fatigue subside.'
    ]
  },
  {
    id: 'influenza',
    disease: 'Influenza (Seasonal Flu)',
    description: 'A contagious respiratory illness caused by influenza viruses, typically characterized by sudden onset high fever, severe body chills, and systemic myalgia.',
    severityLevel: 'moderate',
    coreSymptoms: ['Fever / High Temperature', 'Chills & Shivering', 'Muscle Aches (Myalgia)', 'Severe Fatigue / Lethargy', 'Headache', 'Cough'],
    medicines: [
      {
        genericName: 'Oseltamivir Phosphate (Tamiflu)',
        brandExamples: ['Tamiflu', 'Natflu', 'Antiflu'],
        composition: 'Oseltamivir 75mg capsule',
        typicalDosage: '75mg twice daily for 5 days (must be initiated within 48h of symptom onset)',
        commonSideEffects: ['Nausea', 'Vomiting', 'Headache', 'Abdominal discomfort'],
        alternatives: ['Zanamivir Inhalation', 'Baloxavir Marboxil'],
        prescriptionRequired: true,
        allergyTags: ['oseltamivir', 'antiviral']
      },
      {
        genericName: 'Ibuprofen',
        brandExamples: ['Advil', 'Motrin', 'Brufen', 'Combiflam'],
        composition: 'Ibuprofen 400mg tablet',
        typicalDosage: '400mg orally with meals every 6 to 8 hours as needed for body aches',
        commonSideEffects: ['Gastric irritation', 'Heartburn', 'Fluid retention', 'Renal strain with dehydration'],
        alternatives: ['Paracetamol', 'Naproxen'],
        prescriptionRequired: false,
        allergyTags: ['nsaid', 'aspirin', 'ibuprofen']
      }
    ],
    precautions: [
      'Strict bed rest during the febrile period (48-72 hours).',
      'Monitor body temperature using an accurate digital thermometer.',
      'Seek immediate medical care if breathing becomes labored or oxygen drops below 95%.'
    ],
    dietTips: [
      'Hydrate with electrolyte-balanced fluids (oral rehydration salts, coconut water).',
      'Eat light, warm, digestible foods like lentil soups, oatmeal, and khichdi.',
      'Avoid oily, heavily spiced, or processed fast food.'
    ],
    exerciseTips: [
      'Strictly avoid exercise during acute fever and myalgia to prevent viral myocarditis risk.',
      'Resume light physical activity only after 48 hours without fever.'
    ]
  },
  {
    id: 'migraine',
    disease: 'Migraine Headache Disorder',
    description: 'A neurological disorder marked by recurrent moderate-to-severe throbbing or pulsating headaches, frequently unilateral, often accompanied by photophobia, nausea, or visual aura.',
    severityLevel: 'moderate',
    coreSymptoms: ['Headache', 'Nausea', 'Vomiting', 'Dizziness / Lightheadedness', 'Sudden Blurred Vision'],
    medicines: [
      {
        genericName: 'Sumatriptan Succinate',
        brandExamples: ['Imitrex', 'Suminat', 'Treximet'],
        composition: 'Sumatriptan 50mg or 100mg tablet',
        typicalDosage: '50mg to 100mg single dose at first sign of migraine attack (Max 200mg/24h)',
        commonSideEffects: ['Flushing', 'Tingling or chest tightness sensation', 'Drowsiness'],
        alternatives: ['Zolmitriptan', 'Rizatriptan', 'Naproxen + Caffeine'],
        prescriptionRequired: true,
        allergyTags: ['triptan']
      },
      {
        genericName: 'Naproxen Sodium',
        brandExamples: ['Aleve', 'Naprosyn'],
        composition: 'Naproxen 250mg or 500mg',
        typicalDosage: '500mg initial dose followed by 250mg after 6 hours if needed',
        commonSideEffects: ['Stomach upset', 'Heartburn', 'Dizziness'],
        alternatives: ['Ibuprofen', 'Paracetamol + Caffeine'],
        prescriptionRequired: false,
        allergyTags: ['nsaid', 'aspirin', 'naproxen']
      },
      {
        genericName: 'Ondansetron',
        brandExamples: ['Zofran', 'Emeset', 'Vomikind'],
        composition: 'Ondansetron 4mg orally disintegrating tablet',
        typicalDosage: '4mg to 8mg every 8 hours as needed for severe migraine nausea',
        commonSideEffects: ['Constipation', 'Transient headache', 'Fatigue'],
        alternatives: ['Domperidone', 'Metoclopramide'],
        prescriptionRequired: true,
        allergyTags: []
      }
    ],
    precautions: [
      'Rest in a quiet, dark, well-ventilated room with cool compresses on the forehead.',
      'Maintain a consistent sleep-wake schedule and avoid skipping meals.',
      'Identify and avoid known dietary triggers (aged cheeses, MSG, nitrates, excess caffeine).'
    ],
    dietTips: [
      'Drink plenty of water; mild dehydration is a frequent migraine precipitant.',
      'Magnesium-rich foods (spinach, pumpkin seeds, almonds, dark chocolate).',
      'Avoid irregular fasting or long intervals without food.'
    ],
    exerciseTips: [
      'Avoid strenuous exercise during an acute attack.',
      'Practice regular low-impact aerobic exercise (yoga, swimming, gentle walking) between attacks to reduce attack frequency.'
    ]
  },
  {
    id: 'gerd',
    disease: 'Gastroesophageal Reflux Disease (GERD / Acid Reflux)',
    description: 'A chronic digestive condition where stomach acid or bile frequently flows back into the food pipe (esophagus), irritating the lining.',
    severityLevel: 'mild',
    coreSymptoms: ['Heartburn / Acid Reflux', 'Abdominal Cramping / Pain', 'Nausea', 'Chest Pain / Pressure', 'Mouth Ulcers / Sores'],
    medicines: [
      {
        genericName: 'Pantoprazole Sodium Gastro-resistant',
        brandExamples: ['Protonix', 'Pantocid', 'Pan 40'],
        composition: 'Pantoprazole 40mg tablet',
        typicalDosage: '40mg taken once daily in the morning, 30-60 minutes before breakfast',
        commonSideEffects: ['Headache', 'Mild diarrhea', 'Flatulence', 'Abdominal pain'],
        alternatives: ['Esomeprazole', 'Omeprazole', 'Rabeprazole'],
        prescriptionRequired: true,
        allergyTags: ['ppi', 'pantoprazole']
      },
      {
        genericName: 'Antacid Suspension (Aluminium & Magnesium Hydroxide + Simethicone)',
        brandExamples: ['Gelusil', 'Mylanta', 'Digene', 'Gaviscon'],
        composition: 'Aluminium Hydroxide + Magnesium Hydroxide + Simethicone liquid',
        typicalDosage: '10mL to 20mL taken 1 hour after meals and at bedtime',
        commonSideEffects: ['Mild laxative or constipating effect depending on formulation'],
        alternatives: ['Sodium Alginate oral suspension', 'Famotidine 20mg'],
        prescriptionRequired: false,
        allergyTags: ['antacid']
      }
    ],
    precautions: [
      'Do not lie down within 2 to 3 hours after eating a meal.',
      'Elevate the head of your bed by 6 to 8 inches when sleeping.',
      'Avoid tight-fitting waist belts or abdominal pressure.'
    ],
    dietTips: [
      'Eat smaller, more frequent meals rather than large heavy dinners.',
      'Limit known reflux triggers: citrus fruits, tomato sauce, mint, raw onions, coffee, chocolate, and fried foods.',
      'Opt for non-citrus fruits (bananas, melons, apples) and oatmeal.'
    ],
    exerciseTips: [
      'Engage in upright low-impact exercise such as walking after meals.',
      'Avoid exercises that invert the torso (headstands, crunches, heavy squats) immediately after eating.'
    ]
  },
  {
    id: 'gastroenteritis',
    disease: 'Acute Viral Gastroenteritis (Stomach Flu)',
    description: 'An intestinal infection marked by watery diarrhea, abdominal cramps, nausea, vomiting, and sometimes low-grade fever.',
    severityLevel: 'moderate',
    coreSymptoms: ['Vomiting', 'Diarrhea / Loose Stools', 'Nausea', 'Abdominal Cramping / Pain', 'Loss of Appetite', 'Excessive Thirst / Dehydration'],
    medicines: [
      {
        genericName: 'Oral Rehydration Salts (ORS WHO Formula)',
        brandExamples: ['Electral', 'Pedialyte', 'Hydralyte'],
        composition: 'Sodium Chloride, Potassium Chloride, Sodium Citrate, Anhydrous Dextrose',
        typicalDosage: 'Mix 1 sachet in 1 liter of boiled and cooled water. Sip 200mL-300mL after each loose stool.',
        commonSideEffects: ['None when mixed in correct water dilution; essential for fluid retention'],
        alternatives: ['Coconut water with a pinch of salt', 'Dilute rice water'],
        prescriptionRequired: false,
        allergyTags: []
      },
      {
        genericName: 'Racecadotril',
        brandExamples: ['Hidrasec', 'Redotil', 'Zedott'],
        composition: 'Racecadotril 100mg capsule',
        typicalDosage: '100mg three times daily before meals until normal stool resumes (Max 7 days)',
        commonSideEffects: ['Headache', 'Constipation (uncommon)', 'Skin rash'],
        alternatives: ['Loperamide (strictly avoid if bloody stool or high fever)'],
        prescriptionRequired: true,
        allergyTags: []
      },
      {
        genericName: 'Probiotic Complex (Lactobacillus + Saccharomyces boulardii)',
        brandExamples: ['Florastor', 'Enterogermina', 'Darolac'],
        composition: 'Multi-strain beneficial bacterial spores',
        typicalDosage: '1 sachet or capsule twice daily for 5 days',
        commonSideEffects: ['Transient mild bloating or flatulence'],
        alternatives: ['Natural unsweetened fresh curd / yogurt'],
        prescriptionRequired: false,
        allergyTags: []
      }
    ],
    precautions: [
      'Continuously sip fluids to prevent dangerous hypovolemic dehydration.',
      'Wash hands thoroughly with soap after using the restroom and before food preparation.',
      'Seek emergency clinic visit if unable to keep liquids down for 24 hours or blood appears in stool.'
    ],
    dietTips: [
      'Adopt the BRAT diet (Bananas, Rice, Applesauce, Toast).',
      'Consume clear broths, kanji (rice water), and electrolyte solutions.',
      'Strictly avoid dairy milk, fatty foods, high-sugar drinks, and raw salads for 48 hours.'
    ],
    exerciseTips: [
      'Complete physical rest is indicated during acute diarrhea and fluid loss.',
      'Gradually resume normal activities only when hydration status is normalized.'
    ]
  },
  {
    id: 'allergic_rhinitis',
    disease: 'Allergic Rhinitis (Hay Fever / Inhalant Allergy)',
    description: 'An allergic response causing sneezing, itchy watery eyes, runny nose, and nasal congestion triggered by airborne allergens like pollen, dust mites, or animal dander.',
    severityLevel: 'mild',
    coreSymptoms: ['Frequent Sneezing', 'Runny / Stuffy Nose', 'Severe Itching (Pruritus)', 'Sinus Pressure & Facial Pain', 'Headache'],
    medicines: [
      {
        genericName: 'Fluticasone Propionate Nasal Spray',
        brandExamples: ['Flonase', 'Flomist', 'Flovent'],
        composition: 'Fluticasone Propionate 50mcg per spray',
        typicalDosage: '1 to 2 sprays in each nostril once daily, pointing away from the nasal septum',
        commonSideEffects: ['Nasal dryness', 'Minor epistaxis (nosebleed)', 'Throat irritation'],
        alternatives: ['Mometasone Furoate spray', 'Azelastine antihistamine spray'],
        prescriptionRequired: true,
        allergyTags: ['steroid', 'corticosteroid']
      },
      {
        genericName: 'Fexofenadine Hydrochloride',
        brandExamples: ['Allegra', 'Fexova', 'Telfast'],
        composition: 'Fexofenadine HCl 120mg or 180mg tablet',
        typicalDosage: '120mg or 180mg once daily with water (non-drowsy formulation)',
        commonSideEffects: ['Mild headache', 'Drowsiness (rare with fexofenadine)', 'Nausea'],
        alternatives: ['Loratadine 10mg', 'Bilastine 20mg'],
        prescriptionRequired: false,
        allergyTags: ['antihistamine']
      }
    ],
    precautions: [
      'Keep windows closed during high pollen counts and use HEPA air filtration indoors.',
      'Use sterile isotonic saline nasal rinses (neti pot or saline spray) to flush allergens.',
      'Wash bed linens weekly in hot water (>55°C) to eliminate dust mite allergens.'
    ],
    dietTips: [
      'Anti-inflammatory foods rich in quercetin (onions, apples, capers, berries).',
      'Warm herbal teas with ginger and honey to soothe nasal passages.',
      'Adequate hydration to keep nasal mucous thin and easy to clear.'
    ],
    exerciseTips: [
      'Exercise indoors in climate-controlled spaces during morning high-pollen spikes.',
      'Shower and change workout clothes immediately after outdoor activities.'
    ]
  },
  {
    id: 'dermatitis_eczema',
    disease: 'Atopic Dermatitis / Allergic Contact Dermatitis',
    description: 'An inflammatory skin condition producing itchy, erythematous, swollen, and sometimes scaly or blistered skin lesions.',
    severityLevel: 'mild',
    coreSymptoms: ['Skin Rash / Red Patches', 'Severe Itching (Pruritus)', 'Dry / Flaky Skin', 'Facial or Lip Swelling (Angioedema)', 'Urticaria / Hives'],
    medicines: [
      {
        genericName: 'Hydrocortisone 1% Topical Cream',
        brandExamples: ['Cortaid', 'Cortizone-10', 'Hisone'],
        composition: 'Hydrocortisone 1% w/w',
        typicalDosage: 'Apply a thin layer to affected skin areas 1 to 2 times daily for up to 7 days',
        commonSideEffects: ['Local skin thinning with prolonged misuse', 'Burning sensation', 'Dryness'],
        alternatives: ['Ceramide barrier repairing moisturizers', 'Calamine lotion'],
        prescriptionRequired: false,
        allergyTags: ['corticosteroid']
      },
      {
        genericName: 'Levocetirizine Dihydrochloride',
        brandExamples: ['Xyzal', 'Vozet', 'Levocet'],
        composition: 'Levocetirizine 5mg tablet',
        typicalDosage: '5mg once daily at bedtime to control nocturnal pruritus (itching)',
        commonSideEffects: ['Somnolence', 'Dry mouth', 'Fatigue'],
        alternatives: ['Hydroxyzine (short-term for severe itch)', 'Cetirizine'],
        prescriptionRequired: true,
        allergyTags: ['antihistamine']
      }
    ],
    precautions: [
      'Apply thick unscented emollient creams within 3 minutes of stepping out of the shower.',
      'Avoid hot water baths; use lukewarm water and gentle soap-free cleansers.',
      'Wear loose, breathable 100% cotton clothing; avoid abrasive synthetic or wool fabrics.'
    ],
    dietTips: [
      'Maintain an anti-inflammatory diet rich in omega-3 fatty acids (flaxseeds, chia, walnuts, salmon).',
      'Track potential personal dietary triggers (dairy, eggs, tree nuts) if linked to flare-ups.'
    ],
    exerciseTips: [
      'Rinse off sweat immediately after physical exercise, as sweat salts irritate sensitive skin.',
      'Choose low-friction workout gear to minimize chafing.'
    ]
  },
  {
    id: 'hypertension_warning',
    disease: 'Potential Hypertension / Elevated Blood Pressure Syndrome',
    description: 'Sustained elevation of arterial blood pressure, often presenting with morning occipital headaches, dizziness, chest tightness, or irregular palpitations.',
    severityLevel: 'high',
    coreSymptoms: ['Headache', 'Dizziness / Lightheadedness', 'Irregular Heartbeat / Palpitations', 'Chest Pain / Pressure', 'Sudden Blurred Vision'],
    medicines: [
      {
        genericName: 'Amlodipine Besylate',
        brandExamples: ['Norvasc', 'Amlong', 'Stamlo'],
        composition: 'Amlodipine 5mg tablet (Calcium Channel Blocker)',
        typicalDosage: '5mg once daily by mouth as prescribed by a cardiologist/physician',
        commonSideEffects: ['Peripheral ankle edema', 'Flushing', 'Dizziness', 'Palpitations'],
        alternatives: ['Telmisartan (ARB)', 'Losartan', 'Enalapril'],
        prescriptionRequired: true,
        allergyTags: ['calcium_channel_blocker']
      },
      {
        genericName: 'Telmisartan',
        brandExamples: ['Micardis', 'Telma', 'Telsar'],
        composition: 'Telmisartan 40mg tablet (Angiotensin II Receptor Antagonist)',
        typicalDosage: '40mg once daily under strict medical supervision',
        commonSideEffects: ['Hypotension', 'Back pain', 'Sinusitis', 'Hyperkalemia'],
        alternatives: ['Amlodipine', 'Hydrochlorothiazide combination'],
        prescriptionRequired: true,
        allergyTags: ['arb']
      }
    ],
    precautions: [
      'Have your resting blood pressure recorded with a calibrated digital sphygmomanometer.',
      'Never discontinue or alter prescription antihypertensives abruptly without medical consent.',
      'Practice daily stress-reduction techniques (deep diaphragmatic breathing, mindfulness).'
    ],
    dietTips: [
      'Follow the DASH diet (Dietary Approaches to Stop Hypertension).',
      'Strictly restrict sodium intake (< 2,000mg sodium or 1 level teaspoon of salt per day).',
      'Increase potassium-rich vegetables and fruits (spinach, bananas, sweet potatoes).'
    ],
    exerciseTips: [
      'Aim for 150 minutes per week of moderate aerobic exercise (brisk walking, cycling, swimming).',
      'Avoid heavy anaerobic weightlifting with breath-holding (Valsalva maneuver).'
    ]
  },
  {
    id: 'acute_bronchitis',
    disease: 'Acute Bronchitis (Lower Airway Inflammation)',
    description: 'Inflammation of the tracheobronchial tree following an upper respiratory infection, causing persistent coughing, chest soreness, and mucous production.',
    severityLevel: 'moderate',
    coreSymptoms: ['Cough', 'Shortness of Breath / Breathing Difficulty', 'Chest Pain / Pressure', 'Fatigue / Severe Lethargy', 'Sore Throat', 'Chills & Shivering'],
    medicines: [
      {
        genericName: 'Guaifenesin Expectorant',
        brandExamples: ['Mucinex', 'Tussin Expectorant', 'Ascoril LS'],
        composition: 'Guaifenesin 400mg or 600mg extended release',
        typicalDosage: '600mg every 12 hours with a full glass of water to thin bronchial mucus',
        commonSideEffects: ['Nausea', 'Vomiting', 'Headache', 'Dizziness'],
        alternatives: ['Ambroxol HCl', 'N-Acetylcysteine (NAC)'],
        prescriptionRequired: false,
        allergyTags: []
      },
      {
        genericName: 'Salbutamol / Albuterol Inhaler',
        brandExamples: ['Ventolin', 'ProAir', 'Asthalin'],
        composition: 'Albuterol Sulfate 100mcg per puff',
        typicalDosage: '1 to 2 puffs every 4 to 6 hours as needed for bronchospastic wheezing',
        commonSideEffects: ['Tremors', 'Tachycardia / racing pulse', 'Nervousness'],
        alternatives: ['Levosalbutamol Inhaler', 'Ipratropium Bromide'],
        prescriptionRequired: true,
        allergyTags: ['beta_agonist']
      }
    ],
    precautions: [
      'Inhale warm moist steam 2-3 times daily to loosen bronchial secretions.',
      'Strictly avoid tobacco smoke, vape emissions, and chemical irritants.',
      'Consult a pulmonologist if the cough lasts longer than 3 weeks or produces rust-colored blood.'
    ],
    dietTips: [
      'Drink 8 to 10 glasses of warm water daily to keep secretions thin.',
      'Sip warm turmeric milk or honey-ginger tea before bed to quiet night-time coughs.'
    ],
    exerciseTips: [
      'Rest during acute phases; excessive physical exertion triggers coughing spasms.',
      'Gentle breathing exercises (pursed-lip breathing) to enhance ventilation.'
    ]
  },
  {
    id: 'urinary_tract_infection',
    disease: 'Urinary Tract Infection (Cystitis / Lower UTI)',
    description: 'Bacterial proliferation within the urinary bladder and urethra, leading to dysuria, urinary frequency, urgency, and lower abdominal heaviness.',
    severityLevel: 'moderate',
    coreSymptoms: ['Frequent or Burning Urination', 'Abdominal Cramping / Pain', 'Fever / High Temperature', 'General Body Weakness', 'Lower Back Pain'],
    medicines: [
      {
        genericName: 'Nitrofurantoin Monohydrate / Macrocrystals',
        brandExamples: ['Macrobid', 'Furadantin', 'Niftran'],
        composition: 'Nitrofurantoin 100mg capsule',
        typicalDosage: '100mg twice daily with meals for 5 days as prescribed by your physician',
        commonSideEffects: ['Nausea', 'Loss of appetite', 'Headache', 'Urine turning dark yellow or brown'],
        alternatives: ['Fosfomycin Trometamol 3g single dose', 'Cefixime', 'Ciprofloxacin'],
        prescriptionRequired: true,
        allergyTags: ['nitrofurantoin']
      },
      {
        genericName: 'Phenazopyridine Hydrochloride (Urinary Analgesic)',
        brandExamples: ['Pyridium', 'Uristat', 'Azo-Standard'],
        composition: 'Phenazopyridine HCl 100mg or 200mg',
        typicalDosage: '200mg three times daily after meals for max 2 days for immediate burning pain relief',
        commonSideEffects: ['Harmless reddish-orange discoloration of urine and contact lenses', 'Mild headache'],
        alternatives: ['Potassium Citrate & Citric Acid oral solution'],
        prescriptionRequired: true,
        allergyTags: []
      }
    ],
    precautions: [
      'Urinate whenever you feel the urge; never hold urine for prolonged durations.',
      'Wipe front to back after bowel movements to prevent bacterial transfer.',
      'Complete the entire prescribed antibiotic course even if pain disappears on day 2.'
    ],
    dietTips: [
      'Drink a minimum of 2.5 to 3 liters of fresh water daily to flush bacteria.',
      'Unsweetened pure cranberry juice or D-mannose supplements under medical guidance.',
      'Avoid coffee, alcohol, carbonated sodas, and citrus while experiencing bladder burning.'
    ],
    exerciseTips: [
      'Engage in gentle walking; avoid bicycle riding or horse riding that exerts direct perineal pressure.'
    ]
  },
  {
    id: 'acute_coronary_alert',
    disease: 'Acute Myocardial Ischemia / Cardiac Emergency Alert',
    description: 'Potential insufficiency of myocardial blood flow requiring immediate clinical triage. Characterized by substernal chest heaviness, radiating pain to left arm or jaw, dyspnea, and diaphoresis.',
    severityLevel: 'emergency',
    coreSymptoms: ['Chest Pain / Pressure', 'Shortness of Breath / Breathing Difficulty', 'Irregular Heartbeat / Palpitations', 'Excessive Sweating / Night Sweats', 'Dizziness / Lightheadedness', 'Nausea'],
    medicines: [
      {
        genericName: 'Aspirin (Soluble / Chewable Dispersible)',
        brandExamples: ['Bayer Aspirin', 'Disprin', 'Ecosprin'],
        composition: 'Chewable Aspirin 162mg to 325mg',
        typicalDosage: 'Chew 162mg to 325mg immediately IF instructed by an emergency clinician and non-allergic',
        commonSideEffects: ['Dyspepsia', 'Bleeding risk', 'Gastric ulceration'],
        alternatives: ['Emergency cardiac hospital protocol'],
        prescriptionRequired: false,
        allergyTags: ['aspirin', 'nsaid', 'salicylate']
      },
      {
        genericName: 'Nitroglycerin Sublingual Tablet',
        brandExamples: ['Nitrostat', 'Angispan', 'Sorbitrate'],
        composition: 'Nitroglycerin 0.4mg sublingual',
        typicalDosage: '1 tablet placed under the tongue at 5-minute intervals (Max 3 doses) under doctor prescription',
        commonSideEffects: ['Throbbing headache', 'Sudden drop in blood pressure', 'Flushing'],
        alternatives: ['Emergency intravenous nitrates in ICU'],
        prescriptionRequired: true,
        allergyTags: ['nitrate']
      }
    ],
    precautions: [
      'CRITICAL: Call 911 / 112 or local emergency hospital immediately.',
      'Stop all physical activity immediately and sit in a comfortable semi-upright position.',
      'Loosen any tight clothing around the neck and chest.'
    ],
    dietTips: [
      'Do not consume any solid food or drink until evaluated by hospital emergency physicians.'
    ],
    exerciseTips: [
      'Zero exercise or physical exertion. Maintain absolute physical rest.'
    ]
  }
];
