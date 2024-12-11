import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { getMonthlyTransactionReceipt } from "@/helper/statements";
import TableSkeleton from "../skeleton/TableSkeleton";
import { theme } from "@/constants/theme";

type Receipt = {
  id: number;
  receipt_number: string;
  date: string;
  delivered_by: string;
  delivered_to: string;
  address: string;
  receipt_type: string;
  total: string;
  image: string;
} | null;

export default function ReceiptTable() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4, 5]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[3]
  );
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getReceiptContent = async () => {
      try {
        const fetchedReceipts = await getMonthlyTransactionReceipt();
        setReceipts(fetchedReceipts);
      } catch (error) {
        console.error("Error fetching receipt data:", error);
      } finally {
        setLoading(false);
      }
    };

    getReceiptContent();
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, receipts.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Receipts</Text>
      <View style={styles.tableContainer}>
        <DataTable>
          <DataTable.Header style={styles.header}>
            <DataTable.Title textStyle={styles.headerText}>
              Receipt Number
            </DataTable.Title>
            <DataTable.Title textStyle={styles.headerText}>
              Type
            </DataTable.Title>
            <DataTable.Title numeric textStyle={styles.headerText}>
              Amount
            </DataTable.Title>
          </DataTable.Header>

          {receipts.slice(from, to).map((item) => (
            <DataTable.Row
              key={item?.id}
              onPress={() => {
                router.navigate({
                  pathname: "/(edit)/edit-transaction",
                  params: {
                    id: item?.id,
                    receipt_number: item?.receipt_number,
                    receipt_type: item?.receipt_type,
                    total: item?.total,
                  },
                });
              }}
              style={styles.row}
            >
              <DataTable.Cell textStyle={styles.cellText}>
                {item?.receipt_number}
              </DataTable.Cell>
              <DataTable.Cell textStyle={styles.cellText}>
                {item?.receipt_type}
              </DataTable.Cell>
              <DataTable.Cell numeric textStyle={styles.cellText}>
                ₱{parseFloat(item?.total || "0").toLocaleString()}
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(receipts.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${receipts.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
            style={styles.pagination}
          />
        </DataTable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: theme.colors.primary,
  },
  tableContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    backgroundColor: theme.colors.primary,
  },
  headerText: {
    color: theme.colors.surface,
    fontWeight: "bold",
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  cellText: {
    color: theme.colors.text,
  },
  pagination: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});
