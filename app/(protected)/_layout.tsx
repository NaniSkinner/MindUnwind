import { Stack } from "expo-router";

export default function ProtectedLayout() {
  console.log("🔒 ProtectedLayout rendering");
  return <Stack screenOptions={{ headerShown: false }} />;
}
