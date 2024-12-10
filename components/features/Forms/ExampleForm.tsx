import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { CustomSelectInput } from "@/components/ui/CustomSelectInput";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

export const ExampleForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!selectedOption) {
      setError("Please select an option");
    } else {
      setError("");
      console.log("Selected option:", selectedOption);
      // Handle form submission
    }
  };

  return (
    <View style={styles.container}>
      <CustomSelectInput
        label="Select an option"
        value={selectedOption}
        options={options}
        onSelect={(option) => setSelectedOption(option.label)}
        error={error}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
});
