import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigation} from '../navigation/Navigation';
import {useSelector} from 'react-redux';
import {selectNextUser, selectPreviousUser} from '../redux/selectors';
import useColorsTheme from '../constants/colors';
import {dimensions} from '../constants/dimensions';
import {fonts} from '../constants/fonts';
import {Screens} from '../constants/enumerations';
import {User} from '../types/types';
import Strings from '../../strings/strings.json';

const UserDetails = () => {
  const route = useRoute<RouteProp<StackNavigation, Screens.UserDetails>>();
  const {colors} = useColorsTheme();
  const [user, setUser] = useState<User>(route.params.user);

  const previousUser = useSelector(selectPreviousUser(user.id));
  const nextUser = useSelector(selectNextUser(user.id));

  const getAttribute = (title: string, attribute: string) => {
    return (
      <View style={styles.atrribute}>
        <Text style={[fonts.normal]}>{title}: </Text>
        <Text style={[fonts.body]}>{attribute}</Text>
      </View>
    );
  };

  const getButton = useCallback(
    (title: string, onPress: () => void, style?: ViewStyle) => {
      return (
        <TouchableOpacity style={style} onPress={onPress}>
          <Text style={[fonts.normal, {color: colors.mainColor}]}>{title}</Text>
        </TouchableOpacity>
      );
    },
    [colors.mainColor],
  );

  const loadPreviousUser = useCallback(() => {
    if (previousUser) {
      setUser(previousUser);
    }
  }, [previousUser]);

  const loadNextUser = useCallback(() => {
    if (nextUser) {
      setUser(nextUser);
    }
  }, [nextUser]);

  const getButtons = useCallback(() => {
    const style: ViewStyle = {
      flexDirection: !previousUser ? 'row-reverse' : 'row',
    };

    return (
      <View style={[style, styles.buttons]}>
        {previousUser && getButton(Strings.PreviousUser, loadPreviousUser)}
        {nextUser && getButton(Strings.NextUser, loadNextUser, styles.button)}
      </View>
    );
  }, [previousUser, nextUser, getButton, loadPreviousUser, loadNextUser]);

  return (
    <View style={styles.container}>
      {getButtons()}
      {getAttribute(Strings.UserName, user.name)}
      {getAttribute(Strings.Username, user.username)}
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  atrribute: {
    flexDirection: 'row',
    marginTop: dimensions.margin / 2,
    marginHorizontal: dimensions.margin,
  },
  buttons: {
    justifyContent: 'space-between',
    margin: dimensions.margin,
  },
  button: {
    alignItems: 'flex-end',
  },
});
