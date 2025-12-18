import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import language files
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';
import taTranslations from '../locales/ta.json';
import teTranslations from '../locales/te.json';
import knTranslations from '../locales/kn.json';
import mrTranslations from '../locales/mr.json';
import bnTranslations from '../locales/bn.json';

const resources = {
  en: { translation: enTranslations },
  hi: { translation: hiTranslations },
  ta: { translation: taTranslations },
  te: { translation: teTranslations },
  kn: { translation: knTranslations },
  mr: { translation: mrTranslations },
  bn: { translation: bnTranslations },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export const initializeLanguage = async () => {
  const savedLanguage = await AsyncStorage.getItem('appLanguage');
  if (savedLanguage) {
    await i18n.changeLanguage(savedLanguage);
  }
};

export const changeLanguage = async (lang: string) => {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem('appLanguage', lang);
};

export default i18n;
