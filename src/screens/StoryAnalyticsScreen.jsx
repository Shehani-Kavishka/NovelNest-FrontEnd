import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomPieChart from '../components/CustomPieChart';
import CustomLineChart from '../components/CustomLineChart';

const StoryAnalyticsScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const data = [
    {
      name: '- Chapter 1',
      population: 2300,
      color: colors.secondary,
      legendFontColor: colors.white,
      legendFontSize: 15,
    },
    {
      name: '- Chapter 2',
      population: 5500,
      color: colors.cyan,
      legendFontColor: colors.white,
      legendFontSize: 15,
    },
    {
      name: '- Chapter 3',
      population: 5300,
      color: colors.blue2,
      legendFontColor: colors.white,
      legendFontSize: 15,
    },
    {
      name: '- Chapter 4',
      population: 1920,
      color: colors.green1,
      legendFontColor: colors.white,
      legendFontSize: 15,
    },
  ];

  const lineChartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7","8"],
    datasets: [
      {
        data: [
          230,
          310,
          290,
          450,
          400,
          680,
          550,
          500
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
      <View style={styles.listItem}>
        <TouchableOpacity>
          <Image
            source={require('../assets/oursecretlove.jpg')}
            style={styles.bookCover}
          />
        </TouchableOpacity>
        <View style={styles.bookDetails}>
          <Text style={styles.subText}>Our Secret Love</Text>

          <View style={styles.bookDetailsline}>
            <Text style={styles.Booktype}>Ongoing</Text>
            <View style={styles.statsSubContainer}>
              <Icon name="list" size={15} color={colors.white} />
              <Text style={styles.textStyle}>14 Parts</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsSubContainer}>
              <Icon name="eye" size={15} color={colors.white} />
              <Text style={styles.textStyle}>155K</Text>
            </View>
            <View style={styles.statsSubContainer}>
              <Icon name="star" size={15} color={colors.white} />
              <Text style={styles.textStyle}>4.58K</Text>
            </View>
            <View style={styles.statsSubContainer}>
              <Icon name="comments" size={15} color={colors.white} />
              <Text style={styles.textStyle}>2.5K</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.secondary }]}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>
            Reads
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>
            Rates
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>
            Comments
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.ChartHeadingContainer}>
          <Text style={styles.ChartHeading}>Total Reads</Text>
          <Text style={[styles.ChartHeading, { color: colors.cyan }]}>
            14.3K
          </Text>
        </View>
        <CustomPieChart
          data={data}
          width={screenWidth - 40}
          height={200}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'10'}
          center={[10, 10]}
        />
      </View>

      <View style={styles.chartContainer}>
        <CustomLineChart
          data={lineChartData}
          width={screenWidth - 80}
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

export default StoryAnalyticsScreen;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  bookCover: {
    width: 80,
    height: 120,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  bookDetails: {
    flexDirection: 'column',
    marginLeft: 40,
    width: 230,
  },
  subText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 10,
  },
  authorText: {
    color: colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 15,
  },
  statsSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textStyle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'justify',
  },
  Booktype: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    backgroundColor: colors.secondary,
    // height:25,
    width: 90,
    borderRadius: 25,
    textAlign: 'center',
    paddingVertical: 5,
  },
  bookDetailsline: {
    flexDirection: 'row',
    gap: 50,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 20,
    justifyContent: 'center',
    marginTop: 40,
  },
  button: {
    width: 100,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
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
  ChartHeadingContainer: {
    flexDirection: 'row',
    gap: 125,
    marginBottom: 10,
  },
});
