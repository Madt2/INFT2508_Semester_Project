/* eslint-disable @typescript-eslint/no-shadow */
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useStoreState} from 'pullstate';
import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {getItem, getRestaurant} from '../api/Fetch';
import {SettingsStore} from '../store/Settings';
import {darkTheme, lightTheme} from '../style/colors';
import {HEADLINE} from '../style/fonts';
import {restaurant, item} from '../types';

// type for react navigation:
type RootStackParamList = {
  Item: {item: item; restaurant: restaurant};
};

export const FavoriteItem = (props: {id: number}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const theme = useStoreState(SettingsStore, s => s.theme);

  //States
  const [item, setItem] = useState<item | null>(null);
  const [restaurant, setRestaurant] = useState<restaurant | null>(null);
  //fetches the item by id
  useEffect(() => {
    getItem(props.id).then(favItem => {
      setItem(favItem);
      if (favItem !== null) {
        getRestaurant(favItem.restaurantId).then(rest => setRestaurant(rest));
      }
    });
  }, [props.id]);

  if (item !== null && restaurant !== null) {
    return (
      <Pressable
        style={theme === 'dark' ? itemDark.frame : itemLight.frame}
        onPress={() =>
          navigation.navigate('Item', {
            item: item,
            restaurant: restaurant,
          })
        }>
        <Image // picture
          style={theme === 'dark' ? itemDark.image : itemLight.image}
          source={{uri: item.thumbnail}}
        />
        <View
          style={theme === 'dark' ? itemDark.labelFrame : itemLight.labelFrame}>
          <Text // item label
            style={theme === 'dark' ? itemDark.nameLabel : itemLight.nameLabel}>
            {item.name}
          </Text>
          <Text // price label
            style={
              theme === 'dark' ? itemDark.priceLabel : itemLight.priceLabel
            }>
            {item.price} kr
          </Text>
        </View>
      </Pressable>
    );
  }
};

// Styles

const itemLight = StyleSheet.create({
  frame: {
    backgroundColor: lightTheme.SECONDARY[900],
    overflow: 'hidden',
    borderRadius: 10,
    columnGap: 16,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  image: {
    height: 72,
    width: 72,
  },
  labelFrame: {
    rowGap: 8,
    display: 'flex',
    paddingVertical: 8,
  },
  nameLabel: {
    color: lightTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[3].REGULAR.fontFamily,
    fontSize: HEADLINE[3].REGULAR.fontSize,
    lineHeight: HEADLINE[3].REGULAR.lineHeight,
    letterSpacing: HEADLINE[3].REGULAR.letterSpacing,
    fontWeight: HEADLINE[3].REGULAR.fontWeight,
  },
  priceLabel: {
    color: lightTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[4].REGULAR.fontFamily,
    fontSize: HEADLINE[4].REGULAR.fontSize,
    lineHeight: HEADLINE[4].REGULAR.lineHeight,
    letterSpacing: HEADLINE[4].REGULAR.letterSpacing,
    fontWeight: HEADLINE[4].REGULAR.fontWeight,
  },
});

const itemDark = StyleSheet.create({
  frame: {
    backgroundColor: darkTheme.SECONDARY[900],
    overflow: 'hidden',
    borderRadius: 10,
    columnGapGap: 16,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  image: {
    height: 72,
    width: 72,
  },
  labelFrame: {
    rowGap: 8,
    display: 'flex',
    paddingVertical: 8,
  },
  nameLabel: {
    color: darkTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[3].REGULAR.fontFamily,
    fontSize: HEADLINE[3].REGULAR.fontSize,
    lineHeight: HEADLINE[3].REGULAR.lineHeight,
    letterSpacing: HEADLINE[3].REGULAR.letterSpacing,
    fontWeight: HEADLINE[3].REGULAR.fontWeight,
  },
  priceLabel: {
    color: darkTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[4].REGULAR.fontFamily,
    fontSize: HEADLINE[4].REGULAR.fontSize,
    lineHeight: HEADLINE[4].REGULAR.lineHeight,
    letterSpacing: HEADLINE[4].REGULAR.letterSpacing,
    fontWeight: HEADLINE[4].REGULAR.fontWeight,
  },
});
