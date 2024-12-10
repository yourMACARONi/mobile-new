import TransactionForm from "@/components/features/Forms/TransactionForm";
import { ExampleForm } from "@/components/features/Forms/ExampleForm";
type defaultValues = {
  id: number;
  description: string;
  amount: number;
};

export default function EditTransaction() {
  return (
    <>
      <TransactionForm />
    </>
  );
}
