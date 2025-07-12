import Logo from "@/assets/images/splash-icon.png";
import Button from "@/components/ui/Button";
import { Image } from "@/components/ui/Image";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";

export function Welcome() {
  return (
    <YStack flex={1} gap="xl" bg="purple" pd="xl" insetTop>
      <YStack gap="lg" insetTop>
        <YStack gap="md" ai="center">
          <Image source={Logo} style={{ width: 200, height: 200 }} />
        </YStack>
        <Text variant="h1" style={{ fontWeight: "900", color: "white" }}>
          JeopardyTime
        </Text>
        <Text variant="h2" style={{ color: "white" }}>
          Play Jeopardy with your friends, and family. Without the hassle of
          needing anything but a phone.
        </Text>
      </YStack>
      <YStack gap="md" px="xl" jc="center">
        <Button variant="white" screen="SignIn">
          Sign in
        </Button>
        <Text variant="label" style={{ textAlign: "center", color: "white" }}>
          or
        </Text>
        <Button variant="white" screen="SignUp">
          Create account
        </Button>
      </YStack>
    </YStack>
  );
}
