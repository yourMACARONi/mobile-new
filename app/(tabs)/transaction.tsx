import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";

export default function transaction() {
  return (
    <SafeAreaView>
      <Text>Hello</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
