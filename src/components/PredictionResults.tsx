import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  AlertTriangle,
  ShieldCheck,
  MapPin,
  Printer,
  RotateCcw,
  Pill,
  Sparkles,
  Info,
  HeartPulse,
  Apple,
  Dumbbell,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { PredictionResponse } from '../types';
import { Language, translations } from '../data/translations';

interface PredictionResultsProps {
  data: PredictionResponse;
  userSymptoms: string[];
  userAge?: number;
  userAllergies?: string[];
  userMedications?: string[];
  language: Language;
  onReset: () => void;
  onOpenPrintReport: () => void;
}

export const PredictionResults: React.FC<PredictionResultsProps> = ({
  data,
  userSymptoms,
  userAge,
  userAllergies = [],
  userMedications = [],
  language,
  onReset,
  onOpenPrintReport,
}) => {
  const t = translations[language];
  const [selectedDiseaseIdx, setSelectedDiseaseIdx] = useState(0);

  const { predictions, allergyWarnings, interactionWarnings, redFlagAlert } = data;
  const currentDisease = predictions[selectedDiseaseIdx] || predictions[0];

  // Recharts chart data
  const chartData = predictions.map((pred, i) => ({
    name: pred.disease.split('(')[0].trim().slice(0, 22),
    fullName: pred.disease,
    confidence: pred.confidence,
    isCurrent: i === selectedDiseaseIdx,
  }));

  const BAR_COLORS = ['#0d9488', '#0891b2', '#0284c7'];

  // Google Maps pharmacy link
  const openPharmacyMap = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=pharmacy+near+me', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 1. Critical Red-Flag Warning Banner if Triggered */}
      {redFlagAlert && redFlagAlert.isTriggered && (
        <div className="bg-red-500 text-white p-5 rounded-2xl shadow-lg border border-red-600 animate-pulse">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-base tracking-wide flex items-center gap-2">
                  <span>URGENT: Red-Flag Medical Warning</span>
                </h3>
                <p className="text-xs text-red-50 mt-1 leading-relaxed">
                  {redFlagAlert.emergencyMessage || t.emergencyDesc}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {redFlagAlert.emergencySymptoms.map((sym) => (
                    <span
                      key={sym}
                      className="text-[11px] bg-red-700/80 px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                    >
                      ⚠️ {sym}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="tel:112"
              className="bg-white text-red-700 hover:bg-red-50 px-4 py-2.5 rounded-xl font-extrabold text-xs shadow shrink-0 flex items-center gap-1.5 transition active:scale-95"
            >
              <HeartPulse className="w-4 h-4 text-red-600" />
              Call Emergency (112 / 911)
            </a>
          </div>
        </div>
      )}

      {/* 2. Mandatory Prominent Disclaimer Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 p-4 rounded-2xl flex items-start gap-3 text-amber-900 dark:text-amber-200">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <p className="font-bold text-sm text-amber-950 dark:text-amber-100 mb-0.5">
            Important Medical Disclaimer
          </p>
          <p>
            {t.disclaimerFull}
          </p>
        </div>
      </div>

      {/* 3. Action Toolbar: Pharmacy, PDF Print, New Check */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-bold text-slate-700 dark:text-slate-200">
            Assessed for:
          </span>
          <span className="bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-lg">
            {userSymptoms.length} Reported Symptoms
          </span>
          {userAge && (
            <span className="bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-lg">
              Age: {userAge} yrs
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={openPharmacyMap}
            className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold px-3 py-2 rounded-xl transition"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.results.findPharmacy}</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
          </button>

          <button
            onClick={onOpenPrintReport}
            className="inline-flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/40 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-semibold px-3 py-2 rounded-xl transition"
          >
            <Printer className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.results.downloadPdf}</span>
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.results.checkAnother}</span>
          </button>
        </div>
      </div>

      {/* 4. Top 3 Probability Comparison & Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Disease Selector Tabs */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Top 3 Possible Conditions:
          </span>

          <div className="space-y-2.5">
            {predictions.map((pred, idx) => {
              const isSelected = idx === selectedDiseaseIdx;
              return (
                <div
                  key={pred.disease}
                  onClick={() => setSelectedDiseaseIdx(idx)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md shadow-teal-600/20 border-teal-600 scale-[1.02]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-teal-800/80 text-teal-100'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Rank #{idx + 1}
                    </span>

                    <span
                      className={`text-sm font-extrabold flex items-center gap-1 ${
                        isSelected ? 'text-white' : 'text-teal-600 dark:text-teal-400'
                      }`}
                    >
                      {pred.confidence}% Conf.
                    </span>
                  </div>

                  <h3 className="font-bold text-sm leading-snug line-clamp-2">
                    {pred.disease}
                  </h3>

                  <p
                    className={`text-xs mt-1 line-clamp-2 ${
                      isSelected ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {pred.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Bar Chart of Top 3 Probabilities */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-3">
              <div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  {t.results.probabilityChart}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Comparative probability model distribution across top candidates.
                </p>
              </div>

              <span className="text-xs bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 font-bold px-2 py-1 rounded-md">
                Softmax Distribution
              </span>
            </div>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 25 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    interval={0}
                    angle={-10}
                    textAnchor="end"
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    unit="%"
                  />
                  <Tooltip
                    formatter={(val: any) => [`${val}%`, 'Likelihood']}
                    labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      borderRadius: '8px',
                      fontSize: '12px',
                      border: 'none',
                    }}
                  />
                  <Bar dataKey="confidence" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isCurrent ? '#0d9488' : '#94a3b8'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center border-t border-slate-100 dark:border-slate-700 pt-2">
            Click any condition rank on the left or the bar above to view full clinical details.
          </div>
        </div>
      </div>

      {/* 5. Detailed Breakdown of Currently Selected Disease */}
      {currentDisease && (
        <div className="space-y-6">
          {/* Header of Active Disease */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/40 px-2.5 py-0.5 rounded-full uppercase">
                    Differential Diagnosis #{selectedDiseaseIdx + 1}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                      currentDisease.severityLevel === 'emergency'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200'
                        : currentDisease.severityLevel === 'high'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200'
                    }`}
                  >
                    Severity: {currentDisease.severityLevel}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
                  {currentDisease.disease}
                </h2>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between bg-teal-50 dark:bg-teal-900/30 p-3 rounded-xl border border-teal-100 dark:border-teal-800">
                <span className="text-xs text-teal-800 dark:text-teal-300 font-medium">
                  {t.results.confidence}
                </span>
                <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
                  {currentDisease.confidence}%
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentDisease.description}
            </p>

            {/* Explainability: Contributing symptoms */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  {t.results.explainability}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.results.contributedSymptoms}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentDisease.contributingSymptoms.map((sym) => (
                  <span
                    key={sym}
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-lg border border-teal-200 dark:border-teal-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    {sym}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Safety Checks: Allergy Alerts & Drug-Drug Interactions */}
          {(allergyWarnings.length > 0 || interactionWarnings.length > 0) && (
            <div className="space-y-3">
              {allergyWarnings.map((warn, i) => (
                <div
                  key={i}
                  className="bg-red-50 dark:bg-red-950/40 border-l-4 border-red-500 p-4 rounded-xl text-red-900 dark:text-red-200 flex items-start gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-sm text-red-950 dark:text-red-100">
                      {t.results.allergyWarning}: {warn.allergen} vs {warn.conflictingMedicine}
                    </p>
                    <p>{warn.warningMessage}</p>
                  </div>
                </div>
              ))}

              {interactionWarnings.map((iwarn, i) => (
                <div
                  key={i}
                  className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 p-4 rounded-xl text-amber-900 dark:text-amber-200 flex items-start gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-sm text-amber-950 dark:text-amber-100">
                      {t.results.interactionWarning}: {iwarn.medicationA} ↔ {iwarn.medicationB}
                    </p>
                    <p>{iwarn.interactionText}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 7. Commonly Used Medicines */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2">
                  <Pill className="w-5 h-5 text-teal-600" />
                  {t.results.medicines}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Standard clinical pharmacological choices. Reference only.
                </p>
              </div>

              <span className="text-[11px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold px-2.5 py-1 rounded-full">
                {currentDisease.medicines.length} Options Listed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentDisease.medicines.map((med, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                        {med.genericName}
                      </h4>
                      {med.brandExamples && med.brandExamples.length > 0 && (
                        <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium">
                          Brands: {med.brandExamples.join(', ')}
                        </p>
                      )}
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                        med.prescriptionRequired
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200 border border-emerald-300'
                      }`}
                    >
                      {med.prescriptionRequired ? 'Prescription (Rx)' : 'OTC (Over-The-Counter)'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {t.results.composition}:{' '}
                      </span>
                      <span>{med.composition}</span>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="font-semibold text-teal-800 dark:text-teal-300 block mb-0.5">
                        {t.results.typicalDosage}:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 text-[11px]">
                        {med.typicalDosage}
                      </span>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {t.results.sideEffects}:{' '}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {med.commonSideEffects.join(', ')}
                      </span>
                    </div>

                    {med.alternatives && med.alternatives.length > 0 && (
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {t.results.alternatives}:{' '}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {med.alternatives.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {med.prescriptionRequired && (
                    <div className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200 dark:border-amber-800 font-medium">
                      ⚠️ {t.results.prescriptionNote}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-750 p-3 rounded-xl">
              {t.results.safetyNotice}
            </div>
          </div>

          {/* 8. Care Protocol: Precautions, Diet & Exercise */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Precautions */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm border-b border-slate-100 dark:border-slate-700 pb-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>{t.results.precautions}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {currentDisease.precautions.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold shrink-0">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diet Tips */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm border-b border-slate-100 dark:border-slate-700 pb-2">
                <Apple className="w-4 h-4 text-emerald-600" />
                <span>{t.results.dietTips}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {currentDisease.dietTips.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Workout / Rest */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm border-b border-slate-100 dark:border-slate-700 pb-2">
                <Dumbbell className="w-4 h-4 text-indigo-600" />
                <span>{t.results.workoutTips}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {currentDisease.exerciseTips.map((e, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold shrink-0">•</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
