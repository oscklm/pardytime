import { AnimatedSpinner } from './AnimatedSpinner';
import Text from './ui/Text';
import YStack from './ui/YStack';

interface ListEmptyComponentProps {
  status: 'pending' | 'error' | 'success';
  message?: string;
  descriptor?: string;
}

export const ListEmptyComponent = ({
  status,
  message,
  descriptor = 'items',
}: ListEmptyComponentProps) => {
  return (
    <YStack flex={1} gap="md">
      {status === 'pending' && <AnimatedSpinner variant="flat" size={32} />}
      {status === 'error' && (
        <Text variant="subtitle">{message || 'Error'}</Text>
      )}
      {status === 'success' && (
        <Text variant="subtitle">{message || `No ${descriptor} found`}</Text>
      )}
    </YStack>
  );
};
