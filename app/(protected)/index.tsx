import { useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { SignOutButton } from "../../components/clerk/SignOutButton";

export default function Index() {
  const { user } = useUser();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Home Screen</Text>

      {user && (
        <View style={{ alignItems: "center", gap: 10 }}>
          <Text style={{ fontSize: 16 }}>Welcome!</Text>
          <Text style={{ fontSize: 14, color: "#666" }}>
            {user.emailAddresses[0]?.emailAddress || user.id}
          </Text>
        </View>
      )}

      <SignOutButton />
    </View>
  );
}
