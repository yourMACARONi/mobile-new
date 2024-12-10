import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ViewStyle } from "react-native";

export default function MetricCardSkeleton() {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const getShimmerStyle = (width: number, height: number): ViewStyle => ({
    width,
    height,
    backgroundColor: "#e2e8f0",
    borderRadius: height / 4,
    overflow: "hidden" as const,
  });

  const shimmerTranslate = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={getShimmerStyle(100, 14)}>
          <Animated.View
            style={[
              styles.shimmer,
              {
                transform: [{ translateX: shimmerTranslate }],
              },
            ]}
          />
          {/* <Image
            source={require("@/assets/images/sales.png")}
            style={styles.salesIMG}
            accessibilityLabel="Sales Image"
          /> */}
        </View>
      </View>

      <View style={[getShimmerStyle(150, 24), { marginBottom: 4 }]}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateX: shimmerTranslate }],
            },
          ]}
        />
      </View>

      <View style={getShimmerStyle(200, 12)}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateX: shimmerTranslate }],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  shimmer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  salesIMG: {
    height: 1000,
    width: 1000,
  },
});
