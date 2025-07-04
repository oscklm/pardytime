import Button from "@/components/ui/Button";
import YStack from "@/components/ui/YStack";

export function MenuScreen() {
	return (
		<YStack flex={1} gap="md" pd="lg">
			<Button variant="menu" screen="HelpStack" params={{ screen: "Games" }}>
				How to play
			</Button>
		</YStack>
	);
}
