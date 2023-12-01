//Common types

export type restaurant = {
  id: number;
  name: string;
  category: string;
  contact: number;
  location: string;
  items: number[];
};

export type item = {
  id: number;
  displaySize: number;
  name: string;
  price: number;
  preparationTime: number;
  description: string;
  thumbnail: string;
  restaurantId: number;
  recommendedItems: number[];
  gallery: string[];
};
