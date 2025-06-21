import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";

export function Welcome() {
	return (
		<YStack flex={1} gap="lg" bg="purple" pd="lg" insetTop>
			<Text variant="h1">Welcome to JeopardyTime</Text>
			<Text variant="h2">
				Create your own Jeopardy boards and share them with your friends.
			</Text>
			<Button screen="SignIn">Sign in</Button>
			<Button screen="SignUp">Sign up</Button>
		</YStack>
	);
}
