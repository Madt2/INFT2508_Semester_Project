import AsyncStorage from '@react-native-async-storage/async-storage';
// https://react-native-async-storage.github.io/async-storage/docs/usage

export const SaveLanguage = async (language: string) => {
  try {
    await AsyncStorage.setItem('language', language);
  } catch (error) {
    console.log(error);
  }
};

export const getLanguage = () => {
  try {
    const language = AsyncStorage.getItem('language');
    if (language !== null) {
      return language;
    }
  } catch (error) {
    console.log(error);
  }
};

export const SaveTheme = (theme: string) => {
  try {
    AsyncStorage.setItem('theme', theme);
  } catch (error) {
    console.log(error);
  }
};

export const getTheme = () => {
  try {
    const theme = AsyncStorage.getItem('theme');
    if (theme !== null) {
      return theme;
    }
  } catch (error) {
    console.log(error);
  }
};
