import { Slot } from "expo-router";
import "../global.css";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { ReceiptProvider } from "@/provider/ReceiptProvider";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "green",
    secondary: "yellow",
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <ReceiptProvider>
        <Slot />
      </ReceiptProvider>
    </PaperProvider>
  );
}
