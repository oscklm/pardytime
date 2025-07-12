import { Logo } from "@/components/Logo";
import Button from "@/components/ui/Button";
import { Image } from "@/components/ui/Image";
import YStack from "@/components/ui/YStack";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function Welcome() {
  return (
    <View style={styles.container}>
      <YStack gap="lg" insetTop>
        <YStack gap="md" ai="center">
          <Logo />
        </YStack>
        <View style={styles.explainer}>
          <Text style={styles.title}>
            <Text style={styles.textRed}>Jeopardy</Text>
            <Text style={styles.textGreen}>Time</Text>
          </Text>
          <Text style={styles.subtitle}>
            Guaranteed fun with your friends and family. Trivia has never been
            more engaging!
          </Text>
        </View>
      </YStack>
      <YStack gap="lg" px="xl" jc="center">
        <Button variant="white" screen="SignIn">
          Sign in
        </Button>
        <Text style={styles.subtitle}>or</Text>
        <Button variant="white" screen="SignUp">
          Create account
        </Button>
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
    paddingBottom: th.space.lg,
    gap: th.space.lg,
    backgroundColor: th.colors.backgroundPrimary,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: th.radius.lg,
    backgroundColor: th.colors.backgroundSecondary,
  },
  explainer: {
    alignSelf: "center",
    gap: th.space.sm,
    maxWidth: 300,
    marginBottom: th.space.xxl,
  },
  title: {
    fontSize: 36,
    lineHeight: 36 * 1.3,
    letterSpacing: 0.5,
    fontWeight: "800",
    textAlign: "center",
    color: th.colors.labelPrimary,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 22 * 1.3,
    textAlign: "center",
    color: th.colors.labelSecondary,
  },
  textRed: {
    color: th.colors.yellow,
  },
  textGreen: {
    color: th.colors.green,
  },
}));
