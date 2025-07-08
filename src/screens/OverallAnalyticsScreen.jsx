import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import { Dimensions } from 'react-native';
import CustomPieChart from '../components/CustomPieChart';
import CustomLineChart from '../components/CustomLineChart';

const OverallAnalyticsScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const data = [
    {
      name: '- Story 1',
      population: 2300,
      color: colors.secondary,
      legendFontColor: colors.white,
      legendFontSize: 15,
    },
    {
      name: '- Story 2',
      population: 5500,
      color: colors.cyan,
      legendFontColor: colors.white,
      legendFontSize: 15,
    },
    {
      name: '- Story 3',
      population: 5300,
      color: colors.blue2,
     legendFontColor: colors.white,
      legendFontSize: 15,
    },
    {
      name: '- Story 4',
      population: 1920,
      color: colors.green1,
     legendFontColor: colors.white,
      legendFontSize: 15,
    },
  ];

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        data: [
          230,
          310,
          290,
          450,
          400,
          680,
          550
        ]
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: colors.primary,
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: colors.black,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(10    , 209, 200, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional,
     decimalPlaces: 0, 
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainStatsContainer}>
        <View style={styles.subStatsContainer}>
          <Text style={styles.mainStatsText}>4</Text>
          <Text style={styles.mainStatsText}>Stories</Text>
        </View>
        <View style={styles.subStatsContainer}>
          <Text style={styles.mainStatsText}>10 147</Text>
          <Text style={styles.mainStatsText}>Followers</Text>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.ChartHeading}>Total Reads</Text>
        <CustomPieChart
          data={data}
          width={screenWidth-40}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"10"}
          center={[10, 10]}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.ChartHeading}>Total Ratings</Text>
        <CustomPieChart
          data={data}
          width={screenWidth-40}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"10"}
          center={[10, 10]}
        />
      </View>

 <View style={styles.chartContainer}>
          <Text style={[styles.ChartHeading,{ marginBottom:20}]}>Total Followers</Text>
          <CustomLineChart
            data={lineChartData}
            width={screenWidth-50} 
            height={256}
            verticalLabelRotation={0} // 30 degrees might be too much, 0 is standard
            chartConfig={chartConfig}
            bezier // This makes the line smooth
          />
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

export default OverallAnalyticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  mainStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 100,
  },
  mainStatsText: {
    color: colors.cyan,
    fontWeight: 'bold',
    fontSize: 21,
    textAlign: 'center',
  },
  ChartHeading: {
    color: colors.white,
    textAlign: 'left',
    fontSize: 22,
    fontWeight: 'bold',
   
  },
  chartContainer: {
    marginTop: 40,
    marginLeft: 30,
  },
});
