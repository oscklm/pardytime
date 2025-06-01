import { useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import { authClient } from "@/lib/auth/auth-client";
import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";
import TextInput from "@/shared/ui/TextInput";
import YStack from "@/shared/ui/YStack";

const SignUpScreen = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSignUp = async () => {
		const { data, error } = await authClient.signUp.email(
			{
				name,
				email,
				password,
			},
			{
				onRequest: () => {
					setLoading(true);
				},
				onSuccess: () => {
					setLoading(false);
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
			<Text variant="h1">Sign Up</Text>
			<YStack gap="lg">
				<TextInput placeholder="Name" value={name} onChangeText={setName} />
				<TextInput placeholder="Email" value={email} onChangeText={setEmail} />
				<TextInput
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
				/>
				<Button label="Signup" isLoading={loading} onPress={handleSignUp} />
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

export default SignUpScreen;
