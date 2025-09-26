import { SignIn } from "@/components/clerk/SignIn";

export default function Index() {
  return (
    <SignIn
      homeUrl="/(protected)"
      signUpUrl="/(public)/signUp"
      scheme="mindunwind"
    />
  );
}
