import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

interface SkeletonItemProps {
  width: number | string;
  height: number;
  style?: object;
}

const SkeletonItem: React.FC<SkeletonItemProps> = ({
  width,
  height,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.skeletonItem, { width, height, opacity }, style]}
    />
  );
};

const TransactionFormLoading: React.FC = () => {
  return (
    <View style={styles.container}>
      <SkeletonItem width="100%" height={40} style={styles.marginBottom} />
      <SkeletonItem width="100%" height={40} style={styles.marginBottom} />
      <SkeletonItem width="100%" height={40} style={styles.marginBottom} />
      <SkeletonItem width="100%" height={40} style={styles.marginBottom} />
      <SkeletonItem width="100%" height={40} style={styles.marginBottom} />
      <SkeletonItem width="100%" height={100} style={styles.marginBottom} />
      <View style={styles.row}>
        <SkeletonItem width="48%" height={40} />
        <SkeletonItem width="48%" height={40} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  skeletonItem: {
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  marginBottom: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TransactionFormLoading;
