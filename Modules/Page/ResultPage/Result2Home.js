
import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import Iconsssss from 'react-native-vector-icons/MaterialIcons';
import { View, ScrollView, StatusBar, FlatList, Linking, TextInput, ToastAndroid, Alert, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "../Sidebar";
import { Colors, YellowBox, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../../Helper/GenericConstants';
import { CommonMethods } from '../../Helper/CommonMethods';
import { SessionManager } from '../../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
import ModalFilterPicker from 'react-native-modal-filter-picker'
// import Header from '../Header';
import { material, human } from 'react-native-typography';
const ImageURLLogo = GenericConstants.ImageURLLogo;
import LinearGradient from 'react-native-linear-gradient';
// import Header from '../Header';
export default class ResultHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            data: '',
            modalVisible: false,
            flag: false,
            isOpen: false,
            ShowLoder: false,
            text: '',
            text1: '',

        }
        console.log("props data", this.props.navigation.state.params.data);
        console.log("props da", this.props.navigation.state.params.da);
        console.log("props location", this.props.navigation.state.params.location);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.forceUpdate();
        }
        );
        this.ModalBox = this.ModalBox.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.check = this.check.bind(this);
        this.navParams = this.props.navigation.state.params;
        this.toggle = this.toggle.bind(this);

    }

    componentWillMount() {
        this.setState({
            label: this.props.navigation.state.params.da,
            data: this.props.navigation.state.params.data,
            location: this.props.navigation.state.params.location
        })
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

    onDeleteBTN() {
        this.props.navigation.navigate('Packages');
    }

    check(val) {
         this.props.navigation.navigate('Appp', { param: val.codeno, demo: val.demo, val: val })
       
        // if (SessionManager.Userdata == undefined) {
        //     ToastAndroid.show("Loged In Required", ToastAndroid.LONG);
        //     this.props.navigation.navigate("Login")
        // }
        // else {


        //     var Params = {
        //         id: SessionManager.Userdata.id,
        //     }
        //     console.log("Params", Params);
        //     this.setState({
        //         ShowLoder: true
        //     }, () => {



        //         CommonMethods.CallGETApi(ApiMethodNames.ReadPermission, Params)
        //             .then(Response => {
        //                 console.log("Response", Response.Data);

        //                 this.setState({ ResponseData: Response.Data, ShowLoder: false },
        //                     () => {
        //                         if (this.state.ResponseData != undefined && this.state.ResponseData.records != []) {
        //                             if (this.state.ResponseData.records == "1") {
        //                                 this.props.navigation.navigate('Appp', { param: val.codeno, demo: val.demo, val: val })
        //                             }
        //                             else if (this.state.ResponseData.records == "2") {
        //                                 Alert.alert(
        //                                     'Notification',
        //                                     'Please Buy the package to more Companies Details',
        //                                     [
        //                                         { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
        //                                         { text: 'OK', onPress: () => this.props.navigation.navigate('Packages') },

        //                                     ],
        //                                     { cancelable: false }
        //                                 )
        //                             }
        //                             else if (this.state.ResponseData.records == "3") {
        //                                 this.props.navigation.navigate('Appp', { param: val.codeno, demo: val.demo, val: val })
        //                             }

        //                             else if (this.state.ResponseData.records == "1,3") {
        //                                 console.log("1,3")
        //                                this.props.navigation.navigate('Appp', { param: val.codeno, demo: val.demo, val: val })
        //                             }
        //                        }
        //                         else
        //                             ToastAndroid.show("Inquiry was Not Send ", ToastAndroid.LONG);
        //                         this.setState({
        //                             ShowLoder: false
        //                         });
        //                     }
        //                 )
        //             }
        //             );
        //     })


        // }
    }

    ModalBox() {
        this.setModalVisible();
    }
    static navigationOptions = {
        page: 'ResultHome'
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

    inquiry(val) {
        console.log("val", val);

        this.props.navigation.navigate('InquiryFrom', { param: val });
    }

    LoginCheck() {
        if (SessionManager.Userdata == undefined) {
            this.props.navigation.navigate("Login")
        }
        else {




            ToastAndroid.show("Already Login Account ", ToastAndroid.LONG);
        }
    }

    render() {
        var data = this.state.data;
        var label = this.state.label;
        var location = this.state.location;
        const { navigation } = this.props;
        this.props.navigation.state.params = { title: 'ResultHome' };
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

                <View style={[styles.ThemeColorYellow, {backgroundColor:'#FEDF7C', marginTop: 24, zIndex: 10, position: 'absolute', width: '96%', flexDirection: 'row', height: 45, marginLeft: 6, marginRight: 6, top: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }]}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: '10%', height: 45, alignItems: 'center', justifyContent: 'center' }}>

                        <Iconsssss style={{ color: 'black', fontSize: 25, paddingTop: 3, padding: 2 }} name={"arrow-back"} />
                    </TouchableOpacity>
                    <View style={{ width: '90%', height: 45, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', paddingTop: 0, textAlign: 'center', }}>
                            {label}

                        </Text>
                    </View>
                </View>

                <View style={styles.ParentContainer}>
                    <ScrollView style={styles.ScrollContainer}>
                        <View style={styles.MainContainer}>
                            {this.state.ShowLoder &&
                                <View style={styles.ActivityLoder}>
                                    <ActivityIndicator style={[styles.centering, { height: 80 }]}
                                        size="large" />
                                </View>
                            }

                            <View style={{ width: '100%', top: 75, height: 'auto', marginBottom: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <StatusBar backgroundColor="gray" barStyle="light-content" hidden={false} translucent={true} />

                                {/* 1st Tab */}
                                {(data.map((val, ind) => {
                                    return (
                                        <TouchableOpacity onPress={this.check.bind(this,val)} key={ind} style={{ borderTopStartRadius: 20, borderBottomStartRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 2, backgroundColor: 'white', width: '100%', height: 132, width: '96%', margin: '2%', marginBottom: 8, }}>
                                            <View style={{ width: '100%', height: 130, flexDirection: 'row' }}>
                                                <LinearGradient colors={(val.class == "1") ? ['#94A1A3', '#B8BCBD', '#D5D5D5'] : (val.class == "2") ? ['#E4B049', '#CEA344', '#FBE78C'] : (val.class == "3") ? ['#B35A3F', '#CC6E53', '#F59C72'] : ['white', 'white', 'white']} style={{ overflow: 'hidden', width: '3%', marginRight: 2, height: 132, borderTopStartRadius: 20, borderBottomStartRadius: 20 }}>
                                                </LinearGradient>
                                                <View style={{ width: '28%', top: 6, height: 120, alignItems: 'center', justifyContent: 'center', }}>
                                                    {(val.logo == "Y") ?
                                                        <Image
                                                            style={{ width: '100%', height: 122, borderRadius: 0, bottom: 2 }}
                                                            source={{ uri: ImageURLLogo + val.codeno + 'l.jpg' }}
                                                        />
                                                        :
                                                        <Image
                                                            style={{ width: '100%', height: 122, borderRadius: 0, bottom: 2 }}
                                                            source={require('../../images/Here.jpg')}
                                                        />
                                                    }

                                                </View>
                                                <View style={{ width: '100%', height: 'auto', flexDirection: 'column', }}>
                                                    <View style={{ width: '68%', height: 'auto' }}>
                                                        <Text style={{
                                                            fontSize: 14, textAlign: 'center', color: 'black', textDecorationLine: 'underline',
                                                            fontWeight: 'bold',
                                                            letterSpacing: 1,
                                                        }}>
                                                            {val.name}
                                                        </Text>
                                                    </View>

                                                    <View style={{ width: '70%', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                                                        <View style={{ width: '50%', height: 'auto', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                            <Iconsssss style={{ color: 'black', fontSize: 15, paddingTop: 5, padding: 2, textAlign: 'center' }} name={"location-on"} />
                                                            <Text style={{ fontSize: 11, padding: 2, color: '#9e9e9e', textAlign: 'center' }}>
                                                                {val.city}
                                                            </Text>
                                                        </View>

                                                        <View style={{ width: '50%', height: 'auto', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                            <View style={{ width: '80%', right: 0, height: 20, borderTopStartRadius: 20, borderBottomEndRadius: 20, justifyContent: 'center', backgroundColor: (val.class == "1") ? '#D5D5D5' : (val.class == "2") ? '#FBE78C' : (val.class == "3") ? '#F59C72' : 'white', alignItems: 'center' }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 12, color: 'black' }}>
                                                                    {(val.class == "1") ? "Platinum" : (val.class == "2") ? "Gold" : (val.class == "3") ? "Bronze" : null}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View style={{ width: '70%', height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image
                                                            style={{ width: 120, height: 30,  }}
                                                            source={require('../../images/More2.png')}
                                                        />
                                                           
                                                    </View>

                                                    {/* <View style={{ width: '70%', height: 20, flexDirection: 'row', marginBottom: 5, justifyContent: 'center', alignItems: 'center', }}>
                                                        <View style={{ width: '30%', right: 0, height: 20, borderTopStartRadius: 20, borderBottomEndRadius: 20, justifyContent: 'center', backgroundColor: (val.class == "1") ? '#D5D5D5' : (val.class == "2") ? '#FBE78C' : (val.class == "3") ? '#F59C72' : 'white', alignItems: 'center' }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 12, color: 'black' }}>
                                                                {(val.class == "1") ? "Platinum" : (val.class == "2") ? "Gold" : (val.class == "3") ? "Bronze" : null}
                                                            </Text>
                                                        </View>

                                                         <TouchableOpacity style={{ width: '40%', right: 0, height: 20, justifyContent: 'center', backgroundColor:'gray', alignItems: 'center',flexDirection:'column' }}>
                                                         <Iconsss style={{ color: 'black', fontSize: 15, paddingTop: 5, padding: 2, textAlign: 'center' }} name={"account-card-details"} />
                                                            <Text style={{ textAlign: 'center', fontSize: 12, color: 'black' }}>
                                                            Connect
                                                            </Text>
                                                        </TouchableOpacity>


                                                    </View> */}

                                                    {/* <View style={{ width: '70%', height: 45, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                        <TouchableOpacity onPress={this.check.bind(this, val)} style={[styles.ThemeColorBlack, { marginRight: 3, height: 25, borderStyle: 'solid', borderColor: '#fadf2e', borderWidth: 2, alignItems: 'center', justifyContent: 'center', width: '40%', borderRadius: 90 }]}>
                                                            <Iconsss style={{ color: 'black', fontSize: 15, paddingTop: 5, padding: 2, textAlign: 'center' }} name={"account-card-details"} />
                                                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 13 }}>Connect</Text>
                                                        </TouchableOpacity>

                                                    </View> */}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }))}

                            </View>
                            {/* <View style={{ width: '100%', height: 80, marginTop: 5, backgroundColor: 'black', opacity: 0.8 }}>
                                <Text style={{ color: 'white', fontSize: 14, padding: 5, textAlign: 'center' }}>
                                    Copyright © 2019 Jamals Yellow Pages
                                </Text>

                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>


                                    <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/JamalsYellowPages/')} style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, margin: 5, backgroundColor: '#29487d' }}>
                                        <Icons style={{ color: 'white', fontSize: 25, alignItems: 'center', justifyContent: 'center' }} name={'facebook'} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/uspublishers')} style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, margin: 5, backgroundColor: '#55acee' }}>
                                        <Icons style={{ color: 'white', fontSize: 25, alignItems: 'center', justifyContent: 'center' }} name={'twitter'} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, margin: 5, backgroundColor: '#006097' }}>
                                        <Icons style={{ color: 'white', fontSize: 25, alignItems: 'center', justifyContent: 'center' }} name={'linkedin'} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, margin: 5, backgroundColor: '#d71e17' }}>
                                        <Icons style={{ color: 'white', fontSize: 25, alignItems: 'center', justifyContent: 'center' }} name={'youtube-square'} />
                                    </TouchableOpacity>


                                </View>
                            </View> */}

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

    ParentContainer: {
        width: '100%',
        height: '100%',
        // height: '100%' - 110,
        paddingBottom: 45,
        backgroundColor: 'red'
    },
    ScrollContainer: {
        width: '100%',
        height: '100%' - 105,
        // backgroundColor: '#DCDEE3'
        // backgroundColor: '#eeeeee'
        backgroundColor: 'white'
        // backgroundColor: '#f1f0ea'
        // backgroundColor: Colors.BackgroundPureWhite
    },
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#eeeeee',
        backgroundColor: 'white'
        // backgroundColor: '#DCDEE3',
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
    box1: {
        height: box1.height,
        width: box1.width,
        margin: box1.margin,
        borderColor: box1.borderColor,
        borderWidth: box1.borderWidth,
        borderStyle: box1.borderStyle,
        backgroundColor: box1.backgroundColor,
    },
    box1Header: {
        width: box1Header.width,
        height: box1Header.height,
        backgroundColor: box1Header.backgroundColor,
        alignItems: box1Header.alignItems,
        justifyContent: box1Header.justifyContent
    },
    box1Title: {
        fontSize: box1Title.fontSize,
        color: box1Title.color,
        fontWeight: box1Title.fontWeight

    },
    box1Child1: {
        width: box1Child1.width,
        margin: box1Child1.margin,
        backgroundColor: box1Child1.backgroundColor,
        alignItems: box1Child1.alignItems,
        height: box1Child1.height,
    },
    box1child1Title: {
        fontSize: box1child1Title.fontSize,
        textDecorationLine: box1child1Title.textDecorationLine,
        color: box1child1Title.color,
        height: box1child1Title.height,
    },
    box2child1Title: {
        fontSize: box2child1Title.fontSize,
        color: box2child1Title.color,
        fontWeight: box2child1Title.fontWeight,
        alignItems: box2child1Title.alignItems,
    },
    title4HeaderRight: {

        height: 'auto',
        justifyContent: 'center',
        marginRight: 15,
        paddingBottom: 3,
        borderBottomWidth: 1,
        padding: 4,
        borderBottomColor: '#d1dade',
        borderStyle: 'solid',
        width: '52%',
        // alignItems: 'center'
    },
    title4HeaderLeft: {

        height: 'auto',
        marginLeft: 5,
        paddingBottom: 3,
        borderBottomWidth: 1,
        padding: 4,
        borderBottomColor: '#d1dade',
        borderStyle: 'solid',
        width: '45%',
        justifyContent: 'center'
        // alignItems: 'center'
    },
    box2child1Title3: {
        fontSize: 12.25,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
    },
    box2child1Title2: {
        textAlign: 'center',
        color: 'white',
        alignItems: 'center',
        marginTop: 4
    },
    box1Child2: {
        width: '100%',
        borderBottomColor: 'white',
        height: 32,
        borderBottomWidth: 2,
        borderStyle: 'solid',
        alignItems: 'center'
    },
    Slider: {
        width: '100%',
    },
    MenuTopImage: {
        height: 400,
        width: '100%',
        resizeMode: 'stretch',
        marginBottom: 20,
        backgroundColor: Colors.TextBlack
    },
    CityContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        height: 60,
        width: '80%',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 14,
        borderRadius: 15,
        borderWidth: 1,
        paddingLeft: 20,
        borderColor: Colors.BorderBlack,
        color: Colors.TextBlack,
        flexDirection: 'row'
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



    ImageContainer: {
        width: '40%',
        height: 145,
        marginTop: 2,
    },
    Employe: {
        fontSize: 14,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    EmployeData: {
        marginTop: 4,
        marginLeft: 9,
        fontSize: 14,
        color: 'white',
        backgroundColor: '#1ab394',
        alignSelf: 'flex-start',
        paddingLeft: 2,
        paddingRight: 2
    },
    chart: {
        height: 300,
        width: 300
    },
    title2Text: {
        fontSize: 12.25
    },
    title2Header: {
        paddingBottom: 3,
        padding: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#d1dade',
        borderStyle: 'solid',
        width: '100%',
        alignItems: 'center'
    },
    title2HeaderLeft: {
        marginLeft: 20,
        paddingBottom: 3,
        borderBottomWidth: 1,
        padding: 4,
        borderBottomColor: '#d1dade',
        borderStyle: 'solid',
        width: '100%',
        alignItems: 'center'
    },
    title2HeaderRight: {
        marginRight: 20,
        paddingBottom: 3,
        borderBottomWidth: 1,
        padding: 4,
        borderBottomColor: '#d1dade',
        borderStyle: 'solid',
        width: '100%',
        alignItems: 'center'
    },
    title3Header: {
        paddingBottom: 3,
        borderBottomWidth: 1,
        padding: 4,
        borderBottomColor: '#d1dade',
        borderStyle: 'solid',
        width: '100%',
        // alignItems: 'center'
    }
});
