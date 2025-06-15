import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import YStack from "@/components/ui/YStack";

const SignUpScreen = () => {
	const { isLoaded, signUp, setActive } = useSignUp();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [pendingVerification, setPendingVerification] = useState(false);
	const [verificationCode, setVerificationCode] = useState("");

	const handleSignUp = async () => {
		if (!isLoaded) return;

		setLoading(true);
		try {
			// Create the sign-up with email, password, and optional first name
			await signUp.create({
				emailAddress: email,
				password,
				username,
			});

			// Send verification email
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

			// Show verification form
			setPendingVerification(true);
		} catch (err: unknown) {
			if (err instanceof Error) {
				alert(err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleVerification = async () => {
		if (!isLoaded) return;

		setLoading(true);
		try {
			// Attempt verification with the code
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code: verificationCode,
			});

			// If verification successful, set session and redirect
			if (signUpAttempt.status === "complete") {
				await setActive({ session: signUpAttempt.createdSessionId });
				router.replace("/");
			} else {
				if (signUpAttempt.status === "missing_requirements") {
					alert("Please complete all required fields.");
				}
				alert(`Verification status: ${signUpAttempt.status}`);
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				alert(err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	// Show verification form if pending verification
	if (pendingVerification) {
		return (
			<YStack flex={1} pd="lg" gap="md" style={styles.container}>
				<YStack gap="lg">
					<TextInput
						placeholder="Enter verification code"
						autoComplete="one-time-code"
						value={verificationCode}
						onChangeText={setVerificationCode}
						keyboardType="numeric"
					/>
					<Button
						label="Verify Email"
						isLoading={loading}
						onPress={handleVerification}
					/>
					<Button
						label="Back"
						variant="outline" // Assuming you have a variant prop
						onPress={() => setPendingVerification(false)}
					/>
				</YStack>
			</YStack>
		);
	}

	// Main sign up form
	return (
		<YStack flex={1} pd="lg" gap="md" style={styles.container}>
			<YStack gap="lg">
				<TextInput
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Username"
					value={username}
					onChangeText={setUsername}
				/>
				<TextInput
					placeholder="Email"
					autoComplete="email"
					value={email}
					onChangeText={setEmail}
					autoCapitalize="none"
					keyboardType="email-address"
				/>
				<TextInput
					autoComplete="password"
					placeholder="Password"
					value={password}
					secureTextEntry
					onChangeText={setPassword}
				/>
				<Button
					label="Create account"
					isLoading={loading}
					onPress={handleSignUp}
				/>
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
