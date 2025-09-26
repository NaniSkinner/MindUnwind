import { SignIn } from "../../components/clerk/SignIn";

export default function PublicHomePage() {
  console.log("🔓 PublicHomePage rendering");

  return (
    <SignIn
      homeUrl="/(protected)"
      signUpUrl="/(public)/sign-up"
      scheme="mindunwind://"
    />
  );
}
