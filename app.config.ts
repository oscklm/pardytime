import type { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.oneguylabs.pardytime.dev";
  }

  if (IS_PREVIEW) {
    return "com.oneguylabs.pardytime.preview";
  }

  return "com.oneguylabs.pardytime";
};

const getAppName = () => {
  if (IS_DEV) {
    return "PardyTime (Dev)";
  }

  if (IS_PREVIEW) {
    return "PardyTime (Preview)";
  }

  return "PardyTime";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "pardytime",
  version: "1.2.1",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  scheme: "pardytime",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    permissions: [
      "android.permission.CAMERA",
      "android.permission.RECORD_AUDIO",
    ],
    package: getUniqueIdentifier(),
  },
  web: {
    bundler: "metro",
    output: "single",
    favicon: "./src/assets/images/favicon.png",
  },
  plugins: [
    "expo-asset",
    "expo-secure-store",
    [
      "expo-dev-client",
      {
        launchMode: "most-recent",
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./src/assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#312C4C",
      },
    ],
    "expo-background-task",
    [
      "expo-camera",
      {
        cameraPermission:
          "Allow $(PRODUCT_NAME) to access your camera in order to take photos, videos, and scan QR codes",
        microphonePermission:
          "Allow $(PRODUCT_NAME) to access your microphone in order to record audio",
        recordAudioAndroid: true,
      },
    ],
    "expo-web-browser",
    "react-native-edge-to-edge",
  ],
  experiments: {
    typedRoutes: true,
  },
  updates: {
    url: "https://u.expo.dev/e86332b1-c2bc-4b72-ada9-71891c1a88d0",
  },
  extra: {
    router: {},
    eas: {
      projectId: "e86332b1-c2bc-4b72-ada9-71891c1a88d0",
    },
  },
  runtimeVersion: {
    policy: "appVersion",
  },
});
