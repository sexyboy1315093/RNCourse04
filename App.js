import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllExpenses from './screens/AllExpenses';
import ManageExpenses from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import IconButton from './components/IconButton';
import { GlobalStyles } from './constants/styles';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import ExpensesContextProvider from './store/expenses-context';


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview(){

  const navigation = useNavigation();

  return(
    <BottomTabs.Navigator screenOptions={{
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500,

      //header에 버튼 추가하기
      headerRight: () => {
        return <IconButton icon={'add'} size={24} color={'white'} onPress={() => {
          navigation.navigate('ManageExpense')
        }}/>
      }
    }}>
      <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses} 
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' size={size} color={color}/>
      }}/>
      <BottomTabs.Screen name='AllExpenses' component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color}/>
      }} />
    </BottomTabs.Navigator>
  )
}

export default function App(){
  return(
    <>
    <StatusBar style='light'/>
    <ExpensesContextProvider> 
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white'
      }}>
        <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{
          headerShown: false
        }}/>
        <Stack.Screen name='ManageExpense' component={ManageExpenses}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ExpensesContextProvider>
    </>
  )
}