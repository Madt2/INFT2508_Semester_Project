import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStoreState} from 'pullstate';
import React from 'react';
import {Filter} from '../screens/Filter';
import {Item} from '../screens/Item';
import {SettingsStore} from '../store/Settings';
import {HomeTab} from './Tab';

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  const language = useStoreState(SettingsStore, s => s.language);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTab"
          component={HomeTab}
          options={{
            headerShown: false,
            title: language === 'norwegian' ? 'Tilbake' : 'Back',
          }}
        />
        <Stack.Screen
          name="Filter"
          component={Filter}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Item"
          component={Item}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
