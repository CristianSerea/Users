import * as React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import useColorsTheme from '../constants/colors';

type Props = {
  source: ImageSourcePropType;
};

const TabBarIcon = ({source}: Props) => {
  const {colors} = useColorsTheme();

  return (
    <Image
      source={source}
      style={[styles.image, {tintColor: colors.mainColor}]}
      testID="TabBarIcon"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 22,
    height: 22,
  },
});

export default TabBarIcon;
