import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const CustomPieChart = ({
  data,
  width,
  height,
  chartConfig,
  accessor,
  backgroundColor,
  paddingLeft,
  center,
  absolute,
}) => {
  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={width}
        height={height}
        chartConfig={chartConfig}
        accessor={accessor}
        backgroundColor={backgroundColor}
        paddingLeft={paddingLeft}
        center={center}
        absolute={absolute}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default CustomPieChart;