import type { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.oneguylabs.jeopardytime.dev';
  }

  if (IS_PREVIEW) {
    return 'com.oneguylabs.jeopardytime.preview';
  }

  return 'com.oneguylabs.jeopardytime';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'JeopardyTime (Dev)';
  }

  if (IS_PREVIEW) {
    return 'JeopardyTime (Preview)';
  }

  return 'JeopardyTime';
};


export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "jeopardytime",
  version: "1.1.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  scheme: "jeopardytime",
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
        launchMode: "most-recent"
      }
    ],
    [
      "expo-splash-screen",
      {
        image: "./src/assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    "expo-background-task",
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera in order to take photos, videos, and scan QR codes",
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone in order to record audio",
        recordAudioAndroid: true,
      },
    ],
    "expo-web-browser",
    "react-native-edge-to-edge"
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "2e863eba-2833-456a-a488-b737342b1b99",
    },
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    url: "https://u.expo.dev/2e863eba-2833-456a-a488-b737342b1b99",
  },
});