import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { getMonthlyNoReceiptSale } from "@/helper/statements";
import { StyleSheet, View, TextStyle, ViewStyle } from "react-native";

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
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [data, setData] = useState<Data[]>([]); // Holds array of data

  // Fetch data on component mount
  useEffect(() => {
    const getData = async () => {
      const data = await getMonthlyNoReceiptSale();
      setData(data); // Assume the API returns an array of Data objects
    };

    getData();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  useEffect(() => {
    setPage(0); // Reset page on itemsPerPage change
  }, [itemsPerPage]);

  return (
    <View style={styles.container}>
      <DataTable style={styles.table}>
        <DataTable.Header style={styles.header}>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title>Description</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
        </DataTable.Header>

        {data.slice(from, to).map((item) => (
          <DataTable.Row key={item.sales.id} style={styles.row}>
            <DataTable.Cell>{item.sales_category.name}</DataTable.Cell>
            <DataTable.Cell>{item.sales?.description}</DataTable.Cell>
            <DataTable.Cell numeric>{item.sales.amount}</DataTable.Cell>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1fdf1", // Light green background
    padding: 16,
  },
  table: {
    backgroundColor: "#ffffff", // White background for the table
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#4CAF50", // Green background for header
    borderBottomWidth: 2,
    borderBottomColor: "#388E3C", // Darker green for the border
  },
  titleText: {
    color: "#fff", // White text for header
    fontWeight: "bold",
  } as TextStyle, // Ensuring the correct TextStyle type
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8F5E9", // Light green border for rows
  },
  pagination: {
    backgroundColor: "#A5D6A7", // Green background for pagination
    paddingVertical: 8,
    borderRadius: 8,
  },
});
