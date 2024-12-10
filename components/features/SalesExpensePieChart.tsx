import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useState, useEffect } from "react";
import { getMonthlyStatement } from "@/helper/statements";
import { Card } from "react-native-paper";

interface DataProps {
  sales: {
    previousMonthCount: number;
    previousMonthSales: number;
    currentMonthCount: number;
    currenMonthSales: number;
    trends: string;
  };
  expense: {
    previousMonthCount: number;
    previousMonthExpense: number;
    currentMonthCount: number;
    currenMonthExpense: number;
    trends: string;
  };
  total: {
    total: number;
    trends: string;
  };
}

interface SalesExpensePieChartProps {
  data: DataProps;
}

const SalesExpensePieChart: React.FC<SalesExpensePieChartProps> = ({
  data,
}) => {
  const chartData = [
    {
      name: "",
      population: data.sales.currenMonthSales,
      color: "green", // Soft green
      legendFontColor: "#333333",
      legendFontSize: 15,
    },
    {
      name: "",
      population: data.expense.currenMonthExpense,
      color: "red", // Soft red
      legendFontColor: "#333333",
      legendFontSize: 15,
    },
  ];

  const screenWidth = Dimensions.get("window").width;

  return (
    <Card style={styles.container}>
      <Card.Title
        title="Monthly Sales vs Expenses"
        subtitle="This chart shows monthly sales and expenses"
      />
      <Card.Content>
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        <Text style={styles.totalText}>
          Profit: ₱{data.total.total.toLocaleString()}
        </Text>
      </Card.Content>
    </Card>
  );
};

const defaultData: DataProps = {
  sales: {
    previousMonthCount: 0,
    previousMonthSales: 0,
    currentMonthCount: 0,
    currenMonthSales: 0,
    trends: "",
  },
  expense: {
    previousMonthCount: 0,
    previousMonthExpense: 0,
    currentMonthCount: 0,
    currenMonthExpense: 0,
    trends: "",
  },
  total: {
    total: 0,
    trends: "",
  },
};

export default function Chart() {
  const [data, setData] = useState<DataProps>();

  useEffect(() => {
    const getStatement = async () => {
      const statement = await getMonthlyStatement();
      setData(statement);
    };

    getStatement();
  }, []);

  return <SalesExpensePieChart data={data || defaultData} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  chartShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 16,
  },
  chartContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginTop: 10,
    textAlign: "center",
  },
});
