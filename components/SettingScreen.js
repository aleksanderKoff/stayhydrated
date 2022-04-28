import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, FlatList, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import  AsyncStorage  from'@react-native-async-storage/async-storage';

export default function SettingScreen() {

    const [dailyGoal, setDailyGoal] = useState('');
    const [inputData, setInputData] = useState('');

    useEffect (() => {
        AsyncStorage.getItem('goal').then(
            value =>
              setDailyGoal(value)
        );
      }, []);

    const saveData = () => {
        if (inputData) {
            AsyncStorage.setItem('goal', inputData);
            setInputData('');
            alert('Data saved!');
        } else {
            alert('Please fill data');
        }
        AsyncStorage.getItem('goal').then(
            value =>
              setDailyGoal(value)
          );
    };


    return (
        <View style={styles.container}>
            <Text style={styles.text2}>Your current daily goal is:</Text>
            <Text style={styles.text3}>{dailyGoal}ml!</Text>
            <Text style={styles.text}>Save your daily water drinking goal! (ml)</Text>
            <TextInput
                style={styles.input}
                placeholder='Amount (ml)'
                keyboardType='numeric'
                onChangeText={inputData => setInputData(inputData)}
                value={inputData}
            />
            <Button
                onPress={saveData}
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
      justifyContent: 'flex-start',
      margin: 70
    },
    text: {
        color: '#3480eb',
        marginTop: 50,
        marginBottom: 50,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed'
    },
    text2: {
        color: '#3480eb',
        margin: 5,
        fontSize: 25,
        width: 350,
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed'
    },
    text3: {
        color: '#3480eb',
        margin: 5,
        fontSize: 35,
        textAlign: 'center',
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
        borderWidth: 2
    },
    listcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
  });