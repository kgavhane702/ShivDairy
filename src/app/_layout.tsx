import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../theme/ThemeProvider";

// Ensure the native splash screen does not auto-hide before JS is ready.
// Calling this at module load prevents a brief white/blank screen on some devices.
SplashScreen.preventAutoHideAsync().catch(() => {});

// Mark app JS start time for cold-start measurement
const APP_START_TS = Date.now();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const hasHiddenRef = useRef(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        // ignore - splash may have been hidden already
      }
      const readyTs = Date.now();
      console.log(`[startup] JS ready in ${readyTs - APP_START_TS}ms`);
      setIsAppReady(true);
    }
    prepare();
  }, []);


  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const [showOverlay, setShowOverlay] = useState(true);

  const onLayoutRootView = useCallback(() => {
    if (!isAppReady) return;
    if (hasHiddenRef.current) return;
    // Perform hide sequence (fade overlay + hide native splash)
    hasHiddenRef.current = true;
    Animated.timing(overlayOpacity, { toValue: 0, duration: 165, useNativeDriver: true }).start(async () => {
      setShowOverlay(false);
      try {
        const hideTsBefore = Date.now();
        await SplashScreen.hideAsync();
        const hideTsAfter = Date.now();
        console.log(`[startup] Native splash hidden at ${hideTsAfter - APP_START_TS}ms (hideAsync took ${hideTsAfter - hideTsBefore}ms)`);
      } catch (e) {
        // ignore
      }
    });
  }, [isAppReady, overlayOpacity]);

  // When JS becomes ready, attempt to hide splash on next frame (don't wait for onLayout)
  useEffect(() => {
    if (!isAppReady) return;
    // schedule for next animation frame to allow initial render
    const raf = requestAnimationFrame(() => {
      try {
        onLayoutRootView();
      } catch (e) {
        // ignore
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [isAppReady, onLayoutRootView]);

  if (!isAppReady) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Stack screenOptions={{ headerShown: false }} />
          {showOverlay && (
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity, pointerEvents: 'none' }]}> 
              <View style={styles.overlayInner}>
                <Image source={require('../../assets/images/icon.png')} style={styles.logo} resizeMode="contain" />
              </View>
            </Animated.View>
          )}
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  overlayInner: { alignItems: 'center' },
  logo: { width: 160, height: 160, borderRadius: 24 },
});
