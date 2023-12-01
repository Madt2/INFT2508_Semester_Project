import {useIsFocused} from '@react-navigation/native';
import {useStoreState} from 'pullstate';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {FavoriteItem} from '../components/FavoriteItem';
import {getFavorites} from '../storage/Favorites';
import {SettingsStore} from '../store/Settings';

//typing can be fixed later
export const Favorites = () => {
  const isFocused = useIsFocused();
  const language = useStoreState(SettingsStore, s => s.language);
  // State
  const [favorites, setFavorites] = useState<number[] | null>(null);
  // fetches the list of favorites from storage
  useEffect(() => {
    getFavorites().then(favs => {
      if (typeof favs !== 'undefined') {
        setFavorites(favs);
      }
    });
  }, [isFocused]); //updates when this navigation tab gets in focus

  if (favorites !== null && favorites.length !== 0) {
    return (
      <ScrollView>
        <View style={favoritesStyle.frame}>
          {favorites.map(id => (
            <FavoriteItem key={'favoriteItem:' + id} id={id} />
          ))}
        </View>
      </ScrollView>
    );
  } else {
    // If no favorites
    return (
      <View style={favoritesStyle.noFavFrame}>
        <Text>
          {language === 'norwegian'
            ? 'Ingen favoriter enda!'
            : 'No favorites yet!'}
        </Text>
      </View>
    );
  }
};

//styles

const favoritesStyle = StyleSheet.create({
  noFavFrame: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    gap: 16,
  },
});
