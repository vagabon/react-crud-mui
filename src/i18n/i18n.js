import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import COMMON from '../locale/fr/common.json';

const resources = {
  fr: {
    all: COMMON,
    COMMON,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['fr'],
    ns: 'all',
    fallbackLng: 'fr',
  });
