import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, View } from "react-native";

interface FormProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
}

export function Form({ title, subtitle, children, headerChildren }: FormProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.contentWrapper}>
        <View
          style={[
            styles.headerContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              {subtitle}
            </Text>
          )}
          {headerChildren}
        </View>
        <View
          style={[styles.formContainer, { backgroundColor: colors.background }]}
        >
          {children}
        </View>
      </View>
    </View>
  );
}

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  contentWrapper: {
    width: "100%",
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 8,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 34,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "500",
    marginBottom: 8,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
