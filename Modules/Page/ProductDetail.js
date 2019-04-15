
import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import Iconsssss from 'react-native-vector-icons/MaterialIcons';
import { View, ScrollView, ScrollContainer, FlatList, TextInput, TouchableHighlight, ToastAndroid, Alert, Linking, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "./Sidebar";
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../Helper/GenericConstants';
import { CommonMethods } from '../Helper/CommonMethods';
import { SessionManager } from '../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
import ImageSlider from 'react-native-image-slider';
import Header from './Header';
import { Label } from 'native-base';
const ImageURLLogo = GenericConstants.ImageURLLogo;
export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            flag: false,
            isOpen: false,
            ShowLoder: false,
            text: '',
            text1: '',
            record: '',
            demo: this.props.navigation.state.params.demo,
            val: this.props.navigation.state.params.val,
        }
        // console.log("this.props.navigation.state.params.demo",this.props.navigation.state.params.demo);
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
        this.DetailApi();
    }

    DetailApi() {
        var Params = {
            codeno: this.props.navigation.state.params.param,
            // codeno: "102s053",
        }

        console.log("Params", Params);




        return fetch('https://www.jamals.com/AppApi/ReadProfile.php?codeno=' + Params.codeno)
            .then(Response => {
                console.log("Response", Response._bodyText);
                this.setState({ ResponseData: JSON.parse(Response._bodyInit).records },
                    () => {
                        if (this.state.ResponseData != undefined) {
                            console.log("this.state.ResponseData", this.state.ResponseData);
                            this.setState({
                                record: this.state.ResponseData[0],
                                ShowLoder: true
                            }, () => {
                                console.log("record", this.state.record);
                                console.log("ShowLoder", this.state.ShowLoder);
                                this.setState({ rerender: !this.state.refresh, ShowLoder: true })

                            })
                        }
                        else {
                            ToastAndroid.show(ErrorMessages.NoRecordFound, ToastAndroid.LONG);

                            this.setState({
                                ShowLoder: false
                            });
                            this.props.navigation.goBack();
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

    render() {
        const images = [{ Image: require("../images/slide1.jpg") }, { Image: require("../images/slide2.jpg") },
        { Image: require("../images/slide3.jpg") }, { Image: require("../images/slide4.jpg") }];

        let record = [];
        record = this.state.record;
        var demo = [];
        demo = this.state.demo
        console.log("demo", demo);
        console.log("this.state.demo", this.state.demo);
        data = [{ id: 1, text: 'Dental Equipment' }, { id: 2, text: 'Scissors All sorts' },
        { id: 3, text: 'Surgical Instrument Equipment' }, { id: 4, text: 'BeautyCare Instrument ', },
        { id: 5, text: 'Surgical Instrument Equipment' }, { id: 6, text: 'BeautyCare Instrument ', }]

        const { navigation } = this.props;
        this.props.navigation.state.params = { title: 'ProductDetail' };
        const menu = <Sidebar navigation={this.props.navigation} />;
        const Dimensions = require('Dimensions')
        return (
            <SideMenu
                menu={menu}
                menuPosition={'left'}
                openMenuOffset={Dimensions.get('window').width * (2 / 2.7)}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}
            >
                <View style={[styles.ThemeColorYellow, { bottom: 0, zIndex: 10, width: '100%', height: 45, position: 'absolute', flexDirection: 'row' }]} >

                    <TouchableOpacity onPress={this.toggle} style={{ flexDirection: 'row', width: '30%', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15, paddingRight: 4 }} name={"navicon"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>More</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.LoginCheck.bind(this)} style={{ width: '30%', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15 }} name={"user-plus"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>Membership</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("Classification") }} style={{ width: '30%', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15, paddingRight: 4 }} name={"th-large"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>Categories</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ParentContainer}>
                    <Header props={this.props.navigation} />
                    {this.state.ShowLoder == false &&

                        <View style={styles.ActivityLoder}>
                            <ActivityIndicator style={[styles.centering, { flexDirection: 'column', height: screenheight, width: '100%', backgroundColor: (this.state.ShowLoder == false) ? 'rgba(255,255,255,0.7)' : 'white' }]}
                                size="large" />

                        </View>
                    }

                    <ScrollView style={styles.ScrollContainer}>
                        <View style={styles.MainContainer}>



                            <View style={{ backgroundColor: 'transparent', margin: 0, marginBottom: 50, height: 'auto', }}>

                                <View style={{ backgroundColor: 'white', width: '100%', marginTop: 15, marginBottom: 5, borderBottomColor: '#DCDEE3', borderBottomWidth: 1, borderStyle: 'solid' }}>
                                    <Text style={{ color: 'gray', fontSize: 18, padding: '4%', fontWeight: 'bold' }}>
                                        {record.name}
                                    </Text>
                                </View>

                                <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, width: '96%', marginTop: 10, flexDirection: 'row', height: 120, margin: 5 }}>
                                    <View style={{ width: '30%', height: 120, justifyContent: 'center', alignItems: 'center', }}>
                                        {(this.state.val.logo == "Y") ?
                                            <Image
                                                style={{ width: '100%', height: 120, borderRadius: 0, marginTop: 0 }}
                                                source={{ uri: ImageURLLogo + record.code + 'l.jpg' }}
                                            />
                                            :
                                            <Image
                                                style={{ width: '100%', height: 120, borderRadius: 0, marginTop: 0 }}
                                                source={require('../images/Here.jpg')}
                                            />
                                        }

                                    </View>

                                    <View style={{ width: '70%', height: 'auto', flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                                        <View style={{ height: 'auto' }}>
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}>Address </Text>
                                        </View>

                                        <View style={{ height: 'auto', flexDirection: 'row' }}>
                                            <View style={{ width: '90%', height: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Iconsssss style={{ color: 'black', fontSize: 15, paddingTop: 2, padding: 2, textAlign: 'center' }} name={"location-on"} />
                                                <Text style={{ fontSize: 12, padding: 2, color: 'black', textAlign: 'center' }}>
                                                    {record.address}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{ height: 'auto' }}>
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}>Contact No</Text>
                                        </View>

                                        <View style={{ height: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                                            <View style={{ width: '90%', height: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Icons style={{ color: 'black', fontSize: 15, paddingTop: 2, padding: 2, textAlign: 'center' }} name={"phone"} />
                                                <Text style={{ fontSize: 12, padding: 2, color: 'black', textAlign: 'center' }}>
                                                    {record.phone}

                                                </Text>
                                            </View>
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
                                <View style={{ width: '100%', height: 'auto', marginTop: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InquiryFrom', { param: this.state.val })} style={{ margin: '1%', flexDirection: 'row', borderRadius: 10, borderStyle: 'solid', borderWidth: 2, borderColor: '#fadf2e', width: '40%', height: 30, backgroundColor: '#263948', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon style={{ color: 'white', fontSize: 15, paddingBottom: 5, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }} name={'exchange-alt'} />
                                        <Text style={{ textAlign: 'center', color: 'white', paddingBottom: 5 }}>Send Enquiry</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => Linking.openURL('http://' + record.website)} style={{ margin: '1%', flexDirection: 'row', borderRadius: 10, borderStyle: 'solid', borderWidth: 2, borderColor: '#fadf2e', width: '40%', height: 30, backgroundColor: '#263948', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icons style={{ color: 'white', fontSize: 20, alignItems: 'center', paddingBottom: 5, justifyContent: 'center', paddingRight: 10 }} name={'globe'} />
                                        <Text style={{ textAlign: 'center', color: 'white', paddingBottom: 5 }}>Visit WebSite</Text>
                                    </TouchableOpacity>
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
                        </View>


                    </ScrollView>
                </View>

            </SideMenu >

        );
    }
}

const styles = StyleSheet.create({
    ThemeColorBlack: {
        backgroundColor: Colors.BackgroundBlack
    },
    ThemeColorYellow: {
        backgroundColor: Colors.ThemeColorYellow
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
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
