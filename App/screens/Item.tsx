import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useStoreState} from 'pullstate';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AddShoppingCart, FavoriteBorder, FavoriteIcon} from '../assets/icons';
import {PictureCarousell} from '../components/PictureCarousell';
import {addToCart} from '../storage/Cart';
import {addFavorite, isFavorite, removeFavorite} from '../storage/Favorites';
import {SettingsStore} from '../store/Settings';
import {darkTheme, lightTheme} from '../style/colors';
import {HEADLINE} from '../style/fonts';
import {item, restaurant} from '../types';
import {Button} from './../components/Button';

type RootStackParamList = {
  Item: {item: item; restaurant: restaurant};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Item'>;

export const Item = ({navigation, route}: Props) => {
  const theme = useStoreState(SettingsStore, s => s.theme);
  const language = useStoreState(SettingsStore, s => s.language);
  const isFocused = useIsFocused();
  //state
  const [favoriteState, setFavoriteState] = useState<Boolean>(false);
  //Checks in storage if this item is favorite
  useEffect(() => {
    isFavorite(route.params.item.id).then(state => {
      if (state) {
        setFavoriteState(state);
      }
    });
    // sets the header name to dish
    navigation.setOptions({title: route.params.item.name});
  }, [isFocused, navigation, route.params.item.id, route.params.item.name]);
  return (
    <View>
      <ScrollView>
        <Image // Thumbnail image
          style={theme === 'dark' ? itemDark.image : itemLight.image}
          source={{uri: route.params.item.thumbnail}}
        />
        <View style={theme === 'dark' ? itemDark.frame : itemLight.frame}>
          <View
            style={
              theme === 'dark' ? itemDark.titleFrame : itemLight.titleFrame
            }>
            <Text // Dish name
              style={
                theme === 'dark' ? itemDark.titleLabel : itemLight.titleLabel
              }>
              {route.params.item.name}
            </Text>

            <Pressable // favorite icon
              onPress={() => {
                favoriteState
                  ? removeFavorite(route.params.item.id)
                  : addFavorite(route.params.item.id);
                setFavoriteState(!favoriteState);
              }}>
              {favoriteState ? <FavoriteIcon /> : <FavoriteBorder />}
            </Pressable>
          </View>

          <Text // price
            style={theme === 'dark' ? itemDark.infoLabel : itemLight.infoLabel}>
            {route.params.item.price} kr
          </Text>

          <Text // Discription
            style={theme === 'dark' ? itemDark.infoLabel : itemLight.infoLabel}>
            {route.params.item.description}
          </Text>

          <View>
            <Text // Restaurant:
              style={
                theme === 'dark'
                  ? itemDark.infoLabelBold
                  : itemLight.infoLabelBold
              }>
              {language === 'norwegian' ? 'Resturant:' : 'Restaurant:'}
            </Text>
            <Text // Restaurant name
              style={
                theme === 'dark' ? itemDark.infoLabel : itemLight.infoLabel
              }>
              {route.params.restaurant.name}
            </Text>
          </View>

          <View>
            <Text // Contact:
              style={
                theme === 'dark'
                  ? itemDark.infoLabelBold
                  : itemLight.infoLabelBold
              }>
              {language === 'norwegian' ? 'Kontakt:' : 'Contact:'}
            </Text>
            <Text // restaurant contact number
              style={
                theme === 'dark' ? itemDark.infoLabel : itemLight.infoLabel
              }>
              +47{' '}
              {route.params.restaurant.contact.toString().slice(0, 3) +
                ' ' +
                route.params.restaurant.contact.toString().slice(3, 5) +
                ' ' +
                route.params.restaurant.contact.toString().slice(5)}
            </Text>
          </View>

          <PictureCarousell pictures={route.params.item.gallery} />

          <Button
            Label="Add to cart"
            Icon={<AddShoppingCart />}
            Color={
              theme === 'dark'
                ? darkTheme.SUCCESS[300]
                : lightTheme.SUCCESS[300]
            }
            BorderColor={
              theme === 'dark'
                ? darkTheme.SUCCESS[1000]
                : lightTheme.SUCCESS[1000]
            }
            TextColor={
              theme === 'dark'
                ? darkTheme.SUCCESS[1000]
                : lightTheme.SUCCESS[1000]
            }
            onPress={() => {
              addToCart(
                route.params.item.id,
                route.params.item.name,
                route.params.item.price,
                route.params.item.preparationTime,
              );
              Alert.alert(route.params.item.name + ' added to cart');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

// styles

const itemLight = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
  },
  frame: {
    width: '100%',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 32,
  },
  titleFrame: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleLabel: {
    color: lightTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[2].REGULAR.fontFamily,
    fontSize: HEADLINE[2].REGULAR.fontSize,
    lineHeight: HEADLINE[2].REGULAR.lineHeight,
    letterSpacing: HEADLINE[2].REGULAR.letterSpacing,
    fontWeight: HEADLINE[2].REGULAR.fontWeight,
  },
  infoLabel: {
    color: lightTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[3].REGULAR.fontFamily,
    fontSize: HEADLINE[3].REGULAR.fontSize,
    lineHeight: HEADLINE[3].REGULAR.lineHeight,
    letterSpacing: HEADLINE[3].REGULAR.letterSpacing,
    fontWeight: HEADLINE[3].REGULAR.fontWeight,
  },
  infoLabelBold: {
    color: lightTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[3].MEDIUM.fontFamily,
    fontSize: HEADLINE[3].MEDIUM.fontSize,
    lineHeight: HEADLINE[3].MEDIUM.lineHeight,
    letterSpacing: HEADLINE[3].MEDIUM.letterSpacing,
    fontWeight: HEADLINE[3].MEDIUM.fontWeight,
  },
});

const itemDark = StyleSheet.create({
  image: {
    width: '100%',
  },
  frame: {
    width: '100%',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 32,
  },
  titleFrame: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleLabel: {
    color: darkTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[2].REGULAR.fontFamily,
    fontSize: HEADLINE[2].REGULAR.fontSize,
    lineHeight: HEADLINE[2].REGULAR.lineHeight,
    letterSpacing: HEADLINE[2].REGULAR.letterSpacing,
    fontWeight: HEADLINE[2].REGULAR.fontWeight,
  },
  infoLabel: {
    color: darkTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[3].REGULAR.fontFamily,
    fontSize: HEADLINE[3].REGULAR.fontSize,
    lineHeight: HEADLINE[3].REGULAR.lineHeight,
    letterSpacing: HEADLINE[3].REGULAR.letterSpacing,
    fontWeight: HEADLINE[3].REGULAR.fontWeight,
  },
  infoLabelBold: {
    color: darkTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[3].MEDIUM.fontFamily,
    fontSize: HEADLINE[3].MEDIUM.fontSize,
    lineHeight: HEADLINE[3].MEDIUM.lineHeight,
    letterSpacing: HEADLINE[3].MEDIUM.letterSpacing,
    fontWeight: HEADLINE[3].MEDIUM.fontWeight,
  },
});
