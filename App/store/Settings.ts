import {Store} from 'pullstate';
import {SaveLanguage, SaveTheme} from '../storage/Settings';

interface SettingsStore {
  language: string;
  theme: string;
}

export const SettingsStore = new Store<SettingsStore>({
  language: 'english',
  theme: 'light',
});

//setter for Language in global storage
export const storeLanguage = (language: string) => {
  if (language === 'norwegian' || language === 'english') {
    SettingsStore.update(state => {
      state.language = language;
    });
    SaveLanguage(language);
  } else {
    console.log('language wrong format: ' + language);
  }
};
//setter for theme in global storage
export const storeTheme = (theme: string) => {
  if (theme === 'light' || theme === 'dark') {
    SettingsStore.update(state => {
      state.theme = theme;
    });
    SaveTheme(theme);
  } else {
    console.log('theme wrong format: ' + theme);
  }
};
