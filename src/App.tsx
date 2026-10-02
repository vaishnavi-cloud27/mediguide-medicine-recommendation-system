/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SymptomSelector } from './components/SymptomSelector';
import { PredictionResults } from './components/PredictionResults';
import { ModelComparison } from './components/ModelComparison';
import { AdminKnowledgeBase } from './components/AdminKnowledgeBase';
import { HistoryPage } from './components/HistoryPage';
import { PrintReportModal } from './components/PrintReportModal';
import { Language, translations } from './data/translations';
import { PredictionResponse, HistoryRecord } from './types';
import { DiseaseRecord, INITIAL_DISEASE_DATABASE } from './data/sampleDiseases';
import { AlertCircle, Stethoscope, HeartPulse, ShieldAlert } from 'lucide-react';

export default function App() {
  // Navigation & Theme
  const [currentTab, setCurrentTab] = useState<'checker' | 'comparison' | 'admin' | 'history'>('checker');
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('mediguide_lang') as Language) || 'en';
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('mediguide_dark') === 'true';
  });

  // Knowledge base state
  const [diseases, setDiseases] = useState<DiseaseRecord[]>(() => {
    try {
      const saved = localStorage.getItem('mediguide_diseases');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved diseases:', e);
    }
    return INITIAL_DISEASE_DATABASE;
  });

  // History state
  const [history, setHistory] = useState<HistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('mediguide_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse history:', e);
    }
    return [];
  });

  // Active Prediction Session
  const [activeResult, setActiveResult] = useState<PredictionResponse | null>(null);
  const [activeSymptoms, setActiveSymptoms] = useState<string[]>([]);
  const [activeAge, setActiveAge] = useState<number | undefined>(undefined);
  const [activeAllergies, setActiveAllergies] = useState<string[]>([]);
  const [activeMedications, setActiveMedications] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('mediguide_dark', String(darkMode));
  }, [darkMode]);

  // Sync language
  useEffect(() => {
    localStorage.setItem('mediguide_lang', language);
  }, [language]);

  // Save diseases
  const handleSaveDiseases = (updated: DiseaseRecord[]) => {
    setDiseases(updated);
    localStorage.setItem('mediguide_diseases', JSON.stringify(updated));
  };

  // Clear history
  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('mediguide_history');
  };

  // Perform prediction call
  const handleAnalyzeSymptoms = async (payload: {
    symptoms: string[];
    age?: number;
    allergies: string[];
    currentMedications: string[];
  }) => {
    setIsLoading(true);
    setApiError(null);

    setActiveSymptoms(payload.symptoms);
    setActiveAge(payload.age);
    setActiveAllergies(payload.allergies);
    setActiveMedications(payload.currentMedications);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data: PredictionResponse = await response.json();
      setActiveResult(data);

      // Save to history
      const newRecord: HistoryRecord = {
        id: `rec_${Date.now()}`,
        timestamp: new Date().toISOString(),
        symptoms: payload.symptoms,
        age: payload.age,
        allergies: payload.allergies,
        currentMedications: payload.currentMedications,
        result: data,
      };

      const updatedHistory = [newRecord, ...history].slice(0, 50); // keep last 50
      setHistory(updatedHistory);
      localStorage.setItem('mediguide_history', JSON.stringify(updatedHistory));

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Error analyzing symptoms:', err);
      setApiError(
        'Failed to connect to the medical prediction service. Please verify your connection or try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Reset checker
  const handleResetChecker = () => {
    setActiveResult(null);
    setApiError(null);
  };

  // Select historical record
  const handleSelectHistoryRecord = (record: HistoryRecord) => {
    setActiveResult(record.result);
    setActiveSymptoms(record.symptoms);
    setActiveAge(record.age);
    setActiveAllergies(record.allergies || []);
    setActiveMedications(record.currentMedications || []);
    setCurrentTab('checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Global Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        historyCount={history.length}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6">
        {/* Error notification if API failed */}
        {apiError && (
          <div className="max-w-5xl mx-auto bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 p-4 rounded-2xl flex items-center justify-between gap-3 text-red-800 dark:text-red-200 text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{apiError}</span>
            </div>
            <button
              onClick={() => setApiError(null)}
              className="text-xs font-bold text-red-700 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab 1: Checker & Results */}
        {currentTab === 'checker' && (
          <div>
            {activeResult ? (
              <PredictionResults
                data={activeResult}
                userSymptoms={activeSymptoms}
                userAge={activeAge}
                userAllergies={activeAllergies}
                userMedications={activeMedications}
                language={language}
                onReset={handleResetChecker}
                onOpenPrintReport={() => setIsPrintModalOpen(true)}
              />
            ) : (
              <SymptomSelector
                language={language}
                onAnalyze={handleAnalyzeSymptoms}
                isLoading={isLoading}
              />
            )}
          </div>
        )}

        {/* Tab 2: Model Comparison */}
        {currentTab === 'comparison' && (
          <ModelComparison language={language} />
        )}

        {/* Tab 3: Admin Knowledge Base */}
        {currentTab === 'admin' && (
          <AdminKnowledgeBase
            language={language}
            diseases={diseases}
            onSaveDiseases={handleSaveDiseases}
          />
        )}

        {/* Tab 4: History */}
        {currentTab === 'history' && (
          <HistoryPage
            language={language}
            history={history}
            onSelectRecord={handleSelectHistoryRecord}
            onClearHistory={handleClearHistory}
            onGoToChecker={() => {
              handleResetChecker();
              setCurrentTab('checker');
            }}
          />
        )}
      </main>

      {/* Printable Clinical Report Modal */}
      {activeResult && (
        <PrintReportModal
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          data={activeResult}
          userSymptoms={activeSymptoms}
          userAge={activeAge}
          userAllergies={activeAllergies}
          userMedications={activeMedications}
          language={language}
        />
      )}

      {/* Global Footer */}
      <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-4 text-xs text-slate-500 dark:text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <Stethoscope className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-slate-800 dark:text-white">
              MediGuide Clinical Decision Support System
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
