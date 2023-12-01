import {useStoreState} from 'pullstate';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {SaveLanguage, SaveTheme} from '../storage/Settings';
import {SettingsStore, storeLanguage, storeTheme} from '../store/Settings';

export const SettingsLanguage = () => {
  const language = useStoreState(SettingsStore, s => s.language);

  // Props for drop down menu
  // https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(language);
  const [items, setItems] = useState([
    {label: 'english', value: 'english'},
    {label: 'norwegian', value: 'norwegian'},
  ]);
  //on value change to drop down menu for language
  useEffect(() => {
    SaveLanguage(value); //Saves language to storage
    storeLanguage(value); //Update language global storage
  }, [value]);

  return (
    <View style={settings.item}>
      <Text> {language === 'norwegian' ? 'Språk:' : 'Language:'}</Text>
      <DropDownPicker
        containerStyle={settings.dropDownPicker}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
};

export const SettingsTheme = () => {
  const theme = useStoreState(SettingsStore, s => s.theme);
  const language = useStoreState(SettingsStore, s => s.language);

  // Props for drop down menu
  // https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(theme);
  const [items, setItems] = useState([
    {label: 'Light', value: 'light'},
    {label: 'Dark', value: 'dark'},
  ]);

  //on value change to drop down menu for theme
  useEffect(() => {
    SaveTheme(value); //Saves theme to storage
    storeTheme(value); //Update theme global storage
  }, [value]);

  return (
    <View style={settings.item}>
      <Text>{language === 'norwegian' ? 'Tema:' : 'Theme:'}</Text>
      <DropDownPicker
        containerStyle={settings.dropDownPicker}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
};

// styles

const settings = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownPicker: {
    width: '50%',
  },
});
