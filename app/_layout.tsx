import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import * as Linking from "expo-linking";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function RootLayoutWithAuth() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Debug logging
  console.log("🔐 Auth Debug:", { isSignedIn, isLoaded, segments });

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(public)";

    console.log(
      "📍 Current segments:",
      segments,
      "inAuthGroup:",
      inAuthGroup,
      "isSignedIn:",
      isSignedIn
    );

    if (isSignedIn && inAuthGroup) {
      // Signed in but in public route - redirect to protected
      console.log("🔀 Redirecting to protected route");
      router.replace("/(protected)");
    } else if (!isSignedIn && !inAuthGroup) {
      // Not signed in but not in public route - redirect to public
      console.log("🔀 Redirecting to public route");
      router.replace("/(public)");
    }
  }, [isSignedIn, isLoaded, segments]);

  // Handle OAuth deep link callbacks
  useEffect(() => {
    const handleUrl = (url: string) => {
      console.log("🔗 Deep link received:", url);
      if (url.includes("oauth-callback")) {
        console.log("📱 OAuth callback detected");
        // Small delay to allow Clerk to process the session
        setTimeout(() => {
          if (isSignedIn) {
            console.log("✅ Redirecting to protected after OAuth");
            router.replace("/(protected)");
          } else {
            console.log("❌ OAuth failed, staying on public");
            router.replace("/(public)");
          }
        }, 1000);
      }
    };

    // Listen for deep links
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleUrl(url);
    });

    // Handle initial URL if app was opened via deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleUrl(url);
      }
    });

    return () => {
      subscription?.remove();
    };
  }, [isSignedIn, router]);

  if (!isLoaded) {
    console.log("🔄 Auth still loading...");
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <RootLayoutWithAuth />
    </ClerkProvider>
  );
}
