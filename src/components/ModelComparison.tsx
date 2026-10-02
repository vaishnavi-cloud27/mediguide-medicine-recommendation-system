import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  BarChart2,
  Code2,
  Copy,
  Check,
  Award,
  Layers,
  FileSpreadsheet,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  ML_MODEL_METRICS,
  DATASET_SUMMARY,
  CONFUSION_MATRIX_SNIPPET,
  PYTHON_COLAB_FLASK_CODE,
} from '../data/mlComparison';
import { Language, translations } from '../data/translations';

interface ModelComparisonProps {
  language: Language;
}

export const ModelComparison: React.FC<ModelComparisonProps> = ({ language }) => {
  const t = translations[language];
  const [copied, setCopied] = useState(false);
  const [activeMetric, setActiveMetric] = useState<'all' | 'accuracy' | 'f1Score'>('all');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PYTHON_COLAB_FLASK_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const chartData = ML_MODEL_METRICS.map((m) => ({
    name: m.shortName,
    Accuracy: m.accuracy,
    Precision: m.precision,
    Recall: m.recall,
    F1: m.f1Score,
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-md border border-teal-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Project Viva & Experimental Benchmark</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {t.comparison.title}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {t.comparison.subtitle}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-xs space-y-1">
            <span className="text-teal-300 font-bold block">Top Performing Model:</span>
            <span className="text-white font-black text-sm">Random Forest (99.1% F1)</span>
            <span className="text-slate-300 block text-[11px]">80/20 Stratified Train-Test Split</span>
          </div>
        </div>
      </div>

      {/* Dataset Info Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 text-teal-600 mb-1">
            <FileSpreadsheet className="w-4 h-4" />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Samples</span>
          </div>
          <span className="text-xl font-extrabold text-slate-800 dark:text-white">
            {DATASET_SUMMARY.totalSamples.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Clinical instances</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <Layers className="w-4 h-4" />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Features</span>
          </div>
          <span className="text-xl font-extrabold text-slate-800 dark:text-white">
            {DATASET_SUMMARY.featuresCount}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Binary symptom inputs</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <Award className="w-4 h-4" />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Classes</span>
          </div>
          <span className="text-xl font-extrabold text-slate-800 dark:text-white">
            {DATASET_SUMMARY.classesCount}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Disease targets</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Evaluation</span>
          </div>
          <span className="text-xl font-extrabold text-slate-800 dark:text-white">
            5-Fold CV
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Cross validation</span>
        </div>
      </div>

      {/* Model Benchmark Bar Chart */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h2 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Model Performance Comparison Chart
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Comparison of Accuracy, Precision, Recall, and F1 across four core classification algorithms.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveMetric('all')}
              className={`px-2.5 py-1 rounded-md transition ${
                activeMetric === 'all'
                  ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              All Metrics
            </button>
            <button
              onClick={() => setActiveMetric('accuracy')}
              className={`px-2.5 py-1 rounded-md transition ${
                activeMetric === 'accuracy'
                  ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Accuracy Only
            </button>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis domain={[90, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
              <Tooltip
                formatter={(val: any) => [`${val}%`, '']}
                contentStyle={{
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '12px',
                  border: 'none',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Accuracy" fill="#0d9488" radius={[4, 4, 0, 0]} />
              {activeMetric === 'all' && (
                <>
                  <Bar dataKey="Precision" fill="#0891b2" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Recall" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="F1" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Benchmark Static Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-bold text-base text-slate-800 dark:text-white">
            Detailed Model Evaluation & Latency Metrics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Static sample metrics for presentation slides, viva defense, and final project documentation.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold uppercase text-[11px] border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Classifier Model</th>
                <th className="py-3 px-4 text-center">Accuracy (%)</th>
                <th className="py-3 px-4 text-center">Precision (%)</th>
                <th className="py-3 px-4 text-center">Recall (%)</th>
                <th className="py-3 px-4 text-center">F1 Score (%)</th>
                <th className="py-3 px-4 text-center">Train Time</th>
                <th className="py-3 px-4 text-center">Inference Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
              {ML_MODEL_METRICS.map((row) => {
                const isChampion = row.shortName === 'Random Forest';
                return (
                  <tr
                    key={row.shortName}
                    className={`hover:bg-slate-50/70 dark:hover:bg-slate-750/50 transition ${
                      isChampion ? 'bg-teal-50/40 dark:bg-teal-950/20 font-medium' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {row.modelName}
                      {isChampion && (
                        <span className="text-[10px] bg-teal-600 text-white font-extrabold px-1.5 py-0.5 rounded uppercase">
                          Champion
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-teal-700 dark:text-teal-400">
                      {row.accuracy}%
                    </td>
                    <td className="py-3 px-4 text-center">{row.precision}%</td>
                    <td className="py-3 px-4 text-center">{row.recall}%</td>
                    <td className="py-3 px-4 text-center font-bold">{row.f1Score}%</td>
                    <td className="py-3 px-4 text-center text-slate-500">
                      {row.trainingTimeSec}s
                    </td>
                    <td className="py-3 px-4 text-center text-slate-500">
                      {row.inferenceLatencyMs}ms
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Tradeoffs & Explainability Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ML_MODEL_METRICS.map((m) => (
          <div
            key={m.shortName}
            className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2 text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                {m.modelName}
              </h3>
              <span className="font-extrabold text-teal-600 dark:text-teal-400">
                F1: {m.f1Score}%
              </span>
            </div>
            <div>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                Clinical Pros:
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{m.pros}</p>
            </div>
            <div>
              <span className="font-semibold text-amber-600 dark:text-amber-400 block mb-0.5">
                Cons & Limitations:
              </span>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{m.cons}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sample Confusion Matrix Excerpt */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <h2 className="font-bold text-base text-slate-800 dark:text-white">
          Confusion Matrix Sample (Subset: Respiratory Conditions)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing classification overlap across 100 test instances of respiratory conditions.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border border-slate-200 dark:border-slate-700">
            <thead className="bg-slate-100 dark:bg-slate-700 font-bold">
              <tr>
                <th className="p-2.5 text-left">Predicted \ Actual</th>
                <th className="p-2.5">Common Cold</th>
                <th className="p-2.5">Influenza</th>
                <th className="p-2.5">Bronchitis</th>
                <th className="p-2.5">Allergic Rhinitis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {CONFUSION_MATRIX_SNIPPET.map((row, i) => (
                <tr key={i}>
                  <td className="p-2.5 text-left font-bold text-slate-800 dark:text-white">
                    {row.predicted}
                  </td>
                  <td className={`p-2.5 font-bold ${row.actualCold > 20 ? 'bg-teal-100/60 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200' : ''}`}>
                    {row.actualCold}
                  </td>
                  <td className={`p-2.5 font-bold ${row.actualFlu > 20 ? 'bg-teal-100/60 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200' : ''}`}>
                    {row.actualFlu}
                  </td>
                  <td className={`p-2.5 font-bold ${row.actualBronchitis > 20 ? 'bg-teal-100/60 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200' : ''}`}>
                    {row.actualBronchitis}
                  </td>
                  <td className={`p-2.5 font-bold ${row.actualAllergy > 20 ? 'bg-teal-100/60 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200' : ''}`}>
                    {row.actualAllergy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Python / Flask ML Backend Code Viewer for Viva / Colab */}
      <div className="bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 shadow-lg overflow-hidden space-y-0">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-teal-400" />
            <div>
              <h2 className="font-bold text-sm text-white">
                {t.comparison.pythonCodeTitle}
              </h2>
              <span className="text-[11px] text-slate-400">
                Complete training script, 4-model evaluation, joblib serialization, and Flask /predict API
              </span>
            </div>
          </div>

          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>{t.comparison.codeCopied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.comparison.copyCode}</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-5 text-[11px] font-mono leading-relaxed overflow-x-auto text-emerald-300 max-h-96">
          <code>{PYTHON_COLAB_FLASK_CODE}</code>
        </pre>
      </div>
    </div>
  );
};
