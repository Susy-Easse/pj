import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";


import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";


let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};


export default class StoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: "gray",
      speakerIcon: "volume-high-outline",
      light_theme: true,
      title:this.props.route.params.story.value.title,
      story:this.props.route.params.story.value.story,
      backColor:"rgb(255,255,128)",
      fontSize:20,
    };
  }


  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }


  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
    firebase.database().ref("/users/" + firebase.auth().currentUser.uid).on("value", snapshot => {
      this.setState({backColor:snapshot.val().backColor,fontSize:snapshot.val().fontSize})})
    
  }


  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };


  async initiateTTS(title, author, story, moral) {
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === "gray" ? "#ee8249" : "gray"
    });
    if (current_color === "gray") {
      Speech.speak(`${title} by ${author}`);
      Speech.speak(story);
      Speech.speak("A moral da história é!");
      Speech.speak(moral);
    } else {
      Speech.stop();
    }
  }


  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      


     
      return (
        <View 
          style={
            {backgroundColor:this.state.backColor, flex:1}
          }
        >

          <SafeAreaView style={styles.droidSafeArea} /> 
          <ScrollView>
          <View>
<TouchableOpacity style={{backgroundColor: "#000000",fontFamily: "Bubblegum-Sans",width:"25%",alignSelf:"flex-start"}}
onPress={()=> this.props.navigation.navigate("Tela inicial", {
              story: this.props.story})}>
<Text style={{fontSize: RFValue(this.state.fontSize),color: "#FFFFFF",textAlign:"center"}}>BACK</Text></TouchableOpacity>

<TouchableOpacity style={{backgroundColor: "#000000",fontFamily: "Bubblegum-Sans",width:"25%",alignSelf:"flex-end"}}
onPress={()=>firebase.database().ref("/notes/"+(this.props.route.params.story.key)).update({title:this.state.title, story:this.state.story})}>
<Text style={{fontSize: RFValue(this.state.fontSize),color: "#FFFFFF",textAlign:"center"}}>SAVE</Text></TouchableOpacity>
</View>
          <View style={[styles.storyContainer,{justifyContent:"center",alignItems:"center",}]}>
            <TextInput style={[styles.textinput,{height:"10%",fontSize: RFValue(this.state.fontSize),textAlign:'center'}]}
            onChangeText={text => this.setState({title: text })} 
            multiline={true}
            value={this.props.story}> 
            {this.props.route.params.story.value.title}
            </TextInput>
          
            <TextInput style={[{fontSize: RFValue(this.state.fontSize)},styles.textinput]}
            onChangeText={text => this.setState({story: text })} 
            multiline={true}
            >
            {this.props.route.params.story.value.story}
            </TextInput>
          </View>
          </ScrollView>
        </View>
      
      )
    
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  textinput: {
    width: "90%",
    height: "90%",
    padding: RFValue(10),
    marginTop: RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    color: "#000000",
    backgroundColor: "#15193c00",
    fontFamily: "Bubblegum-Sans",
    
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  storyCardLight: {
    margin: RFValue(20),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white"
  },
  storyTitleTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black"
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  storyAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black"
  },
  iconContainer: {
    flex: 0.2
  },
  storyTextContainer: {
    padding: RFValue(20)
  },
  storyText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "white"
  },
  storyTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "black"
  },
  moralText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "white"
  },
  moralTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "black"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});
