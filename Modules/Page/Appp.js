import React, { Component } from "react";

import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import Iconsssss from 'react-native-vector-icons/MaterialIcons';
import { View, Animated, StatusBar, ScrollView, ScrollContainer, FlatList, TextInput, TouchableHighlight, ToastAndroid, Alert, Linking, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "./Sidebar";
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../Helper/GenericConstants';
import { CommonMethods } from '../Helper/CommonMethods';
import { SessionManager } from '../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;
import ImageSlider from 'react-native-image-slider';
import Header from './Header';
import { Label } from 'native-base';
const ImageURLLogo = GenericConstants.ImageURLLogo;
HEADER_MAX_HEIGHT = 160
HEADER_MIN_HEIGHT = 80
PROFILE_IMAGE_MAX_HEIGHT = 150
PROFILE_IMAGE_MIN_HEIGHT = 50

class Appp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            scrollY: new Animated.Value(0),
            modalVisible: false,
            flag: false,
            isOpen: false,
            ShowLoder: false,
            text: '',
            text1: '',
            record: '',
            Premium: [{ Image: require("../images/pre1.jpg"), event: 'China (Chengdu) Int I Sola', Location: 'Western China International', date: 'March 7th-9th ,2019' },
            { Image: require("../images/pre2.jpg"), event: 'China Pet Expo 2019', Location: 'China International Exhibition', date: 'March 14th-17th ,2019' },
            { Image: require("../images/pre3.jpg"), event: 'ASEAN Vending Machine', Location: 'Impact Exhibition Center', date: 'September 19th-21st ,2019' }],

            demo: this.props.navigation.state.params.demo,
            val: this.props.navigation.state.params.val,
        }

        console.log("this.state.val", this.state.val);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.forceUpdate();
        }
        );
        this.ModalBox = this.ModalBox.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.navParams = this.props.navigation.state.params;
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        console.log("ProductDetail Component Will Mount");
        // this.DetailApi();
    }

    DetailApi() {
        var Params = {
            codeno: this.props.navigation.state.params.param,
            // codeno: "102s053",
        }

        console.log("Params 1", Params);




        return fetch('https://www.jamals.com/AppApi/ReadProfile.php?codeno=' + Params.codeno)
            .then(Response => {
                console.log("Response", Response._bodyText);
                this.setState({ ResponseData: JSON.parse(Response._bodyInit).records },
                    () => {
                        if (this.state.ResponseData != undefined) {
                            console.log("this.state.ResponseData", this.state.ResponseData);
                            console.log("this.state.ResponseData.length", this.state.ResponseData.length);
                            if (this.state.ResponseData.length == 0 || this.state.ResponseData == []) {
                                ToastAndroid.show("No Detail Found", ToastAndroid.LONG);
                                this.setState({
                                    flag: false
                                })
                            }
                            else {
                                this.setState({
                                    record: this.state.ResponseData[0],
                                    flag: true,
                                    ShowLoder: true
                                }, () => {
                                    console.log("record :d", this.state.record);
                                    console.log("ShowLoder", this.state.ShowLoder);
                                    this.forceUpdate();
                                    this.setState({ rerender: !this.state.refresh, ShowLoder: true })

                                })
                            }
                        }

                        else {
                            ToastAndroid.show(ErrorMessages.NoRecordFound, ToastAndroid.LONG);

                            this.setState({
                                ShowLoder: false
                            });
                            // this.props.navigation.goBack();
                        }
                    }
                )
            }
            );



    }


    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            this.updateMenuState(false);
        }
        );
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    ModalBox() {
        this.setModalVisible();
    }
    static navigationOptions = {
        page: 'ProductDetail'
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

    LoginCheck() {
        if (SessionManager.Userdata == undefined) {
            this.props.navigation.navigate("Login")
        }
        else {
            ToastAndroid.show("Already Login Account ", ToastAndroid.LONG);
        }
    }

    facebooklink(val) {
        if (val == "") {
            ToastAndroid.show("Not Provide The Company", ToastAndroid.LONG)
        }
        else if (val == null) {
            ToastAndroid.show("Not Provide The Company", ToastAndroid.LONG)
        }
        else {
            Linking.openURL('http://' + val)
        }

    }

    twitterLink(val) {
        if (val == "") {
            ToastAndroid.show("Not Provide The Company", ToastAndroid.LONG)
        }
        else if (val == null) {
            ToastAndroid.show("Not Provide The Company", ToastAndroid.LONG)
        }
        else {
            Linking.openURL('http://' + val)
        }

    }
    linkedinLink(val) {
        if (val == "") {
            ToastAndroid.show("Not Provide The Company", ToastAndroid.LONG)
        }
        else if (val == null) {
            ToastAndroid.show("Not Provide The Company", ToastAndroid.LONG)
        }
        else {
            Linking.openURL('http://' + val)
        }

    }
    youtubeLink(val) {
        if (val == "") {
            ToastAndroid.show("Not Provide The Company", ToastAndroid.LONG)
        }
        else if (val == null) {
            ToastAndroid.show("Not Provide The Company", ToastAndroid.LONG)
        }
        else {
            Linking.openURL('http://' + val)
        }

    }



    check() {
        // this.props.navigation.navigate('Appp', { param: val.codeno, demo: val.demo, val: val })

        if (SessionManager.Userdata == undefined) {
            ToastAndroid.show("Loged In Required", ToastAndroid.LONG);
            this.props.navigation.navigate("Login")
        }
        else {
            var Params = {
                id: SessionManager.Userdata.id,
            }
            console.log("Params", Params);
            this.setState({
                ShowLoder: true
            }, () => {
                CommonMethods.CallGETApi(ApiMethodNames.ReadPermission, Params)
                    .then(Response => {
                        console.log("Response", Response.Data);

                        this.setState({ ResponseData: Response.Data[0], ShowLoder: false },
                            () => {
                                console.log("this.state.ResponseData",this.state.ResponseData.message_id);
                                if (this.state.ResponseData != undefined && this.state.ResponseData != []) {
                                    if (this.state.ResponseData.message_id == 1) {
                                        this.setState({
                                            flag: true
                                        })
                                        this.DetailApi();
                                        // this.props.navigation.navigate('Appp', { param: val.codeno, demo: val.demo, val: val })
                                    }
                                    else if (this.state.ResponseData.message_id == 2) {
                                        console.log("run message id 2");
                                        ToastAndroid.show(this.state.ResponseData.message, ToastAndroid.SHORT);
                                        Alert.alert(
                                            'Notification',
                                            'Please Buy the package to more Companies Details',
                                            [
                                                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                                                { text: 'OK', onPress: () => this.props.navigation.navigate('Packages') },

                                            ],
                                            { cancelable: false }
                                        )
                                    }
                                    else if (this.state.ResponseData.message_id == 3) {
                                        ToastAndroid.show(this.state.ResponseData.message, ToastAndroid.SHORT);
                                        Alert.alert(
                                            'Notification',
                                            'Please Buy the package to more Companies Details',
                                            [
                                                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                                                { text: 'OK', onPress: () => this.props.navigation.navigate('Packages') },

                                            ],
                                            { cancelable: false }
                                        )
                                        // this.setState({
                                        //     flag: true
                                        // })
                                        // this.DetailApi();
                                        // this.props.navigation.navigate('Appp', { param: val.codeno, demo: val.demo, val: val })
                                    }

                                    else if (this.state.ResponseData.message_id == 4) {
                                       
                                        this.setState({
                                            flag: true
                                        })
                                        this.DetailApi();
                                        //    this.props.navigation.navigate('Appp', { param: val.codeno, demo: val.demo, val: val })
                                    }
                                    else if (this.state.ResponseData.message_id == 5) {
                                        ToastAndroid.show(this.state.ResponseData.message, ToastAndroid.SHORT);
                                        Alert.alert(
                                            'Notification',
                                            'Please Buy the package to more Companies Details',
                                            [
                                                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                                                { text: 'OK', onPress: () => this.props.navigation.navigate('Packages') },

                                            ],
                                            { cancelable: false }
                                        )  
                                     
                                   }

                                   else if (this.state.ResponseData.message_id == 6) {
                                    ToastAndroid.show(this.state.ResponseData.message, ToastAndroid.SHORT);
                                    Alert.alert(
                                        'Notification',
                                        'Please Buy the package to more Companies Details',
                                        [
                                            { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                                            { text: 'OK', onPress: () => this.props.navigation.navigate('Packages') },

                                        ],
                                        { cancelable: false }
                                    )  
                                 
                               }

                               else if (this.state.ResponseData.message_id == 7) {
                                ToastAndroid.show(this.state.ResponseData.message, ToastAndroid.SHORT);
                                Alert.alert(
                                    'Notification',
                                    'Please Buy the package to more Companies Details',
                                    [
                                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                                        { text: 'OK', onPress: () => this.props.navigation.navigate('Packages') },

                                    ],
                                    { cancelable: false }
                                )  
                             
                           }
                                }
                                else
                                    ToastAndroid.show("Inquiry was Not Send ", ToastAndroid.LONG);
                                this.setState({
                                    ShowLoder: false
                                });
                            }
                        )
                    }
                    );
            })


        }
    }

    checkCall(val) {
        console.log("val", val);


        if (SessionManager.Userdata == undefined) {
            ToastAndroid.show("Loged In Required", ToastAndroid.LONG);
            this.props.navigation.navigate("Login")
        }
        else {
            Linking.openURL('tel:' + "0" + this.state.val.phonecode + + val);
        }
    }

    checkwebsite(val) {
        if (this.state.flag == false) {
            this.check();
        }
        else {
            Linking.openURL('http://' + val)
        }
    }
    render() {

        let record = [];
        record = this.state.record;
        console.log("record", record);
        var demo = [];
        demo = this.state.demo
        console.log("demo", demo);
        console.log("this.state.demo", this.state.demo);
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        })
        const profileImageHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
            extrapolate: 'clamp'
        })

        const profileImageMarginTop = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            // inputRange: [0, HEADER_MIN_HEIGHT ],
            outputRange: [HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT / 2), HEADER_MAX_HEIGHT + 5],
            extrapolate: 'clamp'
        })
        const headerZindex = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
            outputRange: [0, 0, 50],
            extrapolate: 'clamp'
        })

        const headerTitleBottom = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT
                + 26
            ],
            outputRange: [-20, -20, -20, 15],
            extrapolate: 'clamp'
        })

        const backgroundColors = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: ['transparent', 'black',],
            extrapolate: 'clamp',
        })

        return (

            <View style={{ flex: 1 }} >
                <StatusBar backgroundColor='#EED15C' barStyle="dark-content" hidden={false} translucent={true} />

                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#FEDF7C',
                    height: headerHeight,
                    zIndex: headerZindex,
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ position: 'absolute', left: 10, zindex: 6000, top: 27, width: '10%', height: 50, alignItems: 'center', justifyContent: 'center' }}>

                        <Iconsssss style={{ color: 'black', fontSize: 25, paddingTop: 3, padding: 2 }} name={"arrow-back"} />
                    </TouchableOpacity>

                </Animated.View>



                <ScrollView style={{ flex: 1 }}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                    )}
                >
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ position: 'absolute', left: 10, zindex: 1000, top: 30, width: '10%', height: 50, alignItems: 'center', justifyContent: 'center' }}>

                        {/* <Iconsssss style={{ color: 'black', fontSize: 25, paddingTop: 3, padding: 2 }} name={"arrow-back"} /> */}
                    </TouchableOpacity>

                    <Animated.View style={{
                        height: profileImageHeight,
                        width: profileImageHeight,
                        // borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
                        borderRadius: 10,
                        borderColor: 'white',
                        borderWidth: 3,
                        overflow: 'hidden',
                        marginTop: 80,
                        marginLeft: 20,

                    }}>



                        {(this.state.val.logo == "Y") ?
                            <Image
                                style={{ flex: 1, width: null, height: null }}
                                source={{ uri: ImageURLLogo + record.code + 'l.jpg' }}
                            />
                            :
                            <Image
                                style={{ flex: 1, width: null, height: null }}
                                source={require('../images/Here.jpg')}
                            />
                        }
                        {/* <Image source={require('../images/12004l.jpg')}
                            style={{ flex: 1, width: null, height: null }}
                        ></Image> */}


                    </Animated.View>


                    {/* <View style={{ height: 650 }}> */}

                    <View style={{ backgroundColor: 'transparent', margin: 0, marginBottom: 50, height: 'auto', }}>

                        <View style={{ backgroundColor: 'white', width: '100%', marginTop: 15, marginBottom: 5, borderBottomColor: '#DCDEE3', borderBottomWidth: 1, borderStyle: 'solid' }}>
                            <Text style={{ color: 'gray', fontSize: 18, padding: '4%', fontWeight: 'bold', textAlign: 'center' }}>
                                {this.state.val.name}
                                {/* {record.name} */}
                            </Text>
                        </View>


                        <View style={{ width: '100%', height: 120, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
                            <View style={{ flex: 0.7, width: '100%', height: 120, marginTop: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', flexDirection: 'row' }}>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('InquiryFrom', { param: this.state.val })} style={{ width: '20%', height: 70, marginLeft: '2%', marginRight: '3%', borderRadius: 90, backgroundColor: '#EED15C', justifyContent: 'center', alignItems: 'center' }}>
                                    <Iconsss style={{ color: 'black', fontSize: 30, alignItems: 'center', justifyContent: 'center', }} name={'email'} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.checkCall.bind(this, this.state.val.phone)} style={{ width: '20%', height: 70, marginLeft: '2%', marginRight: '3%', borderRadius: 90, backgroundColor: '#EED15C', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icons style={{ color: 'black', fontSize: 30, alignItems: 'center', justifyContent: 'center', }} name={'phone'} />
                                </TouchableOpacity>


                                <TouchableOpacity onPress={this.checkwebsite.bind(this, record.website)} style={{ width: '20%', height: 70, marginLeft: '2%', marginRight: '3%', borderRadius: 90, backgroundColor: '#EED15C', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icons style={{ color: 'black', fontSize: 30, alignItems: 'center', justifyContent: 'center', }} name={'globe'} />
                                </TouchableOpacity>

                            </View>
                            <View style={{ flex: 0.3, width: '100%', marginTop: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>


                                <View style={{ width: '20%', marginLeft: '2%', marginRight: '3%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, color: 'black' }}>
                                        Email
                                 </Text>
                                </View>
                                <View style={{ width: '20%', marginLeft: '2%', marginRight: '3%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, color: 'black' }}>
                                        Phone
                                 </Text>
                                </View>
                                <View style={{ width: '20%', marginLeft: '2%', marginRight: '3%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, color: 'black' }}>
                                        Web Site
                                 </Text>
                                </View>
                            </View>
                        </View>


                        {this.state.demo != 0 &&

                            <View style={{ width: '100%', height: 'auto' }}>
                                <View style={[{ backgroundColor: 'white', marginTop: 10, marginBottom: 10, width: '100%', height: 45, }]}>
                                    <Text style={{ fontSize: 16, color: 'gray', padding: '3%', fontWeight: 'bold' }}>
                                        Bussiness Classifications
                                        </Text>
                                </View>

                                {(demo.map((val, ind) => {
                                    return (
                                        <View key={ind} style={{ backgroundColor: 'white', widht: '100%', flexDirection: 'row', }}>
                                            <Text style={{ color: 'black', fontSize: 13, padding: 5, left: 5 }}>.</Text>
                                            <Text style={{ color: 'black', fontSize: 13, padding: 5, left: 5 }}>
                                                {val.name}
                                            </Text>
                                        </View>
                                    )
                                }))}

                            </View>
                        }




                        {/* <View style={{ width: '100%', height: 'auto', marginTop: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('InquiryFrom', { param: this.state.val })} style={{ margin: '1%', flexDirection: 'row', borderRadius: 10, borderStyle: 'solid', borderWidth: 2, borderColor: '#fadf2e', width: '40%', height: 30, backgroundColor: '#263948', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon style={{ color: 'white', fontSize: 15, paddingBottom: 5, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }} name={'exchange-alt'} />
                                <Text style={{ textAlign: 'center', color: 'white', paddingBottom: 5 }}>Send Enquiry</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => Linking.openURL('http://' + record.website)} style={{ margin: '1%', flexDirection: 'row', borderRadius: 10, borderStyle: 'solid', borderWidth: 2, borderColor: '#fadf2e', width: '40%', height: 30, backgroundColor: '#263948', alignItems: 'center', justifyContent: 'center' }}>
                                <Icons style={{ color: 'white', fontSize: 20, alignItems: 'center', paddingBottom: 5, justifyContent: 'center', paddingRight: 10 }} name={'globe'} />
                                <Text style={{ textAlign: 'center', color: 'white', paddingBottom: 5 }}>Visit WebSite</Text>
                            </TouchableOpacity>
                        </View> */}

                        <View style={{ width: '100%', height: 205, marginBottom: 10 }}>
                            <View style={[{ backgroundColor: 'white', marginTop: 10, marginBottom: 10, width: '100%', height: 45, }]}>
                                <Text style={{ fontSize: 16, color: 'gray', padding: '3%', fontWeight: 'bold' }}>
                                    Our Products
                                   </Text>
                            </View>

                            <View style={[{ backgroundColor: 'white', width: '98%', height: 160, marginTop: 2, marginLeft: '1%', marginRight: '1%' }]}>
                                <FlatList
                                    style={{ height: '100%', }}
                                    data={this.state.Premium}
                                    ItemSeparatorComponent={this.space}
                                    horizontal={true}
                                    extraData={this.state.rerender}
                                    renderItem={({ item, index }) =>
                                        (
                                            <View key={index} style={{
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 1 },
                                                shadowOpacity: 0.8,
                                                shadowRadius: 1,
                                                elevation: 1, margin: 6, marginTop: 6, width: (screenwidth / 2), height: 140, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRightColor: 'white', borderStyle: 'solid', borderRightWidth: 0,
                                            }}>


                                                <View style={{ width: '50%', height: 120, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderRadius: 0, right: 0, top: 0 }}>
                                                    <Image
                                                        style={{ width: 120, height: 120, borderRadius: 0 }}
                                                        source={item.Image}
                                                    />
                                                </View>
                                            </View>
                                        )}
                                />
                            </View>
                        </View>


                        {
                            this.state.record == '' &&
                            this.state.flag == false &&
                            <View style={{ width: '100%', marginTop: 10, height: 60, justifyContent: 'center', alignItems: 'center' }}>

                                <TouchableOpacity onPress={this.check.bind(this)} style={{ width: 120, height: 30, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image
                                        style={{ width: 120, height: 30, }}
                                        source={require('../images/Detail.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        }

                        {this.state.flag == true &&

                            this.state.record != '' &&
                            <View style={{ width: '100%', height: 'auto' }}>

                                <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', height: 'auto', margin: 0, paddingTop: 5, paddingBottom: 5 }}>
                                    <View style={{ width: '100%', height: 'auto', flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>


                                        <View style={{ height: 'auto', flexDirection: 'row', width: '96%', marginTop: 10, }}>
                                            <View style={{ width: '100%', height: 'auto', flexDirection: 'row', }}>
                                                <Icons style={{ color: 'gray', fontSize: 18, paddingTop: 6, padding: 4, }} name={"phone"} />
                                                <Text style={{ fontSize: 14, padding: 4, paddingTop: 6, color: 'black', }}>
                                                    {record.phone}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{ height: 'auto', flexDirection: 'row', width: '96%', marginTop: 10, }}>
                                            <View style={{ width: '100%', height: 'auto', flexDirection: 'row', }}>
                                                <Iconsss style={{ color: 'gray', fontSize: 18, paddingTop: 6, padding: 4, }} name={"email"} />
                                                <Text style={{ fontSize: 14, padding: 4, paddingTop: 6, color: 'black', }}>
                                                    {record.email}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{ height: 'auto', flexDirection: 'row' }}>
                                            <View style={{ width: '100%', height: 'auto', width: '96%', marginTop: 10, marginBottom: 10, flexDirection: 'row', }}>
                                                <Iconsssss style={{ color: 'gray', fontSize: 18, paddingTop: 6, padding: 4, }} name={"location-on"} />
                                                <Text style={{ fontSize: 14, padding: 4, paddingTop: 6, color: 'black', }}>
                                                    {record.address + " , " + record.city}
                                                </Text>
                                            </View>
                                        </View>


                                    </View>
                                </View>





                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={this.facebooklink.bind(this, record.facebook)} style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 90, margin: 5, backgroundColor: '#29487d' }}>
                                        <Icons style={{ color: 'white', fontSize: 15, alignItems: 'center', justifyContent: 'center' }} name={'facebook'} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.twitterLink.bind(this, record.twitter)} style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 90, margin: 5, backgroundColor: '#55acee' }}>
                                        <Icons style={{ color: 'white', fontSize: 15, alignItems: 'center', justifyContent: 'center' }} name={'twitter'} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.linkedinLink.bind(this, record.linkedin)} style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 90, margin: 5, backgroundColor: '#006097' }}>
                                        <Icons style={{ color: 'white', fontSize: 15, alignItems: 'center', justifyContent: 'center' }} name={'linkedin'} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.youtubeLink.bind(this, record.youtube)} style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 90, margin: 5, backgroundColor: '#d71e17' }}>
                                        <Icons style={{ color: 'white', fontSize: 15, alignItems: 'center', justifyContent: 'center' }} name={'youtube-square'} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        }
                    </View>

                    {/* </View> */}
                </ScrollView>

            </View >
        );
    }
}
export default Appp;


const styles = StyleSheet.create({
    ThemeColorBlack: {
        backgroundColor: Colors.BackgroundBlack
    },
    ThemeColorYellow: {
        backgroundColor: Colors.ThemeColorYellow
    },
    // container: {
    //     flex: 1,
    //     backgroundColor: '#F5FCFF',
    // },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    slider: { backgroundColor: '#000', height: 350 },
    content1: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content2: {
        width: '100%',
        height: 100,
        marginTop: 10,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: { color: '#fff' },
    buttons: {
        zIndex: 1,
        height: 15,
        marginTop: -25,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        margin: 3,
        width: 15,
        height: 15,
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSelected: {
        opacity: 1,
        color: 'red',
    },
    customSlide: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customImage: {
        width: '100%',
        height: '100%',
    },
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#F5FCFF',
    // },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    ParentContainer: {
        width: '100%',
        height: '100%'
        // paddingBottom: 110
    },
    ScrollContainer: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#f1f0ea'
        backgroundColor: '#DCDEE3',
        // backgroundColor: '#f1f0ea'
        // backgroundColor: 'red'
        // backgroundColor: Colors.BackgroundPureWhite
    },
    MainContainer: {
        flex: 1,
        flexDirection: 'column',

        backgroundColor: '#DCDEE3',
        // backgroundColor: '#fff',
    },
    Background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'cover'
    },
    FormContainer: {
        width: '100%',
        // height: '100%',
        alignItems: 'center',
    },
    SliderContainer: {
        width: '100%',
        alignItems: 'center',
    },

    MainHeader: {
        width: MainHeaders.width,
        alignItems: MainHeaders.alignItems,
        flexDirection: MainHeaders.flexDirection,
        backgroundColor: MainHeaders.backgroundColors,
        height: MainHeaders.height
    },

    MainHeader1: {
        width: '100%',
        alignItems: 'center',
        //  backgroundColors = '#1ab394',
        backgroundColor: '#fdda00',
        height: 80,
    },
    HeaderBody: {
        width: HeaderBody.width,
        height: HeaderBody.height,
        alignItems: HeaderBody.alignItems,
        justifyContent: HeaderBody.justifyContent,
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


});
