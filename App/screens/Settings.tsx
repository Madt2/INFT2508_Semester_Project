import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {SettingsLanguage, SettingsTheme} from '../components/SettingsItem';

export const Settings = () => {
  return (
    <SafeAreaView>
      <View style={settings.frame}>
        <SettingsLanguage />
        <SettingsTheme />
      </View>
    </SafeAreaView>
  );
};

// Styles

const settings = StyleSheet.create({
  frame: {
    width: '100%',
    height: '100%',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 96,
  },
});
