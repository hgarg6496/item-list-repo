import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const orientation = screenHeight > screenWidth ? 'PORTRAIT' : 'LANDSCAPE';

const guidelineBaseWidth = orientation === 'PORTRAIT' ? 350 : 680;
const guidelineBaseHeight = orientation === 'PORTRAIT' ? 680 : 350;

const widthScale = size => (width / guidelineBaseWidth) * size;
const heightScale = size => (height / guidelineBaseHeight) * size;

const moderateScale = (size, factor = 0.5) => size + (widthScale(size) - size) * factor;

function normalize(size, factor = 0.5) {
  return size + (widthScale(size) - size) * factor;
}

const isIPhoneX = () => {
  const isX = Platform.OS === 'ios' && (height > 800 || width > 800);
  return isX;
};

export {
  normalize,
  widthScale,
  heightScale,
  moderateScale,
  isIPhoneX
};
