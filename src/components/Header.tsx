import React from 'react';
import { Activity, ShieldAlert, Globe, History, BarChart3, Stethoscope, Database } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface HeaderProps {
  currentTab: 'checker' | 'comparison' | 'admin' | 'history';
  setCurrentTab: (tab: 'checker' | 'comparison' | 'admin' | 'history') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  historyCount,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-teal-100 dark:border-slate-800 transition-colors">
      {/* Top emergency helpline bar */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-2">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-teal-100 text-[11px]">Emergency Helpline:</span>
            <a
              href="tel:112"
              className="inline-flex items-center gap-1 bg-red-600/90 hover:bg-red-600 text-white font-semibold text-[11px] px-2.5 py-0.5 rounded shadow-sm transition"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Dial 112 / 911</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => setCurrentTab('checker')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-800 dark:text-white">
                Medi<span className="text-teal-600 dark:text-teal-400">Guide</span>
              </span>
              <span className="text-[10px] font-semibold uppercase bg-teal-50 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700 px-1.5 py-0.5 rounded">
                Clinical AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setCurrentTab('checker')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition ${
              currentTab === 'checker'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
            }`}
          >
            <Activity className="w-4 h-4" />
            {t.tabs.checker}
          </button>

          <button
            onClick={() => setCurrentTab('comparison')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition ${
              currentTab === 'comparison'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            {t.tabs.comparison}
          </button>

          <button
            onClick={() => setCurrentTab('admin')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition ${
              currentTab === 'admin'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
            }`}
          >
            <Database className="w-4 h-4" />
            {t.tabs.admin}
          </button>

          <button
            onClick={() => setCurrentTab('history')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition ${
              currentTab === 'history'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
            }`}
          >
            <History className="w-4 h-4" />
            {t.tabs.history}
            {historyCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs flex items-center justify-center font-bold">
                {historyCount}
              </span>
            )}
          </button>
        </nav>

        {/* Controls: Language Selector */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
            <Globe className="w-3.5 h-3.5 ml-2 text-slate-500 dark:text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              aria-label="Select Language"
              className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-200 py-1.5 pl-1.5 pr-2 focus:outline-none cursor-pointer"
            >
              <option value="en" className="dark:bg-slate-800">English</option>
              <option value="hi" className="dark:bg-slate-800">हिन्दी</option>
              <option value="mr" className="dark:bg-slate-800">मराठी</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Subnav */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2 py-2 text-xs font-semibold">
        <button
          onClick={() => setCurrentTab('checker')}
          className={`flex items-center gap-1 py-1 px-2 rounded-md ${
            currentTab === 'checker' ? 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/40' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          {t.tabs.checker}
        </button>
        <button
          onClick={() => setCurrentTab('comparison')}
          className={`flex items-center gap-1 py-1 px-2 rounded-md ${
            currentTab === 'comparison' ? 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/40' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          {t.tabs.comparison}
        </button>
        <button
          onClick={() => setCurrentTab('admin')}
          className={`flex items-center gap-1 py-1 px-2 rounded-md ${
            currentTab === 'admin' ? 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/40' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          {t.tabs.admin}
        </button>
        <button
          onClick={() => setCurrentTab('history')}
          className={`flex items-center gap-1 py-1 px-2 rounded-md ${
            currentTab === 'history' ? 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/40' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          {t.tabs.history}
          {historyCount > 0 && <span className="text-[10px] bg-teal-600 text-white px-1 rounded-full">{historyCount}</span>}
        </button>
      </div>
    </header>
  );
};
