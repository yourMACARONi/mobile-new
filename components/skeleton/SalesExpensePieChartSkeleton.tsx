import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Card, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const SalesExpensePieChartSkeleton: React.FC = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <Card style={styles.container}>
      <Card.Title
        title={<SkeletonText width={200} />}
        subtitle={<SkeletonText width={250} />}
      />
      <Card.Content>
        <View
          style={[
            styles.chartSkeleton,
            { width: screenWidth - 80, height: 220 },
          ]}
        >
          <LinearGradient
            colors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <View style={styles.totalTextSkeleton}>
          <SkeletonText width={150} />
        </View>
      </Card.Content>
    </Card>
  );
};

const SkeletonText: React.FC<{ width: number }> = ({ width }) => (
  <View style={[styles.skeletonText, { width }]}>
    <LinearGradient
      colors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFill}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 10,
    backgroundColor: "white",
  },
  chartSkeleton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  skeletonText: {
    height: 16,
    borderRadius: 4,
    overflow: "hidden",
  },
  totalTextSkeleton: {
    alignItems: "center",
    marginTop: 10,
  },
});

export default SalesExpensePieChartSkeleton;
