import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {FilterAlt, Search} from '../assets/icons';

// React navigation type
type RootStackParamList = {
  Filter: undefined;
};

const SearchBar = (props: {onChange: (text: string) => void}) => {
  return (
    <View style={styles.Search}>
      <Search />
      <TextInput
        placeholder="Search..."
        onChangeText={text => {
          props.onChange(text);
        }}
      />
    </View>
  );
};

const Filter = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Pressable
      style={styles.filter}
      onPress={() => navigation.navigate('Filter')}>
      <Text>Filter</Text>
      <FilterAlt />
    </Pressable>
  );
};

export const SearchAndFilter = (props: {onChange: (text: string) => void}) => {
  return (
    <View style={styles.frame}>
      <SearchBar onChange={props.onChange} />
      <Filter />
    </View>
  );
};

// styles

const styles = StyleSheet.create({
  Search: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    width: 255,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  filter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
});
