import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { ResultAsync } from "neverthrow";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import YStack from "@/components/ui/YStack";

const SignInScreen = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigation = useNavigation();

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
      }
    );

    setIsSigningIn(true);

    if (signInAttempt.isErr()) {
      alert(signInAttempt.error.message);
      setIsSigningIn(false);
      setIsLoading(false);
      return;
    }

    const { status, createdSessionId } = signInAttempt.value;

    if (status === "complete") {
      await setActive({ session: createdSessionId });
      navigation.canGoBack() && navigation.goBack();
    } else {
      alert(`${status}`);
    }
  };

  const handlePressSignUp = () => {
    navigation.canGoBack() && navigation.goBack();
    setTimeout(() => {
      navigation.navigate("SignUp");
    }, 50);
  };

  if (isSigningIn) {
    return (
      <>
        <YStack flex={1} ai="center" jc="center" pd="lg" gap="md">
          <YStack gap="lg">
            <Text variant="h3">Signing you in...</Text>
            <ActivityIndicator size="large" color={"black"} />
          </YStack>
        </YStack>
      </>
    );
  }

  return (
    <YStack flex={1} pd="lg" gap="md">
      <YStack style={{ marginTop: 32, marginBottom: 16 }}>
        <Text variant="h1">Sign in to your account</Text>
      </YStack>
      <YStack gap="lg">
        <TextInput
          autoCapitalize="none"
          autoFocus
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
        <Button isLoading={isLoading} onPress={handleLogin}>
          Sign in
        </Button>
      </YStack>

      <YStack ai="center" pd="xl">
        <Text>Don't have an account?</Text>
        <Button variant="link" onPress={handlePressSignUp}>
          Sign up now
        </Button>
      </YStack>
      <View style={{ flex: 1 }} />
    </YStack>
  );
};

export default SignInScreen;
