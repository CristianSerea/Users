import React, {memo, useMemo} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import useColorsTheme from '../constants/colors';
import {dimensions} from '../constants/dimensions';
import {fonts} from '../constants/fonts';
import {User} from '../types/types';
import Strings from '../../strings/strings.json';

type Props = {
  user: User;
  index: number;
  onPress: () => void;
};

const getFullAddress = (user: User) => {
  return (
    user.address.street + ' ' + user.address.city + ' ' + user.address.zipcode
  );
};

const UserCard = ({user, index, onPress}: Props) => {
  const {colors, shadow} = useColorsTheme();

  const marginRight = useMemo(() => {
    return index % 2 === 1 ? dimensions.margin : 0;
  }, [index]);

  const getAttribute = (title: string, attribute: string) => {
    return (
      <View style={styles.atrribute} testID={`${title}-${attribute}`}>
        <Text style={[fonts.normal]}>{title}:</Text>
        <Text style={[fonts.body]} testID={`${attribute}`}>
          {attribute}
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        shadow,
        {backgroundColor: colors.whiteColor, marginRight: marginRight},
      ]}
      onPress={onPress}
      testID={`UserCard-${user.id}`}>
      <Text style={fonts.title}>{user.name}</Text>
      {getAttribute(Strings.Email, user.email)}
      {getAttribute(Strings.Phone, user.phone)}
      {getAttribute(Strings.Address, getFullAddress(user))}
      {getAttribute(Strings.Company, user.company.name)}
    </TouchableOpacity>
  );
};

export default memo(UserCard);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: dimensions.borderRadius,
    padding: dimensions.margin / 2,
    marginBottom: dimensions.margin,
    marginLeft: dimensions.margin,
  },
  atrribute: {
    marginTop: dimensions.margin / 2,
  },
});
