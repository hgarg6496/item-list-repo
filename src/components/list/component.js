import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { ImageView } from '../common/imageView';
import { cross, mail, gift, search } from '../../images';
import { Loader } from '../common/loader';
import styles from './styles';
import { Label } from '../common/label';
import { Button } from '../common/button';
import { ItemHeader } from '../common/itemHeader';
import { heightScale, normalize, widthScale, isIPhoneX } from '../../config/normalize';
import { SearchBar } from '../common/searchBar';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      loading: false,
      list: [],
      searchText: '',
    }
  }

  onButtonPress = async () => {
    if (this.state.list && this.state.list.length > 0) {
      this.setState({
        showList: true,
      });
    }
    else {
      this.setState({
        showList: true,
        loading: true,
      });

      const data = await fetch(
        'https://api.myjson.com/bins/mbtzw', {}, 10000)
        .then((response) => response.json())
        .catch(() => Alert.alert('Error', 'Something went wrong. Please try again !!')
        );

      if (data && data !== null) {
        data.categories.map((item) => {
          item.collapsed = true
          return item
        })

        this.setState({ list: data.categories })
      }
      this.setState({ loading: false })
    }

  }

  onCrossPress = () => {
    this.setState({
      showList: false,
    });
  }

  renderCross = (style) => {
    return (
      <TouchableOpacity
        onPress={this.onCrossPress}
        activeOpacity={0.6}
        style={style}
      >
        <Image source={cross} style={styles.crossIconStyle} />
      </TouchableOpacity>
    )
  }

  renderLoader = () => {
    return (
      <View style={styles.loaderViewStyle}>
        <Loader
          color={'black'}
          viewStyle={styles.loaderTextViewStyle}
          textStyle={styles.loaderTextStyle}
        />
      </View>
    )

  }

  renderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Button
          viewStyle={styles.buttonViewStyle}
          textStyle={styles.buttonTextStyle}
          activeOpacity={0.5}
          onPress={this.onButtonPress}
          label={'Fetch Data'}
        />
      </View>
    )
  }

  renderLabel = (label, viewStyle, textStyle) => {
    return (
      <Label
        label={label}
        viewStyle={viewStyle}
        textStyle={textStyle}
      />
    )
  }

  renderImage = (source, imageStyle, viewStyle) => {
    return (
      <ImageView
        source={source}
        imageStyle={imageStyle}
        viewStyle={viewStyle}
      />
    )
  }

  renderListView = () => {
    return (
      <View style={styles.listContainer}>
        {this.renderCross()}
        {this.renderLabel('Approved Foods List', styles.labelViewStyle, styles.labelTextStyle)}
        {this.renderSearchBar()}
        {this.renderList()}
      </View>
    )
  }

  renderSearchBar = () => {
    return (
      <SearchBar
        viewStyle={styles.searchViewStyle}
        placeholder={'Try searching fat, sauces names....'}
        source={search}
        inputStyle={styles.inputStyle}
        imageStyle={styles.searchIconStyle}
        onChange={this.onChangeSearchText}
      />)
  }

  onChangeSearchText = (text) => {
    let itemList = [...this.state.list];

    itemList.map((itemObj) => {
      const { category: { subcategories } } = itemObj;
      let itemFound = false;
      if (text !== '') {
        this.setState({ searchText: text });
        subcategories.map((person) => {
          person.items.map((item) => {
            if (item.startsWith(text)) {
              itemFound = true;
            }
            return item;
          })
          return person;
        });
        itemObj.collapsed = !itemFound;
      } else {
        itemObj.collapsed = true;
        this.setState({ searchText: '' });
      }
      return itemObj;
    })
    this.setState({
      list: itemList
    })
  }

  renderList = () => {
    return (
      <FlatList
        data={this.state.list}
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderItem}
        bounces={false}
        style={{ marginBottom: heightScale(30) }}
        showsVerticalScrollIndicator={false}
      />
    )
  }

  renderItem = ({ item: { category, collapsed }, index }) => {
    return (
      <View>
        <ItemHeader
          viewStyle={[styles.itemHeaderViewStyle, index == 0 ? { marginTop: heightScale(12) } : null]}
          source={gift}
          category={category}
          textStyle={styles.itemHeaderTextStyle}
          onPress={() => this.onPressListHeader(index)}
          collapsed={collapsed}
          itemTileStyle={styles.itemTileStyle}
          searchText={this.state.searchText}
        />
      </View>
    )
  }

  onPressListHeader = (selectedIndex) => {
    let newList = this.state.list;
    newList.map((item, index) => {
      if (index === selectedIndex) {
        item.collapsed = item.collapsed === true ? false : true;
        return item;
      } else return item;
    });
    this.setState({ list: newList });
  }

  renderNoDataView = () => {
    return (
      <>
        {this.renderCross({ marginLeft: widthScale(20) })}
        <Label
          label={'No Data found'}
          viewStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          textStyle={{ fontSize: normalize(20) }}
        />
      </>
    )
  }

  render() {
    const { showList, list, loading } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {showList && list && list.length > 0
          ? this.renderImage(mail, styles.mailIconStyle, isIPhoneX() ? [styles.mailIconViewStyle, { top: 70 }] : styles.mailIconViewStyle)
          : null
        }
        <ScrollView
          contentContainerStyle={styles.container}
          bounces={false}
        >
          {showList ?
            (
              loading ?
                this.renderLoader() :
                list && list.length > 0
                  ? this.renderListView()
                  : this.renderNoDataView()
            ) :
            this.renderButton()
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}