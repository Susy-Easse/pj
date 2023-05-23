import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import StoryCard from './StoryCard';


import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';


let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};





export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      stories:[]
    };
  }

fecthStory=()=>{
  firebase.database().ref("/notes/").on("value",snapshot=>{
    var stories = [];
    if(snapshot.val()){
      Object.keys(snapshot.val()).forEach(function(key){
        stories.push({key:key,value:snapshot.val()[key]})
      })
    }
    this.setState({stories:stories})
  },function(errorObject){
    console.log(errorObject.code)
  })
}

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }


  componentDidMount() {
    this.fecthStory()
    this._loadFontsAsync();
    this.fetchUser();
  }


  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' });
      });
  };


  renderItem = ({ item: story }) => {
    return <StoryCard story={story} navigation={this.props.navigation} />;
  };


  keyExtractor = (item, index) => index.toString();


  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }>
                TELA
              </Text>
            </View>
          </View>
          {!this.state.stories[0]?
          (<View style={styles.noStories}><Text
                style={
                  this.state.light_theme
                    ? styles.noStoriesTextLight
                    : styles.noStoriesText
                }>
                No Stories
              </Text></View>):(
                 <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.stories}
              renderItem={this.renderItem}
            />
          </View>
              )}
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIcon: {
    width: 50,
    height: 50,
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    marginLeft: 20,
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(25),
    fontFamily: 'Bubblegum-Sans',
    border: '1px solid red',
  },
  appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(25),
    fontFamily: 'Bubblegum-Sans',
    border: '1px solid red',
  },
  cardContainer: {
    flex: 0.85,
  },
  noStories: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noStoriesTextLight: {
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans',
  },
  noStoriesText: {
    color: 'white',
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans',
  },




});
