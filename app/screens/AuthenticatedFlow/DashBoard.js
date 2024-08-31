import React, {useCallback, useEffect, useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {getNames} from '../../database/db';
import {useFocusEffect} from '@react-navigation/native';
//This is the basic use of Line Graph the data is generated from the Database. Data is created from Profile Page
const DashBoard = () => {
  const [dataSet, setDataSet] = useState([]);
  //Use Focus Effect is used here so that our Chart is updated every time the Dashboard Tab is opened and we can fetch fresh data from DB.
  useFocusEffect(
    React.useCallback(() => {
      const onSuccess = usersData => {
        const userDataSet = Array(12).fill(0);
        usersData.forEach(data => {
          userDataSet[parseInt(data?.month) - 1] =
            userDataSet[parseInt(data?.month) - 1] + 1;
        });
        setDataSet(userDataSet);
      };
      getNames(onSuccess);
    }, []),
  );

  return (
    <View style={styles.container}>
      {!!dataSet?.length && (
        <LineChart
          data={{
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sept',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: [
              {
                data: dataSet,
              },
            ],
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
      <Text style={styles.textStyle}>
        Add Users in Profile to update the chart!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
  },
});

export default DashBoard;
