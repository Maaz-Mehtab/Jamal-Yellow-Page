import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import { View, ImageBackground, ScrollView, FlatList, TextInput, ToastAndroid, Alert, Text, Modal, StyleSheet, Dimensions, Image, Picker, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../../Helper/GenericConstants';
import { CommonMethods } from '../../Helper/CommonMethods';
import { SessionManager } from '../../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
export default class SellerLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShowLoder: false,
            signup: false,
            modalVisible: false,
            Loginemail: '',
            Loginpassword: '',

        }
        this.navParams = this.props.navigation.state.params;
        this.toggle = this.toggle.bind(this);
        this.Login = this.Login.bind(this);

        // alert("ScreenHeight:" + screenheight + " ScreenWidth:" + screenwidth)
    }

    componentWillMount() {
        // db.executeSql("Drop TABLE User",[],(res)=>{
        //     console.log("Drop TABLE");
        // })
    }
    static navigationOptions = {
        page: 'Login'
    };
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }
    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        });

 




    Login() {
        if (this.state.Loginemail == "") {
            ToastAndroid.show("Enter Email ", ToastAndroid.SHORT);
        }
        else if (this.state.Loginpassword == "") {
            ToastAndroid.show("Enter Password ", ToastAndroid.SHORT);
        }
        else {
            var Params = {
                email: this.state.Loginemail,
                password: this.state.Loginpassword
                
            }
            if(Params.email=="Maaz@gmail.com" && Params.password=="123123"){
            this.props.navigation.navigate("Main");

        }
        else{
            ToastAndroid.show("Email And Password InCorrect", ToastAndroid.SHORT);
        }
    }

    }
    render() {
       
            return (

                <View style={{ width: '100%', height: '100%', }}>

                    < ImageBackground style={{ width: '100%', height: '100%' }}
                        source={require('../../images/Login8.jpg')}
                    >
                        <ScrollView style={styles.ScrollContainer}>
                            <View style={styles.MainContainer}>


                                {this.state.ShowLoder == true &&
                                    <View style={styles.ActivityLoder}>
                                        <ActivityIndicator style={[styles.centering, { height: 80 }]}
                                            size="large" />
                                    </View>
                                }




                                <View style={{ width: '100%', height: screenheight / 4, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ width: '15%', height: '60%', borderRadius: 0 }}
                                        source={require('../../images/footer-logo.png')}
                                    />

                                </View>



                                <View style={{ width: '96%', margin: 5, height: 'auto', }}>
                                    <View style={{ widht: '50%', alignItems: 'center', justifyContent: 'center' }}>

                                        <View style={{ width: '96%', margin: 2, height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ padding: 5, width: '96%', margin: 4, height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                                {/* <View style={{ width: '98%', margin: '1%', height: 50, backgroundColor: '#db4437', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>
                                                        Membership Login
                                        </Text>
                                                </View> */}

                                                <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 20, justifyContent: 'center' }}>
                                                    <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                                        <Icons style={{ color: 'black', fontSize: 25 }} name={'user'} />
                                                    </View>
                                                    <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                                        <TextInput
                                                            style={{ height: 40, width: '100%', }}
                                                            onChangeText={(text) => { this.setState({ Loginemail: text, }) }}
                                                            placeholder="Email"
                                                            placeholderTextColor="#9e9e9e"
                                                            value={this.state.Loginemail}
                                                        />
                                                    </View>
                                                </View>

                                                <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 25, justifyContent: 'center' }}>
                                                    <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                                        <Icons style={{ color: 'black', fontSize: 25 }} name={'key'} />
                                                    </View>
                                                    <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                                        <TextInput
                                                            style={{ height: 40, width: '100%', }}
                                                            onChangeText={(text) => { this.setState({ Loginpassword: text, }) }}
                                                            placeholder="Password"
                                                            placeholderTextColor="#9e9e9e"
                                                            value={this.state.Loginpassword}
                                                        />
                                                    </View>
                                                </View>

                                                <TouchableOpacity onPress={this.Login} style={{ width: '60%', height: 35, flexDirection: 'row', marginTop: 10, alignItems: 'center', margin: 5, borderRadius: 5, backgroundColor: '#f9a825', justifyContent: 'center' }}>
                                                    <View style={{ width: '50%', height: 'auto', alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>Join Us !</Text>
                                                    </View>

                                                </TouchableOpacity>



                                            </View>
                                        </View>

                                      

                                        



                                    </View>
                                </View>
                                {/* </View> */}
                            </View>
                        </ScrollView>
                    </ImageBackground>


                </View>

            )
        }
      
       
    
}


const styles = StyleSheet.create({
    ScrollContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
    },
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    ParentContainer: {
        width: '100%',
        height: '100%' - 50,
        paddingBottom: 50
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
    },
    picker: {
        height: 30,
        width: '100%',
        transform: [
            { scaleX: 0.9 },
            { scaleY: 0.9 },
        ]
    }


});
