import React, { Component } from 'react';
import {
  View, ScrollView, Text, StyleSheet, Image, TouchableOpacity,
  ActivityIndicator, BackAndroid, ToastAndroid, Dimensions
} from 'react-native';
import { StackNavigator, NavigationActions } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconss from 'react-native-vector-icons/AntDesign';
import Iconsss from 'react-native-vector-icons/MaterialIcons';
import { SessionManager } from '../Helper/SessionsManager';
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;
var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({ name: "Users", createFromLocation: "~Users.db" }, (okCallback, errorCallback) => {
    if (errorCallback)
        console.log("errorCallback", errorCallback)
    else
        console.log("okCallback", okCallback)
});

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.navParams = this.props.navigation.state.params;
    this.state = {
      ShowLoder: false,
    }
    this.Logout = this.Logout.bind(this);
  }
  static navigationOptions = {
    page: 'Burger Menu Page'
  };
  componentDidMount() {
  }

  Logout() {
    db.executeSql('Delete from Users2 ', [], (result) => {
      console.log(" Delete Query completed ");
      console.log("result", result);
    })
    SessionManager.Userdata = undefined;
    console.log("this.props", this.props);
    this.setState({
      ShowLoder:true
    },()=>{

      ToastAndroid.show("Loged out Your Account", ToastAndroid.SHORT);
      this.setState({
        ShowLoder:false
      })
      })
    this.props.navigation.navigate("Home");


  }

  render() {
    const data = SessionManager.Userdata
 
    // console.log("data.name", data.name);
    // console.log("data.Name", data.Name);
    const { navigation } = this.props;

    return (
      <View style={styles.MainContainer}>
        {this.state.ShowLoder==true && <View style={styles.ActivityLoder}>
          <ActivityIndicator style={[styles.centering, { height: 80 }]}
            size="large" />
        </View>
        }
        <View style={styles.FormContainer} >
          <View style={{ width: '100%', height: '100%', }}>

            <View style={{ width: '100%', height: 180, backgroundColor: '#263948', flexDirection: 'row', }}>
              <View style={{ alignItems: 'center', justifyContent: 'center', width: '30%' }}>
                <Image
                  style={{ width: '100%', height: 80, borderRadius: 80, marginLeft: 40 }}
                  source={require('../images/Pic.jpg')}
                />
              </View>
              <View style={{ width: '70%', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', paddingLeft: 30 }}>
                  {/* {(data != undefined) ?
                  
                    (data.name == "") ?
                      data.Name :
                      data.name
                    :
                    "Full Name"
                  } */}

                  {(data!=undefined)?
                  
                (data.name!="")?
              data.name
            :
          data.Name
       :
       "Full Name"
        }

                </Text>
                <Text style={{ color: 'white', fontSize: 14, color: '#8095a8', paddingTop: 5, paddingLeft: 30 }}>Visitor</Text>
              </View>
            </View>
            <ScrollView style={styles.ScrollContainer}>

              <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                <TouchableOpacity style={styles.MenuButton} onPress={() => { navigation.navigate("Home") }} ><Icon style={styles.MenuButtonIcon} name="home" size={22} color='#2F4050' /><Text style={styles.MenuButtonText}>Home</Text></TouchableOpacity>
                <TouchableOpacity style={styles.MenuButton} onPress={() => { navigation.navigate("Tradeshow") }} ><Iconsss style={styles.MenuButtonIcon} name="event" size={22} color='#2F4050' /><Text style={styles.MenuButtonText}>Trade Show</Text></TouchableOpacity>
                <TouchableOpacity style={styles.MenuButton} onPress={() => { navigation.navigate("Classification") }} ><Iconss style={styles.MenuButtonIcon} name="menuunfold" size={22} color='#2F4050' /><Text style={styles.MenuButtonText}>Classification</Text></TouchableOpacity>
                <TouchableOpacity style={styles.MenuButton} onPress={() => { navigation.navigate("Mediapartner") }} ><Iconsss style={styles.MenuButtonIcon} name="perm-media" size={22} color='#2F4050' /><Text style={styles.MenuButtonText}>Media Partner</Text></TouchableOpacity>
                <TouchableOpacity style={styles.MenuButton} onPress={() => { navigation.navigate("Packages") }} ><Iconsss style={styles.MenuButtonIcon} name="payment" size={22} color='#2F4050' /><Text style={styles.MenuButtonText}>Buyer Packages</Text></TouchableOpacity>
                <TouchableOpacity style={styles.MenuButton} onPress={() => { navigation.navigate("ListingRequest") }} ><Iconss style={styles.MenuButtonIcon} name="form" size={22} color='#2F4050' /><Text style={styles.MenuButtonText}>Listing Request</Text></TouchableOpacity>
                <TouchableOpacity style={styles.MenuButton} onPress={() => { navigation.navigate("SellerLogin") }} ><Icons style={styles.MenuButtonIcon} name="login" size={22} color='#2F4050' /><Text style={styles.MenuButtonText}>Seller Login</Text></TouchableOpacity>
                {/* <TouchableOpacity style={styles.MenuButton} onPress={() => { navigation.navigate("Advertisercatlog") }} ><Icon style={styles.MenuButtonIcon} name="home" size={22} color='#2F4050' /><Text style={styles.MenuButtonText}>Advertiser Catlog</Text></TouchableOpacity> */}
               {data!=undefined &&
                <TouchableOpacity style={styles.MenuButton} onPress={this.Logout}><Icon style={styles.MenuButtonIcon} name="sign-out" size={22} color="#2F4050" />
                  <Text style={styles.MenuButtonText}>Sign out </Text>
                </TouchableOpacity>
                }
              </View>
            </ScrollView>

          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ScrollContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: Colors.BackgroundPureWhite
  },
  MainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  Background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover'
  },
  FormContainer: {
    width: '100%',
    height: '100%',
    // paddingLeft: 5,
    // paddingRight: 5,
    alignItems: 'center',
    // borderStyle: 'solid',
    // borderRightWidth: 5,
    // borderRightColor: 'white',
    // marginRight: 50,
  },
  MenuButton: {

    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#d1dade',
    borderStyle: 'solid',
    marginTop: 5

  },
  MenuButton2: {
    width: '80%',
    left: '10%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#d1dade',
    borderStyle: 'solid',
    marginTop: 5

  },
  MenuButtonIcon: {
    left: 30,
    marginTop: 10,
  },
  MenuButtonIcon2: {
    left: 280,
    marginTop: 10,
  },
  MenuButtonText: {
    paddingTop: 19,
    fontSize: 16,
    left: '25%',
    // color: '#2F4050',
    color: '#424242',
    marginTop: -40
  },
  Icon: {
    fontSize: 18,
    // color:
  },
  HeadContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  UserIcon: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginTop: 20,
  },

  EditAccountRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 20,
  },
  UsernameText: {
    color: 'black',
    fontSize: 14,
  },
  EditPencil: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginLeft: 4,
    marginTop: 2,
  },
  LogutText: {
    marginTop: 10,
    color: "red",
    fontSize: 14,
  },

  MenuItemContainer: {
    width: '100%',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  Footer: {
    width: '100%',
    height: 50,
    backgroundColor: "white",
  },
  FooterRow: {
    flexDirection: 'row',
    width: '100%',
    height: 25,
    backgroundColor: "white",
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  FooterRowText: {
    color: "black",
    fontSize: 12,
  },
  LoginButton: {
    width: '30%',
    height: 30,
    marginTop: 10,
    borderRadius: 50,
    backgroundColor: "yellow",
    color: "red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginButtonText: {
    color: "red",
    fontWeight: "bold",
  },
  ButtonContainer: {
    marginTop: 30,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
  },
  BottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  MailImage: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  CenterText: {
    color: "black",
    height: 60,
    textAlignVertical: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  FbImage: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  MenuImage: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  FMailImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginLeft: 10
  },
  FFbImage: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight: 10
  },
  Text: {
    color: "black",
    fontWeight: "bold",
  },
  ActivityLoder: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 100
  }
});