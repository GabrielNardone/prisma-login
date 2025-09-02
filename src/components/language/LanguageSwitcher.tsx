import { ChevronDown } from 'lucide-react';

import { useTranslation } from '@/hooks/translation/useTranslation';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="min-w-[100px] cursor-pointer appearance-none rounded-sm border border-gray-600 bg-gray-800 px-3 py-1.5 pr-8 text-sm font-medium text-gray-100 shadow-sm transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
      >
        <option value="en" className="bg-gray-800 text-gray-100">
          🇺🇸 English
        </option>
        <option value="es" className="bg-gray-800 text-gray-100">
          🇪🇸 Español
        </option>
      </select>

      {/* Custom arrow icon */}
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
    </div>
  );
}
