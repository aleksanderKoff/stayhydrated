import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './components/HomeScreen';
import HydrationScreen from './components/HydrationScreen';
import HistoryScreen from './components/HistoryScreen';
import SettingScreen from './components/SettingScreen';

export default function App() {

  const Tab = createBottomTabNavigator();

  const MyTheme = {
    dark: true,
    colors: {
      primary: 'rgb(52, 128, 235)',
      background: 'rgb(24, 25, 26)',
      card: 'rgb(0, 0, 0)',
      text: 'rgb(52, 128, 235)',
      border: 'rgb(24, 25, 26)',
      notification: 'rgb(52, 128, 235)',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({route }) => ({  
           tabBarIcon: ({ focused, color, size }) => {            
              let iconName;            
              if (route.name === 'Home') {              
                iconName = 'home';            
              } else if (route.name === 'Settings') {
                iconName = 'settings';            
              } else if (route.name === 'Hydration') {
                iconName = 'water'
              } else if (route.name === 'History') {
                iconName = 'calendar'
              }
              return <Ionicons name={iconName}size={size}color={color} />;          
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Hydration" component={HydrationScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
