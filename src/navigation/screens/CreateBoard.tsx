import Text from '@/components/ui/Text';
import YStack from '@/components/ui/YStack';

export function CreateBoard() {
  return (
    <YStack flex={1} gap="md" pd="lg" ai="center">
      <YStack ai="center">
        <Text variant="h1">Coming soon</Text>
        <Text variant="subtitle">This feature is coming soon...</Text>
      </YStack>
    </YStack>
  );
}
