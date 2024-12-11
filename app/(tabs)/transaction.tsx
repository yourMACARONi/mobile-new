import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SummaryCards from "@/components/features/SummaryCard";
import NoReceiptTransactionView from "@/components/features/TransactionTable/NoReceiptTransactionView copy";
import { SafeAreaView } from "react-native-safe-area-context";
import ReceiptTransactionView from "@/components/features/TransactionTable/ReceiptTransacitonView";

const { width } = Dimensions.get("window");

export default function Transaction() {
  const [hasReceipt, setHasReceipt] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: hasReceipt ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [hasReceipt]);

  const toggleReceipt = () => {
    setHasReceipt(!hasReceipt);
  };

  const buttonWidth = width * 0.4;
  const buttonTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, buttonWidth],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.buttonContainer, { width: buttonWidth * 2 }]}
      >
        <Animated.View
          style={[
            styles.slider,
            { transform: [{ translateX: buttonTranslate }] },
          ]}
        />
        <TouchableOpacity style={styles.button} onPress={toggleReceipt}>
          <Ionicons
            name="receipt-outline"
            size={24}
            color={hasReceipt ? "#007AFF" : "#ffffff"}
          />
          <Text
            style={[
              styles.buttonText,
              { color: hasReceipt ? "#007AFF" : "#ffffff" },
            ]}
          >
            Without
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleReceipt}>
          <Ionicons
            name="receipt"
            size={24}
            color={hasReceipt ? "#ffffff" : "#007AFF"}
          />
          <Text
            style={[
              styles.buttonText,
              { color: hasReceipt ? "#ffffff" : "#007AFF" },
            ]}
          >
            With
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.contentContainer}>
        {hasReceipt ? <ReceiptTransactionView /> : <NoReceiptTransactionView />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: "50%",
    transform: [{ translateX: -width * 0.4 }],
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1,
  },
  slider: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 30,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  contentContainer: {
    marginTop: 120,
  },
});
