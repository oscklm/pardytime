import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import YStack from "@/components/ui/YStack";

const SignInScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		// TODO: Implement login logic
	};

	return (
		<YStack flex={1} pd="lg" gap="md" style={styles.container}>
			<Text variant="h1">Sign In</Text>

			<YStack gap="lg">
				<TextInput placeholder="Email" value={email} onChangeText={setEmail} />
				<TextInput
					placeholder="Password"
					value={password}
					secureTextEntry
					onChangeText={setPassword}
				/>
				<Button label="Login" isLoading={loading} onPress={handleLogin} />
			</YStack>

			<YStack ai="center" pd="xl">
				<Text>Don't have an account?</Text>
				<Link href={"/sign-up"} asChild>
					<Button variant="link" label="Sign up now" />
				</Link>
			</YStack>
		</YStack>
	);
};

const styles = StyleSheet.create((th) => ({
	container: {
		flex: 1,
		backgroundColor: th.colors.background,
	},
}));

export default SignInScreen;
