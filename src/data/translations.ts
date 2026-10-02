export type Language = 'en' | 'hi' | 'mr';

export interface TranslationStrings {
  appName: string;
  appTagline: string;
  disclaimerShort: string;
  disclaimerFull: string;
  emergencyAlert: string;
  emergencyDesc: string;
  emergencyAction: string;
  tabs: {
    checker: string;
    comparison: string;
    admin: string;
    history: string;
  };
  checker: {
    title: string;
    subtitle: string;
    symptomLabel: string;
    symptomPlaceholder: string;
    selectedCount: string;
    noSymptomsSelected: string;
    ageLabel: string;
    allergiesLabel: string;
    allergiesPlaceholder: string;
    medicationsLabel: string;
    medicationsPlaceholder: string;
    submitBtn: string;
    analyzing: string;
    clearAll: string;
    categoryAll: string;
    popularTags: string;
  };
  results: {
    title: string;
    confidence: string;
    probabilityChart: string;
    explainability: string;
    contributedSymptoms: string;
    medicines: string;
    genericName: string;
    composition: string;
    typicalDosage: string;
    sideEffects: string;
    alternatives: string;
    prescriptionNote: string;
    precautions: string;
    dietTips: string;
    workoutTips: string;
    allergyWarning: string;
    interactionWarning: string;
    downloadPdf: string;
    findPharmacy: string;
    checkAnother: string;
    safetyNotice: string;
  };
  comparison: {
    title: string;
    subtitle: string;
    datasetNote: string;
    metricAccuracy: string;
    metricPrecision: string;
    metricRecall: string;
    metricF1: string;
    pythonCodeTitle: string;
    copyCode: string;
    codeCopied: string;
  };
  admin: {
    title: string;
    subtitle: string;
    addDisease: string;
    searchDiseases: string;
    totalDiseases: string;
    resetDefaults: string;
    save: string;
    cancel: string;
  };
  history: {
    title: string;
    subtitle: string;
    empty: string;
    clear: string;
    viewAgain: string;
    date: string;
    symptoms: string;
    topCondition: string;
  };
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    appName: 'MediGuide',
    appTagline: 'Medicine Recommendation & Clinical Decision Support System',
    disclaimerShort: 'For Educational Decision Support Only. Not a substitute for professional medical diagnosis or treatment.',
    disclaimerFull: 'MediGuide is designed solely as an educational decision-support tool and research prototype. Never disregard or delay seeking professional medical advice because of something you have read here. In a medical emergency, immediately dial 911 or your local emergency hospital services.',
    emergencyAlert: 'Potential Red-Flag Medical Emergency Detected!',
    emergencyDesc: 'Your selected symptoms indicate symptoms (such as acute chest pain or severe respiratory distress) that require urgent in-person medical evaluation.',
    emergencyAction: 'Call Emergency Services / Visit Nearest ER Immediately',
    tabs: {
      checker: 'Symptom Checker',
      comparison: 'ML Model Benchmarks',
      admin: 'Disease Knowledge Base',
      history: 'Consultation History',
    },
    checker: {
      title: 'Check Symptoms & Get Recommendations',
      subtitle: 'Select your observed symptoms, age, and existing medications to receive differential condition insights and medicine safety checks.',
      symptomLabel: 'Select Symptoms (Search from 50+ common clinical symptoms)',
      symptomPlaceholder: 'Search symptoms (e.g. fever, cough, joint pain, chest pain)...',
      selectedCount: 'symptoms selected',
      noSymptomsSelected: 'Please select at least one symptom to evaluate potential conditions.',
      ageLabel: 'Patient Age (Years)',
      allergiesLabel: 'Known Drug Allergies',
      allergiesPlaceholder: 'e.g. Penicillin, Aspirin, Sulfa drugs, Ibuprofen',
      medicationsLabel: 'Current Medications (For Drug-Drug Interaction Check)',
      medicationsPlaceholder: 'e.g. Metformin, Warfarin, Lisinopril, Paracetamol',
      submitBtn: 'Analyze Symptoms with Decision Support',
      analyzing: 'Evaluating Symptoms with Medical AI...',
      clearAll: 'Clear Selection',
      categoryAll: 'All Categories',
      popularTags: 'Common Quick Picks:',
    },
    results: {
      title: 'Differential Condition Assessment',
      confidence: 'Probability Confidence',
      probabilityChart: 'Top 3 Predicted Conditions Comparison',
      explainability: 'Explainability & Feature Contribution',
      contributedSymptoms: 'Primary symptoms driving this prediction:',
      medicines: 'Commonly Recommended Medicines (Educational Reference)',
      genericName: 'Generic Name',
      composition: 'Composition / Active Ingredient',
      typicalDosage: 'Typical Adult Dosage Range',
      sideEffects: 'Common Side Effects',
      alternatives: 'Alternative Options',
      prescriptionNote: 'Requires a prescription from a licensed physician. Do not self-medicate.',
      precautions: 'Clinical Precautions & Care Measures',
      dietTips: 'Dietary Guidance',
      workoutTips: 'Activity & Rest Guidance',
      allergyWarning: 'Allergy Conflict Alert',
      interactionWarning: 'Potential Drug Interaction Warning',
      downloadPdf: 'Download Clinical Summary (PDF / Print)',
      findPharmacy: 'Find Nearby Pharmacies on Map',
      checkAnother: 'Evaluate New Symptoms',
      safetyNotice: 'Dosages shown are standard reference ranges for adults. Actual therapeutic dosages vary strictly with age, weight, kidney/liver function, and comorbidities.',
    },
    comparison: {
      title: 'Machine Learning Model Benchmarking',
      subtitle: 'Comparative evaluation on Kaggle Disease Symptom Prediction dataset (4,920 patient instances, 132 binary symptom features across 41 disease classes).',
      datasetNote: 'Trained and tested using an 80/20 stratified split with 5-fold cross validation.',
      metricAccuracy: 'Accuracy',
      metricPrecision: 'Precision',
      metricRecall: 'Recall',
      metricF1: 'F1 Score',
      pythonCodeTitle: 'Viva / Project ML Source Code (Scikit-Learn + Flask Backend)',
      copyCode: 'Copy Python Code',
      codeCopied: 'Code copied to clipboard!',
    },
    admin: {
      title: 'Disease & Medicine Knowledge Base',
      subtitle: 'Manage condition rules, clinical medicine protocols, contraindications, and precautions stored in local state.',
      addDisease: 'Add New Condition',
      searchDiseases: 'Filter conditions or medications...',
      totalDiseases: 'Total Conditions in Database',
      resetDefaults: 'Restore Default Clinical Dataset',
      save: 'Save Changes',
      cancel: 'Cancel',
    },
    history: {
      title: 'Previous Evaluations History',
      subtitle: 'Records stored locally on your device for quick reference and printing.',
      empty: 'No past consultations found yet. Run an evaluation from the Symptom Checker.',
      clear: 'Clear History',
      viewAgain: 'Re-examine Results',
      date: 'Date & Time',
      symptoms: 'Observed Symptoms',
      topCondition: 'Top Indicated Condition',
    },
  },
  hi: {
    appName: 'MediGuide (मेडिगाइड)',
    appTagline: 'दवा अनुशंसा और क्लिनिकल निर्णय सहायता प्रणाली',
    disclaimerShort: 'केवल शैक्षिक निर्णय समर्थन के लिए। यह डॉक्टर का विकल्प नहीं है।',
    disclaimerFull: 'मेडिगाइड केवल एक शैक्षणिक और शोध प्रोटोटाइप है। किसी भी दवा को लेने से पहले हमेशा किसी योग्य डॉक्टर या फार्मासिस्ट से परामर्श लें। आपातकालीन स्थिति में तुरंत 112 या निकटतम अस्पताल जाएं।',
    emergencyAlert: 'आपातकालीन लक्षण पाए गए!',
    emergencyDesc: 'आपके द्वारा चुने गए लक्षण (जैसे सीने में तेज दर्द या सांस लेने में कठिनाई) को तत्काल इन-पर्सन आपातकालीन चिकित्सा की आवश्यकता है।',
    emergencyAction: 'तुरंत आपातकालीन सेवा से संपर्क करें',
    tabs: {
      checker: 'लक्षण जांचकर्ता',
      comparison: 'एमएल मॉडल तुलना',
      admin: 'रोग डेटाबेस',
      history: 'खोज इतिहास',
    },
    checker: {
      title: 'लक्षणों की जांच करें और अनुशंसा प्राप्त करें',
      subtitle: 'संभावित बीमारियों और दवा सुरक्षा चेतावनियों को देखने के लिए अपने लक्षण, आयु और वर्तमान दवाएं दर्ज करें।',
      symptomLabel: 'लक्षण चुनें (50+ सामान्य लक्षणों में से खोजें)',
      symptomPlaceholder: 'लक्षण खोजें (उदा. बुखार, खांसी, जोड़ों का दर्द, सीने में दर्द)...',
      selectedCount: 'लक्षण चुने गए',
      noSymptomsSelected: 'कृपया मूल्यांकन के लिए कम से कम एक लक्षण चुनें।',
      ageLabel: 'रोगी की आयु (वर्ष)',
      allergiesLabel: 'ज्ञात दवा एलर्जी',
      allergiesPlaceholder: 'उदा. पेनिसिलिन, एस्पिरिन, इबुप्रोफेन',
      medicationsLabel: 'वर्तमान में ली जाने वाली दवाएं',
      medicationsPlaceholder: 'उदा. मेटफॉर्मिन, वारफारिन, पैरासिटामोल',
      submitBtn: 'लक्षणों का विश्लेषण करें',
      analyzing: 'चिकित्सा एआई द्वारा विश्लेषण जारी है...',
      clearAll: 'चयन साफ़ करें',
      categoryAll: 'सभी श्रेणियां',
      popularTags: 'प्रमुख लक्षण:',
    },
    results: {
      title: 'संभावित स्वास्थ्य स्थितियों का आकलन',
      confidence: 'संभावना प्रतिशत',
      probabilityChart: 'शीर्ष 3 संभावित स्थितियों की तुलना',
      explainability: 'लक्षण प्रभाव और व्याख्या',
      contributedSymptoms: 'इस परिणाम के लिए मुख्य योगदानकर्ता लक्षण:',
      medicines: 'आमतौर पर इस्तेमाल की जाने वाली दवाएं (शैक्षणिक संदर्भ)',
      genericName: 'जेनेरिक नाम',
      composition: 'संरचना / सक्रिय घटक',
      typicalDosage: 'वयस्कों के लिए सामान्य खुराक',
      sideEffects: 'संभावित दुष्प्रभाव',
      alternatives: 'वैकल्पिक दवाएं',
      prescriptionNote: 'लाइसेंस प्राप्त डॉक्टर के पर्चे की आवश्यकता है। बिना डॉक्टर के परामर्श के दवा न लें।',
      precautions: 'आवश्यक सावधानियां',
      dietTips: 'आहार संबंधी सुझाव',
      workoutTips: 'हल्का व्यायाम और आराम',
      allergyWarning: 'एलर्जी चेतावनी',
      interactionWarning: 'दवा-दवा परस्पर प्रभाव चेतावनी',
      downloadPdf: 'रिपोर्ट डाउनलोड करें (PDF / प्रिंट)',
      findPharmacy: 'नजदीकी मेडिकल स्टोर खोजें',
      checkAnother: 'नए लक्षणों की जांच करें',
      safetyNotice: 'दिखाई गई खुराक केवल सामान्य संदर्भ के लिए है। वास्तविक खुराक उम्र, वजन और समग्र स्वास्थ्य पर निर्भर करती है।',
    },
    comparison: {
      title: 'मशीन लर्निंग मॉडल तुलना और मूल्यांकन',
      subtitle: 'कैगल रोग-लक्षण प्रेडिक्शन डेटासेट पर आधारित विभिन्न मॉडलों (Naive Bayes, Decision Tree, SVM, Random Forest) का प्रदर्शन।',
      datasetNote: '80/20 डेटा विभाजन और क्रॉस-वैलिडेशन के साथ मूल्यांकन किया गया।',
      metricAccuracy: 'सटीकता (Accuracy)',
      metricPrecision: 'सटीक माप (Precision)',
      metricRecall: 'रिकॉल (Recall)',
      metricF1: 'F1 स्कोर',
      pythonCodeTitle: 'वाइवा / प्रोजेक्ट के लिए पायथन व फ्लास्क कोड',
      copyCode: 'कोड कॉपी करें',
      codeCopied: 'कोड क्लिपबोर्ड पर कॉपी हो गया!',
    },
    admin: {
      title: 'रोग और दवा ज्ञानकोश (एडमिन)',
      subtitle: 'रोगों के नियम, अनुशंसित दवाएं और सावधानियों को प्रबंधित करें।',
      addDisease: 'नई बीमारी जोड़ें',
      searchDiseases: 'रोग या दवा खोजें...',
      totalDiseases: 'डेटाबेस में कुल रोग',
      resetDefaults: 'डिफ़ॉल्ट डेटा रीसेट करें',
      save: 'परिवर्तन सहेजें',
      cancel: 'रद्द करें',
    },
    history: {
      title: 'परामर्श इतिहास',
      subtitle: 'आपके डिवाइस पर स्थानीय रूप से सुरक्षित रिकॉर्ड।',
      empty: 'अभी कोई पिछला इतिहास उपलब्ध नहीं है।',
      clear: 'इतिहास साफ़ करें',
      viewAgain: 'पुनः परिणाम देखें',
      date: 'दिनांक और समय',
      symptoms: 'दर्ज किए गए लक्षण',
      topCondition: 'शीर्ष संभावित बीमारी',
    },
  },
  mr: {
    appName: 'MediGuide (मेडिगाईड)',
    appTagline: 'औषध शिफारस आणि वैद्यकीय निर्णय सहाय्य प्रणाली',
    disclaimerShort: 'फक्त शैक्षणिक निर्णय समर्थनासाठी. हे डॉक्टरांचा पर्याय नाही.',
    disclaimerFull: 'मेडिगाईड हे केवळ शैक्षणिक आणि संशोधन प्रोटोटाइप म्हणून तयार केले गेले आहे. कोणतेही औषध घेण्यापूर्वी नेहमी पात्र डॉक्टर किंवा औषधनिर्मात्याचा सल्ला घ्या. आपत्कालीन परिस्थितीत त्वरित ११२ किंवा जवळच्या रुग्णालयात जा.',
    emergencyAlert: 'तातडीचे आपत्कालीन लक्षण आढळले!',
    emergencyDesc: 'आपण निवडलेली लक्षणे (उदा. छातीत तीव्र वेदना किंवा श्वास घेण्यास त्रास) तातडीच्या वैद्यकीय तपासणीची आवश्यकता दर्शवतात.',
    emergencyAction: 'तातडीने रुग्णवाहिका / जवळच्या रुग्णालयात संपर्क साधा',
    tabs: {
      checker: 'लक्षण तपासणी',
      comparison: 'एमएल मॉडेल तुलना',
      admin: 'आजार डेटाबेस',
      history: 'तपासणी इतिहास',
    },
    checker: {
      title: 'लक्षणे तपासा आणि औषध माहिती मिळवा',
      subtitle: 'संभाव्य आजार आणि औषध सुरक्षेचा अंदाज घेण्यासाठी लक्षणे, वय आणि चालू असलेली औषधे नोंदवा.',
      symptomLabel: 'लक्षणे निवडा (५०+ सामान्य लक्षणांमधून शोधा)',
      symptomPlaceholder: 'लक्षणे शोधा (उदा. ताप, खोकला, अंगदुखी, छातीत दुखणे)...',
      selectedCount: 'लक्षणे निवडली',
      noSymptomsSelected: 'कृपया विश्लेषणासाठी किमान एक लक्षण निवडा.',
      ageLabel: 'रुग्णाचे वय (वर्षे)',
      allergiesLabel: 'माहित असलेली औषध ॲलर्जी',
      allergiesPlaceholder: 'उदा. पेनिसिलिन, ॲस्पिरिन, आयबुप्रोफेन',
      medicationsLabel: 'सध्या चालू असलेली औषधे',
      medicationsPlaceholder: 'उदा. मेटफॉर्मिन, पॅरासिटामॉल, वारफारिन',
      submitBtn: 'लक्षणांचे विश्लेषण करा',
      analyzing: 'वैद्यकीय एआय द्वारे विश्लेषण सुरू आहे...',
      clearAll: 'निवड रद्द करा',
      categoryAll: 'सर्व प्रकार',
      popularTags: 'प्रमुख लक्षणे:',
    },
    results: {
      title: 'संभाव्य आरोग्य स्थितींचे विश्लेषण',
      confidence: 'शक्यता टक्केवारी',
      probabilityChart: 'शीर्ष ३ संभाव्य आजारांची तुलना',
      explainability: 'लक्षण प्रभाव आणि स्पष्टीकरण',
      contributedSymptoms: 'या निष्कर्षास कारणीभूत मुख्य लक्षणे:',
      medicines: 'सामान्यतः वापरली जाणारी औषधे (शैक्षणिक संदर्भ)',
      genericName: 'जेनेरिक नाव',
      composition: 'घटक / सक्रिय औषध',
      typicalDosage: 'प्रौढांसाठी सामान्य डोस',
      sideEffects: 'संभाव्य दुष्परिणाम',
      alternatives: 'पर्यायी औषधे',
      prescriptionNote: 'डॉक्टरांच्या प्रिस्क्रिप्शनशिवाय औषध घेऊ नका.',
      precautions: 'महत्त्वाच्या खबरदाऱ्या',
      dietTips: 'आहार विषयक सल्ला',
      workoutTips: 'हलका व्यायाम आणि विश्रांती',
      allergyWarning: 'ॲलर्जी धोका इशारा',
      interactionWarning: 'औषध-औषध परस्परक्रिया इशारा',
      downloadPdf: 'अहवाल डाउनलोड करा (PDF / प्रिंट)',
      findPharmacy: 'जवळची मेडिकल दुकाने शोधा',
      checkAnother: 'नवीन लक्षणे तपासा',
      safetyNotice: 'दर्शवलेला डोस केवळ सामान्य मार्गदर्शनासाठी आहे. अचूक डोस वय आणि आरोग्यावर अवलंबून असतो.',
    },
    comparison: {
      title: 'मशीन लर्निंग मॉडेल मूल्यमापन',
      subtitle: 'कॅगल डेटासेटवर प्रशिक्षित विविध मॉडेल्सची (Naive Bayes, Decision Tree, SVM, Random Forest) अचूकता.',
      datasetNote: '८०/२० डेटा विभाजन आणि क्रॉस-व्हॅलिडेशनसह परीक्षण केलेले.',
      metricAccuracy: 'अचूकता (Accuracy)',
      metricPrecision: 'परिशुद्धता (Precision)',
      metricRecall: 'रिकॉल (Recall)',
      metricF1: 'F1 स्कोअर',
      pythonCodeTitle: 'प्रकल्प व परीक्षेसाठी पायथन + फ्लास्क कोड',
      copyCode: 'कोड कॉपी करा',
      codeCopied: 'कोड क्लिपबोर्डवर कॉपी केला!',
    },
    admin: {
      title: 'आजार आणि औषध ज्ञानकोश (Admin)',
      subtitle: 'आजार, औषधांचे नियम आणि खबरदाऱ्या व्यवस्थापित करा.',
      addDisease: 'नवीन आजार जोडा',
      searchDiseases: 'आजार किंवा औषध शोधा...',
      totalDiseases: 'डेटाबेसमधील एकूण आजार',
      resetDefaults: 'मूळ डेटा पूर्ववत करा',
      save: 'बदल जतन करा',
      cancel: 'रद्द करा',
    },
    history: {
      title: 'मागील तपासणी इतिहास',
      subtitle: 'आपल्या डिव्हाइसवर स्थानिक पातळीवर साठवलेला इतिहास.',
      empty: 'अद्याप कोणताही मागील इतिहास उपलब्ध नाही.',
      clear: 'इतिहास पुसा',
      viewAgain: 'निकाल पुन्हा पहा',
      date: 'तारीख आणि वेळ',
      symptoms: 'नोंदवलेली लक्षणे',
      topCondition: 'प्रमुख संभाव्य आजार',
    },
  },
};
