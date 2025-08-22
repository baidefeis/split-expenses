'use client';

import { useLanguage } from '@/context/LanguageContext';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{t('language')}:</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
        className="px-2 py-1 border rounded text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="es">{t('spanish')}</option>
        <option value="en">{t('english')}</option>
      </select>
    </div>
  );
}
