import { router } from "expo-router";
import { useState } from "react";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { authClient } from "@/lib/auth/auth-client";
import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";
import YStack from "@/shared/ui/YStack";

const SignInScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		const { data, error } = await authClient.signIn.email(
			{
				email,
				password,
			},
			{
				onRequest: () => {
					setLoading(true);
				},
				onSuccess: () => {
					console.log("request onSuccess");
					setLoading(false);
					router.back();
				},
				onError: (ctx) => {
					setLoading(false);
					alert(ctx.error.message);
				},
			},
		);
		console.log({ data, error });
	};

	return (
		<YStack flex={1} pd="lg" gap="md" style={styles.container}>
			<Text variant="h1">Sign In</Text>
			<Text>
				{loading
					? "Logging in, please wait..."
					: "Please enter your email and password to log in."}
			</Text>
			<TextInput placeholder="Email" value={email} onChangeText={setEmail} />
			<TextInput
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
			/>
			<Button label="Login" onPress={handleLogin} />
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
