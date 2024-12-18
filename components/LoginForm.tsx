import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TextInput, HelperText, Title } from "react-native-paper";
import { useRouter } from "expo-router";

type RootStackParamList = {
  Login: undefined;
  QRCode: undefined;
};

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [animation] = useState(new Animated.Value(1));

  const Logo = require("../assets/images/logo.png");

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Form is valid, proceed with login
      console.log("Login attempt with:", formData);
      // Add your login logic here
    } else {
      console.log("Form has errors");
    }
  };

  const handleQRCodeNavigation = () => {
    router.replace("/");
  };

  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            source={Logo}
            style={styles.lapaganaLogo}
            resizeMode="contain"
          />
        </View>

        <Title style={styles.title}>LOG IN</Title>
        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!errors.email}
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.email}>
          {errors.email}
        </HelperText>
        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          mode="outlined"
          secureTextEntry
          error={!!errors.password}
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.password}>
          {errors.password}
        </HelperText>

        <View style={styles.qrCodeContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.qrCodeButton,
              pressed && styles.qrCodeButtonPressed,
            ]}
            onPress={handleQRCodeNavigation}
          >
            <Text style={styles.qrCodeButtonText}>Connect with QR Code</Text>
          </Pressable>
        </View>

        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleSubmit}
        >
          <Animated.View
            style={[
              styles.button,
              {
                transform: [{ scale: animation }],
              },
            ]}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  lapaganaLogo: {
    width: 250,
    height: 300,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FF0040",
    paddingVertical: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  qrCodeContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  qrCodeButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  qrCodeButtonPressed: {
    backgroundColor: "#1976D2",
  },
  qrCodeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
