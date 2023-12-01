import AsyncStorage from '@react-native-async-storage/async-storage';
//https://react-native-async-storage.github.io/async-storage/docs/usage

type cartItem = {
  itemID: number;
  amount: number;
  name: string;
  price: number;
  prepTime: number;
};

export const addToCart = async (
  id: number,
  name: string,
  price: number,
  prepTime: number,
) => {
  try {
    const jsonData = await AsyncStorage.getItem('cart');
    if (jsonData !== null) {
      const cart: cartItem[] = JSON.parse(jsonData);
      const itemIndex = cart.findIndex(item => item.itemID === id);
      // if the item does not exist in cart
      if (itemIndex === -1) {
        cart.push({
          itemID: id,
          amount: 1,
          name: name,
          price: price,
          prepTime: prepTime,
        });
      } else {
        cart[itemIndex].amount++;
      }
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } else {
      // if cart is null
      const cart: cartItem[] = [
        {itemID: id, amount: 1, name: name, price: price, prepTime: prepTime},
      ];
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async (id: number) => {
  try {
    const jsonData = await AsyncStorage.getItem('cart');
    if (jsonData !== null) {
      const cart: cartItem[] = JSON.parse(jsonData);
      const itemIndex = cart.findIndex(item => item.itemID === id);
      if (itemIndex !== -1) {
        if (cart[itemIndex].amount > 1) {
          cart[itemIndex].amount--;
        } else {
          //removes the item entry from the list if it is 0 (or less)
          cart.splice(itemIndex, 1);
        }
      }
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async () => {
  try {
    const jsonData = await AsyncStorage.getItem('cart');
    if (jsonData !== null) {
      const cart: cartItem[] = JSON.parse(jsonData);
      return cart;
    }
  } catch (error) {
    console.log(error);
  }
};
