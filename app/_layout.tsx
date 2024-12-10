import { Slot } from "expo-router";
import "../global.css";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { ReceiptProvider } from "@/provider/ReceiptProvider";
import { theme } from "../constants/theme";

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <ReceiptProvider>
        <Slot />
      </ReceiptProvider>
    </PaperProvider>
  );
}
