import { StyleSheet } from 'react-native';
import {
  normalize,
  widthScale,
  heightScale,
  isIPhoneX,
} from '../../config/normalize';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: heightScale(15),
    backgroundColor: '#edecf1',
  },
  listContainer: {
    paddingHorizontal: widthScale(20),
    paddingTop: heightScale(8),
    backgroundColor: '#edecf1',
  },
  crossIconStyle: {
    height: heightScale(25),
    width: widthScale(25),
  },
  mailIconStyle: {
    height: heightScale(35),
    width: widthScale(isIPhoneX() ? 55 : 45),
    tintColor: 'white',
  },
  mailIconViewStyle: {
    position: 'absolute',
    top: isIPhoneX() ? 70 : 35,
    right: 10,
    borderRadius: normalize(isIPhoneX() ? 90 : 80),
    height: normalize(isIPhoneX() ? 90 : 80),
    width: normalize(isIPhoneX() ? 90 : 80),
    backgroundColor: '#308dde',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  labelViewStyle: {
    marginTop: heightScale(50),
  },
  labelTextStyle: {
    fontSize: normalize(28),
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonViewStyle: {
    height: normalize(200),
    width: normalize(200),
    borderRadius: normalize(200),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#015294',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: normalize(30),
  },
  loaderTextViewStyle: {
    marginTop: heightScale(5),
  },
  loaderTextStyle: {
    fontSize: normalize(16),
  },
  loaderViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  itemHeaderViewStyle: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: heightScale(70),
    marginTop: heightScale(20),
    paddingHorizontal: widthScale(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemHeaderTextStyle: {
    fontSize: normalize(16),
  },
  itemTileStyle: {
    backgroundColor: 'white',
    height: heightScale(55),
    paddingHorizontal: widthScale(10),
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f5f8'
  },
  searchViewStyle: {
    backgroundColor: '#ecf2f7',
    height: heightScale(55),
    paddingHorizontal: widthScale(20),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ecf2f7',
    marginTop: heightScale(40),
    flexDirection: 'row',
    borderRadius: 5,
  },
  inputStyle: {
    marginLeft: widthScale(10),
    flex: 1,
    fontSize: normalize(16),
  },
  searchIconStyle: {
    height: 20,
    width: 20,
  },
});
