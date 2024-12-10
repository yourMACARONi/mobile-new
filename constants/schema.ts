import * as Yup from 'yup';


export const SaleTransactionSchema = Yup.object().shape({
    id: Yup.number().required("ID is required"),
    category: Yup.number().required("ID is required"),
    description: Yup.string().required("Description is required"),
    amount: Yup.number()
      .required("Amount is required")
      .min(0, "Amount must be positive"),
  });

