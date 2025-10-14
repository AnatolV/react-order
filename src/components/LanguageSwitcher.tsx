
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
      <div className="inline-flex rounded-md shadow-xs" role="group">
          <button type="button" onClick={() => changeLanguage('en')} className={`${i18n.language === 'en' ? 'bg-gray-700 text-white' : 'text-gray-700 bg-transparent'} px-4 py-2 text-sm font-medium text-gray-700  border border-gray-700 rounded-s-lg hover:bg-gray-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-700 focus:text-white  me-1`}>
              English
          </button>
          <button type="button" onClick={() => changeLanguage('ru')} className={`${i18n.language === 'ru' ? 'bg-gray-700 text-white' : 'text-gray-700 bg-transparent'} px-4 py-2 text-sm font-medium border border-gray-700 hover:bg-gray-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-700 focus:text-white  me-1`}>
              Русский
          </button>
          <button type="button" onClick={() => changeLanguage('uk')} className={`${i18n.language === 'uk' ? 'bg-gray-700 text-white' : 'text-gray-700 bg-transparent'} px-4 py-2 text-sm font-medium border border-gray-700 rounded-e-lg hover:bg-gray-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-700 focus:text-white `}>
              Українська
          </button>
      </div>
  );
};

export default LanguageSwitcher;
