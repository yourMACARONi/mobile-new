import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { getMonthlyNoReceiptExpense } from "@/helper/statements";

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

  const [data, setData] = useState<Data[]>([]); // Holds array of data

  // Fetch data on component mount
  useEffect(() => {
    const getData = async () => {
      const data = await getMonthlyNoReceiptExpense();
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
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Category</DataTable.Title>
        <DataTable.Title>Description</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
      </DataTable.Header>

      {data.slice(from, to).map((item) => (
        <DataTable.Row key={item.expenses.id}>
          <DataTable.Cell>{item.expense_category.name}</DataTable.Cell>
          <DataTable.Cell>{item.expenses.description}</DataTable.Cell>
          <DataTable.Cell numeric>{item.expenses.amount}</DataTable.Cell>
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
      />
    </DataTable>
  );
}
