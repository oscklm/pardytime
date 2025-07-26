import { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

export const Container = ({ children }: PropsWithChildren) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create((th) => ({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: {
      xs: '100%', // mobile: full width
      sm: 540, // small screens
      md: 720, // medium screens/tablets
      lg: 960, // large screens/desktops
      xl: 1200, // extra large screens
    },
    paddingHorizontal: 16, // typical horizontal padding
  },
}));
