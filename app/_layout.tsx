import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
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

  // Debug logging
  console.log("🔑 Clerk Key:", publishableKey ? "Present" : "MISSING");

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <RootLayoutWithAuth />
    </ClerkProvider>
  );
}
