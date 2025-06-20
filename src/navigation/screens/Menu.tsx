import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";

export function Menu() {
	return (
		<YStack flex={1} pd="lg" gap="md" insetTop>
			<Text variant="h1">Menu</Text>
			<YStack gap="md">
				<Button variant="menu" screen="Settings">
					Settings
				</Button>
				<Button variant="menu" screen="Settings">
					Help
				</Button>
			</YStack>
		</YStack>
	);
}
