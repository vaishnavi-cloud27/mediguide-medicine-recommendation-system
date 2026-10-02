import React from 'react';
import { History, Trash2, ArrowRight, Calendar, AlertCircle } from 'lucide-react';
import { HistoryRecord } from '../types';
import { Language, translations } from '../data/translations';

interface HistoryPageProps {
  language: Language;
  history: HistoryRecord[];
  onSelectRecord: (record: HistoryRecord) => void;
  onClearHistory: () => void;
  onGoToChecker: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  language,
  history,
  onSelectRecord,
  onClearHistory,
  onGoToChecker,
}) => {
  const t = translations[language];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-teal-50 via-white to-slate-50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 p-6 md:p-8 rounded-2xl border border-teal-100 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-600/10 text-teal-700 dark:text-teal-300 dark:bg-teal-900/40 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <History className="w-3.5 h-3.5" />
              <span>Local Consultation Log</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {t.history.title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              {t.history.subtitle}
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your local consultation history?')) {
                  onClearHistory();
                }
              }}
              className="bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.history.clear}</span>
            </button>
          )}
        </div>
      </div>

      {/* History Items or Empty State */}
      {history.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 bg-slate-100 dark:bg-slate-750 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-800 dark:text-white">
              {t.history.empty}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Your previous symptom inquiries and predicted conditions will be stored safely on this browser.
            </p>
          </div>
          <button
            onClick={onGoToChecker}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow transition"
          >
            <span>Start a Symptom Check</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((record) => {
            const topPrediction = record.result.predictions?.[0];
            return (
              <div
                key={record.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-teal-300 dark:hover:border-teal-700 transition"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{new Date(record.timestamp).toLocaleString()}</span>
                    {record.age && (
                      <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.2 rounded font-medium">
                        Patient: {record.age}y
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-teal-400 tracking-wider block">
                      {t.history.topCondition}:
                    </span>
                    <h4 className="font-extrabold text-base text-slate-800 dark:text-white">
                      {topPrediction?.disease || 'Condition Analysis'}
                    </h4>
                  </div>

                  {/* Symptoms chips */}
                  <div className="flex flex-wrap gap-1">
                    {record.symptoms.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-700">
                  <span className="text-sm font-black text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/40 px-2.5 py-1 rounded-lg">
                    {topPrediction?.confidence}% Conf.
                  </span>

                  <button
                    onClick={() => onSelectRecord(record)}
                    className="bg-slate-100 hover:bg-teal-600 dark:bg-slate-700 dark:hover:bg-teal-600 text-slate-700 hover:text-white dark:text-slate-200 dark:hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <span>{t.history.viewAgain}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
