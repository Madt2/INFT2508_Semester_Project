import {Store} from 'pullstate';

// Global storage

interface CartStore {
  delivery: string;
  time: number;
}

export const CartStore = new Store<CartStore>({
  delivery: 'asap',
  time: 0,
});

export const setDelivery = (delivery: string, time: number) => {
  if (delivery === 'asap' || delivery === 'select time') {
    CartStore.update(state => {
      state.delivery = delivery;
      state.time = time;
    });
  } else {
    console.log(
      'delivery type or time is in wrong format: ' + delivery + ' / ' + time,
    );
  }
};
