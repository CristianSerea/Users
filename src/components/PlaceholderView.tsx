import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fonts} from '../constants/fonts';

type Props = {
  text: string;
};

const PlaceholderView = ({text}: Props) => {
  return (
    <View style={styles.container} testID="PlaceholderView">
      <Text style={fonts.normal} testID={text}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlaceholderView;
