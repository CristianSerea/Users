import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import useColorsTheme from '../constants/colors';
import {dimensions} from '../constants/dimensions';
import {fonts} from '../constants/fonts';
import Strings from '../../strings/strings.json';

const LoadingView = () => {
  const {colors} = useColorsTheme();

  return (
    <View style={styles.container} testID="LoadingView">
      <Text style={fonts.normal}>{Strings.LoadingData}...</Text>
      <ActivityIndicator
        style={styles.activityIndicator}
        color={colors.mainColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    marginTop: dimensions.margin,
  },
});

export default LoadingView;
