import React from "react"
import {createStackNavigator} from "@react-navigation/stack";
import TabNavigator from "./TabNavigator"
import StoryScreen from "../screens/StoryScreen"
const Stack = createStackNavigator()
const StackNavigator =()=>{
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
    <Stack.Screen name="Tela inicial" component={TabNavigator}></Stack.Screen>
    <Stack.Screen name="StoryScreen" component={StoryScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}
export default StackNavigator