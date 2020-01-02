import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { ImageView } from './imageView';

export const SearchBar = (props) => {
  return (
    <View style={props.viewStyle}>
      <ImageView
        source={props.source}
        imageStyle={props.imageStyle}
      />
      <TextInput
        placeholder={props.placeholder}
        autoCorrect
        value={props.value}
        onChangeText={props.onChange}
        style={props.inputStyle}
      />
    </View>
  )
}