import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useStoreState} from 'pullstate';
import React from 'react';
import {
  FavoriteIcon,
  HomeIcon,
  MapIcon,
  SettingsIcon,
  ShoppingCartIcon,
} from '../assets/icons';
import {Cart} from '../screens/Cart';
import {Favorites} from '../screens/Favorites';
import {Map} from '../screens/Map';
import {Restaurants} from '../screens/Restaurants';
import {Settings} from '../screens/Settings';
import {SettingsStore} from '../store/Settings';

const Tab = createBottomTabNavigator();

export const HomeTab = () => {
  const language = useStoreState(SettingsStore, s => s.language);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Restaurants"
        component={Restaurants}
        options={{
          headerShown: true,
          title: language === 'norwegian' ? 'Resturanter' : 'Restaurants',
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: true,
          title: language === 'norwegian' ? 'Kart' : 'Map',
          tabBarIcon: () => <MapIcon />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: true,
          title: language === 'norwegian' ? 'Favoriter' : 'Favorites',
          tabBarIcon: () => <FavoriteIcon />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          title: language === 'norwegian' ? 'Innstillinger' : 'Settings',
          tabBarIcon: () => <SettingsIcon />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: true,
          title: language === 'norwegian' ? 'Handlekurv' : 'Cart',
          tabBarIcon: () => <ShoppingCartIcon />,
        }}
      />
    </Tab.Navigator>
  );
};
