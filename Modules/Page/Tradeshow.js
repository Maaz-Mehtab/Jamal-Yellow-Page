
import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import Iconsssss from 'react-native-vector-icons/MaterialIcons';
import { View, ScrollView, StatusBar, Linking, FlatList, TextInput, ToastAndroid, Alert, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "./Sidebar";
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../Helper/GenericConstants';
import { CommonMethods } from '../Helper/CommonMethods';
import { SessionManager } from '../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
const imageurl = 'https://www.jamals.com/banners/';
import Header from './Header';
export default class Tradeshow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            flag: false,
            isOpen: false,
            ShowLoder: true,
            text: '',
            text1: '',
            trade: ''
        }

        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.forceUpdate();
        }
        );
        this.nextpage = this.nextpage.bind(this);
        this.ModalBox = this.ModalBox.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.navParams = this.props.navigation.state.params;
        this.toggle = this.toggle.bind(this);

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

    componentWillMount() {
        this.trade();
    }
    trade() {
        var arr = [];
        this.setState({
            ShowLoder: false
        }, () => {



            return fetch('https://www.jamals.com/AppApi/ReadTrade.php')
                .then(Response => {
                    this.setState({ ResponseData: JSON.parse(Response._bodyInit) },
                        () => {
                            if (this.state.ResponseData != undefined) {
                                for (var i = 0; i < 10; i++) {
                                    arr.push(this.state.ResponseData.records[i])
                                }
                                console.log("arr", arr);
                                this.setState({
                                    // trade: arr,
                                    trade: this.state.ResponseData.records,
                                    ShowLoder: true
                                }, () => {
                                    this.forceUpdate()
                                    console.log("trade", this.state.trade);
                                    this.setState({ rerender: !this.state.refresh, ShowLoder: true })

                                })
                            }
                            else
                                CommonMethods.NotificationDialog(ErrorMessages.NoCategoryFound)
                            this.setState({
                                ShowLoder: false
                            });
                        }
                    )
                }
                );
        })
    }




    ModalBox() {
        this.setModalVisible();
    }
    static navigationOptions = {
        page: 'Tradeshow'
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

    nextpage() {
        this.props.navigation.navigate("Detail");
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
        var tradedate = [];
        tradedate = this.state.trade;

        const { navigation } = this.props;
        this.props.navigation.state.params = { title: 'Tradeshow' };
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
                    <ScrollView style={styles.ScrollContainer}>



                        {this.state.ShowLoder == false &&

                            <View style={styles.ActivityLoder}>
                                <ActivityIndicator style={[styles.centering, { height: 500 }]}
                                    size="large" />
                            </View>
                        }

                        {tradedate.length > 0 &&
                            <View style={styles.MainContainer}>
                                <View style={[styles.ThemeColorBlack, { width: '96%', height: 50, margin: '2%', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }]}>
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', paddingBottom: 0, paddingTop: 45 }}>
                                        INTERNATIONAL TRADE FAIRS BUSINESS CONFERENCES
                                    </Text>
                                </View>

                                {(tradedate.map((val, ind) => {
                                    return (
                                        <View key={ind} style={{ backgroundColor: 'white', height: 'auto', margin: 4, width: '98%', borderTopStartRadius: 20, borderBottomEndRadius: 20, justifyContent: 'center', alignItems: 'center', }}>
                                            <View style={{ width: '96%', height: 'auto', marginLeft: '1%', marginRight: '1%', marginTop: 0, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ textAlign: 'center', color: '#424242', fontSize: 13, fontWeight: 'bold', textDecorationLine: 'underline' }}>
                                                    {val.EventName}
                                                </Text>
                                            </View>

                                            <View style={{ width: '100%', height: 110, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                                                <View style={{ backgroundColors: 'blue', width: '30%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image
                                                        style={{ width: '100%', height: 100, borderRadius: 0 }}
                                                        source={{ uri: imageurl + "" + val.logo }}
                                                    />
                                                </View>
                                                <View style={{ width: '70%', height: 110, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 13, paddingTop: 5 }}>
                                                        <Icons style={{ color: '#424242', fontSize: 13, paddingTop: 0, padding: 2 }} name={"calendar"} />
                                                        <Text style={{ fontWeight: "bold", color: '#424242', fontSize: 13 }}> Date :</Text>
                                                        {val.date}
                                                    </Text>
                                                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 13, paddingTop: 5 }}>
                                                        <Iconsssss style={{ color: '#424242', fontSize: 13, paddingTop: 0, padding: 2 }} name={"location-on"} />
                                                        <Text style={{ fontWeight: "bold", color: '#424242', fontSize: 13 }}> Venue :</Text>
                                                        {val.venue}
                                                    </Text>


                                                    <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'center', alignItems: 'center', width: '100%', height: 25, justifyContent: 'center', alignItems: 'center' }}>
                                                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Boothform")} style={[styles.ThemeColorBlack, { margin: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: '40%', height: 25 }]}>
                                                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 12 }}>Booth Inquiry</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Visitorregister")} style={[styles.ThemeColorBlack, { margin: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: '40%', height: 25 }]}>
                                                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 12 }}>Visitor Register</Text>
                                                        </TouchableOpacity>
                                                    </View>


                                                </View>



                                            </View>
                                        </View>
                                    )
                                }))
                                }


                            </View>
                        }
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
        paddingBottom: 120
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
        // backgroundColor: '#eeeeee',
        backgroundColor: '#DCDEE3',
        // backgroundColor: '#fff',
    },

    ActivityLoder: {
        // position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: 'rgba(255,255,255,0.7)',
        backgroundColor: '#DCDEE3',
        zIndex: 100
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
