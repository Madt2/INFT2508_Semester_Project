import {getLanguage, getTheme} from '../storage/Settings';
import {storeLanguage, storeTheme} from './Settings';
// initializes the global stores and fetches values from async storage when launching application
export const initStore = async () => {
  const languageData = getLanguage();
  if (typeof languageData !== 'undefined') {
    languageData.then(language => {
      if (language !== null) {
        storeLanguage(language);
      }
    });
  }
  const themeData = getTheme();
  if (typeof themeData !== 'undefined') {
    themeData.then(theme => {
      if (theme !== null) {
        storeTheme(theme);
      }
    });
  }
};
