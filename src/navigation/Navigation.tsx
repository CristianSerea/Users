import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import TabBarIcon from '../components/TabBarIcon';
import useColorsTheme from '../constants/colors';
import {Screens} from '../constants/enumerations';
import {fonts} from '../constants/fonts';
import Users from '../screens/Users';
import {User} from '../types/types';
import UserDetails from '../screens/UserDetails';
import Strings from '../../strings/strings.json';

const homeIcon = require('../assets/home.png');

export type StackNavigation = {
  Users: {};
  UserDetails: {user: User};
};

const Stack = createStackNavigator<StackNavigation>();
const StackNavigator = () => {
  const {colors} = useColorsTheme();

  return (
    <Stack.Navigator
      initialRouteName={Screens.Users}
      screenOptions={{
        headerStyle: {backgroundColor: colors.mainColor},
        headerTitleStyle: {color: colors.textColor},
        headerTintColor: colors.whiteColor,
      }}>
      <Stack.Screen
        name={Screens.Users}
        component={Users}
        options={() => ({title: Strings.Home})}
      />
      <Stack.Screen
        name={Screens.UserDetails}
        component={UserDetails}
        options={({route}) => ({title: route.params.user.name})}
      />
    </Stack.Navigator>
  );
};

const HomeTabBarIcon = () => {
  return <TabBarIcon source={homeIcon} />;
};

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const {colors} = useColorsTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarIcon: HomeTabBarIcon,
          tabBarActiveTintColor: colors.mainColor,
          tabBarStyle: {backgroundColor: colors.backgroundColor},
          tabBarLabelStyle: fonts.normal,
          headerShown: false,
        }}>
        <Tab.Screen name={Strings.Home} component={StackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
