import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const useShimmerAnimation = () => {
  const shimmerAnimation = new Animated.Value(0);

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmer.start();

    return () => shimmer.stop();
  }, [shimmerAnimation]);

  return shimmerAnimation;
};

const SkeletonCell: React.FC<{ width: number }> = ({ width: cellWidth }) => {
  const shimmerAnimation = useShimmerAnimation();

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-cellWidth, cellWidth],
  });

  return (
    <View style={[styles.skeletonCell, { width: cellWidth }]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const TableSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.header}>
          <SkeletonCell width={80} />
          <SkeletonCell width={120} />
          <SkeletonCell width={60} />
        </View>

        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.row}>
            <SkeletonCell width={80} />
            <SkeletonCell width={120} />
            <SkeletonCell width={60} />
          </View>
        ))}

        <View style={styles.pagination}>
          <SkeletonCell width={100} />
          <SkeletonCell width={80} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  table: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f5",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  skeletonCell: {
    height: 20,
    borderRadius: 4,
    backgroundColor: "#e9ecef",
    overflow: "hidden",
  },
});

export default TableSkeleton;
