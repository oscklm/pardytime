import { useSignIn } from "@clerk/clerk-expo";
import type { SignInResource } from "@clerk/types";
import { useRouter } from "expo-router";
import { errAsync, ResultAsync } from "neverthrow";
import React from "react";
import { StyleSheet } from "react-native-unistyles";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import YStack from "@/components/ui/YStack";

function signInToClerk(
  signIn: SignInResource,
  email: string,
  password: string,
): ResultAsync<SignInResource, Error> {
  if (email.length < 3) {
    // Throw a async result from a synchronous block thanks to the errAsync helper
    return errAsync(new Error("Username is too short"));
  }

  // Wrap the async method into a ResultAsync thanks to fromPromise
  // The seconds argument catches the error from the promise
  return ResultAsync.fromPromise(
    signIn.create({
      identifier: emailAddress,
      password,
    }),
    () => new Error("Database error"),
  );
}

const SignInScreen = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    setIsLoading(true);

    const signInAttempt = await signInToClerk(signIn, emailAddress, password); // asyncRes is a `ResultAsync<User, Error>`

    // res is a Result<string, Error>
    if (signInAttempt.isErr()) {
      console.log(`Oops fail: ${signInAttempt.error.message}`);
      return;
    }

    const { status, createdSessionId } = signInAttempt.value;

    if (status === "complete") {
      await setActive({ session: createdSessionId });
      router.replace("/");
    } else {
      alert(`${status}`);
    }
  };

  return (
    <YStack flex={1} pd="lg" gap="md" style={styles.container}>
      <Text variant="h1">Sign In</Text>
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
        />
        <Button label="Login" isLoading={isLoading} onPress={handleLogin} />
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
