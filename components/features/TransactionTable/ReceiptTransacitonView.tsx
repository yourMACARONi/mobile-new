import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import { useCallback, useState } from "react";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import ReceiptTable from "../ReceiptTable";

export default function ReceiptTransactionView() {
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
    <View style={styles.container}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/** no receipt table */}
          <View>
            <View style={{ alignItems: "center" }}>
              <ReceiptTable />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
