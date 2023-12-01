import AsyncStorage from '@react-native-async-storage/async-storage';
//https://react-native-async-storage.github.io/async-storage/docs/usage

export const addFavorite = async (id: number) => {
  try {
    const jsonData = await AsyncStorage.getItem('favorites');
    if (jsonData === null) {
      // instanciate new list if favorites is null
      const favorites = [id];
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      const favorites = JSON.parse(jsonData);
      //pushes only of the item does not exist in favorites
      if (favorites.indexOf(id) === -1) {
        favorites.push(id);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFavorite = async (id: number) => {
  try {
    const jsonData = await AsyncStorage.getItem('favorites');
    if (jsonData !== null) {
      const favorites: number[] = JSON.parse(jsonData);
      const index = favorites.indexOf(id, 0);
      //removes the item only if it exists in the favorites list
      if (index > -1) {
        favorites.splice(index, 1);
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }
    //https://stackoverflow.com/questions/15292278/how-do-i-remove-an-array-item-in-typescript
  } catch (error) {
    console.log(error);
  }
};

export const getFavorites = async () => {
  try {
    const jsonData = await AsyncStorage.getItem('favorites');
    const favorites = jsonData != null ? JSON.parse(jsonData) : null;
    if (favorites !== null) {
      return favorites as number[];
    }
  } catch (error) {
    console.log(error);
  }
};

export const isFavorite = async (id: number) => {
  try {
    const jsonData = await AsyncStorage.getItem('favorites');
    const favorites = jsonData != null ? JSON.parse(jsonData) : null;
    return favorites.indexOf(id) > -1;
  } catch (error) {
    console.log(error);
  }
};
