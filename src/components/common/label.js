import React from 'react';
import { View, Text } from 'react-native';

export const Label = (props) => {
  return (
    <View style={props.viewStyle}>
      <Text style={props.textStyle}>{props.label || 'Title'}</Text>
    </View>
  )
}