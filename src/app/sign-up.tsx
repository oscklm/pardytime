import { useState } from "react";
import { Alert } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import YStack from "@/components/ui/YStack";
import { supabase } from "@/lib/supabase";

const SignUpScreen = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSignUp = async () => {
		const { error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
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
					secureTextEntry
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
