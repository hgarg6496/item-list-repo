import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ImageView } from './imageView';
import { forwardArrow, downArrow } from '../../images';
import { Label } from './label';
import { normalize, heightScale, widthScale } from '../../config/normalize';

export const ItemHeader = (props) => {
  const {
    category: { categoryName, colorCode, servingSize, subcategories },
    collapsed,
    itemTileStyle,
    category,
    searchText,
  } = props;

  return (
    <View>
      <TouchableOpacity style={props.viewStyle} activeOpacity={0.6} onPress={props.onPress}>
        <ImageView source={props.source} />
        <View style={{ marginHorizontal: widthScale(15), flex: 1 }}>
          <Text
            style={[props.textStyle, { color: colorCode }]}
            numberOfLines={1}
            ellipsizeMode={'tail'}
          >
            {categoryName || 'Title'}{' '}
            {servingSize ? (<Text style={{ color: 'black' }}>{'('}{servingSize}{')'}</Text>) : null}
          </Text>
        </View>
        {collapsed ?
          (<ImageView source={downArrow} imageStyle={{ tintColor: '#015294' }} />)
          : (<ImageView source={forwardArrow} />)}

      </TouchableOpacity>
      {!collapsed ? renderSubCategory(category, itemTileStyle, colorCode, searchText) : null}
    </View>
  )
}

function renderSubCategory(category, itemTileStyle, colorCode, searchText) {
  const { subcategories, quote, protip } = category;
  return (
    <View>
      <FlatList
        data={subcategories}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => renderItem(item, itemTileStyle, colorCode, quote, protip, searchText)}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )

}

function renderItem(item, itemTileStyle, colorCode, quote, protip, searchText) {
  const { subCategoryname, items } = item;
  return (
    <>
      <FlatList
        data={items}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => renderSubItem(item, itemTileStyle, searchText)}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            subCategoryname !== '' ?
              (<Label
                label={subCategoryname.toUpperCase()}
                viewStyle={[itemTileStyle, { borderBottomWidth: 0 }]}
                textStyle={{ color: colorCode, fontSize: normalize(18) }}
              />)
              : null
          )
        }}
        ListFooterComponent={() => {
          return (
            quote !== '' ?
              (
                <View style={{ height: heightScale(100), backgroundColor: 'white', paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <Label
                    label={quote}
                    viewStyle={[
                      itemTileStyle,
                      { borderBottomWidth: 0, height: heightScale(50), backgroundColor: '#f2ffff', borderRadius: 10 }]}
                    textStyle={{ color: 'black', fontSize: normalize(14) }}
                    textStyle={{ textAlign: 'center' }}
                  />
                </View>
              )
              : null
          )
        }}
      />
      {
        protip !== '' ? (
          <View style={{ backgroundColor: '#56a5a6', height: heightScale(90), marginVertical: heightScale(25), borderRadius: 10 }}>
            <Label
              label={'PRO TIP'}
              viewStyle={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#5298c6', width: widthScale(80), borderRadius: 20, marginTop: heightScale(15), marginLeft: widthScale(15), padding: 8 }}
              textStyle={{ textAlign: 'center', color: 'white', fontSize: normalize(14) }}
            />
            <Label
              label={protip}
              viewStyle={{ marginTop: heightScale(8), marginLeft: widthScale(15) }}
              textStyle={{ color: 'white', fontSize: normalize(16) }}
            />
          </View>
        ) : null
      }

    </>
  )
}

function renderSubItem(item, itemTileStyle, searchText) {
  let value = '';
  if (searchText !== '' && item.startsWith(searchText)) {
    if (item == searchText) {
      value = item;
    } else {
      const val = item.split(searchText);
      value = val[1];
    }
  }
  return (
    <View style={itemTileStyle}>
      {
        value == '' ? (
          <Text style={{ fontSize: normalize(16) }}>{item || 'Title'}</Text>
        ) : (
            <View style={{ flexDirection: 'row' }}>
              <View style={{ backgroundColor: 'yellow' }}>
                <Text style={{ fontSize: normalize(16) }}>{searchText}</Text>
              </View>
              {item != searchText ? (
                <Text style={{ fontSize: normalize(16) }}>{value}</Text>
              ) : null}
            </View>
          )
      }
    </View>
  )
}