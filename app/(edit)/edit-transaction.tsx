import TransactionForm from "@/components/features/Forms/TransactionForm";
type defaultValues = {
  id: number;
  description: string;
  amount: number;
};

export default function EditTransaction() {
  return <TransactionForm />;
}
