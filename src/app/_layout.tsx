import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider } from "../features/cart/CartContext";
import { ThemeProvider } from "../theme/ThemeProvider";

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        // ignore - splash may have been hidden already
      }
      setIsAppReady(true);
    }
    prepare();
  }, []);

  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const [showOverlay, setShowOverlay] = useState(true);

  const onLayoutRootView = useCallback(() => {
    if (!isAppReady) return;

    // Cross-fade the overlay (which matches the native splash) out, then hide native splash
    Animated.timing(overlayOpacity, { toValue: 0, duration: 220, useNativeDriver: true }).start(async () => {
      setShowOverlay(false);
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        // ignore
      }
    });
  }, [isAppReady, overlayOpacity]);

  if (!isAppReady) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <CartProvider>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Stack screenOptions={{ headerShown: false }} />
            {showOverlay && (
              <Animated.View pointerEvents="none" style={[styles.overlay, { opacity: overlayOpacity }]}> 
                <View style={styles.overlayInner}>
                  <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
                </View>
              </Animated.View>
            )}
          </View>
        </CartProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  overlayInner: { alignItems: 'center' },
  logo: { width: 160, height: 160, resizeMode: 'contain', borderRadius: 24 },
});
