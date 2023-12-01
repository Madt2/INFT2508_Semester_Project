import {useStoreState} from 'pullstate';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SettingsStore} from '../store/Settings';
import {darkTheme, lightTheme} from '../style/colors';
import {HEADLINE} from '../style/fonts';

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const PictureCarousell = (props: {pictures: string[]}) => {
  const theme = useStoreState(SettingsStore, s => s.theme);
  return (
    <View style={theme === 'dark' ? carousellDark.frame : carousellLight.frame}>
      <Text // Gallery text
        style={theme === 'dark' ? carousellDark.label : carousellLight.label}>
        Gallery
      </Text>
      {/* image carousell */}
      <ScrollView horizontal={true}>
        <View
          style={
            theme === 'dark'
              ? carousellDark.carousellFrame
              : carousellLight.carousellFrame
          }>
          {props.pictures.map(picture => (
            <Image
              key={'picture' + makeid(4)}
              style={
                theme === 'dark' ? carousellDark.image : carousellLight.image
              }
              source={{uri: picture}}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// styles

const carousellLight = StyleSheet.create({
  frame: {
    display: 'flex',
    flexDirection: 'column',
    columnGap: 16,
  },
  label: {
    color: lightTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[3].REGULAR.fontFamily,
    fontSize: HEADLINE[3].REGULAR.fontSize,
    lineHeight: HEADLINE[3].REGULAR.lineHeight,
    letterSpacing: HEADLINE[3].REGULAR.letterSpacing,
    fontWeight: HEADLINE[3].REGULAR.fontWeight,
  },
  carousellFrame: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  image: {
    width: 144,
    height: 96,
    borderRadius: 10,
  },
});

const carousellDark = StyleSheet.create({
  frame: {
    display: 'flex',
    flexDirection: 'column',
    columnGap: 16,
  },
  label: {
    color: darkTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[3].REGULAR.fontFamily,
    fontSize: HEADLINE[3].REGULAR.fontSize,
    lineHeight: HEADLINE[3].REGULAR.lineHeight,
    letterSpacing: HEADLINE[3].REGULAR.letterSpacing,
    fontWeight: HEADLINE[3].REGULAR.fontWeight,
  },
  carousellFrame: {
    display: 'flex',
    flexDirection: 'row',
    rowGap: 8,
  },
  image: {
    width: 144,
    height: 96,
    borderRadius: 10,
  },
});
