import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import { getMonthlyNoReceiptExpense } from "@/helper/statements";
import TableSkeleton from "../skeleton/TableSkeleton";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";

type Expense = {
  id: number;
  amount: number;
  category: number;
  description: string;
  date: string;
  createdAt: string;
};

type ExpenseCategory = {
  id: number;
  name: string;
  description: string;
};

type Data = {
  expenses: Expense;
  expense_category: ExpenseCategory;
};

export default function ExpenseTable() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await getMonthlyNoReceiptExpense();
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
      <Text style={styles.title}>Monthly Expenses</Text>
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
              key={item.expenses.id}
              onPress={() => {
                router.navigate({
                  pathname: "/(edit)/edit-transaction",
                  params: {
                    id: item.expenses.id,
                    description: item.expenses.description,
                    amount: item.expenses.amount,
                    category: item.expenses.category,
                    type: "expense",
                  },
                });
              }}
              style={styles.row}
            >
              <DataTable.Cell textStyle={styles.cellText}>
                {item.expense_category.name}
              </DataTable.Cell>
              <DataTable.Cell textStyle={styles.cellText}>
                {item.expenses.description}
              </DataTable.Cell>
              <DataTable.Cell numeric textStyle={styles.cellText}>
                ₱{item.expenses.amount.toLocaleString()}
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
    color: theme.colors.expensePrimary,
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
    backgroundColor: theme.colors.expensePrimary,
  },
  headerText: {
    color: theme.colors.surface,
    fontWeight: "bold",
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.expenseBackground,
  },
  cellText: {
    color: theme.colors.text,
  },
  pagination: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
