import LoadingView from '@/components/LoadingView';
import { Card } from '@/components/ui/Card';
import { Image } from '@/components/ui/Image';
import Text from '@/components/ui/Text';
import YStack from '@/components/ui/YStack';
import { api } from '@/convex/_generated/api';
import { formatUnixTimestamp } from '@/lib/utils/time';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'convex/react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { ScreenProps } from '..';

export function PublicProfile({ route }: ScreenProps<'Profile'>) {
  const navigation = useNavigation();

  const user = useQuery(api.users.queries.getByUsername, {
    username: route.params.username,
  });

  useEffect(() => {
    navigation.setOptions({
      title: route.params.username,
    });
  }, [navigation, route.params.username]);

  if (!user) {
    return <LoadingView />;
  }

  const createdAt = formatUnixTimestamp(user._creationTime);

  return (
    <YStack flex={1} gap="lg" py="xl" insetTop>
      <YStack gap="md" ai="center">
        <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
        <YStack>
          <Text variant="h1">@{user.username}</Text>
        </YStack>
      </YStack>
      <YStack gap="md">
        <Card>
          <YStack gap="md">
            <YStack>
              <Text variant="subtitle">Joined at</Text>
              <Text>{createdAt}</Text>
            </YStack>
          </YStack>
        </Card>
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
  },
});
