/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {getRestaurants} from '../api/Fetch';
import {RestaurantCarousell} from '../components/RestaurantCarousell';
import {SearchAndFilter} from '../components/SearchAndFilter';
import {restaurant} from '../types';

export const Restaurants = () => {
  //restaurants
  const [restaurants, setRestaurants] = useState<null | restaurant[]>(null);
  //search word state
  const [search, setSearch] = useState('');
  //fetches restaurants
  useEffect(() => {
    getRestaurants().then(restaurantList => setRestaurants(restaurantList));
  }, []);
  if (restaurants !== null) {
    return (
      <View>
        <SearchAndFilter onChange={text => setSearch(text)} />
        <ScrollView>
          <View style={restaurantsStyle.frame}>
            {restaurants.map(restaurant => (
              <RestaurantCarousell
                key={restaurant.name + restaurant.id}
                restaurant={restaurant}
                search={search}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
};

// styles

const restaurantsStyle = StyleSheet.create({
  frame: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
});
