import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { TextInput, Button, DefaultTheme } from "react-native-paper";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { SaleTransactionSchema } from "@/constants/schema";
import { useLocalSearchParams, useRouter } from "expo-router";
import { theme } from "@/constants/theme";
import Toast from "react-native-toast-message";
import {
  updateSalesTransaction,
  updateExpenseTransaction,
} from "@/helper/transaction";

export default function TransactionForm() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const { type, category } = params;

  const { id, description, amount } = {
    id: Array.isArray(params.id) ? params.id[0] : params.id,
    description: Array.isArray(params.description)
      ? params.description[0]
      : params.description,
    amount: Array.isArray(params.amount) ? params.amount[0] : params.amount,
  };

  const handleFormSubmit = async (body: unknown) => {
    if (type === "sales") {
      const req = await updateSalesTransaction(body);

      router.dismiss();
    } else {
      const req = await updateExpenseTransaction(body);

      router.dismiss();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          id: id,
          description: description,
          amount: amount,
          category: category,
        }}
        validationSchema={SaleTransactionSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          values,
          errors,
          touched,
        }) => (
          <KeyboardAvoidingView style={styles.formContainer}>
            <Text style={styles.title}>
              Edit{" "}
              {typeof type === "string"
                ? type.charAt(0).toUpperCase() + type.slice(1)
                : "Invalid type"}{" "}
              Transaction Form
            </Text>

            {/* Description Field */}
            <TextInput
              label="Description"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              mode="outlined"
              style={styles.input}
              error={touched.description && !!errors.description}
            />
            {touched.description && errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}

            {/* Amount Field */}
            <TextInput
              label="Amount"
              keyboardType="numeric"
              onChangeText={handleChange("amount")}
              onBlur={handleBlur("amount")}
              value={values.amount}
              mode="outlined"
              style={styles.input}
              error={touched.amount && !!errors.amount}
            />
            {touched.amount && errors.amount && (
              <Text style={styles.errorText}>{errors.amount}</Text>
            )}

            <Button
              onPress={() => handleSubmit()}
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              loading={isSubmitting}
              icon={"send"}
            >
              Update Transcation
            </Button>
            <Button
              onPress={() => {
                router.replace("/(tabs)/transaction");
              }}
              mode="contained"
              style={styles.button}
              buttonColor="red"
              labelStyle={styles.buttonLabel}
              loading={isSubmitting}
              icon={"cancel"}
            >
              Cancel Transcation
            </Button>
          </KeyboardAvoidingView>
        )}
      </Formik>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  formContainer: {
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    margin: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: theme.colors.primary,
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 8,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  buttonCancel: {
    color: "red",
    marginTop: 16,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
