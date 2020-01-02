import React from 'react';
import { View, Image, TouchableOpacity} from 'react-native';

export const ImageView = (props) => {
  return (
    <View style={props.viewStyle}>
      <Image source={props.source} style={props.imageStyle} />
    </View>
  )
}