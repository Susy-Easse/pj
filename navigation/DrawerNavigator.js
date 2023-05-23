import React,{Component} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator"
import Profile from "../screens/Profile"
import firebase from "firebase"
import Logout from "../screens/Logout"
import CustomSidebarMenu from "../screens/CustomSideBarMenu"
const Drawer = createDrawerNavigator()
export default class DrawerNavigator extends Component {
constructor(props){
  super(props)
  this.state={
light_theme:true
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
<Drawer.Navigator useLegacyImplementation


drawerContentOptions={{activeTintColor:"green", inactiveTintColor:"black", itemStyle:{marginVertical:5}}}
drawerContent={(props)=><CustomSidebarMenu {...props}/>}>
<Drawer.Screen name="Home" component={StackNavigator} options={{ drawerLabel: 'Home' }}></Drawer.Screen>
<Drawer.Screen name="Profile" component={Profile} options={{ drawerLabel: 'Profile' }}></Drawer.Screen>
<Drawer.Screen name="Logout" component={Logout} options={{ drawerLabel: 'Logout' }}></Drawer.Screen>
</Drawer.Navigator>
    )}
    
    }
 
    