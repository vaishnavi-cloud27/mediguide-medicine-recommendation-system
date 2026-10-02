import React, { useState } from 'react';
import {
  Database,
  Plus,
  Search,
  RotateCcw,
  Edit2,
  Trash2,
  X,
  Pill,
  Save,
  CheckCircle,
} from 'lucide-react';
import { DiseaseRecord, MedicineItem, INITIAL_DISEASE_DATABASE } from '../data/sampleDiseases';
import { Language, translations } from '../data/translations';

interface AdminKnowledgeBaseProps {
  language: Language;
  diseases: DiseaseRecord[];
  onSaveDiseases: (updated: DiseaseRecord[]) => void;
}

export const AdminKnowledgeBase: React.FC<AdminKnowledgeBaseProps> = ({
  language,
  diseases,
  onSaveDiseases,
}) => {
  const t = translations[language];
  const [search, setSearch] = useState('');
  const [editingDisease, setEditingDisease] = useState<DiseaseRecord | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Filtered list
  const filteredDiseases = diseases.filter(
    (d) =>
      d.disease.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()) ||
      d.medicines.some((m) => m.genericName.toLowerCase().includes(search.toLowerCase()))
  );

  // Reset to default dataset
  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all disease and medicine records to system defaults?')) {
      onSaveDiseases(INITIAL_DISEASE_DATABASE);
      showToast('Knowledge base reset to standard clinical defaults!');
    }
  };

  // Delete disease
  const handleDelete = (id: string) => {
    if (window.confirm('Delete this condition from local knowledge base?')) {
      const updated = diseases.filter((d) => d.id !== id);
      onSaveDiseases(updated);
      showToast('Condition removed successfully.');
    }
  };

  // Open modal for new disease
  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setEditingDisease({
      id: `dis_${Date.now()}`,
      disease: '',
      description: '',
      severityLevel: 'moderate',
      coreSymptoms: ['Fever / High Temperature', 'Cough'],
      medicines: [
        {
          genericName: '',
          brandExamples: [],
          composition: '',
          typicalDosage: '500mg orally once daily',
          commonSideEffects: ['Mild nausea', 'Drowsiness'],
          alternatives: [],
          prescriptionRequired: false,
          allergyTags: [],
        },
      ],
      precautions: ['Rest and hydrate.'],
      dietTips: ['Drink plenty of warm fluids.'],
      exerciseTips: ['Light walking if comfortable.'],
    });
  };

  // Save edit / create
  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDisease || !editingDisease.disease.trim()) return;

    if (isCreatingNew) {
      const updated = [editingDisease, ...diseases];
      onSaveDiseases(updated);
      showToast(`Added condition: ${editingDisease.disease}`);
    } else {
      const updated = diseases.map((d) => (d.id === editingDisease.id ? editingDisease : d));
      onSaveDiseases(updated);
      showToast(`Updated condition: ${editingDisease.disease}`);
    }

    setEditingDisease(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-teal-700 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-br from-teal-50 via-white to-slate-50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 p-6 md:p-8 rounded-2xl border border-teal-100 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-600/10 text-teal-700 dark:text-teal-300 dark:bg-teal-900/40 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>Admin Knowledge Base & Clinical Rules Editor</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {t.admin.title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              {t.admin.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleStartCreate}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>{t.admin.addDisease}</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.admin.resetDefaults}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Stats Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.admin.searchDiseases}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <span className="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/40 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800">
          {filteredDiseases.length} / {diseases.length} {t.admin.totalDiseases}
        </span>
      </div>

      {/* Disease Cards List */}
      <div className="space-y-4">
        {filteredDiseases.map((dis) => (
          <div
            key={dis.id}
            className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      dis.severityLevel === 'emergency'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                        : dis.severityLevel === 'high'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
                    }`}
                  >
                    {dis.severityLevel}
                  </span>
                  <span className="text-xs text-slate-400">ID: {dis.id}</span>
                </div>
                <h2 className="text-base font-bold text-slate-800 dark:text-white">
                  {dis.disease}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsCreatingNew(false);
                    setEditingDisease(JSON.parse(JSON.stringify(dis)));
                  }}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-teal-50 dark:hover:bg-teal-900/40 text-slate-700 dark:text-slate-200 hover:text-teal-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(dis.id)}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-red-50 dark:hover:bg-red-900/40 text-slate-700 dark:text-slate-200 hover:text-red-600 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              {dis.description}
            </p>

            {/* Core Symptoms */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                Trigger Symptoms ({dis.coreSymptoms.length}):
              </span>
              <div className="flex flex-wrap gap-1">
                {dis.coreSymptoms.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded-md font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Medicines List */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                Recommended Medicines ({dis.medicines.length}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dis.medicines.map((med, mIdx) => (
                  <div
                    key={mIdx}
                    className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1">
                        <Pill className="w-3 h-3 text-teal-600" />
                        {med.genericName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {med.prescriptionRequired ? 'Rx' : 'OTC'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {med.composition} • {med.typicalDosage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="font-bold text-sm">
                {isCreatingNew ? 'Add New Clinical Condition' : `Edit: ${editingDisease.disease}`}
              </h2>
              <button
                onClick={() => setEditingDisease(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Condition / Disease Name</label>
                <input
                  type="text"
                  required
                  value={editingDisease.disease}
                  onChange={(e) =>
                    setEditingDisease({ ...editingDisease, disease: e.target.value })
                  }
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Clinical Description</label>
                <textarea
                  rows={2}
                  value={editingDisease.description}
                  onChange={(e) =>
                    setEditingDisease({ ...editingDisease, description: e.target.value })
                  }
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold block mb-1">Severity Tier</label>
                  <select
                    value={editingDisease.severityLevel}
                    onChange={(e) =>
                      setEditingDisease({
                        ...editingDisease,
                        severityLevel: e.target.value as any,
                      })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2"
                  >
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Core Symptoms (comma-separated)</label>
                  <input
                    type="text"
                    value={editingDisease.coreSymptoms.join(', ')}
                    onChange={(e) =>
                      setEditingDisease({
                        ...editingDisease,
                        coreSymptoms: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Medicines section */}
              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-white">Medicines Protocol</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newMed: MedicineItem = {
                        genericName: 'New Medicine',
                        brandExamples: [],
                        composition: 'Composition mg',
                        typicalDosage: '1 tablet daily',
                        commonSideEffects: ['Mild nausea'],
                        alternatives: [],
                        prescriptionRequired: false,
                        allergyTags: [],
                      };
                      setEditingDisease({
                        ...editingDisease,
                        medicines: [...editingDisease.medicines, newMed],
                      });
                    }}
                    className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
                  >
                    + Add Medicine
                  </button>
                </div>

                {editingDisease.medicines.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block">Generic Name</label>
                        <input
                          type="text"
                          value={m.genericName}
                          onChange={(e) => {
                            const copy = [...editingDisease.medicines];
                            copy[mIdx].genericName = e.target.value;
                            setEditingDisease({ ...editingDisease, medicines: copy });
                          }}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block">Typical Dosage</label>
                        <input
                          type="text"
                          value={m.typicalDosage}
                          onChange={(e) => {
                            const copy = [...editingDisease.medicines];
                            copy[mIdx].typicalDosage = e.target.value;
                            setEditingDisease({ ...editingDisease, medicines: copy });
                          }}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDisease(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold"
                >
                  {t.admin.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{t.admin.save}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
