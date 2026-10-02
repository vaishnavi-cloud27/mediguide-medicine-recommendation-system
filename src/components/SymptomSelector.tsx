import React, { useState, useMemo } from 'react';
import { Search, X, Check, AlertTriangle, User, AlertCircle, Pill, Plus } from 'lucide-react';
import { COMMON_SYMPTOMS, POPULAR_SYMPTOMS } from '../data/symptoms';
import { Language, translations } from '../data/translations';

interface SymptomSelectorProps {
  language: Language;
  onAnalyze: (payload: {
    symptoms: string[];
    age?: number;
    allergies: string[];
    currentMedications: string[];
  }) => void;
  isLoading: boolean;
}

const COMMON_ALLERGIES = ['Penicillin', 'Sulfa Drugs', 'Aspirin', 'Ibuprofen / NSAIDs', 'Amoxicillin', 'Cephalosporins'];
const COMMON_MEDICATIONS = ['Metformin', 'Warfarin', 'Lisinopril', 'Paracetamol', 'Aspirin', 'Atorvastatin', 'Amlodipine'];

export const SymptomSelector: React.FC<SymptomSelectorProps> = ({
  language,
  onAnalyze,
  isLoading,
}) => {
  const t = translations[language];

  // State
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [age, setAge] = useState<string>('28');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [allergyInput, setAllergyInput] = useState('');
  const [currentMedications, setCurrentMedications] = useState<string[]>([]);
  const [medInput, setMedInput] = useState('');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(COMMON_SYMPTOMS.map((s) => s.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered symptoms
  const filteredSymptoms = useMemo(() => {
    return COMMON_SYMPTOMS.filter((sym) => {
      const matchCategory = selectedCategory === 'All' || sym.category === selectedCategory;
      const matchSearch =
        sym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sym.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Check if any selected symptom is red-flag
  const selectedRedFlags = useMemo(() => {
    return COMMON_SYMPTOMS.filter(
      (sym) => sym.isRedFlag && selectedSymptoms.includes(sym.name)
    );
  }, [selectedSymptoms]);

  // Toggle symptom
  const toggleSymptom = (name: string) => {
    setErrorNotice(null);
    if (selectedSymptoms.includes(name)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== name));
    } else {
      setSelectedSymptoms([...selectedSymptoms, name]);
    }
  };

  // Add allergy
  const handleAddAllergy = (val: string) => {
    const clean = val.trim();
    if (clean && !allergies.includes(clean)) {
      setAllergies([...allergies, clean]);
      setAllergyInput('');
    }
  };

  const removeAllergy = (item: string) => {
    setAllergies(allergies.filter((a) => a !== item));
  };

  // Add medication
  const handleAddMedication = (val: string) => {
    const clean = val.trim();
    if (clean && !currentMedications.includes(clean)) {
      setCurrentMedications([...currentMedications, clean]);
      setMedInput('');
    }
  };

  const removeMedication = (item: string) => {
    setCurrentMedications(currentMedications.filter((m) => m !== item));
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) {
      setErrorNotice(t.checker.noSymptomsSelected);
      return;
    }

    onAnalyze({
      symptoms: selectedSymptoms,
      age: age ? parseInt(age, 10) : undefined,
      allergies,
      currentMedications,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title & Introduction */}
      <div className="bg-gradient-to-br from-teal-50 via-white to-emerald-50/40 dark:from-slate-800 dark:via-slate-850 dark:to-teal-950/20 p-6 md:p-8 rounded-2xl border border-teal-100 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {t.checker.title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {t.checker.subtitle}
            </p>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-teal-700 dark:text-teal-400">
              50+ Medical Symptoms
            </span>
            <span>Gemini + Kaggle Ruleset</span>
          </div>
        </div>
      </div>

      {/* Red flag notice if critical symptoms picked */}
      {selectedRedFlags.length > 0 && (
        <div className="bg-red-50 dark:bg-red-950/40 border-l-4 border-red-500 p-4 rounded-xl flex items-start gap-3 text-red-800 dark:text-red-200 animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold text-sm text-red-900 dark:text-red-100">
              Critical Red-Flag Warning: Emergency Symptoms Selected!
            </p>
            <p>
              You have selected: <span className="font-semibold">{selectedRedFlags.map((r) => r.name).join(', ')}</span>.
            </p>
            <p className="text-red-700 dark:text-red-300">
              These symptoms may denote acute medical emergencies (such as myocardial infarction, meningitis, or severe airway obstruction). If symptoms are acute or worsening, proceed to the nearest emergency room immediately.
            </p>
          </div>
        </div>
      )}

      {/* Main Checker Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Select Symptoms */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
            <label className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              {t.checker.symptomLabel}
            </label>

            {selectedSymptoms.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/40 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800">
                  {selectedSymptoms.length} {t.checker.selectedCount}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedSymptoms([])}
                  className="text-xs text-slate-500 hover:text-red-600 font-medium transition"
                >
                  {t.checker.clearAll}
                </button>
              </div>
            )}
          </div>

          {/* Quick-Pick Popular Symptoms */}
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2">
              {t.checker.popularTags}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SYMPTOMS.map((sym) => {
                const isSelected = selectedSymptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => toggleSymptom(sym)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-teal-400'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {sym}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search bar & Category filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.checker.symptomPlaceholder}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg whitespace-nowrap font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat === 'All' ? t.checker.categoryAll : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Symptoms Chips */}
          {selectedSymptoms.length > 0 && (
            <div className="bg-teal-50/70 dark:bg-teal-950/20 p-3.5 rounded-xl border border-teal-100 dark:border-teal-900/50">
              <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider block mb-2">
                Currently Selected Symptoms:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedSymptoms.map((sym) => {
                  const isRed = COMMON_SYMPTOMS.find((s) => s.name === sym)?.isRedFlag;
                  return (
                    <span
                      key={sym}
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-2xs transition ${
                        isRed
                          ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700'
                          : 'bg-teal-600 text-white'
                      }`}
                    >
                      {sym}
                      <button
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        className="hover:opacity-75 focus:outline-none"
                      >
                        <X className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Symptoms Grid */}
          <div className="max-h-72 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {filteredSymptoms.map((sym) => {
                const isSelected = selectedSymptoms.includes(sym.name);
                return (
                  <div
                    key={sym.id}
                    onClick={() => toggleSymptom(sym.name)}
                    className={`cursor-pointer select-none p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between gap-2 transition ${
                      isSelected
                        ? 'bg-teal-50 dark:bg-teal-900/40 border-teal-500 text-teal-900 dark:text-teal-100 shadow-2xs'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-300 dark:hover:border-teal-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                          isSelected
                            ? 'bg-teal-600 border-teal-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={sym.isRedFlag ? 'font-semibold text-red-600 dark:text-red-400' : ''}>
                        {sym.name}
                      </span>
                    </div>

                    {sym.isRedFlag && (
                      <span
                        title="Critical clinical warning"
                        className="text-[10px] bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 px-1.5 py-0.5 rounded font-bold shrink-0"
                      >
                        Red Flag
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 2: Patient Context & Safety Info */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              Patient Profile & Medication Safety Checks
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Required for accurate adult/pediatric dosages, allergy contraindication alerts, and drug-drug interaction screening.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Age input */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                <User className="w-3.5 h-3.5 text-teal-600" />
                {t.checker.ageLabel}
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="28"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Standard reference adult ranges applied for ages 18+.
              </span>
            </div>

            {/* Known Allergies */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                {t.checker.allergiesLabel}
              </label>

              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAllergy(allergyInput);
                    }
                  }}
                  placeholder={t.checker.allergiesPlaceholder}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddAllergy(allergyInput)}
                  className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-1">
                {COMMON_ALLERGIES.slice(0, 4).map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => handleAddAllergy(a)}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 hover:bg-teal-50 hover:text-teal-700"
                  >
                    + {a}
                  </button>
                ))}
              </div>

              {/* Tag chips */}
              {allergies.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {allergies.map((all) => (
                    <span
                      key={all}
                      className="inline-flex items-center gap-1 text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-800 font-medium"
                    >
                      {all}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeAllergy(all)}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Current Medications */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-indigo-500" />
                {t.checker.medicationsLabel}
              </label>

              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={medInput}
                  onChange={(e) => setMedInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddMedication(medInput);
                    }
                  }}
                  placeholder={t.checker.medicationsPlaceholder}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddMedication(medInput)}
                  className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-1">
                {COMMON_MEDICATIONS.slice(0, 4).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleAddMedication(m)}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 hover:bg-teal-50 hover:text-teal-700"
                  >
                    + {m}
                  </button>
                ))}
              </div>

              {/* Tag chips */}
              {currentMedications.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {currentMedications.map((med) => (
                    <span
                      key={med}
                      className="inline-flex items-center gap-1 text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-800 font-medium"
                    >
                      {med}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeMedication(med)}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error notice if validation failed */}
        {errorNotice && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 p-3 rounded-xl text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{errorNotice}</span>
          </div>
        )}

        {/* Submit Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            🔒 Analyses are processed securely and respect user confidentiality.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-teal-400 text-white cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/30 hover:shadow-lg active:scale-98'
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t.checker.analyzing}
              </>
            ) : (
              <span>{t.checker.submitBtn}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
