import React, {Component} from "react";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feed from "../screens/Feed"
import firebase from "firebase"
import CreateStory from "../screens/CreateStory"
const Tab = createMaterialBottomTabNavigator()
export default class BottomTabNavigator extends Component{
  constructor(props){
    super(props)
    this.state={
light_theme:true,
    }
  }
  componentDidMount(){
    var theme;
    firebase.database().ref("/users/"+firebase.auth().currentUser.uid).on("value",function(snapshot){
      theme=snapshot.val().current_theme
    });
    this.setState({
      light_theme:theme==="light"?true:false
    })
  }
  render(){
    return (
<Tab.Navigator
labeled={false}
barStyle={this.state.light_theme?styles.bottomTabStyleLight:styles.bottomTabStyle}
screenOptions={({route}) => ({
tabBarIcon:({focused,color,size})=>{
var iconName;
if(route.name==="Feed"){
iconName=focused? "home":"home-outline"
}
else if(route.name==="CreateStory"){
iconName=focused? "add-circle":"add-circle-outline"
}
return <Ionicons name={iconName} size={RFValue(25)} color={color} style={styles.icons}></Ionicons>
},

}
)
}
activeColor={"cyan"}
inactiveColor={"black"}
>
<Tab.Screen name="Feed" component={Feed}></Tab.Screen>
<Tab.Screen name="CreateStory" component={CreateStory}></Tab.Screen>
</Tab.Navigator>
    )}}
    const styles = StyleSheet.create({
        bottomTabStyle: {
          backgroundColor: "#2f345d",
          height: "8%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: "hidden",
          position: "absolute"
        },
        bottomTabStyleLight: {
          backgroundColor: "#eaeaea",
          height: "8%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: "hidden",
          position: "absolute"
        },
        icons: {
          width: RFValue(30),
          height: RFValue(30)
        }
    });

    
    
    