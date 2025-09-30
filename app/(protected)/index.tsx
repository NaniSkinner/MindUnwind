import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text, TouchableOpacity, View } from "react-native";
import { SignOutButton } from "../../components/clerk/SignOutButton";

export default function Index() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleClearAllSessions = async () => {
    try {
      console.log("🧹 Clearing all sessions...");
      await signOut();
      // Additional cleanup if needed
      console.log("✅ All sessions cleared");
    } catch (error) {
      console.error("❌ Failed to clear sessions:", error);
    }
  };

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

      <View style={{ gap: 15 }}>
        <SignOutButton />

        {/* Debug button to clear sessions */}
        <TouchableOpacity
          onPress={handleClearAllSessions}
          style={{
            padding: 10,
            backgroundColor: "#ff6b6b",
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            Clear All Sessions (Debug)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
