import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'arturismo_idioma';
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [idioma, setIdiomaState] = useState(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEY);
  });

  useEffect(() => {
    if (idioma) {
      i18n.changeLanguage(idioma);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cambiarIdioma = (nuevoIdioma) => {
    setIdiomaState(nuevoIdioma);
    localStorage.setItem(STORAGE_KEY, nuevoIdioma);
    i18n.changeLanguage(nuevoIdioma);
  };

  return (
    <LanguageContext.Provider value={{ idioma: idioma || 'es', idiomaElegido: !!idioma, cambiarIdioma }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useIdioma() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useIdioma debe usarse dentro de LanguageProvider');
  return ctx;
}
