import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import * as Updates from "expo-updates";
import { ResultAsync } from "neverthrow";
import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import YStack from "@/components/ui/YStack";

const SignInScreen = () => {
	const { signIn, setActive, isLoaded } = useSignIn();

	const [isLoading, setIsLoading] = React.useState(false);
	const [emailAddress, setEmailAddress] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleLogin = async () => {
		if (!isLoaded) return;

		setIsLoading(true);

		const signInAttempt = await ResultAsync.fromPromise(
			signIn.create({
				identifier: emailAddress,
				password,
			}),
			(error: unknown) => {
				if (isClerkAPIResponseError(error)) {
					return new Error(error.message);
				}
				return new Error("Unknown error");
			},
		);

		if (signInAttempt.isErr()) {
			alert(signInAttempt.error.message);
			setIsLoading(false);
			return;
		}

		const { status, createdSessionId } = signInAttempt.value;

		if (status === "complete") {
			await setActive({ session: createdSessionId });
			router.replace("/");
			setIsLoading(false);
		} else {
			alert(`${status}`);
		}
	};

	return (
		<YStack flex={1} pd="lg" gap="md" style={styles.container}>
			<YStack gap="lg">
				<TextInput
					autoCapitalize="none"
					value={emailAddress}
					placeholder="Enter email"
					onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
				/>
				<TextInput
					value={password}
					placeholder="Enter password"
					secureTextEntry={true}
					onChangeText={(password) => setPassword(password)}
					onSubmitEditing={handleLogin}
				/>
				<Button label="Sign in" isLoading={isLoading} onPress={handleLogin} />
			</YStack>

			<YStack ai="center" pd="xl">
				<Text>Don't have an account?</Text>
				<Link href={"/sign-up"} asChild>
					<Button variant="link" label="Sign up now" />
				</Link>
			</YStack>
			<View style={{ flex: 1 }} />
			<YStack ai="center" jc="center" pd="md">
				<Text>{Updates.runtimeVersion}</Text>
				<Text color="primaryMuted">
					{process.env.EXPO_PUBLIC_CONVEX_URL?.split("://")[1].slice(
						-process.env.EXPO_PUBLIC_CONVEX_URL.length,
						-13,
					)}
				</Text>
				<Text color="primaryMuted" variant="h3">
					{process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY?.split("_")[1]}
				</Text>
			</YStack>
		</YStack>
	);
};

const styles = StyleSheet.create((th, rt) => ({
	container: {
		flex: 1,
		paddingBottom: rt.insets.bottom,
		backgroundColor: th.colors.background,
	},
}));

export default SignInScreen;
