import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";

export function Welcome() {
	return (
		<YStack flex={1} gap="xl" bg="purple" pd="lg" insetTop>
			<YStack gap="lg" insetTop>
				<Text variant="h1">Welcome to JeopardyTime</Text>
				<Text variant="h2">
					Play Jeopardy with your friends, and family. Without the hassle of
					needing anything but a phone.
				</Text>
			</YStack>
			<YStack gap="md" jc="center">
				<Button variant="white" screen="SignIn">
					Sign in
				</Button>
				<Text variant="subtitle" style={{ textAlign: "center" }}>
					or
				</Text>
				<Button variant="white" screen="SignUp">
					Create account
				</Button>
			</YStack>
		</YStack>
	);
}
