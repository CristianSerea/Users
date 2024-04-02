import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet, ListRenderItemInfo} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigation} from '../navigation/Navigation';
import useColorsTheme from '../constants/colors';
import {dimensions} from '../constants/dimensions';
import {Screens} from '../constants/enumerations';
import LoadingView from '../components/LoadingView';
import PlaceholderView from '../components/PlaceholderView';
import UserCard from '../components/UserCard';
import {User} from '../types/types';
import {fetchUsers} from '../redux/reducers';
import {StoreState, StoreDispatch} from '../redux/store';
import Strings from '../../strings/strings.json';

const Users = () => {
  const {colors} = useColorsTheme();
  const dispatch = useDispatch<StoreDispatch>();
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const {users, error, loading} = useSelector(
    (state: StoreState) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const renderItem = ({item, index}: ListRenderItemInfo<User>) => {
    return <UserCard user={item} index={index} onPress={() => onPress(item)} />;
  };

  const onPress = (user: User) => {
    navigation.navigate(Screens.UserDetails, {user});
  };

  const keyExtractor = (user: User) => {
    return `${user.id}`;
  };

  const listEmptyComponent = () => {
    const text = error ? error.message : Strings.NoUsers;
    return <PlaceholderView text={text} />;
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.lightMainColor}]}>
      {loading ? (
        <LoadingView />
      ) : (
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={users}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={listEmptyComponent}
        />
      )}
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: dimensions.margin,
  },
  title: {
    textAlign: 'center',
    marginVertical: dimensions.margin,
  },
});
