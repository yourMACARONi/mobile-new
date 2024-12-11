import React from "react";
import { View, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const SkeletonCell: React.FC<{ width: number }> = ({ width }) => (
  <View style={[styles.skeletonCell, { width }]}>
    <LinearGradient
      colors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFill}
    />
  </View>
);

const TableSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <SkeletonCell width={80} />
          </DataTable.Title>
          <DataTable.Title>
            <SkeletonCell width={120} />
          </DataTable.Title>
          <DataTable.Title numeric>
            <SkeletonCell width={60} />
          </DataTable.Title>
        </DataTable.Header>

        {[...Array(3)].map((_, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>
              <SkeletonCell width={80} />
            </DataTable.Cell>
            <DataTable.Cell>
              <SkeletonCell width={120} />
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <SkeletonCell width={60} />
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={0}
          numberOfPages={1}
          onPageChange={() => {}}
          label={<SkeletonCell width={100} />}
          showFastPaginationControls
          numberOfItemsPerPageList={[]}
          numberOfItemsPerPage={3}
          onItemsPerPageChange={() => {}}
          selectPageDropdownLabel={<SkeletonCell width={80} />}
        />
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  table: {
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF4C4C",
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFE5E5",
  },
  pagination: {
    paddingVertical: 8,
    borderRadius: 8,
  },
  skeletonCell: {
    height: 20,
    borderRadius: 4,
    overflow: "hidden",
  },
});

export default TableSkeleton;
