/* eslint-disable @typescript-eslint/no-shadow */
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useStoreState} from 'pullstate';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getItem} from '../api/Fetch';
import {SettingsStore} from '../store/Settings';
import {darkTheme, lightTheme} from '../style/colors';
import {HEADLINE} from '../style/fonts';
import {item, restaurant} from '../types';

// React navigation type to define navigation and route params
type RootStackParamList = {
  Item: {item: item; restaurant: restaurant};
};

const RestaurantItem = (props: {id: number; restaurant: restaurant}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const theme = useStoreState(SettingsStore, s => s.theme);
  // states
  const [item, setItem] = useState<item | null>(null);
  // fetches item at props id
  useEffect(() => {
    getItem(props.id).then(restItem => {
      setItem(restItem);
    });
  }, [props.id]);

  if (item !== null) {
    return (
      <Pressable
        style={theme === 'dark' ? itemDark.frame : itemLight.frame}
        onPress={() =>
          navigation.navigate('Item', {
            item: item,
            restaurant: props.restaurant,
          })
        }>
        <Image // thumbnail image
          style={theme === 'dark' ? itemDark.image : itemLight.image}
          source={{uri: item.thumbnail}}
        />
        {/* item label */}
        <Text style={theme === 'dark' ? itemDark.text : itemLight.text}>
          {item.name}
        </Text>
      </Pressable>
    );
  }
};

export const RestaurantCarousell = (props: {
  restaurant: restaurant;
  search: string;
}) => {
  const theme = useStoreState(SettingsStore, s => s.theme);
  if (
    //checks if search string is a substring of restaurant
    props.restaurant.name.toLowerCase().includes(props.search.toLowerCase())
  ) {
    return (
      <View
        style={theme === 'dark' ? restaurantDark.frame : restaurantLight.frame}>
        <Text // Restaurant title
          style={theme === 'dark' ? restaurantDark.text : restaurantLight.text}>
          {props.restaurant.name}
        </Text>
        {/* Item carousell */}
        <ScrollView horizontal={true}>
          <View
            style={
              theme === 'dark'
                ? restaurantDark.carousell
                : restaurantLight.carousell
            }>
            {props.restaurant.items.map(itemID => (
              <RestaurantItem
                key={'item:' + itemID}
                restaurant={props.restaurant}
                id={itemID}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
};

// styles

const itemLight = StyleSheet.create({
  frame: {
    backgroundColor: lightTheme.SECONDARY[900],
    overflow: 'hidden',
    borderRadius: 10,
    rowGap: 8,
    display: 'flex',
    width: 168,
    height: 152,
  },
  text: {
    marginHorizontal: 8,
    color: lightTheme.GRAY_TONES[800],
    fontFamily: HEADLINE[3].REGULAR.fontFamily,
    fontSize: HEADLINE[3].REGULAR.fontSize,
    lineHeight: HEADLINE[3].REGULAR.lineHeight,
    letterSpacing: HEADLINE[3].REGULAR.letterSpacing,
    fontWeight: HEADLINE[3].REGULAR.fontWeight,
  },
  image: {
    width: 168,
    height: 112,
  },
});

const itemDark = StyleSheet.create({
  frame: {
    backgroundColor: darkTheme.SECONDARY[900],
    borderRadius: 10,
    rowGap: 8,
    display: 'flex',
    width: 168,
    height: 152,
  },
  text: {
    marginHorizontal: 8,
    color: darkTheme.GRAY_TONES[800],
    fontFamily: HEADLINE[3].REGULAR.fontFamily,
    fontSize: HEADLINE[3].REGULAR.fontSize,
    lineHeight: HEADLINE[3].REGULAR.lineHeight,
    letterSpacing: HEADLINE[3].REGULAR.letterSpacing,
    fontWeight: HEADLINE[3].REGULAR.fontWeight,
  },
  image: {
    width: 168,
    height: 112,
  },
});

const restaurantLight = StyleSheet.create({
  frame: {
    rowGap: 8,
    display: 'flex',
    width: '100%',
  },
  carousell: {
    marginHorizontal: 16,
    gap: 8,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  text: {
    marginHorizontal: 16,
    color: lightTheme.GRAY_TONES[800],
    fontFamily: HEADLINE[2].MEDIUM.fontFamily,
    fontSize: HEADLINE[2].MEDIUM.fontSize,
    lineHeight: HEADLINE[2].MEDIUM.lineHeight,
    letterSpacing: HEADLINE[2].MEDIUM.letterSpacing,
    fontWeight: HEADLINE[2].MEDIUM.fontWeight,
  },
});

const restaurantDark = StyleSheet.create({
  frame: {
    rowGap: 8,
    display: 'flex',
    width: '100%',
  },
  carousell: {
    marginHorizontal: 16,
    gap: 8,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  text: {
    marginHorizontal: 16,
    color: darkTheme.GRAY_TONES[800],
    fontFamily: HEADLINE[2].MEDIUM.fontFamily,
    fontSize: HEADLINE[2].MEDIUM.fontSize,
    lineHeight: HEADLINE[2].MEDIUM.lineHeight,
    letterSpacing: HEADLINE[2].MEDIUM.letterSpacing,
    fontWeight: HEADLINE[2].MEDIUM.fontWeight,
  },
});
