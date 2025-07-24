/** biome-ignore-all lint/suspicious/noArrayIndexKey: <its ok> */
import type {
  BottomTabHeaderProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export interface CustomBottomTabNavigationOptions
  extends BottomTabNavigationOptions {
  hideTitle?: boolean;
  headerBgColor?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'orange';
}

interface CustomBottomTabHeaderProps
  extends Omit<BottomTabHeaderProps, 'options'> {
  options: CustomBottomTabNavigationOptions;
}

export const CustomBottomTabHeader = ({
  options,
}: CustomBottomTabHeaderProps) => {
  const { title, hideTitle, headerBgColor } = options;

  styles.useVariants({
    bgColor: headerBgColor,
  });

  return (
    <View style={styles.header}>
      {!hideTitle && <Text style={styles.titleLabel}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  header: {
    paddingTop: rt.insets.top,
    paddingHorizontal: th.space.lg,
    paddingBottom: th.space.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 125,
    variants: {
      bgColor: {
        green: {
          backgroundColor: th.colors.green,
        },
        yellow: {
          backgroundColor: th.colors.yellow,
        },
        red: {
          backgroundColor: th.colors.red,
        },
        orange: {
          backgroundColor: th.colors.orange,
        },
      },
    },
  },
  titleLabel: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '900',
    color: th.colors.labelPrimary,
    variants: {
      bgColor: {
        purple: {
          color: th.colors.white,
        },
        blue: {
          color: th.colors.white,
        },
        green: {
          color: th.colors.white,
        },
        yellow: {
          color: th.colors.white,
        },
        red: {
          color: th.colors.white,
        },
        orange: {
          color: th.colors.white,
        },
      },
    },
  },
}));
