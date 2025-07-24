import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Text from '@/components/ui/Text';
import type { Doc } from '@/convex/_generated/dataModel';

const statusToColor = {
  pending: 'orange',
  active: 'green',
  completed: 'red',
};

export function GameStatusBadge({
  status,
}: {
  status: Doc<'games'>['status'];
}) {
  return (
    <View>
      <Text style={styles.statusLabel(status)}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create((th) => ({
  statusLabel: (status: keyof typeof statusToColor) => ({
    fontSize: 14,
    lineHeight: 14 * 1.3,
    minWidth: 80,
    textAlign: 'center',
    fontWeight: '600',
    color: th.colors[statusToColor[status] as keyof typeof th.colors],
    backgroundColor: `${th.colors[statusToColor[status] as keyof typeof th.colors]}30`,
    borderRadius: th.radius.md,
    padding: th.space.sm,
    paddingHorizontal: th.space.md,
    textTransform: 'uppercase',
  }),
}));
