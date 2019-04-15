
import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import { View, Picker, ScrollView, ScrollContainer, Linking, FlatList, TextInput, ToastAndroid, Alert, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "./Sidebar";
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../Helper/GenericConstants';
import { CommonMethods } from '../Helper/CommonMethods';
import { SessionManager } from '../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
import Header from './Header';
import { material, human } from 'react-native-typography';
import { Button, Radio, Content } from 'native-base';
export default class Packages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            flag: false,
            isOpen: false,
            ShowLoder: false,
            text: '',
            text1: '',
            wise: 0,
            // name:SessionManager.Userdata.name,
            item: 0,
            name:'',
            email:'',
            company:'',
            phone:'',
            // name: "Maaz Mehtab",
            // email: "Maaz@gmail.com",
            // company: "ECG",
            // phone: "03243424011",
            dropwdown: [{ id: 1, name: 'Cash/Check' }, { id: 2, name: 'Online Bank Transfer' }, { id: 3, name: 'Direct Bank Deposit' },]


        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.forceUpdate();
        }
        );
        console.log("SessionManager.Userdata", SessionManager.Userdata);
        this.ModalBox = this.ModalBox.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.navParams = this.props.navigation.state.params;
        this.toggle = this.toggle.bind(this);

    }

    componentWillMount(){
        if(SessionManager.Userdata!=undefined){
            this.setState({
                name:SessionManager.Userdata.name,
                email:SessionManager.Userdata.email,
                company:(SessionManager.Userdata.company!=undefined)?SessionManager.Userdata.company:'',
                phone:(SessionManager.Userdata.phone!=undefined)?SessionManager.Userdata.phone:'',

            })
        }
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
        page: 'Packages'
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
    
    InquirySend() {
        
        let packagename='';
        if(this.state.wise==1){
            packagename="Platinum";
        }
        else if(this.state.wise==2){
            packagename="Gold"
        }
        else if(this.state.wise==3){

            packagename="Bronze"
        }
        console.log("package",packagename);


        if (this.state.name == "") {
            ToastAndroid.show("Enter Name", ToastAndroid.SHORT);
        }
       
        else if (this.state.email == "") {
            ToastAndroid.show("Enter Email", ToastAndroid.SHORT);
        }
        else if (this.state.Company == "") {
            ToastAndroid.show("Enter Company", ToastAndroid.SHORT);
        }
        else if (this.state.mobile == "") {
            ToastAndroid.show("Enter Mobile", ToastAndroid.SHORT);
        }
        else if (this.state.item == 0) {
            ToastAndroid.show("Select Payment Method", ToastAndroid.SHORT);
        }
        else {
            var Params = {
                email: this.state.email,
                upgrade:packagename,
                mobile: this.state.phone,
                company: this.state.company,
                name: this.state.name,
                islogin: 'required',
                payment_method:this.state.dropwdown.filter(a=> a.id==this.state.item)[0].name
            }
            console.log("Params", Params);
            this.setState({
                ShowLoder:true
            },()=>{

           

            CommonMethods.CallGETApi(ApiMethodNames.PackageRequest, Params)
                .then(Response => {
                    console.log("Response", Response.Data);

                    this.setState({ ResponseData: Response.Data ,ShowLoder:false,name:'',email:'',phone:'',company:'',item:0},
                        () => {
                            if (this.state.ResponseData != undefined && this.state.ResponseData.flag==1) {
                        
                                ToastAndroid.show(this.state.ResponseData.records, ToastAndroid.LONG);
                                console.log("this.state.ResponseData", this.state.ResponseData);

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



    render() {

        const { navigation } = this.props;
        this.props.navigation.state.params = { title: 'Mediapartner' };
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
                <View style={[styles.ThemeColorYellow,{ bottom: 0, zIndex: 10, width: '100%', height: 45, position: 'absolute', flexDirection: 'row' }]} >

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
                    {/* Header start */}
                    <Header props={this.props.navigation} />
                    {/* Header end */}

                    <ScrollView style={styles.ScrollContainer}>
                        <View style={styles.MainContainer}>
                            {this.state.ShowLoder==true &&
                                <View style={styles.ActivityLoder}>
                                    <ActivityIndicator style={styles.centering }
                                        size="large" />
                                </View>
                            }

{/* 
                            <View style={{ width: '98%', margin: '1%', height: 135, }}>

                                <Image
                                    style={{ width: '100%', height: 135, borderRadius: 0 }}
                                    source={require('../images/premium_service_banner_bckg.jpg')}
                                />
                            </View> */}

                            <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, width: '96%', height: 'auto', backgroundColor: 'red', margin: 6 }}>
                                <View style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#03a9f4' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textDecorationLine: 'underline' }}>
                                        Blue
                                    </Text>
                                </View>

                                <View style={{ width: '100%', height: 120, backgroundColor: 'white', alignItems: 'center', borderBottomColor: '#bdbdbd', borderBottomStyle: 'solid', borderBottomWidth: 1 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 35, borderBottomColor: '#e0e0e0', borderBottomWidth: 1, bordeBottomStyle: 'solid' }}>
                                        <Text style={{ color: 'black' }}>
                                            1 Milion companies contact details
                                        </Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 35, borderBottomColor: '#e0e0e0', borderBottomWidth: 1, bordeBottomStyle: 'solid' }}>
                                        <Text style={{ color: 'black' }}>
                                            Data updation claim support (5)
                                        </Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 35, borderBottomColor: '#e0e0e0', borderBottomWidth: 1, bordeBottomStyle: 'solid' }}>
                                        <Text style={{ color: 'black' }}>
                                            Dedicated support team
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ width: '100%', height: 100, backgroundColor: '#f5f5f5', alignItems: 'center' }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 25, }}>
                                        <Text style={{ color: 'black' }}>
                                            $20
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 25, }}>
                                        <Text style={{ color: 'black' }}>
                                            per month
                                        </Text>
                                    </View>

                                    <View style={{ width: '75%', height: 30, justifyContent: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity onPress={() => this.setState({ wise: 1 })}
                                                    selected={this.state.wise == 1} style={{ flexDirection: 'row', width: '50%', height: '100%', backgroundColor: '#01579b', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                            <View style={{ flexDirection: 'row', width: '95%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Radio style={{ paddingRight: 10 }} radioBtnSize={10} color={"#ffa726"} selectedColor={"#ff9800"} onPress={() => this.setState({ wise: 1 })}
                                                    selected={this.state.wise == 1} >
                                                </Radio>

                                                <Text style={{ color: 'white' }}>
                                                    Select
                                             </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>



                            <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, width: '96%', height: 'auto', backgroundColor: 'red', margin: 6 }}>
                                <View style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e99805' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textDecorationLine: 'underline' }}>
                                        Gold
                                    </Text>
                                </View>

                                <View style={{ width: '100%', height: 150, backgroundColor: 'white', alignItems: 'center', borderBottomColor: '#bdbdbd', borderBottomStyle: 'solid', borderBottomWidth: 1 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 35, borderBottomColor: '#e0e0e0', borderBottomWidth: 1, bordeBottomStyle: 'solid' }}>
                                        <Text style={{ color: 'black' }}>
                                            1 Milion companies contact details
                                        </Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 35, borderBottomColor: '#e0e0e0', borderBottomWidth: 1, bordeBottomStyle: 'solid' }}>
                                        <Text style={{ color: 'black' }}>
                                            Data updation claim support (15)
                                        </Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 35, borderBottomColor: '#e0e0e0', borderBottomWidth: 1, bordeBottomStyle: 'solid' }}>
                                        <Text style={{ color: 'black' }}>
                                            Dedicated support team
                                        </Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 35, borderBottomColor: '#e0e0e0', borderBottomWidth: 1, bordeBottomStyle: 'solid' }}>
                                        <Text style={{ color: 'black' }}>
                                            B2B matchmaking call center support
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ width: '100%', height: 100, backgroundColor: '#f5f5f5', alignItems: 'center' }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 25, }}>
                                        <Text style={{ color: 'black' }}>
                                            $50
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 25, }}>
                                        <Text style={{ color: 'black' }}>
                                            6 month
                                        </Text>
                                    </View>



                                    <View style={{ width: '75%', height: 30, justifyContent: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity onPress={() => this.setState({ wise: 2 })}
                                                    selected={this.state.wise == 2}
                                                     style={{ flexDirection: 'row', width: '50%', height: '100%', backgroundColor: '#e99805', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                            <View style={{ flexDirection: 'row', width: '95%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Radio style={{ paddingRight: 10 }} radioBtnSize={10} color={"#004d40"} selectedColor={"#01579b"} onPress={() => this.setState({ wise: 2 })}
                                                    selected={this.state.wise == 2} >
                                                </Radio>

                                                <Text style={{ color: 'white' }}>
                                                    Select
                                             </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>



                            <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, width: '96%', height: 'auto', backgroundColor: 'red', margin: 6 }}>
                                <View style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#696a6b' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textDecorationLine: 'underline' }}>
                                        Platinum
                                    </Text>
                                </View>

                                <View style={{ width: '100%', height: 150, backgroundColor: 'white', alignItems: 'center', borderBottomColor: '#bdbdbd', borderBottomStyle: 'solid', borderBottomWidth: 1 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 35, borderBottomColor: '#e0e0e0', borderBottomWidth: 1, bordeBottomStyle: 'solid' }}>
                                        <Text style={{ color: 'black' }}>
                                            1 Milion companies contact details
                                        </Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 35, borderBottomColor: '#e0e0e0', borderBottomWidth: 1, bordeBottomStyle: 'solid' }}>
                                        <Text style={{ color: 'black' }}>
                                            Data updation claim support (30)
                                        </Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 35, borderBottomColor: '#e0e0e0', borderBottomWidth: 1, bordeBottomStyle: 'solid' }}>
                                        <Text style={{ color: 'black' }}>
                                            Dedicated support team
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 35, borderBottomColor: '#e0e0e0', borderBottomWidth: 1, bordeBottomStyle: 'solid' }}>
                                        <Text style={{ color: 'black' }}>
                                            B2B matchmaking call center support
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ width: '100%', height: 100, backgroundColor: '#f5f5f5', alignItems: 'center' }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 25, }}>
                                        <Text style={{ color: 'black' }}>
                                            $80
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%', height: 25, }}>
                                        <Text style={{ color: 'black' }}>
                                            1 year
                                        </Text>
                                    </View>
                                    <View style={{ width: '75%', height: 30, justifyContent: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity  onPress={() => this.setState({ wise: 3 })}
                                                    selected={this.state.wise == 3} style={{ flexDirection: 'row', width: '50%', height: '100%', backgroundColor: '#696a6b', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                            <View style={{ flexDirection: 'row', width: '95%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Radio style={{ paddingRight: 10 }} radioBtnSize={10} color={"#eeeeee"} selectedColor={"white"} onPress={() => this.setState({ wise: 3 })}
                                                    selected={this.state.wise == 3} >
                                                </Radio>

                                                <Text style={{ color: 'white' }}>
                                                    Select
                                             </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            {this.state.wise != 0 &&
                                <View style={{ width: '100%', height: 'auto', alignItems: 'center' }}>
                                    <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, width: '96%', backgroundColor: '#f5f5f5',alignItems:'center',justifyContent:'center',margin:4 }}>
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
                                                <Icons style={{ color: 'black', fontSize: 20 }} name={'wechat'} />
                                            </View>
                                            <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                                <Picker
                                                    selectedValue={this.state.item}
                                                    style={styles.picker}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({ item: itemValue, })}>
                                                    <Picker.Item label="Select Option " value={0} />
                                                    {this.state.dropwdown.map((val, index) => {
                                                        return (
                                                            <Picker.Item key={index} label={val.name} value={val.id} />
                                                        )
                                                    })}
                                                </Picker>
                                            </View>
                                        </View>

                                        <View style={{ width: '100%', height: 'auto', marginTop: 10, marginBottom:10,alignItems: 'center', justifyContent: 'center', }}>

                                            <TouchableOpacity onPress={this.InquirySend.bind(this)} style={[styles.ThemeColorYellow,{ margin: '1%', flexDirection: 'row', borderRadius: 10, borderStyle: 'solid', borderWidth: 1, borderColor: 'black', width: '55%', height: 40, alignItems: 'center', justifyContent: 'center' }]}>
                                                <Icon style={{ color: 'black', fontSize: 20, alignItems: 'center', justifyContent: 'center', paddingRight: 10 }} name={'exchange-alt'} />
                                                <Text style={{ textAlign: 'center', color: 'black' }}>Send Enquiry</Text>
                                            </TouchableOpacity>


                                        </View>
                                    </View>


                                    <View style={{ width: '96%', height: 'auto', backgroundColor: 'white', margin: 6 }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black' ,padding:5}}>
                                            1 - Payment on Pick Up Delivery Cash / Check
                                        </Text>

                                        <Text style={{ color: 'black', textAlign: 'justify',padding:5 }}>
                                            To pay for the above services simply selects payment pick up delivery service available in Karachi Lahore Faisalabad Sialkot and Peshawar. when you book your order. You will receive a call from customer care before picking up your payment giving you more than enough time to have the payment ready
                                        </Text>

                                        <Text style={{ fontWeight: 'bold', color: 'black' ,padding:5  }}>
                                            2 - Online Bank Transfer
                                        </Text>
                                        <Text style={{ color: 'black', textAlign: 'justify',padding:5  }}>
                                            If you’re more comfortable paying with your online bank account, we give you the freedom to do so. After shopping online, simply choose “bank transfer” as your mode of payment. By using the latest encryption methods, we ensure your data is always safe and secure, allowing you to enjoy online shopping in Pakistan.
                                        </Text>
                                        <Text style={{ fontWeight: 'bold', color: 'black',padding:5  }}>
                                            3 - Direct Bank Deposits
                                        </Text>
                                        <Text style={{ color: 'black', textAlign: 'justify',padding:5  }}>
                                            If you live close to our banks or feel more comfortable directly depositing your payment, Jamals lets you do just that. Simply walk into any of the 3 banks below and directly deposit our payment. It’s as easy as that!
                                        </Text>
                                        <Text style={{ fontWeight: 'bold', color: 'black',padding:5  }}>
                                            NOTE
                                        </Text>
                                        <Text style={{ color: 'black', textAlign: 'justify',padding:5  }}>
                                            Membership will be activated upon reciving of full payment. for international payments it may take up to 5 working days and for locals it may take 3 working days
                                        </Text>
                                    </View>

                                    <View style={{ width: '96%', height: 'auto', margin: 0,alignItems:'center',justifyContent:'center' }}>

                                        <Image
                                            style={{ width: '100%', height: 230, borderRadius: 0 }}
                                            source={require('../images/Meezan-Bank.jpg')}
                                        />

                                    </View>
                                </View>
                             }
                            {/* <View style={[styles.ThemeColorBlack,{ width: '100%', height: 80, marginTop: 5, opacity: 0.8 }]}>
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
    ThemeColorBlack :{
        backgroundColor:Colors.BackgroundBlack
        },
    ThemeColorYellow :{
        backgroundColor:Colors.ThemeColorYellow
        },
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
        // backgroundColor: '#f1f0ea'
        backgroundColor: '#DCDEE3'
        // backgroundColor: Colors.BackgroundPureWhite
    },
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#fff',
        backgroundColor: '#DCDEE3',
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
    },
    picker: {
        height: 25,
        width: '100%',
        transform: [
            { scaleX: 0.8 },
            { scaleY: 0.9 },
        ]
    }
});
