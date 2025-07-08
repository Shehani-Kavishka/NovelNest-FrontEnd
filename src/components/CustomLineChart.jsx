import React from 'react';
import { LineChart } from 'react-native-chart-kit';

const CustomLineChart = ({ data, width, height, chartConfig, bezier, verticalLabelRotation }) => {
  return (
    <LineChart
      data={data}
      width={width}
      height={height}
      chartConfig={chartConfig}
      bezier={bezier}
      verticalLabelRotation={verticalLabelRotation}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default CustomLineChart;