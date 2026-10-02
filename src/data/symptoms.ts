export interface Symptom {
  id: string;
  name: string;
  category: 'General' | 'Respiratory' | 'Digestive' | 'Pain & Neuro' | 'Skin & Allergy' | 'Cardio & ENT';
  isRedFlag?: boolean;
  redFlagReason?: string;
}

export const COMMON_SYMPTOMS: Symptom[] = [
  // Respiratory
  { id: 'cough', name: 'Cough', category: 'Respiratory' },
  { id: 'shortness_of_breath', name: 'Shortness of Breath / Breathing Difficulty', category: 'Respiratory', isRedFlag: true, redFlagReason: 'Severe respiratory distress requires emergency clinical evaluation.' },
  { id: 'sore_throat', name: 'Sore Throat', category: 'Respiratory' },
  { id: 'runny_nose', name: 'Runny / Stuffy Nose', category: 'Respiratory' },
  { id: 'wheezing', name: 'Wheezing', category: 'Respiratory' },
  { id: 'sneezing', name: 'Frequent Sneezing', category: 'Respiratory' },
  { id: 'hemoptysis', name: 'Coughing up Blood', category: 'Respiratory', isRedFlag: true, redFlagReason: 'Coughing up blood is a critical symptom requiring immediate medical attention.' },

  // General & Systemic
  { id: 'fever', name: 'Fever / High Temperature', category: 'General' },
  { id: 'chills', name: 'Chills & Shivering', category: 'General' },
  { id: 'fatigue', name: 'Severe Fatigue / Lethargy', category: 'General' },
  { id: 'malaise', name: 'General Body Weakness', category: 'General' },
  { id: 'weight_loss', name: 'Unexplained Weight Loss', category: 'General' },
  { id: 'excessive_sweating', name: 'Excessive Sweating / Night Sweats', category: 'General' },
  { id: 'dehydration', name: 'Excessive Thirst / Dehydration', category: 'General' },

  // Pain & Neurological
  { id: 'headache', name: 'Headache', category: 'Pain & Neuro' },
  { id: 'chest_pain', name: 'Chest Pain / Pressure', category: 'Pain & Neuro', isRedFlag: true, redFlagReason: 'Acute chest pain or pressure may signify myocardial infarction (heart attack) or pulmonary embolism.' },
  { id: 'joint_pain', name: 'Joint Pain & Stiffness', category: 'Pain & Neuro' },
  { id: 'muscle_ache', name: 'Muscle Aches (Myalgia)', category: 'Pain & Neuro' },
  { id: 'dizziness', name: 'Dizziness / Lightheadedness', category: 'Pain & Neuro' },
  { id: 'back_pain', name: 'Lower Back Pain', category: 'Pain & Neuro' },
  { id: 'neck_stiffness', name: 'Stiff Neck with Fever', category: 'Pain & Neuro', isRedFlag: true, redFlagReason: 'Stiff neck accompanied by fever is a classic sign of potential acute meningitis.' },
  { id: 'insomnia', name: 'Insomnia / Sleep Disturbance', category: 'Pain & Neuro' },
  { id: 'anxiety', name: 'Anxiety & Palpitations', category: 'Pain & Neuro' },

  // Digestive
  { id: 'nausea', name: 'Nausea', category: 'Digestive' },
  { id: 'vomiting', name: 'Vomiting', category: 'Digestive' },
  { id: 'abdominal_pain', name: 'Abdominal Cramping / Pain', category: 'Digestive' },
  { id: 'diarrhea', name: 'Diarrhea / Loose Stools', category: 'Digestive' },
  { id: 'constipation', name: 'Constipation', category: 'Digestive' },
  { id: 'acid_reflux', name: 'Heartburn / Acid Reflux', category: 'Digestive' },
  { id: 'loss_of_appetite', name: 'Loss of Appetite', category: 'Digestive' },
  { id: 'bloating', name: 'Abdominal Bloating & Gas', category: 'Digestive' },
  { id: 'blood_in_stool', name: 'Blood in Stool', category: 'Digestive', isRedFlag: true, redFlagReason: 'Gastrointestinal bleeding requires immediate clinical investigation.' },

  // Skin & Allergy
  { id: 'skin_rash', name: 'Skin Rash / Red Patches', category: 'Skin & Allergy' },
  { id: 'itching', name: 'Severe Itching (Pruritus)', category: 'Skin & Allergy' },
  { id: 'swelling', name: 'Facial or Lip Swelling (Angioedema)', category: 'Skin & Allergy', isRedFlag: true, redFlagReason: 'Sudden swelling of face, lips, or tongue can indicate anaphylaxis.' },
  { id: 'hives', name: 'Urticaria / Hives', category: 'Skin & Allergy' },
  { id: 'dry_skin', name: 'Dry / Flaky Skin', category: 'Skin & Allergy' },
  { id: 'yellowing_skin', name: 'Yellowish Skin & Eyes (Jaundice)', category: 'Skin & Allergy' },

  // Cardio & ENT / Others
  { id: 'earache', name: 'Earache / Ear Fullness', category: 'Cardio & ENT' },
  { id: 'blurred_vision', name: 'Sudden Blurred Vision', category: 'Cardio & ENT', isRedFlag: true, redFlagReason: 'Sudden vision changes may indicate acute neurological or ocular emergencies.' },
  { id: 'frequent_urination', name: 'Frequent or Burning Urination', category: 'Cardio & ENT' },
  { id: 'nasal_congestion', name: 'Sinus Pressure & Facial Pain', category: 'Cardio & ENT' },
  { id: 'swollen_lymph_nodes', name: 'Swollen Lymph Nodes in Neck', category: 'Cardio & ENT' },
  { id: 'loss_of_taste_smell', name: 'Loss of Taste or Smell', category: 'Cardio & ENT' },
  { id: 'palpitations', name: 'Irregular Heartbeat / Palpitations', category: 'Cardio & ENT' },
  { id: 'mouth_ulcers', name: 'Mouth Ulcers / Sores', category: 'Cardio & ENT' },
  { id: 'cold_hands_feet', name: 'Cold Hands & Feet', category: 'Cardio & ENT' },
];

export const POPULAR_SYMPTOMS = [
  'Fever / High Temperature',
  'Cough',
  'Headache',
  'Sore Throat',
  'Shortness of Breath / Breathing Difficulty',
  'Chest Pain / Pressure',
  'Joint Pain & Stiffness',
  'Skin Rash / Red Patches',
  'Nausea',
  'Vomiting',
];
