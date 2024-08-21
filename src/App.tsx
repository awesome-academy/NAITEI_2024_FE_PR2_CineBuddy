import React from 'react';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <h1>{t('welcome')}</h1>
      <button onClick={() => changeLanguage('en')}>{t('language.english')}</button>
      <button onClick={() => changeLanguage('vi')}>{t('language.vietnamese')}</button>
    </div>
  );
};

export default App;
