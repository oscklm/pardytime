import { StyleSheet } from "react-native-unistyles";
import Text from "@/shared/ui/Text";
import YStack from "@/shared/ui/YStack";

const SignInScreen = () => (
	<YStack flex={1} pd="lg" gap="md" style={styles.container}>
		<Text variant="h1">Sign In</Text>
		<Text>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio laudantium
			eius sint iusto praesentium animi quod sunt magnam esse aliquam fugiat
			porro molestias, expedita blanditiis. Vitae, dolor sunt! Non, dolorem.
		</Text>
	</YStack>
);

const styles = StyleSheet.create((th) => ({
	container: {
		flex: 1,
		backgroundColor: th.colors.background,
	},
}));

export default SignInScreen;
