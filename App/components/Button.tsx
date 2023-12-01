import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, Text} from 'react-native';
import {HEADLINE} from '../style/fonts';

export const Button = (props: {
  Label: string;
  Icon: React.ReactNode;
  Color: string;
  BorderColor: string;
  TextColor: string;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Pressable
      style={[
        button.frame,
        {backgroundColor: props.Color},
        {borderColor: props.BorderColor},
      ]}
      onPress={props.onPress}>
      <Text style={[button.label, {color: props.TextColor}]}>
        {props.Label}
      </Text>
      {props.Icon}
    </Pressable>
  );
};

const button = StyleSheet.create({
  frame: {
    height: 40,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  label: {
    fontFamily: HEADLINE[4].REGULAR.fontFamily,
    fontSize: HEADLINE[4].REGULAR.fontSize,
    lineHeight: HEADLINE[4].REGULAR.lineHeight,
    letterSpacing: HEADLINE[4].REGULAR.letterSpacing,
    fontWeight: HEADLINE[4].REGULAR.fontWeight,
  },
});
