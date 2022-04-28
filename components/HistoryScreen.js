import { React, useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions} from 'react-native';
import { LineChart } from "react-native-chart-kit";
import * as SQLite from 'expo-sqlite';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function HistoryScreen() {

  const db = SQLite.openDatabase('water.db');
  const [sizeData, setSizeData] = useState([0]);
  const [dateData, setDateData] = useState([""]);
 
  useEffect (() => {
    updateChart();
  }, []);
  
  const updateChart = () => {
    db.transaction(tx => {
      tx.executeSql("SELECT SUM(size) AS size, date FROM water WHERE date > strftime('%d.%m.%Y', 'now', 'start of month') GROUP BY date;", [], (_, { rows }) => {
        let sizes = rows._array.map((item) => {
          return item.size;
        });
        setSizeData(sizes);
        let dates = rows._array.map((item) => {
          return item.date;
        });
        setDateData(dates);
      });
    }, (_, error) => {
      console.log(error);
    });
  };

  const refresh = () => {
    updateChart();
  };

  const monthlyData = {
    labels: dateData,
    datasets:
      [
        {
          data: sizeData
        }
      ]
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your monthly water intake history</Text>
      <LineChart
        data={monthlyData}
        width={Dimensions.get("window").width}
        height={350}
        yAxisSuffix="ml"
        formatXLabel={(value) => value.slice(0, 4)}
        fromZero={true}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 20,
          borderRadius: 16
        }}
      />
      <Button
        onPress={refresh}
        title="  Refresh"
        icon={
          <Icon
          name= "refresh"
          size= {30}
          color='#3480eb'
          />
        }
        type="outline"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  text: {
      color: '#3480eb',
      margin: 15,
      fontSize: 15,
      fontFamily: 'sans-serif-condensed'
  },
  input: {
      backgroundColor: '#5498f7',
      margin: 10,
      width: 250,
      height: 50,
      textAlign: "center",
      fontSize: 25,
      borderRadius: 8,
      borderColor: "rgb(52, 128, 235)",
      borderWidth: 2,
      fontFamily: 'sans-serif-condensed'
  },
  listcontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 5
  },
});

const chartConfig = {
    backgroundColor: "rgb(52, 128, 235)",
    backgroundGradientFrom: "rgb(24, 25, 26)",
    backgroundGradientTo: "rgb(52, 128, 235)",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "rgb(52, 128, 235)"
    }
};