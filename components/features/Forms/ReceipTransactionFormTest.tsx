import {
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "@/constants/theme";
import { DatePickerInput } from "react-native-paper-dates";
import { TextInput, Button, Text } from "react-native-paper";
import { Formik } from "formik";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { SetStateAction, useState } from "react";
import { patchReceiptContent } from "@/helper/receipt";

export default function ReceiptTransactionFormTest() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const {
    id,
    receipt_number,
    receipt_type,
    delivered_by,
    delivered_to,
    address,
    total,
    date,
  } = useLocalSearchParams();

  const initialDate = typeof date === "string" ? new Date(date) : undefined;

  //Select List
  const [selected, setSelected] = useState("");
  const selectData = [
    {
      key: "Sales",
      value: "Sales",
    },
    {
      key: "Expense",
      value: "Expense",
    },
  ];

  //handle Submit Form
  const handleSubmitForm = async (body: any) => {
    const dateInManila = new Date(body.date);
    dateInManila.setHours(dateInManila.getHours() + 8);

    const formattedDate = dateInManila.toISOString().split("T")[0];

    const data = {
      ...body,
      id: Number(body.id),
      date: formattedDate,
    };

    const req = await patchReceiptContent({
      ...body,
      date: formattedDate,
      receipt_type: selected,
    });

    if (req?.ok) {
      Alert.alert("Success", "Receipt has been updated");
      router.dismiss();
    } else {
      Alert.alert("Failed", "Receipt has not been updated");
      router.dismiss();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          id: id,
          receipt_number: receipt_number,
          delivered_by: delivered_by,
          delivered_to: delivered_to,
          address: address,
          total: total,
          date: initialDate,
        }}
        onSubmit={handleSubmitForm}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          isSubmitting,
          touched,
          errors,
        }) => (
          <KeyboardAvoidingView
            style={styles.formContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            {/* Input */}
            <View>
              <Text style={styles.title}>Edit Receipt Transaction Form</Text>

              <TextInput
                label="Receipt Number"
                onChangeText={handleChange("id")}
                onBlur={handleBlur("id")}
                value={values.receipt_number as string}
                mode="outlined"
                style={styles.input}
                error={touched.receipt_number && !!errors.receipt_number}
              />
              {touched.receipt_number && errors.receipt_number && (
                <Text style={styles.errorText}>{errors.receipt_number}</Text>
              )}

              <SelectList
                setSelected={(val: SetStateAction<string>) => setSelected(val)}
                data={selectData}
                save="key"
                defaultOption={{
                  key: receipt_type,
                  value: receipt_type,
                }}
                placeholder="Categories"
              />

              <TextInput
                label="Delivered By"
                onChangeText={handleChange("delivered_by")}
                onBlur={handleBlur("delivered_by")}
                value={values.delivered_by as string}
                mode="outlined"
                style={styles.input}
                error={touched.delivered_by && !!errors.delivered_by}
              />
              {touched.delivered_by && errors.delivered_by && (
                <Text style={styles.errorText}>{errors.delivered_by}</Text>
              )}

              <TextInput
                label="Delivered To"
                onChangeText={handleChange("delivered_to")}
                onBlur={handleBlur("delivered_to")}
                value={values.delivered_to as string}
                mode="outlined"
                style={styles.input}
                error={touched.delivered_to && !!errors.delivered_to}
              />
              {touched.delivered_to && errors.delivered_to && (
                <Text style={styles.errorText}>{errors.delivered_to}</Text>
              )}

              <TextInput
                label="Address"
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address as string}
                mode="outlined"
                style={styles.input}
                error={touched.address && !!errors.address}
              />
              {touched.address && errors.address && (
                <Text style={styles.errorText}>{errors.address}</Text>
              )}

              <TextInput
                label="Total"
                onChangeText={handleChange("total")}
                onBlur={handleBlur("total")}
                value={String(values.total)}
                mode="outlined"
                style={styles.input}
                error={touched.total && !!errors.total}
              />
              {touched.total && errors.total && (
                <Text style={styles.errorText}>{errors.total}</Text>
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

            {/* Button */}
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
