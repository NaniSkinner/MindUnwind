import { SignIn } from "@/components/clerk/SignIn";

export default function Index() {
  console.log("📱 Public route rendering - SignIn form should appear");
  return <SignIn signUpUrl="" scheme="mindunwind" homeUrl="/(tabs)" />;
}
