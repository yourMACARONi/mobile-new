import { ActivityIndicator, View } from "react-native";
export default function LoadingIndicator() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
