import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import {NetInfo, View, ImageBackground, ScrollView, FlatList, TextInput, ToastAndroid, Alert, Text, Modal, StyleSheet, Dimensions, Image, Picker, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "./Sidebar";
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../Helper/GenericConstants';
import { CommonMethods } from '../Helper/CommonMethods';
import { SessionManager } from '../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;
import { LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
const APiUrl = "http://192.168.100.7/MobileApp";

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({ name: "Users", createFromLocation: "/Users.db" }, (okCallback, errorCallback) => {
    if (errorCallback)
        console.log("errorCallback", errorCallback)
    else
        console.log("okCallback", okCallback)
});


const url = 'https://www.jamals.com/AppApi/ReadLogin.php';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShowLoder: false,
            signup: false,
            modalVisible: false,
           
            Loginemail: '',
            Loginpassword: '',
            // Loginemail: 'Ahsanghori8@gmail.com',
            // Loginemail: 'maazmehtabuddin95@gmail.com',
            // Loginemail: 'liaqatmaterial@gmail.com',
            // Loginemail: 'seotraininginsialkot@gmail.com',
            // Loginpassword: 'ecgjyp',
            company: '',
            name: '',
            email: '',
            password: '',
            passwordAgain: '',
            InstantId: '',
            instantNo: '',
            selectInstant: 0,
            phone: '',
            user: '',
            dropwdown: [{ id: 1, name: 'Skype' }, { id: 2, name: 'WhatsApp' }, { id: 3, name: 'Wechat' }, { id: 4, name: 'QQ' }]
        }
        this.navParams = this.props.navigation.state.params;
        this.toggle = this.toggle.bind(this);
        this.Login = this.Login.bind(this);
        this.Signup = this.Signup.bind(this);
        // alert("ScreenHeight:" + screenheight + " ScreenWidth:" + screenwidth)
    }

    componentWillMount() {
        // db.executeSql("Drop TABLE Users",[],(res)=>{
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

    PageChange() {
        this.setState({
            signup: !this.state.signup
        }, () => {
            this.forceUpdate();
        })
    }


    fblogin() {
        var UserData = [];

        // this.setState({
        //     ShowLoder: true
        // }, () => {


        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            function (result) {
                if (result.isCancelled) {
                    // alert('Login cancelled');

                } else {
                    AccessToken.getCurrentAccessToken()
                        .then((accessTokenData) => {
                            console.log(accessTokenData, 'accessTokenData')
                            console.log('accessTokenData uSER id', accessTokenData.userID)

                            return fetch('https://graph.facebook.com/' + accessTokenData.userID + '?fields=email,name&access_token=' + accessTokenData.accessToken).
                                then((response) => {
                                    console.log("response", response)
                                    return response.json();
                                })
                                .then((data) => {
                                    console.log("data", data);
                                    UserData.push(data);
                                })
                        }
                        );
                    new GraphRequestManager().addRequest(profileRequest).start();
                }
            })

        setTimeout(() => {
            if (UserData.length > 0) {
                console.log("UserData", UserData);
                console.log("this.state.showLoaader", this.state.ShowLoder);
                var Params = {
                    email: UserData[0].email,
                    name: UserData[0].name,
                    instant_type: "Facebook"
                }
                console.log("Params", Params);
                CommonMethods.CallGETApi(ApiMethodNames.ReadSocialMedia, Params)
                    .then(Response => {
                        console.log("Response", Response);
                        var res = Response.Data.records;
                        console.log("res", res);
                        this.setState({ ResponseData: Response.Data },
                            () => {
                                console.log("ResponseData", this.state.ResponseData);
                                if (this.state.ResponseData != undefined && res.length == 1) {
                                    this.setState({ user: this.state.ResponseData, ShowLoder: false }, () => {
                                        SessionManager.Userdata = this.state.user.records[0];

                                        db.executeSql('Delete FROM User2', [], (re) => {
                                            console.log("DELETE TABLE");

                                        }
                                        );
                                        db.executeSql('CREATE TABLE User2 ( UserId INTEGER PRIMARY KEY AUTOINCREMENT,  id TEXT, name TEXT, email TEXT ,email_verified_at TEXT ,role_id TEXT, paidvisitorId TEXT,  paid_visitor_package_id TEXT ,paidSellerId TEXT ,updated_at TEXT, created_at TEXT, package_id TEXT ,freeVisitorId TEXT ,trial_start_date TEXT,trial_start_end TEXT ,no_of_visit_allowed TEXT, ,no_of_visit_attempt TEXT,active TEXT ,freeSellerId TEXT, package TEXT)', [], (res) => {
                                            console.log("res!!!!!", res)
                                        }, () => {
                                            db.executeSql(`INSERT INTO User2 (id,name,email,email_verified_at,role_id , paidvisitorId ,paid_visitor_package_id ,paid_visitor_package_id ,paidSellerId ,updated_at ,created_at ,package_id ,freeVisitorId ,trial_start_date ,trial_start_end ,no_of_visit_allowed ,no_of_visit_attempt ,active ,freeSellerId ,package) 
                                                VALUES ('${SessionManager.Userdata.id}','${SessionManager.Userdata.name}','${SessionManager.Userdata.email}','${SessionManager.Userdata.email_verified_at}','${SessionManager.Userdata.role_id}' ,'${SessionManager.Userdata.paidvisitorId}','${SessionManager.Userdata.paid_visitor_package_id}' ,'${SessionManager.Userdata.started}','${SessionManager.Userdata.paidSellerId}' ,'${SessionManager.Userdata.updated_at}','${SessionManager.Userdata.created_at}' ,'${SessionManager.Userdata.package_id}','${SessionManager.Userdata.freeVisitorId}' ,'${SessionManager.Userdata.trial_start_date}','${SessionManager.Userdata.trial_start_end}' ,'${SessionManager.Userdata.no_of_visit_allowed}','${SessionManager.Userdata.no_of_visit_attempt}' ,'${SessionManager.Userdata.active}','${SessionManager.Userdata.freeSellerId}' ,'${SessionManager.Userdata.package}')`, [], (results) => {
                                                    console.log("Query completed");
                                                    console.log("results", results);
                                                    var len = results.rows.length;
                                                    for (let i = 0; i < len; i++) {
                                                        let row = results.rows.item(i);
                                                        console.log("row", row);
                                                    }

                                                })
                                        })
                                        console.log("SessionManager.Userdata", SessionManager.Userdata);
                                        ToastAndroid.show("Login Successfull", ToastAndroid.LONG);
                                        this.props.navigation.goBack();;
                                        this.setState({ rerender: !this.state.refresh })
                                    })
                                }
                                else
                                    ToastAndroid.show(res, ToastAndroid.LONG);
                                this.setState({
                                    ShowLoder: false
                                });
                            }
                        )
                    }
                    );
            }
        }, 2000);

        // })
    }

    Signup() {
        if (this.state.name == "") {
            ToastAndroid.show("Enter Name ", ToastAndroid.SHORT);
        }
        else if (this.state.email == "") {
            ToastAndroid.show("Enter email ", ToastAndroid.SHORT);
        }

        else if (this.state.company == "") {
            ToastAndroid.show("Enter company ", ToastAndroid.SHORT);
        }

        else if (this.state.InstantId == "") {
            ToastAndroid.show("Select Instant Id  ", ToastAndroid.SHORT);
        }

        else if (this.state.phone == "") {
            ToastAndroid.show("Enter phone ", ToastAndroid.SHORT);
        }

        else if (this.state.password == "") {
            ToastAndroid.show("Enter password ", ToastAndroid.SHORT);
        }
        // else if (this.state.password.trim() === this.state.passwordAgain.trim()) {
        //     console.log("this.state.password",this.state.password)
        //     console.log("this.state.passwordAgain",this.state.passwordAgain)
        //     ToastAndroid.show("Password Does not Match  ", ToastAndroid.SHORT);
        // }
        else {

            var Params = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                company_name: this.state.company,
                instant_type: this.state.dropwdown.filter(a => a.id == this.state.InstantId)[0].name,
                phone: this.state.phone,
                instant: this.state.instantNo,

            }
            console.log("Params", Params);
            this.setState({
                ShowLoder: true
            }, () => {


                CommonMethods.CallGETApi(ApiMethodNames.CreateUser, Params)
                    .then(Response => {
                        console.log("Response", Response.Data);
                        this.setState({ ResponseData: Response.Data },
                            () => {
                                if (Response.Data.flag == 2) {
                                    ToastAndroid.show(Response.Data.message, ToastAndroid.LONG);
                                    this.setState({
                                        ShowLoder: false
                                    })
                                }
                                else if (Response.Data.flag == 3) {
                                    ToastAndroid.show(Response.Data.message, ToastAndroid.LONG);
                                    this.setState({
                                        ShowLoder: false
                                    })
                                }
                                else if (Response.Data.flag == 4) {
                                    ToastAndroid.show(Response.Data.message, ToastAndroid.LONG);
                                    this.setState({
                                        ShowLoder: false
                                    })
                                }
                                else {
                                    if (this.state.ResponseData != undefined) {
                                        this.setState({ user: this.state.ResponseData, ShowLoder: false }, () => {
                                            console.log("user", this.state.user);
                                            this.setState({ rerender: !this.state.refresh, signup: false })
                                            ToastAndroid.show("Your Account has been Registered Please Varify Your Account Via Email/Phone", ToastAndroid.LONG);

                                        })
                                    }
                                    else
                                        ToastAndroid.show("Something Went Wrong", ToastAndroid.LONG);
                                    this.setState({
                                        ShowLoder: false
                                    });
                                }
                            }
                        )
                    }
                    );
            })




        }


    }
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
                // email: 'ahsanghori8@gmail.com',
                // password: 'ahsan123'
            }

            this.setState({
                ShowLoder: true
            }, () => {

                NetInfo.isConnected.fetch().then(isConnected => {
                    console.log('First, is ' + (isConnected ? 'online' : 'offline'));
                    if(isConnected){

                    
               
                // CommonMethods.CallGETApi(ApiMethodNames.ReadLogin, Params)
              return fetch("https://jamals.com/loginapi/"+Params.email+"/"+Params.password)
                    .then(Response => {
                       this.setState({ ResponseData: JSON.parse(Response._bodyInit) },
                            () => {
                                console.log("this.state.ResponseData",this.state.ResponseData)
                                console.log("this.state.ResponseData[0].email_verified_at",this.state.ResponseData[0].email_verified_at)
                                if(this.state.ResponseData[0].flag==1){
                                if (this.state.ResponseData[0].email_verified_at ==null) {
                                    ToastAndroid.show("Your Account Is Not Activated Please Varify Your Account Via Email/Phone ", ToastAndroid.LONG);
                                    this.setState({
                                        ShowLoder: false
                                    })
                                }
                                else {
                                    if (this.state.ResponseData != undefined && this.state.ResponseData[0].email_verified_at  !=null) {
                                        this.setState({ user: this.state.ResponseData, ShowLoder: true }, () => {
                                            SessionManager.Userdata = this.state.user[0];
                                            console.log("SessionManager",SessionManager.Userdata);
                                            db.executeSql('Delete FROM Users2', [], (re) => {
                                                console.log("DELETE TABLE");

                                            }
                                            )
                                            db.executeSql('CREATE TABLE Users2 ( UserId INTEGER PRIMARY KEY AUTOINCREMENT,  id TEXT, name TEXT, email TEXT ,email_verified_at TEXT ,role_id TEXT, paidvisitorId TEXT,  paid_visitor_package_id TEXT ,paidSellerId TEXT ,updated_at TEXT, created_at TEXT, package_id TEXT ,freeVisitorId TEXT ,trial_start_date TEXT,trial_start_end TEXT ,no_of_visit_allowed TEXT, ,no_of_visit_attempt TEXT,active TEXT ,freeSellerId TEXT, package TEXT, phone TEXT,instant TEXT,instant_type TEXT)', [], (res) => {
                                                console.log("res!!!!!", res)
                                            }, () => {
                                                db.executeSql(`INSERT INTO Users2 (id,name,email,email_verified_at, role_id , paidvisitorId ,paid_visitor_package_id ,paid_visitor_package_id ,paidSellerId ,updated_at ,created_at ,package_id ,freeVisitorId ,trial_start_date ,trial_start_end ,no_of_visit_allowed ,no_of_visit_attempt ,active ,freeSellerId ,package,phone,instant,instant_type) 
                                                    VALUES ('${SessionManager.Userdata.id}','${SessionManager.Userdata.name}','${SessionManager.Userdata.email}','${SessionManager.Userdata.email_verified_at}','${(SessionManager.Userdata.role_id==null)?SessionManager.Userdata.role_id:null}' ,'${SessionManager.Userdata.paidvisitorId}','${SessionManager.Userdata.paid_visitor_package_id}' ,'${SessionManager.Userdata.started}','${SessionManager.Userdata.paidSellerId}' ,'${SessionManager.Userdata.updated_at}','${SessionManager.Userdata.created_at}' ,'${SessionManager.Userdata.package_id}','${SessionManager.Userdata.freeVisitorId}' ,'${SessionManager.Userdata.trial_start_date}','${SessionManager.Userdata.trial_start_end}' ,'${SessionManager.Userdata.no_of_visit_allowed}','${SessionManager.Userdata.no_of_visit_attempt}' ,'${SessionManager.Userdata.active}','${SessionManager.Userdata.freeSellerId}' ,'${SessionManager.Userdata.package}','${SessionManager.Userdata.phone}','${SessionManager.Userdata.instant}','${SessionManager.Userdata.instant_type}')`, [], (results) => {
                                                        console.log("Query completed");
                                                        console.log("results", results);
                                                        var len = results.rows.length;
                                                        for (let i = 0; i < len; i++) {
                                                            let row = results.rows.item(i);
                                                            console.log("row", row);
                                                        }

                                                    })
                                            });
                                            ToastAndroid.show("Login Successfull", ToastAndroid.LONG);
                                            this.props.navigation.goBack();;
                                            this.setState({ rerender: !this.state.refresh })
                                        })
                                    }

                                    else
                                        ToastAndroid.show(res, ToastAndroid.LONG);
                                    this.setState({
                                        ShowLoder: false
                                    });
                                }
                            }
                            else
                            {
                                ToastAndroid.show("Your Email and Password Incorrect", ToastAndroid.LONG);
                                this.setState({
                                    ShowLoder: false
                                });
                            }
                            }
                        )
                    }
                    );
                }
                else{
                    ToastAndroid.show("Network Connection Failed please Connect the Internet", ToastAndroid.LONG);
                    this.setState({
                        ShowLoder: false
                    });
                }
                });
            })

        }

    }
    render() {
        if (this.state.signup == false) {
            return (

                <View style={{ width: '100%', height: '100%', }}>

                    < ImageBackground style={{ width: '100%', height: '100%' }}
                        source={require('../images/Login8.jpg')}
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
                                        source={require('../images/footer-logo.png')}
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
                                                        <	 style={{ color: 'black', fontSize: 25 }} name={'key'} />
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

                                                <TouchableOpacity onPress={this.Login} style={{ width: '78%', height: 40, flexDirection: 'row', marginTop: 10, alignItems: 'center', margin: 5, borderRadius: 5, backgroundColor: '#f9a825', justifyContent: 'center' }}>
                                                    <View style={{ width: '50%', height: 'auto', alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Join Us !</Text>
                                                    </View>

                                                </TouchableOpacity>



                                            </View>
                                        </View>

                                        <TouchableOpacity onPress={this.fblogin.bind(this)} style={{ width: '70%', height: 40, flexDirection: 'row', margin: 5, borderRadius: 5, backgroundColor: '#29487d', justifyContent: 'center' }}>
                                            <View style={{ width: '14%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                                <Icons style={{ color: 'white', fontSize: 25 }} name={'facebook-square'} />
                                            </View>
                                            <View style={{ width: '86%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Sign in with Facebook</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={this.PageChange.bind(this)} style={{ width: '70%', height: 40, flexDirection: 'row', marginTop: 10, margin: 5, borderRadius: 5, backgroundColor: '#006097', justifyContent: 'center' }}>
                                            <View style={{ width: '10%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                                <Icons style={{ color: 'white', fontSize: 20, left: 7 }} name={'user-plus'} />
                                            </View>
                                            <View style={{ width: '90%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Register Now</Text>
                                            </View>

                                        </TouchableOpacity>




                                    </View>
                                </View>
                                {/* </View> */}
                            </View>
                        </ScrollView>
                    </ImageBackground>


                </View>

            )
        }
        else if (this.state.signup == true) {
            return (

                <View style={{ width: '100%', height: '100%', }}>

                    < ImageBackground style={{ width: '100%', height: '100%' }}
                        source={require('../images/Login.jpg')}
                    >
                        <ScrollView style={styles.ScrollContainer}>
                            <View style={styles.MainContainer}>
                                {this.state.ShowLoder &&
                                    <View style={styles.ActivityLoder}>
                                        <ActivityIndicator style={[styles.centering, { height: 80 }]}
                                            size="large" />
                                    </View>
                                }
                                <View style={{ width: '96%', margin: 5, height: 'auto', marginBottom: 20 }}>
                                    <View style={{ widht: '50%', alignItems: 'center', justifyContent: 'center' }}>


                                        <View style={{ width: '96%', margin: 5, height: 'auto', padding: 5, alignItems: 'center', justifyContent: 'center' }}>


                                            <View style={{ width: '90%', height: 37, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 20, justifyContent: 'center' }}>
                                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                                    <Icons style={{ color: 'black', fontSize: 20 }} name={'user'} />
                                                </View>
                                                <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TextInput
                                                        style={{ fontSize: 13, height: 37, width: '100%', paddingTop: 8, alignItems: 'center', justifyContent: 'center' }}
                                                        onChangeText={(text) => { this.setState({ name: text, }) }}
                                                        placeholder="Name"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.name}
                                                    />
                                                </View>
                                            </View>

                                            <View style={{ width: '90%', height: 37, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 20, justifyContent: 'center' }}>
                                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                                    <Iconsss style={{ color: 'black', fontSize: 20 }} name={'email'} />
                                                </View>
                                                <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TextInput
                                                        style={{ fontSize: 13, height: 37, width: '100%', paddingTop: 8, alignItems: 'center', justifyContent: 'center' }}
                                                        onChangeText={(text) => { this.setState({ email: text, }) }}
                                                        placeholder="Email"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.email}
                                                    />
                                                </View>
                                            </View>

                                            <View style={{ width: '90%', height: 37, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 20, justifyContent: 'center' }}>
                                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                                    <Icons style={{ color: 'black', fontSize: 20 }} name={'users'} />
                                                </View>
                                                <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TextInput
                                                        style={{ fontSize: 13, height: 37, width: '100%', paddingTop: 8, alignItems: 'center', justifyContent: 'center' }}
                                                        onChangeText={(text) => { this.setState({ company: text, }) }}
                                                        placeholder="Company"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.company}
                                                    />
                                                </View>
                                            </View>

                                            <View style={{ width: '90%', height: 37, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 20, justifyContent: 'center' }}>
                                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                                    <Icons style={{ color: 'black', fontSize: 20 }} name={'wechat'} />
                                                </View>
                                                <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Picker
                                                        selectedValue={this.state.InstantId}
                                                        style={styles.picker}
                                                        onValueChange={(itemValue, itemIndex) => this.setState({ InstantId: itemValue, })}>
                                                        <Picker.Item label="Select Option " value={0} />
                                                        {this.state.dropwdown.map((val, index) => {
                                                            return (
                                                                <Picker.Item key={index} label={val.name} value={val.id} />
                                                            )
                                                        })}
                                                    </Picker>
                                                </View>
                                            </View>

                                            <View style={{ width: '90%', height: 37, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 20, justifyContent: 'center' }}>
                                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                                    <Icons style={{ color: 'black', fontSize: 25 }} name={'mobile-phone'} />
                                                </View>
                                                <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TextInput
                                                        style={{ fontSize: 13, height: 37, width: '100%', paddingTop: 8, alignItems: 'center', justifyContent: 'center' }}
                                                        onChangeText={(text) => { this.setState({ instantNo: text, }) }}
                                                        placeholder="Instant No"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.instantNo}
                                                    />
                                                </View>
                                            </View>

                                            <View style={{ width: '90%', height: 37, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 20, justifyContent: 'center' }}>
                                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                                    <Icons style={{ color: 'black', fontSize: 25 }} name={'mobile-phone'} />
                                                </View>
                                                <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TextInput
                                                        style={{ fontSize: 13, height: 37, width: '100%', paddingTop: 8, alignItems: 'center', justifyContent: 'center' }}
                                                        onChangeText={(text) => { this.setState({ phone: text, }) }}
                                                        keyboardType='numeric'
                                                        placeholder="Phone No"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.phone}
                                                    />
                                                </View>
                                            </View>

                                            <View style={{ width: '90%', height: 37, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 20, justifyContent: 'center' }}>
                                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                                    <Icons style={{ color: 'black', fontSize: 25 }} name={'lock'} />
                                                </View>
                                                <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TextInput
                                                        style={{ fontSize: 13, height: 37, width: '100%', paddingTop: 8, alignItems: 'center', justifyContent: 'center' }}
                                                        onChangeText={(text) => { this.setState({ password: text, }) }}
                                                        placeholder="Password"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.password}
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width: '90%', height: 37, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 20, justifyContent: 'center' }}>
                                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                                    <Icons style={{ color: 'black', fontSize: 25 }} name={'key'} />
                                                </View>
                                                <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TextInput
                                                        style={{ fontSize: 13, height: 37, width: '100%', paddingTop: 8, alignItems: 'center', justifyContent: 'center' }}
                                                        onChangeText={(text) => { this.setState({ passwordAgain: text, }) }}
                                                        placeholder="Conform Password"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.passwordAgain}
                                                    />
                                                </View>
                                            </View>

                                            <TouchableOpacity onPress={this.Signup} style={{ width: '70%', height: 35, flexDirection: 'row', marginTop: 10, alignItems: 'center', margin: 5, borderRadius: 5, backgroundColor: '#006097', justifyContent: 'center' }}>
                                                <View style={{ width: '86%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Register Now !</Text>
                                                </View>
                                            </TouchableOpacity>



                                            <TouchableOpacity onPress={this.PageChange.bind(this)} style={{ width: '70%', height: 35, flexDirection: 'row', marginTop: 10, alignItems: 'center', margin: 5, borderRadius: 5, backgroundColor: '#f9a825', justifyContent: 'center' }}>
                                                <View style={{ width: '86%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Login Now !</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>





                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>

            )
        }
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
