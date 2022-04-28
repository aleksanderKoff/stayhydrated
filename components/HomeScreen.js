import { React, useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView} from 'react-native';

export default function HomeScreen() {
    return (
        <ScrollView>
            <Text style={styles.text1}>Water: How much should you drink every day?</Text>
            <Text style={styles.text2}>
                How much water should you drink each day? It's a simple question with no easy answer.
                Studies have produced varying recommendations over the years.
                But your individual water needs depend on many factors, including your health, how active you are and where you live.
                No single formula fits everyone.
                But knowing more about your body's need for fluids will help you estimate how much water to drink each day.
            </Text>
            <Text style={styles.text1}>What are the health benefits of water?</Text>
            <Text style={styles.text2}>
                Water is your body's principal chemical component and makes up about 50% to 70% of your body weight.
                Your body depends on water to survive.
                Every cell, tissue and organ in your body needs water to work properly. For example, water:{"\n"}{"\n"}
                - Gets rid of wastes through urination, perspiration and bowel movements{"\n"}
                - Keeps your temperature normal{"\n"}
                - Lubricates and cushions joints{"\n"}
                - Protects sensitive tissues{"\n"}{"\n"}
                Lack of water can lead to dehydration — a condition that occurs when you don't have enough water in your body to carry out normal functions.
                Even mild dehydration can drain your energy and make you tired.
            </Text>
            <Text style={styles.text1}>What are the health benefits of water?</Text>
            <Text style={styles.text2}>
                Every day you lose water through your breath, perspiration, urine and bowel movements.
                For your body to function properly, you must replenish its water supply by consuming beverages and foods that contain water.
                So how much fluid does the average, healthy adult living in a temperate climate need?
                The U.S. National Academies of Sciences, Engineering, and Medicine determined that an adequate daily fluid intake is:{"\n"}{"\n"}
                - About 3.7 liters (3700ml) of fluids a day for men{"\n"}
                - About 2.7 liters (2700ml) of fluids a day for women{"\n"}{"\n"}
                These recommendations cover fluids from water, other beverages and food.
                About 20% of daily fluid intake usually comes from food and the rest from drinks.
            </Text>
            <Text style={styles.text2}>{"\n"}{"\n"} Source: Mayo Clinic</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 30
    },
    text1: {
        color: '#3480eb',
        margin: 5,
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed'
    },
    text2: {
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
        borderWidth: 2
    },
    listcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
  });