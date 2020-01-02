import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const Button = (props) => {
  return (
    <TouchableOpacity
      style={props.viewStyle}
      activeOpacity={props.activeOpacity}
      onPress={props.onPress}
    >
      <Text style={props.textStyle}>{props.label || 'Press Me'}</Text>
    </TouchableOpacity>
  )
}