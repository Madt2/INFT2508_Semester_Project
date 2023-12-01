/* eslint-disable no-void */
import {useStoreState} from 'pullstate';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Cancel} from '../assets';
import {Button} from '../components/Button';
import {FilterItem} from '../components/FilterItem';
import {FilterStore} from '../store/Filter';
import {SettingsStore} from '../store/Settings';
import {darkTheme, lightTheme} from '../style/colors';

export const Filter = () => {
  const theme = useStoreState(SettingsStore, s => s.theme);
  return (
    <SafeAreaView>
      <View style={filter.frame}>
        {/* All filter items, and updates global storage based on clicks */}
        <FilterItem
          category={'American'}
          onPress={() =>
            FilterStore.update(state => void (state.american = !state.american))
          }
          state={useStoreState(FilterStore, s => s.american)}
        />
        <FilterItem
          category={'Chinese'}
          onPress={() =>
            FilterStore.update(state => void (state.chinese = !state.chinese))
          }
          state={useStoreState(FilterStore, s => s.chinese)}
        />
        <FilterItem
          category={'Japanese'}
          onPress={() =>
            FilterStore.update(state => void (state.japanese = !state.japanese))
          }
          state={useStoreState(FilterStore, s => s.japanese)}
        />
        <FilterItem
          category={'Indian'}
          onPress={() =>
            FilterStore.update(state => void (state.indian = !state.indian))
          }
          state={useStoreState(FilterStore, s => s.indian)}
        />
        <FilterItem
          category={'Italian'}
          onPress={() =>
            FilterStore.update(state => void (state.italian = !state.italian))
          }
          state={useStoreState(FilterStore, s => s.italian)}
        />
        <FilterItem
          category={'Turkish'}
          onPress={() =>
            FilterStore.update(state => void (state.turkish = !state.turkish))
          }
          state={useStoreState(FilterStore, s => s.turkish)}
        />
        <FilterItem
          category={'Fastfood'}
          onPress={() =>
            FilterStore.update(state => void (state.fastfood = !state.fastfood))
          }
          state={useStoreState(FilterStore, s => s.fastfood)}
        />
      </View>
      <Button
        Label={'Unselect All'}
        Icon={<Cancel />}
        Color={
          theme === 'dark'
            ? darkTheme.SECONDARY[400]
            : lightTheme.SECONDARY[400]
        }
        BorderColor={
          theme === 'dark'
            ? darkTheme.SECONDARY[1000]
            : lightTheme.SECONDARY[1000]
        }
        TextColor={
          theme === 'dark'
            ? darkTheme.SECONDARY[1000]
            : lightTheme.SECONDARY[1000]
        }
        onPress={() => {
          FilterStore.update(state => void (state.american = false));
          FilterStore.update(state => void (state.japanese = false));
          FilterStore.update(state => void (state.chinese = false));
          FilterStore.update(state => void (state.indian = false));
          FilterStore.update(state => void (state.italian = false));
          FilterStore.update(state => void (state.turkish = false));
          FilterStore.update(state => void (state.fastfood = false));
        }}
      />
    </SafeAreaView>
  );
};

// styles

const filter = StyleSheet.create({
  frame: {
    display: 'flex',
    flexDirection: 'column',
    columnGap: 16,
    padding: 16,
  },
});
