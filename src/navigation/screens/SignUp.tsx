import { Button } from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import TextInput from '@/components/ui/TextInput';
import YStack from '@/components/ui/YStack';
import { useSignUp } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const SignUpScreen = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const navigation = useNavigation();

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
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

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
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        navigation.navigate('BottomTabs');
      } else {
        if (signUpAttempt.status === 'missing_requirements') {
          alert('Please complete all required fields.');
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
      <YStack flex={1} pd="lg" gap="md">
        <YStack gap="lg">
          <TextInput
            placeholder="Enter verification code"
            autoComplete="one-time-code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
          />
          <Button isLoading={loading} onPress={handleVerification}>
            Verify Email
          </Button>
          <Button
            variant="outline"
            onPress={() => setPendingVerification(false)}
          >
            Back
          </Button>
        </YStack>
      </YStack>
    );
  }

  // Main sign up form
  return (
    <YStack flex={1} pd="lg" gap="md">
      <YStack style={{ marginTop: 32, marginBottom: 16 }}>
        <Text variant="h1">Create an account</Text>
      </YStack>
      <YStack gap="lg">
        <TextInput
          autoCapitalize="none"
          autoFocus
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
        <Button isLoading={loading} onPress={handleSignUp}>
          Create account
        </Button>
      </YStack>
    </YStack>
  );
};

export default SignUpScreen;
