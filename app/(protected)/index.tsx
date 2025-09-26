import { Text, View } from "react-native";
import { SignOutButton } from "../../components/clerk/SignOutButton";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text>Home Screen</Text>
      <SignOutButton />
    </View>
  );
}
