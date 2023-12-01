import {restaurant, item} from '../types';

const baseAddress = 'http://localhost:3000/';

export const getRestaurant = async (id: number) => {
  const response = await fetch(baseAddress + 'restaurants/' + id);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const restaurant = (await response.json()) as restaurant;
  return restaurant;
};

export const getRestaurants = async () => {
  const response = await fetch(baseAddress + 'restaurants/');
  const restaurants = (await response.json()) as restaurant[];
  return restaurants;
};

export const getItem = async (id: number) => {
  const response = await fetch(baseAddress + 'items/' + id);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const item = (await response.json()) as item;
  return item;
};
