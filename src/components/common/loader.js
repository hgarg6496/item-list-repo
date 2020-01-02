import React from 'react';
import { ActivityIndicator, Text,View } from 'react-native';

export const Loader = (props) => {
  return (
    <>
      <ActivityIndicator
        animating
        color={props.color || 'white'}
        size={props.size || 'large'}
      />
      <View style={props.viewStyle}>
        <Text style={props.textStyle}>{'Fetching Data ...'}</Text>
      </View>
    </>
  );
}
