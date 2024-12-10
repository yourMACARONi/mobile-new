import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { TextInput, List, Text, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectInputProps {
  label: string;
  value: string;
  options: Option[];
  onSelect: (option: Option) => void;
  error?: string;
}

export const CustomSelectInput: React.FC<CustomSelectInputProps> = ({
  label,
  value,
  options,
  onSelect,
  error,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  const toggleModal = () => setModalVisible(!modalVisible);

  const handleSelect = (option: Option) => {
    console.log("Selected option:", option);
    onSelect(option);
    toggleModal();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <TextInput
          label={label}
          value={value}
          mode="outlined"
          editable={false}
          error={!!error}
          right={
            <TextInput.Icon
              icon={() => (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color={theme.colors.primary}
                />
              )}
            />
          }
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <List.Item
                  title={item.label}
                  onPress={() => handleSelect(item)}
                  style={styles.listItem}
                />
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    maxHeight: "80%",
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
