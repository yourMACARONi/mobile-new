import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { getMonthlyNoReceiptSale } from "@/helper/statements";
import TableSkeleton from "../skeleton/TableSkeleton";
import { theme } from "@/constants/theme";

type Sale = {
  id: number;
  amount: number;
  category: number;
  description: string;
  date: string;
  createdAt: string;
};

type SaleCategory = {
  id: number;
  name: string;
  description: string;
};

type Data = {
  sales: Sale;
  sales_category: SaleCategory;
};

export default function SaleTable() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4, 5]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[3]
  );
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await getMonthlyNoReceiptSale();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching expense data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Sales</Text>
      <View style={styles.tableContainer}>
        <DataTable>
          <DataTable.Header style={styles.header}>
            <DataTable.Title textStyle={styles.headerText}>
              Category
            </DataTable.Title>
            <DataTable.Title textStyle={styles.headerText}>
              Description
            </DataTable.Title>
            <DataTable.Title numeric textStyle={styles.headerText}>
              Amount
            </DataTable.Title>
          </DataTable.Header>

          {data.slice(from, to).map((item) => (
            <DataTable.Row
              key={item.sales.id}
              onPress={() => {
                router.navigate({
                  pathname: "/(edit)/edit-transaction",
                  params: {
                    id: item.sales.id,
                    description: item.sales.description,
                    amount: item.sales.amount,
                    category: item.sales.category,
                    category_name: item.sales_category.name,
                    type: "sales",
                  },
                });
              }}
              style={styles.row}
            >
              <DataTable.Cell textStyle={styles.cellText}>
                {item.sales_category.name}
              </DataTable.Cell>
              <DataTable.Cell textStyle={styles.cellText}>
                {item.sales?.description}
              </DataTable.Cell>
              <DataTable.Cell numeric textStyle={styles.cellText}>
                ₱{item.sales.amount.toLocaleString()}
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(data.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${data.length}`}
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
    paddingVertical: 8,
  },
});
