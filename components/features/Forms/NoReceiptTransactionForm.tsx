import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { TextInput, Button } from "react-native-paper";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { SaleTransactionSchema } from "@/constants/schema";
import { useLocalSearchParams, useRouter } from "expo-router";
import { theme } from "@/constants/theme";
import Toast from "react-native-toast-message";
import {
  updateSalesTransaction,
  updateExpenseTransaction,
} from "@/helper/transaction";
import { getSaleCategories, getExpenseCategories } from "@/helper/categories";
import { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { Platform } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { TransactionFormDataType } from "@/constants/schema";

export default function NoReceiptTransactionForm() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const { type, category, category_name, date } = params;

  const { id, description, amount } = {
    id: Array.isArray(params.id) ? Number(params.id[0]) : Number(params.id), // Ensure id is a number
    description: Array.isArray(params.description)
      ? params.description[0]
      : params.description,
    amount: Array.isArray(params.amount)
      ? Number(params.amount[0])
      : Number(params.amount),
  };

  const initialDate = typeof date === "string" ? new Date(date) : undefined;

  const handleFormSubmit = async (body: TransactionFormDataType) => {
    // Manually adjust the time zone offset for Asia/Manila (UTC+8)
    const dateInManila = new Date(body.date);
    dateInManila.setHours(dateInManila.getHours() + 8);

    const formattedDate = dateInManila.toISOString().split("T")[0];

    if (type === "sales") {
      const req = await updateSalesTransaction({
        ...body,
        category: selected,
        date: formattedDate,
        amount: Number(body.amount),
      });
      router.dismiss();
    } else {
      const req = await updateExpenseTransaction({
        ...body,
        category: selected,
        date: formattedDate,
        amount: Number(body.amount),
      });
      router.dismiss();
    }
  };

  const [selected, setSelected] = useState("");
  const [categories, setCategories] = useState<any[]>([]); // Initialize as an empty array

  useEffect(() => {
    const getCategory = async () => {
      if (type === "sales") {
        const category = await getSaleCategories();
        if (category) {
          const formattedCategory = category?.map((_item: any) => ({
            key: _item?.id,
            value: _item?.name,
          }));
          setCategories(formattedCategory);
        }
      } else {
        const category = await getExpenseCategories();
        if (category) {
          const formattedCategory = category?.map((_item: any) => ({
            key: _item?.id,
            value: _item?.name,
          }));
          setCategories(formattedCategory);
        }
      }
    };
    getCategory();
  }, [type]);

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          id: id,
          description: description,
          amount: amount,
          category: Number(category),
          date: initialDate as Date,
        }}
        validationSchema={SaleTransactionSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <KeyboardAvoidingView
            style={styles.formContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View>
              {/* Description Field */}
              <Text style={styles.title}>
                Edit{" "}
                {typeof type === "string"
                  ? type.charAt(0).toUpperCase() + type.slice(1)
                  : "Invalid type"}{" "}
                Transaction Form
              </Text>
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

              {/* SelectList */}
              <SelectList
                setSelected={setSelected}
                data={categories}
                defaultOption={{
                  key: category,
                  value: category_name,
                }}
                save="key"
                placeholder="Categories"
              />

              {/* Amount Field */}
              <TextInput
                label="Amount"
                keyboardType="numeric"
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                value={String(values.amount)}
                mode="outlined"
                style={styles.input}
                error={touched.amount && !!errors.amount}
              />
              {touched.amount && errors.amount && (
                <Text style={styles.errorText}>{errors.amount}</Text>
              )}

              <View style={{ marginTop: 30 }}>
                <DatePickerInput
                  presentationStyle="pageSheet"
                  locale="en"
                  label="Transaction Date"
                  value={values.date}
                  style={{
                    backgroundColor: "white",
                    borderColor: "black",
                    borderRadius: 2,
                    borderStyle: "solid",
                  }}
                  onChange={(newDate) => setFieldValue("date", newDate)}
                  inputMode="start"
                />
              </View>
            </View>

            <View style={{ marginBottom: 20 }}>
              {/* Submit Button */}
              <Button
                onPress={() => handleSubmit()}
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttonLabel}
                loading={isSubmitting}
                // icon={"send"}
              >
                Update Transaction
              </Button>

              {/* Cancel Button */}
              <Button
                onPress={() => {
                  router.replace("/(tabs)/transaction");
                }}
                mode="contained"
                style={styles.button}
                buttonColor="red"
                labelStyle={styles.buttonLabel}
                // icon={"cancel"}
              >
                Cancel Transaction
              </Button>
            </View>
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
    flex: 1,
    justifyContent: "space-between",
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
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
