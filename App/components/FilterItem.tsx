import {useStoreState} from 'pullstate';
import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Check} from '../assets/icons';
import {SettingsStore} from '../store/Settings';
import {darkTheme, lightTheme} from '../style/colors';
import {HEADLINE} from '../style/fonts';

const FilterItemDeselected = (props: {category: string}) => {
  const theme = useStoreState(SettingsStore, s => s.theme);
  return (
    <View
      style={theme === 'dark' ? filterItemDark.frame : filterItemLight.frame}>
      <Text
        style={theme === 'dark' ? filterItemDark.label : filterItemLight.label}>
        {props.category}
      </Text>
    </View>
  );
};

const FilterItemSelected = (props: {category: string}) => {
  const theme = useStoreState(SettingsStore, s => s.theme);
  return (
    <View
      style={
        theme === 'dark'
          ? filterItemDark.frameActive
          : filterItemLight.frameActive
      }>
      <Text
        style={theme === 'dark' ? filterItemDark.label : filterItemLight.label}>
        {props.category}
      </Text>
      <Check />
    </View>
  );
};

export const FilterItem = (props: {
  category: string;
  onPress: (event: GestureResponderEvent) => void;
  state: boolean;
}) => {
  return (
    <Pressable onPress={props.onPress}>
      {props.state ? (
        <FilterItemSelected category={props.category} />
      ) : (
        <FilterItemDeselected category={props.category} />
      )}
    </Pressable>
  );
};

// Styles

const filterItemLight = StyleSheet.create({
  frame: {
    backgroundColor: lightTheme.SHADES.WHITE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightTheme.GRAY_TONES[800],
  },
  frameActive: {
    backgroundColor: lightTheme.PRIMARY[300],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightTheme.GRAY_TONES[800],
  },
  label: {
    color: lightTheme.GRAY_TONES[800],
    fontFamily: HEADLINE[3].REGULAR.fontFamily,
    fontSize: HEADLINE[3].REGULAR.fontSize,
    lineHeight: HEADLINE[3].REGULAR.lineHeight,
    letterSpacing: HEADLINE[3].REGULAR.letterSpacing,
    fontWeight: HEADLINE[3].REGULAR.fontWeight,
  },
});

const filterItemDark = StyleSheet.create({
  frame: {
    backgroundColor: darkTheme.SHADES.WHITE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: darkTheme.GRAY_TONES[800],
  },
  frameActive: {
    backgroundColor: darkTheme.PRIMARY[300],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: darkTheme.GRAY_TONES[800],
  },
  label: {
    color: darkTheme.GRAY_TONES[800],
    fontFamily: HEADLINE[3].REGULAR.fontFamily,
    fontSize: HEADLINE[3].REGULAR.fontSize,
    lineHeight: HEADLINE[3].REGULAR.lineHeight,
    letterSpacing: HEADLINE[3].REGULAR.letterSpacing,
    fontWeight: HEADLINE[3].REGULAR.fontWeight,
  },
});
