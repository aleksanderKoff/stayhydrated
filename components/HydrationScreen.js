import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, FlatList, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import  AsyncStorage  from'@react-native-async-storage/async-storage';

export default function HydrationScreen() {

    const [size, setSize] = useState('');
    const [date, setDate] = useState(null);
    const [progress, setProgress] = useState();
    const db = SQLite.openDatabase('water.db');
    const [dailyAmount, setDailyAmount] = useState(0);
    const [dailyGoal, setDailyGoal] = useState('');

    useEffect (() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists water (id integer primary key not null, amount int, size int, date date);');
        }, null, updateDailyAmount);
    }, []);

    useEffect(() => {
        let today = new Date();
        let date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
        setDate(date);
        AsyncStorage.getItem('goal').then(
            value =>
                setDailyGoal(value)
        );
        updateDailyAmount();
        progressUpdate();
    }, []);

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into water (size, date) values (?, ?);',
            [parseInt(size), date]);
        }, null, updateDailyAmount);
    };

    const progressUpdate = () => {
        if (dailyAmount / dailyGoal < 1) {     
            setProgress(dailyAmount / dailyGoal);
        } else if (dailyAmount / dailyGoal >= 1) {
            setProgress(1);
        };
    }

    const updateDailyAmount = () => {
        db.transaction(tx => {
            tx.executeSql("SELECT SUM(size) AS size FROM water WHERE date > strftime('%d.%m.%Y', 'now', 'start of day');", [], (_, { rows }) => {
                let sizes = rows._array.map((item) => {
                    return item.size;
                  });
                setDailyAmount(sizes);
                progressUpdate();
            });
        });
    };

    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Today's total water intake so far is {dailyAmount}ml!</Text>
            <Progress.Circle
                size={120}
                progress={progress}
                showsText={true}
                thickness={6}
                borderWidth={1}
            />

            <Text style={styles.text}>Save your water intake to reach your daily goal!</Text>
            <TextInput
                style={styles.input}
                placeholder='Amount (ml)'
                keyboardType='numeric'
                onChangeText={size => setSize(size)}
                value={size}
            />
            <Button
                onPress={() => {
                    if(size) {    
                        saveItem();
                        setSize('');
                        alert('Data saved!')
                    } else {
                        alert('Field is empty')
                    }
                }}
                title="  Save"
                icon={
                    <Icon
                    name= "plus-circle"
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
      justifyContent: 'flex-end',
      marginBottom: 30
    },
    text: {
        color: '#3480eb',
        margin: 25,
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