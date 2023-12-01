import {useIsFocused} from '@react-navigation/native';
import moment, {Moment} from 'moment';
import {useStoreState} from 'pullstate';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Add, Remove} from '../assets/icons';
import {addToCart, getCart, removeFromCart} from '../storage/Cart';
import {SettingsStore} from '../store/Settings';
import {darkTheme, lightTheme} from '../style/colors';
import {HEADLINE} from '../style/fonts';

type cartItem = {
  itemID: number;
  amount: number;
  name: string;
  price: number;
  prepTime: number;
};

// Todo can try to remove the useState
const AmountPicker = (props: {
  itemID: number;
  amount: number;
  name: string;
  price: number;
  prepTime: number;
  onUpdate: () => void;
}) => {
  const theme = useStoreState(SettingsStore, s => s.theme);
  return (
    <View
      style={
        theme === 'dark' ? amountPickerDark.frame : amountPickerLight.frame
      }>
      {/* Minus */}
      <Pressable
        disabled={props.amount < 1}
        onPress={() => {
          removeFromCart(props.itemID).then(() => props.onUpdate());
        }}>
        <Remove />
      </Pressable>
      {/* Label */}
      <Text
        style={
          theme === 'dark' ? amountPickerDark.label : amountPickerLight.label
        }>
        {props.amount}
      </Text>
      {/* Pluss */}
      <Pressable
        disabled={props.amount > 998}
        onPress={() => {
          addToCart(props.itemID, props.name, props.price, props.prepTime).then(
            () => props.onUpdate(),
          );
        }}>
        <Add />
      </Pressable>
    </View>
  );
};

const CartItem = (props: {
  itemID: number;
  amount: number;
  name: string;
  price: number;
  prepTime: number;
  onUpdate: () => void;
}) => {
  const theme = useStoreState(SettingsStore, s => s.theme);
  if (props.amount > 0) {
    return (
      <View style={theme === 'dark' ? cartDark.frame : cartLight.frame}>
        {/* Dish Name */}
        <Text style={theme === 'dark' ? cartDark.label : cartLight.label}>
          {props.name}
        </Text>

        {/* Amount picker */}
        <AmountPicker
          itemID={props.itemID}
          name={props.name}
          price={props.price}
          amount={props.amount}
          prepTime={props.prepTime}
          onUpdate={props.onUpdate}
        />

        {/* price */}
        <Text style={theme === 'dark' ? cartDark.price : cartLight.price}>
          {props.price * props.amount} kr
        </Text>
      </View>
    );
  }
};

const Sum = (props: {sum: number}) => {
  const theme = useStoreState(SettingsStore, s => s.theme);
  return (
    <View style={theme === 'dark' ? cartDark.sumFrame : cartLight.sumFrame}>
      <Text style={theme === 'dark' ? cartDark.label : cartLight.label}>
        Sum:
      </Text>
      <Text style={theme === 'dark' ? cartDark.price : cartLight.price}>
        {props.sum} kr
      </Text>
    </View>
  );
};

export const Check = () => {
  //Settings
  const theme = useStoreState(SettingsStore, s => s.theme);
  const language = useStoreState(SettingsStore, s => s.language);

  //States
  const [cart, setCart] = useState<cartItem[] | null>(null);
  const [sum, setSum] = useState<number>(0);

  //rerender
  const [updated, setUpdated] = useState(false);
  const isFocused = useIsFocused();

  //retrieves cart from storage and calculates the sum:
  useEffect(() => {
    getCart().then(cartData => {
      if (typeof cartData !== 'undefined') {
        setCart(cartData);
        let total = 0;
        if (cartData !== null) {
          cartData.forEach(item => {
            total = total + item.price * item.amount;
          });
        }
        setSum(total);
      }
    });
    setUpdated(false);
  }, [updated, isFocused]);

  if (cart !== null && cart.length !== 0) {
    return (
      <View
        style={theme === 'dark' ? cartDark.checkFrame : cartLight.checkFrame}>
        {/* Instanciate all cart items as components */}
        {cart.map(cartItem => (
          <CartItem
            key={'cartItem:' + cartItem.itemID}
            itemID={cartItem.itemID}
            name={cartItem.name}
            price={cartItem.price}
            amount={cartItem.amount}
            prepTime={cartItem.prepTime}
            // eslint-disable-next-line no-void
            onUpdate={() => void setUpdated(true)}
          />
        ))}
        <Sum sum={sum} />
      </View>
    );
  } else {
    return (
      // If the cart is empty
      <View
        style={theme === 'dark' ? cartDark.checkFrame : cartLight.checkFrame}>
        <Text style={theme === 'dark' ? cartDark.label : cartLight.label}>
          {language === 'norwegian'
            ? 'Handlekurven er tom'
            : 'The cart is empty'}
        </Text>
        <Sum sum={0} />
      </View>
    );
  }
};

export const Delivery = () => {
  const language = useStoreState(SettingsStore, s => s.language);
  const [prepTime, setPrepTime] = useState<Moment>(moment());

  // States for dropdown meny:
  // https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('asap'); // set global state
  const [items, setItems] = useState([
    {label: 'ASAP', value: 'asap'},
    {label: 'Select time', value: 'select time'},
  ]);

  // States and functions for time picker:
  // https://www.npmjs.com/package/react-native-modal-datetime-picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    setPrepTime(moment(date));
    hideDatePicker();
  };

  // Calculates prep time. BUG: This does not update correctly on changes to the cart
  useEffect(() => {
    getCart().then(cartData => {
      if (typeof cartData !== 'undefined') {
        const DELIVERY_TIME = 15;
        let time = 0;
        cartData.forEach(item => {
          if (item.prepTime > time) {
            time = item.prepTime;
          }
        });
        setPrepTime(moment().add(time + DELIVERY_TIME, 'm'));
      }
    });
  }, []);
  return (
    <View style={delivery.frame}>
      {/* Deliver type picker */}
      <View style={delivery.item}>
        <Text>{language === 'norwegian' ? 'Levering:' : 'Delivery:'}</Text>
        <DropDownPicker
          containerStyle={delivery.dropDownPicker}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      {value === 'asap' ? (
        // ASAP
        <View style={delivery.item}>
          <Text>
            {language === 'norwegian'
              ? 'Estimert leveringstid:'
              : 'Estimated delivery:'}
          </Text>
          <Text>{prepTime.format('MMMM, HH:mm')}</Text>
        </View>
      ) : (
        // Select time
        <View style={delivery.item}>
          <Text>{language === 'norwegian' ? 'Levering:' : 'Delivery at:'}</Text>
          {/* time picker */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            minimumDate={prepTime.toDate()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Pressable onPress={() => showDatePicker()}>
            <Text>{prepTime.format('MMMM, HH:mm')}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

// Styles

const amountPickerLight = StyleSheet.create({
  frame: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    width: 24,
    textAlign: 'center',
    color: lightTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[4].REGULAR.fontFamily,
    fontSize: HEADLINE[4].REGULAR.fontSize,
    lineHeight: HEADLINE[4].REGULAR.lineHeight,
    letterSpacing: HEADLINE[4].REGULAR.letterSpacing,
    fontWeight: HEADLINE[4].REGULAR.fontWeight,
  },
});

const amountPickerDark = StyleSheet.create({
  frame: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    width: 24,
    textAlign: 'center',
    color: darkTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[4].REGULAR.fontFamily,
    fontSize: HEADLINE[4].REGULAR.fontSize,
    lineHeight: HEADLINE[4].REGULAR.lineHeight,
    letterSpacing: HEADLINE[4].REGULAR.letterSpacing,
    fontWeight: HEADLINE[4].REGULAR.fontWeight,
  },
});

const cartLight = StyleSheet.create({
  frame: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  sumFrame: {
    borderTopWidth: 1,
    borderColor: lightTheme.GRAY_TONES[900],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  checkFrame: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  label: {
    color: lightTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[3].REGULAR.fontFamily,
    fontSize: HEADLINE[3].REGULAR.fontSize,
    lineHeight: HEADLINE[3].REGULAR.lineHeight,
    letterSpacing: HEADLINE[3].REGULAR.letterSpacing,
    fontWeight: HEADLINE[3].REGULAR.fontWeight,
  },
  price: {
    color: lightTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[3].MEDIUM.fontFamily,
    fontSize: HEADLINE[3].MEDIUM.fontSize,
    lineHeight: HEADLINE[3].MEDIUM.lineHeight,
    letterSpacing: HEADLINE[3].MEDIUM.letterSpacing,
    fontWeight: HEADLINE[3].MEDIUM.fontWeight,
  },
});

const cartDark = StyleSheet.create({
  frame: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  sumFrame: {
    borderTopWidth: 1,
    borderColor: darkTheme.GRAY_TONES[900],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  checkFrame: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  label: {
    color: darkTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[3].REGULAR.fontFamily,
    fontSize: HEADLINE[3].REGULAR.fontSize,
    lineHeight: HEADLINE[3].REGULAR.lineHeight,
    letterSpacing: HEADLINE[3].REGULAR.letterSpacing,
    fontWeight: HEADLINE[3].REGULAR.fontWeight,
  },
  price: {
    color: darkTheme.GRAY_TONES[900],
    fontFamily: HEADLINE[3].MEDIUM.fontFamily,
    fontSize: HEADLINE[3].MEDIUM.fontSize,
    lineHeight: HEADLINE[3].MEDIUM.lineHeight,
    letterSpacing: HEADLINE[3].MEDIUM.letterSpacing,
    fontWeight: HEADLINE[3].MEDIUM.fontWeight,
  },
});

const delivery = StyleSheet.create({
  frame: {
    display: 'flex',
    flexDirection: 'column',
    gap: 96,
    padding: 16,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownPicker: {
    width: '50%',
  },
});
