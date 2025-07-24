import { Image } from './ui/Image';
import LogoLight from '@/assets/images/text-logo-light.png';
import LogoDark from '@/assets/images/text-logo-dark.png';
import { useUnistyles } from 'react-native-unistyles';

export const Logo = () => {
  const { rt } = useUnistyles();
  return (
    <Image
      source={rt.colorScheme === 'dark' ? LogoLight : LogoDark}
      style={{ width: 225, height: 225 }}
    />
  );
};
