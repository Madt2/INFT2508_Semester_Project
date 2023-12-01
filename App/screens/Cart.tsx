import React from 'react';
import {Alert, Button, View} from 'react-native';
import {Check, Delivery} from '../components/CartComponents';

export const Cart = () => {
  return (
    <View>
      <Check />
      <Delivery />
      <Button
        title="Pay"
        onPress={() => Alert.alert('proceding to payments')}
      />
    </View>
  );
};
