
import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsssss from 'react-native-vector-icons/AntDesign';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import { View, ScrollView, ScrollContainer, FlatList, TextInput, ToastAndroid, Alert, Linking, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "./Sidebar";
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../Helper/GenericConstants';
import { CommonMethods } from '../Helper/CommonMethods';
import { SessionManager } from '../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;

import Header from './Header';
var emailto = "";
var companyto = "";
var companycode = "";
export default class InquiryFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            flag: false,
            isOpen: false,
            ShowLoder: false,
            text: '',
            text1: '',
            company: '',
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            emailto: '',
            compantto: '',
            companycode: '',

        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.forceUpdate();
        }
        );

        this.navParams = this.props.navigation.state.params;
        this.toggle = this.toggle.bind(this);
        console.log("this.props.navigation.state.params.param", this.props.navigation.state.params.param);
        emailto = this.props.navigation.state.params.param.email;
        companyto = this.props.navigation.state.params.param.name;
        companycode = this.props.navigation.state.params.param.codeno;



    }



    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            this.updateMenuState(false);
        }
        );
    }


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


    InquirySend() {
        // console.log("emailto", emailto)
        // console.log("companyto", companyto)
        // console.log("companycode", companycode)
        // console.log("this.state.company", this.state.company)
        if (SessionManager.Userdata != undefined) {
            var Params = {
                sender_id: SessionManager.Userdata.UserId,
                messages: this.state.message,
                phone: this.state.phone,
                reciver_id: companycode,
                // updated_at: 0,
                // created_at: new Date().getDate(),
                // deleted_at: 0,
                comp_email: emailto,
            }
            if (Params.messages == "") {
                ToastAndroid.show("Enter Message ", ToastAndroid.SHORT);
            }
            else if (Params.phone == "") {
                ToastAndroid.show("Enter Phone", ToastAndroid.SHORT);
            }
           
            else if (this.state.Company == "" || SessionManager.Userdata.company == "") {
                ToastAndroid.show("Enter Company", ToastAndroid.SHORT);
            }
            else {
            }
        }
        else {
            var Params = {
                msg: this.state.message,
                company: this.state.company,
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                subject: this.state.subject,
                // created_at: new Date().getDate(),
                // updated_at: 0,
                code: companycode,
                comp_email: companyto
            }
            if (Params.msg == "") {
                ToastAndroid.show("Enter Message ", ToastAndroid.SHORT);
            }
            else if (this.state.name == "") {
                ToastAndroid.show("Enter Name", ToastAndroid.SHORT);
            }
            else if (this.state.email == "") {
                ToastAndroid.show("Enter Email Address", ToastAndroid.SHORT);
            }
            else if (this.state.company == "") {
                ToastAndroid.show("Enter Company", ToastAndroid.SHORT);
            }
            else if (Params.phone == "") {
                ToastAndroid.show("Enter Phone", ToastAndroid.SHORT);
            }
            else if (Params.subject == "") {
                ToastAndroid.show("Enter Subject", ToastAndroid.SHORT);
            }
            else {
            }
        }


        this.setState({
            ShowLoder: true
        }, () => {



            CommonMethods.CallGETApi(ApiMethodNames.InsertInquiry, Params)
                .then(Response => {
                   this.setState({ ResponseData: Response.Data, ShowLoder: false, name: '', email: '', phone: '', company: '', message: '', subject: '' },
                        () => {
                           
                            if ( Response.Data.flag == 1) {
                                ToastAndroid.show("Inquiry Was Send", ToastAndroid.LONG);
                    
                            }
                            else if (Response.Data.flag == 2) {
                                ToastAndroid.show("Inquiry Was Send", ToastAndroid.LONG);
                      
                            }
                            else{
                                ToastAndroid.show("Inquiry was Not Send ", ToastAndroid.LONG);
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


    render() {
        console.log()
        console.log("SessionManager", SessionManager.Userdata);
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
                <View style={{ bottom: 0, zIndex: 10, width: '100%', height: 45, backgroundColor: '#ffff00', position: 'absolute', flexDirection: 'row' }} >

                    <TouchableOpacity onPress={this.toggle} style={{ flexDirection: 'row', width: '30%', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15, paddingRight: 4 }} name={"navicon"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>More</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("Login") }} style={{ width: '30%', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15 }} name={"user-plus"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>Membership</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '30%', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15, paddingRight: 4 }} name={"th-large"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>Categories</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ParentContainer}>
                    <Header props={this.props.navigation} />
                    <ScrollView style={styles.ScrollContainer}>
                        <View style={styles.MainContainer}>
                            {this.state.ShowLoder &&
                                <View style={styles.ActivityLoder}>
                                    <ActivityIndicator style={[styles.centering, { height: 80 }]}
                                        size="large" />
                                </View>
                            }

                            {(SessionManager.Userdata == undefined) ?



                                <View style={{ width: '96%', margin: '2%', height: 470, borderColor: '#ffd400', borderStyle: 'solid', borderWidth: 3 }}>

                                    <View style={{ width: '100%', height: 'auto', backgroundColor: 'black', opacity: 0.8, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center', padding: '4%' }}>
                                            Email Form
                                    </Text>

                                    </View>

                                    <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Icons style={{ color: 'black', fontSize: 25 }} name={'users'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                style={{ height: 40, width: '100%', }}
                                                onChangeText={(text) => { this.setState({ company: text, }) }}
                                                placeholder="Company"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.company}
                                            />
                                        </View>
                                    </View>


                                    <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Icons style={{ color: 'black', fontSize: 25 }} name={'user'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                style={{ height: 40, width: '100%', }}
                                                onChangeText={(text) => { this.setState({ name: text, }) }}
                                                placeholder="Name"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.name}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Iconsss style={{ color: 'black', fontSize: 25 }} name={'email'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                style={{ height: 40, width: '100%', }}
                                                onChangeText={(text) => { this.setState({ email: text, }) }}
                                                placeholder="Email"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.email}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Icons style={{ color: 'black', fontSize: 25 }} name={'mobile-phone'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                style={{ height: 40, width: '100%', }}
                                                onChangeText={(text) => { this.setState({ phone: text, }) }}
                                                keyboardType='numeric'
                                                placeholder="Phone No"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.phone}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Icons style={{ color: 'black', fontSize: 25 }} name={'edit'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                style={{ height: 40, width: '100%', }}
                                                onChangeText={(text) => { this.setState({ subject: text, }) }}
                                                placeholder="Subject"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.subject}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: '98%', height: 'auto', flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Iconsssss style={{ color: 'black', fontSize: 25 }} name={'message1'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                editable={true}
                                                multiline={true}
                                                numberOfLines={1}
                                                style={{ height: 'auto', width: '100%', }}
                                                onChangeText={(text) => { this.setState({ message: text, }) }}
                                                placeholder="Message"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.message}
                                            />


                                        </View>
                                    </View>

                                    <View style={{ width: '100%', height: 'auto', marginTop: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <TouchableOpacity onPress={this.InquirySend.bind(this)} style={{ margin: '1%', flexDirection: 'row', borderRadius: 10, borderStyle: 'solid', borderWidth: 1, borderColor: 'black', width: '55%', height: 45, backgroundColor: '#ffff00', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon style={{ color: 'black', fontSize: 20, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }} name={'exchange-alt'} />
                                            <Text style={{ textAlign: 'center', color: 'black' }}>Send Email Enquiry</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                :
                                <View style={{ width: '96%', margin: '2%', height: 470, borderColor: '#ffd400', borderStyle: 'solid', borderWidth: 3 }}>

                                    <View style={{ width: '100%', height: 'auto', backgroundColor: 'black', opacity: 0.8, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center', padding: '4%' }}>
                                            Email Form
                                </Text>

                                    </View>

                                    <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Icons style={{ color: 'black', fontSize: 25 }} name={'users'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            {(SessionManager.Userdata.company != null) ?
                                                <TextInput
                                                    editable={false}
                                                    style={{ height: 40, width: '100%', }}
                                                    onChangeText={(text) => { this.setState({ company: text, }) }}
                                                    placeholder="Company Name"
                                                    placeholderTextColor="#9e9e9e"
                                                    value={SessionManager.Userdata.company}
                                                />
                                                :
                                                <TextInput
                                                    editable={true}
                                                    style={{ height: 40, width: '100%', }}
                                                    onChangeText={(text) => { this.setState({ company: text, }) }}
                                                    placeholder="Company Name"
                                                    placeholderTextColor="#9e9e9e"
                                                    value={this.state.company}
                                                />
                                            }

                                        </View>
                                    </View>


                                    <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Icons style={{ color: 'black', fontSize: 25 }} name={'user'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                editable={false}
                                                style={{ height: 40, width: '100%', }}
                                                onChangeText={(text) => { this.setState({ name: text }) }}
                                                // placeholder="Name"
                                                placeholderTextColor="#9e9e9e"
                                                value={SessionManager.Userdata.name}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Iconsss style={{ color: 'black', fontSize: 25 }} name={'email'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                editable={false}
                                                style={{ height: 40, width: '100%', }}
                                                onChangeText={(text) => { this.setState({ email: text, }) }}
                                                placeholderTextColor="#9e9e9e"
                                                value={SessionManager.Userdata.email}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Icons style={{ color: 'black', fontSize: 25 }} name={'mobile-phone'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            {(SessionManager.Userdata.phone != '') ?
                                                <TextInput
                                                    editable={false}
                                                    style={{ height: 40, width: '100%', }}
                                                    onChangeText={(text) => { this.setState({ phone: text, }) }}
                                                    keyboardType='numeric'
                                                    placeholder="Phone No"
                                                    placeholderTextColor="#9e9e9e"
                                                    value={SessionManager.Userdata.phone}
                                                />
                                                :
                                                <TextInput
                                                    editable={true}
                                                    style={{ height: 40, width: '100%', }}
                                                    onChangeText={(text) => { this.setState({ phone: text, }) }}
                                                    keyboardType='numeric'
                                                    placeholder="Phone No"
                                                    placeholderTextColor="#9e9e9e"
                                                    value={this.state.phone}
                                                />
                                            }
                                        </View>
                                    </View>



                                    <View style={{ width: '98%', height: 'auto', flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Iconsssss style={{ color: 'black', fontSize: 25 }} name={'message1'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                editable={true}
                                                multiline={true}
                                                numberOfLines={3}
                                                style={{ height: 'auto', width: '100%', }}
                                                onChangeText={(text) => { this.setState({ message: text, }) }}
                                                placeholder="Message"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.message}
                                            />


                                        </View>
                                    </View>

                                    <View style={{ width: '100%', height: 'auto', marginTop: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <TouchableOpacity onPress={this.InquirySend.bind(this)} style={{ margin: '1%', flexDirection: 'row', borderRadius: 10, borderStyle: 'solid', borderWidth: 1, borderColor: 'black', width: '55%', height: 45, backgroundColor: '#ffff00', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon style={{ color: 'black', fontSize: 20, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }} name={'exchange-alt'} />
                                            <Text style={{ textAlign: 'center', color: 'black' }}>Send Email Enquiry</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            }

                            <View style={{ width: '100%', height: 80, marginTop: 5, backgroundColor: 'black', opacity: 0.8 }}>
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
                            </View>


                        </View>


                    </ScrollView>
                </View>

            </SideMenu >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
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
        height: '100%' - 110,
        paddingBottom: 110
    },
    ScrollContainer: {
        width: '100%',
        height: '100%' - 105,
        backgroundColor: '#f1f0ea'
        // backgroundColor: Colors.BackgroundPureWhite
    },
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
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
