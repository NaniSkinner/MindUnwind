import { Stack } from "expo-router";

export default function PublicLayout() {
  console.log("🔓 PublicLayout rendering");
  return <Stack screenOptions={{ headerShown: false }} />;
}
