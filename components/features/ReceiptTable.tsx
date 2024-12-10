import * as React from "react";
import { DataTable } from "react-native-paper";
import { getMonthlyTransactionReceipt } from "@/helper/statements";

import { useState, useEffect } from "react";

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

export default function Transactions() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4, 5]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[3]
  );
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  useEffect(() => {
    const getReceiptContent = async () => {
      const receipts = await getMonthlyTransactionReceipt();
      setReceipts(receipts);
    };

    getReceiptContent();
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, receipts.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Receipt Number</DataTable.Title>
        <DataTable.Title>Type</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
      </DataTable.Header>

      {receipts.slice(from, to).map((item) => (
        <DataTable.Row key={item?.id}>
          <DataTable.Cell>{item?.receipt_number}</DataTable.Cell>
          <DataTable.Cell>{item?.receipt_type}</DataTable.Cell>
          <DataTable.Cell numeric>{item?.total}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(receipts.length / itemsPerPage)} // Calculate based on receipts length
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${receipts.length}`} // Update label dynamically
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={"Rows per page"}
      />
    </DataTable>
  );
}
