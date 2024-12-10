import { DefaultTheme } from "react-native-paper";

export const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1976D2',
      accent: '#03A9F4',
      background: 'white',
      surface: '#FFFFFF',
      text: '#212121',
      error: '#D32F2F',
      expensePrimary: '#D32F2F',
      expenseAccent: '#FF5252',
      expenseBackground: '#FFEBEE',
    },
    roundness: 8,
  };
