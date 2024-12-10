import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import ExpenseTable from "@/components/features/ExpenseTable";
import SaleTable from "@/components/features/SaleTable";
import { useCallback, useState } from "react";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { Text } from "react-native-paper";

export default function transaction() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  //scroll refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ alignItems: "center" }}>
            <Text variant="titleMedium">Sales Table (No Receipt)</Text>
            <SaleTable />
          </View>

          <View style={{ alignItems: "center" }}>
            <Text variant="titleMedium">Expense Table (No Receipt)</Text>
            <ExpenseTable />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
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
