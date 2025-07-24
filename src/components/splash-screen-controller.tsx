import { useConvexAuth } from 'convex/react';
import * as SplashScreen from 'expo-splash-screen';
import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';

void SplashScreen.preventAutoHideAsync();

const SPLASH_SCREEN_TIMEOUT = 2500; // 2.5 seconds

export default function SplashScreenController({
  children,
}: PropsWithChildren) {
  const { isLoading: isAuthLoading } = useConvexAuth();
  const hasHiddenSplash = useRef(false);

  const hideSplashScreen = () => {
    if (hasHiddenSplash.current) return;
    hasHiddenSplash.current = true;
    void SplashScreen.hideAsync();
  };

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      hideSplashScreen();
    }, SPLASH_SCREEN_TIMEOUT);

    if (!isAuthLoading) {
      hideSplashScreen();
    }

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [isAuthLoading]);

  if (isAuthLoading) {
    return null;
  }

  return children;
}
