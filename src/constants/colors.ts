import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useColorScheme} from 'react-native';

const useColorsTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    textColor: isDarkMode ? Colors.lighter : Colors.darker,
    mainColor: '#008000',
    lightMainColor: '#00800026',
    blackColor: '#000000',
    whiteColor: '#FFFFFF',
  };

  const shadow = {
    shadowColor: colors.blackColor,
    shadowOffset: {height: 2, width: 2},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5,
  };

  return {colors, shadow};
};

export default useColorsTheme;
