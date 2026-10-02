import React from 'react';
import { X, Printer, ShieldAlert, Stethoscope } from 'lucide-react';
import { PredictionResponse } from '../types';
import { Language, translations } from '../data/translations';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PredictionResponse;
  userSymptoms: string[];
  userAge?: number;
  userAllergies?: string[];
  userMedications?: string[];
  language: Language;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  isOpen,
  onClose,
  data,
  userSymptoms,
  userAge,
  userAllergies = [],
  userMedications = [],
  language,
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white text-slate-800 w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
        {/* Modal Controls (Not printed) */}
        <div className="no-print bg-slate-100 dark:bg-slate-850 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-600" />
            <span className="font-bold text-sm text-slate-800 dark:text-white">
              MediGuide Clinical Decision Summary (Print / PDF)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-2 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 overflow-y-auto space-y-6 print:p-0 print:m-0 print:overflow-visible text-slate-800 text-xs">
          {/* Header */}
          <div className="border-b-2 border-teal-600 pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black text-teal-800 tracking-tight">
                MediGuide Clinical Decision-Support Summary
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">
                Educational Triage Report • Automated Diagnostic Probability Analysis
              </p>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              <p className="font-semibold text-slate-700">Date: {new Date().toLocaleDateString()}</p>
              <p>Time: {new Date().toLocaleTimeString()}</p>
              <p>Source: MediGuide Decision Engine</p>
            </div>
          </div>

          {/* Legal Disclaimer Box */}
          <div className="bg-amber-50 border border-amber-300 p-3 rounded-lg text-amber-900 text-[10px] leading-relaxed">
            <span className="font-bold uppercase tracking-wider block mb-0.5">
              NOTICE TO CLINICIAN & PATIENT:
            </span>
            {t.disclaimerFull}
          </div>

          {/* Patient Profile */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Patient Age</span>
              <span className="font-bold text-slate-800 text-sm">{userAge ? `${userAge} Years` : 'Not Specified'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Symptoms</span>
              <span className="font-bold text-slate-800 text-sm">{userSymptoms.length} Reported</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Known Allergies</span>
              <span className="font-bold text-slate-800 text-sm">
                {userAllergies.length > 0 ? userAllergies.join(', ') : 'None Reported'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Medications</span>
              <span className="font-bold text-slate-800 text-sm">
                {userMedications.length > 0 ? userMedications.join(', ') : 'None Reported'}
              </span>
            </div>
          </div>

          {/* Observed Symptoms */}
          <div>
            <h3 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
              1. Observed Symptoms
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {userSymptoms.map((s) => (
                <span key={s} className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Differential Condition Analysis */}
          <div>
            <h3 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2">
              2. Differential Probability Considerations (Top 3)
            </h3>
            <div className="space-y-3">
              {data.predictions.map((p, idx) => (
                <div key={idx} className="border border-slate-200 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-900 text-sm">
                      #{idx + 1}. {p.disease}
                    </span>
                    <span className="font-extrabold text-teal-700 text-xs bg-teal-50 px-2 py-0.5 rounded">
                      Confidence: {p.confidence}%
                    </span>
                  </div>
                  <p className="text-slate-600 mb-2 leading-relaxed">{p.description}</p>
                  
                  <div className="text-[11px] text-slate-500 mb-2">
                    <span className="font-bold text-slate-700">Contributing Symptoms: </span>
                    {p.contributingSymptoms.join(', ')}
                  </div>

                  {/* Medicines summary table */}
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="font-bold text-slate-700 text-[10px] block mb-1">
                      Commonly Referenced Medicines (Educational Reference):
                    </span>
                    <ul className="space-y-1">
                      {p.medicines.map((m, mIdx) => (
                        <li key={mIdx} className="text-[10px] text-slate-600 flex justify-between">
                          <span>
                            <strong>{m.genericName}</strong> ({m.composition})
                          </span>
                          <span className="text-slate-500">
                            {m.typicalDosage} {m.prescriptionRequired ? '[Rx Required]' : '[OTC]'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Warnings if any */}
          {(data.allergyWarnings.length > 0 || data.interactionWarnings.length > 0) && (
            <div className="border border-red-200 bg-red-50 p-3 rounded-lg space-y-1 text-red-900">
              <span className="font-bold text-xs flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                Medication Safety & Cross-Reactivity Alerts:
              </span>
              {data.allergyWarnings.map((w, wi) => (
                <p key={wi} className="text-[11px]">
                  • <strong>Allergy Alert:</strong> {w.warningMessage}
                </p>
              ))}
              {data.interactionWarnings.map((iw, iwi) => (
                <p key={iwi} className="text-[11px]">
                  • <strong>Drug Interaction:</strong> {iw.interactionText}
                </p>
              ))}
            </div>
          )}

          {/* Physician Signature Section for printed report */}
          <div className="border-t border-slate-300 pt-6 mt-8 grid grid-cols-2 gap-8 text-[11px]">
            <div>
              <p className="font-bold text-slate-700">Doctor / Pharmacist Notes:</p>
              <div className="border-b border-dashed border-slate-400 h-8 mt-2" />
              <div className="border-b border-dashed border-slate-400 h-8 mt-2" />
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-700">Attending Clinician Signature & Date:</p>
              <div className="border-b border-slate-400 w-48 ml-auto h-12 mt-2" />
              <p className="text-[10px] text-slate-400 mt-1">Medical Council / License No.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
