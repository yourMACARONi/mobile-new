import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { saveSessionFromQr, getUser } from "@/helper/session";
import Overlay from "@/components/ui/qrOverlay";
import { en, registerTranslation } from "react-native-paper-dates";
import { Button } from "react-native-paper";

registerTranslation("en", en);

export default function LoginScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const router = useRouter();
  const qrLock = useRef(false);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!permission) {
    return <View />;
  }

  /**
  router.push({
    pathname: "/(edit)/edit-transaction",
    params: {
      type: "receipt",
      id: 123,
      receipt_number: "0056",
      receipt_type: "Sales",
      delivered_by: "CDO",
      delivered_to: "Lapasan",
      address: "Cagayan De Oro",
      total: 1000,
      date: "2024-04-04",
    },
  });
   */

  const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
    setIsLoading(false);
    const { data } = result;
    if (data && !qrLock.current) {
      qrLock.current = true;
      try {
        await saveSessionFromQr(data);
        const user = await getUser();
        setScanned(false);
        setIsLoading(false);
        router.replace("/(tabs)");
      } catch (error) {
        setScanned(false);
        setIsLoading(false);
      }
    }
  };

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={
          scanned ? undefined : (result) => handleBarCodeScanned(result)
        }
      >
        <View style={styles.buttonContainer}></View>
      </CameraView>
      <Overlay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
