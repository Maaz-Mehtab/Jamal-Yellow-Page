
import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import { View,NetInfo, StatusBar, TouchableHighlight, ScrollView, FlatList, Linking, TextInput, Animated, ToastAndroid, Alert, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "./Sidebar";
import { Colors, YellowBox, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../Helper/GenericConstants';
import { CommonMethods } from '../Helper/CommonMethods';
import { SessionManager } from '../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;
import ModalFilterPicker from 'react-native-modal-filter-picker'
import Header from './Header';
import { material, human } from 'react-native-typography';
import LinearGradient from 'react-native-linear-gradient';
// import ImageSlider from 'react-native-image-slider';
const imageurl = 'https://www.jamals.com/banners/';
var SQLite = require('react-native-sqlite-storage');
import Tradeshowslider from './Tradeshowslider';
import ImageSlider from './Slider';
import ImageSliderss from 'react-native-image-slider';
var db = SQLite.openDatabase({ name: "Users", createFromLocation: "~Users.db" }, (okCallback, errorCallback) => {
    if (errorCallback)
        console.log("errorCallback", errorCallback)
    else
        console.log("okCallback", okCallback)
});

HEADER_MAX_HEIGHT = 160
HEADER_MIN_HEIGHT = 70
HEADER_MAX_WIDTH = screenwidth
HEADER_MIN_WIDTH = screenwidth
PROFILE_IMAGE_MAX_HEIGHT = 40
PROFILE_IMAGE_MIN_HEIGHT = 40
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            trade: [],
            visible: false,
            picked: '',
            modalVisible: false,
            flag: false,
            isOpen: false,
            ShowLoder: false,
            text: '',
            text1: '',
            text2: '',
            city: GenericConstants.city,
            Premium: [{ Image: require("../images/pre1.jpg"), event: 'China (Chengdu) Int I Sola', Location: 'Western China International', date: 'March 7th-9th ,2019' },
            { Image: require("../images/pre2.jpg"), event: 'China Pet Expo 2019', Location: 'China International Exhibition', date: 'March 14th-17th ,2019' },
            { Image: require("../images/pre3.jpg"), event: 'ASEAN Vending Machine', Location: 'Impact Exhibition Center', date: 'September 19th-21st ,2019' }],

            FeaturedTradeShow: [{ Image: require("../images/a1.jpg"), event: 'China (Chengdu) Int I Sola', Location: 'Western China International', date: 'March 7th-9th ,2019' },
            { Image: require("../images/a2.png"), event: 'China Pet Expo 2019', Location: 'China International Exhibition', date: 'March 14th-17th ,2019' },
            { Image: require("../images/a3.jpg"), event: 'ASEAN Vending Machine', Location: 'Impact Exhibition Center', date: 'September 19th-21st ,2019' }],
            ProductCategories: [{ Image: require("../images/c1.png"), name: "Surgical Instruments", link: 'Surgical_Instruments_Mfrs_and_Exporters' },
            { Image: require("../images/c9.png"), name: "Fire Fighting & Safety", link: 'Fire_Fighting_%26_Safety_Equipment' },
            { Image: require("../images/lift.png"), name: "Lifts Elevators & Escalators", link: 'Lifts_Elevators_%26_Escalators' },
            { Image: require("../images/bagdes.png"), name: "Badges & Insignia Mfrs", link: 'Badges' },
            { Image: require("../images/generatordealer.png"), name: "Generator Dealers", link: 'Generator_Dealers_and_Importers' },
            { Image: require("../images/security.png"), name: "Security Equipment", link: 'Security_Equipment' },
            { Image: require("../images/steel.png"), name: "Steel Re-Rolling Mills", link: 'Steel_Re-Rolling_Mills' },
            { Image: require("../images/travelagent.png"), name: "Travel Agents", link: 'Travel_Agents' },
            { Image: require("../images/c9.png"), name: "Architects & Engineers", link: 'Architects_%26_Engineers' },
            { Image: require("../images/c10.png"), name: "Cables & Wires Manufacturers", link: 'Cables_%26_Wires_Manufacturers' },

            ],
            BuyerOffer: [],
            BuyerOffer1: [{ company: "Ecommerce Gateway Pakistan", product: "Jamal Yellow Pages ", country: 'pakistan', city: 'karachi', date: '2019-03-04' }, { company: "Ecg", product: "abc", country: 'pakistan', city: 'karachi', date: '2019-03-04' }, { company: "Ecg", product: "abc", country: 'pakistan', city: 'karachi', date: '2019-03-04' },
            { company: "Ecg", product: "abc", country: 'pakistan', city: 'karachi', date: '2019-03-04' }, { company: "Ecg", product: "abc", country: 'pakistan', city: 'karachi', date: '2019-03-04' },]

        }

        console.log("city", GenericConstants.city);
        console.disableYellowBox = true;
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            BackHandler.addEventListener('hardwareBackPress', this.backAndroidbackAndroid)
            this.forceUpdate();
        }
        );
        this.Product = this.Product.bind(this);
        this.ModalBox = this.ModalBox.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.navParams = this.props.navigation.state.params;
        console.log("Home navParams", this.props.navigation);
        this.toggle = this.toggle.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.SesstionUser = this.SesstionUser.bind(this);

    }

    componentWillMount() {
        // db.executeSql("Drop TABLE Users",[],(res)=>{
        //     console.log("Drop TABLE");
        // })
        this.SesstionUser();
        this.trade();
        this.ReadBuyingPost();


    }


    ReadBuyingPost() {
        var Params = {

        }

        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            if (isConnected) {
                CommonMethods.CallGETApi(ApiMethodNames.ReadBuyingPost, Params)
                    .then(Response => {
                        console.log("Response", Response.Data);

                        this.setState({ ResponseData: Response.Data },
                            () => {
                                if (this.state.ResponseData != undefined) {
                                    this.setState({ BuyerOffer: this.state.ResponseData, }, () => {
                                        console.log("this.state.Product.records", this.state.BuyerOffer);
                                        this.forceUpdate();
                                    })
                                }
                                else
                                    ToastAndroid.show(ErrorMessages.NoCategoryFound, ToastAndroid.LONG);
                                this.setState({
                                    ShowLoder: false
                                });
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
            
        })

    }



    SesstionUser() {
        db.executeSql('select * from Users2', [], (results) => {
            console.log(" select * from Users2 results", results);
            var len = results.rows.length;
            console.log("len", len);
            var ar = [];
            for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(" select * from Users2 row", row);
                SessionManager.Userdata = row;
                ar.push(row);
            }
            console.log("ar", ar);
            console.log(" SessionManager.Userdata", SessionManager.Userdata);
        })
    }

    onShow = () => {
        this.setState({ visible: true });
    }

    onSelect = (picked) => {

        var aa = this.state.city.filter(a => a.key == picked)[0].label

        this.setState({
            picked: this.state.city.filter(a => a.key == picked)[0].label,
            visible: false
        })
    }

    onCancel = () => {
        this.setState({
            visible: false
        });
    }


    backAndroid = () => {
        const { clickedPosition } = this.state;
        setTimeout(() => {
            this.setState({
                clickedPosition: 0
            });
        }, 2000);
        if (((clickedPosition === 1) && (this.props.navigation.isFocused()))) {
            Alert.alert(
                'Exit Application',
                'Do you want to quit application?', [{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    onPress: () => BackHandler.exitApp()
                }], {
                    cancelable: false
                }
            );
        } else {
            ToastAndroid.showWithGravity(
                'Press again to exit',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );
            this.setState({
                clickedPosition: 1
            })
        }
        return true
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            BackHandler.removeEventListener('hardwareBackPress', this.backAndroid)
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
        page: 'Home'
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

    trade() {

        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            if (isConnected) {
                return fetch('https://www.jamals.com/AppApi/ReadTrade.php')
                    .then(Response => {
                        this.setState({ ResponseData: JSON.parse(Response._bodyInit) },
                            () => {
                                if (this.state.ResponseData != undefined) {
                                    this.setState({ trade: this.state.ResponseData.records, ShowLoder: true }, () => {
                                        console.log("trade", this.state.trade);
                                        this.setState({ rerender: !this.state.refresh })

                                    })
                                }
                                else
                                    ToastAndroid.show(ErrorMessages.NoCategoryFound, ToastAndroid.LONG);

                                this.setState({
                                    ShowLoder: false
                                });
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
        }
        )
    }


    Product(link) {
        console.log("link", link)
        var Params = {
            param: link,
            location: '',
            offset: 1
        }
        this.setState({
            ShowLoder: true
        }, () => {
            console.log("ShowLoder", this.state.ShowLoder);


            NetInfo.isConnected.fetch().then(isConnected => {
                console.log('First, is ' + (isConnected ? 'online' : 'offline'));
                if (isConnected) {
                    CommonMethods.CallGETApi(ApiMethodNames.ReadResult, Params)
                        .then(Response => {
                            console.log("Response", Response.Data);

                            this.setState({ ResponseData: Response.Data },
                                () => {
                                    if (this.state.ResponseData != undefined) {
                                        let da = this.state.ProductCategories.filter(a => a.link == Params.param)[0].name

                                        this.setState({ Product: this.state.ResponseData, }, () => {
                                            console.log("this.state.Product.records", this.state.Product.records);
                                            this.props.navigation.navigate('ResultHome', { data: this.state.Product.records, da: da, location: this.state.picked, Params: Params })

                                            console.log("Product", this.state.Product.records);
                                        })
                                    }
                                    else
                                        ToastAndroid.show(ErrorMessages.NoCategoryFound, ToastAndroid.LONG);
                                    this.setState({
                                        ShowLoder: false
                                    });
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
            })

        })
    }

    LoginCheck() {
        if (SessionManager.Userdata == undefined) {
            this.props.navigation.navigate("Login")
        }
        else {
            ToastAndroid.show("Already Login Account ", ToastAndroid.LONG);
        }
    }

    change() {
        console.log("change");
        this.props.navigation.navigate("Header2");
    }

    render() {
        const images = [{ Image: require("../images/advertizeee.jpg") }, { Image: require("../images/sliders-08.jpg") }, { Image: require("../images/sliders-09.jpg") },
        ];

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        })
        const headerWidth = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_WIDTH - HEADER_MIN_WIDTH],
            outputRange: [HEADER_MAX_WIDTH, HEADER_MIN_WIDTH],
            extrapolate: 'clamp'
        })
        const backgroundColor = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            // outputRange: ['transparent', '#FEDF7C',],
            outputRange: ['transparent', '#FEDF7C',],
            extrapolate: 'clamp',
        })
        const { visible, picked } = this.state.city;
        const { navigation } = this.props;
        this.props.navigation.state.params = { title: 'Home' };
        const menu = <Sidebar navigation={this.props.navigation} />;
        const Dimensions = require('Dimensions')

        var BuyerOffer = [];
        BuyerOffer = this.state.BuyerOffer;
        return (
            <SideMenu
                menu={menu}
                menuPosition={'left'}
                openMenuOffset={Dimensions.get('window').width * (2 / 2.7)}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}
            >
                <View style={[styles.ThemeColorYellow, { bottom: 0, zIndex: 10, width: '100%', height: 45, position: 'absolute', flexDirection: 'row' }]} >

                    <TouchableOpacity onPress={this.toggle} style={{ flexDirection: 'row', width: '30%', justifyContent: 'center', backgroundColor: 'black', alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15, paddingRight: 4 }} name={"navicon"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>More</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.LoginCheck.bind(this)} style={{ width: '30%', justifyContent: 'center', backgroundColor: 'black', alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15 }} name={"user-plus"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>Membership</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("Classification") }} style={{ width: '30%', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black', alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15, paddingRight: 4 }} name={"th-large"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>Categories</Text>
                    </TouchableOpacity>




                </View>

                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: backgroundColor,
                    height: headerHeight,
                    // height: 75,
                    // zIndex: 30,
                    // zIndex: headerZindex,
                    zIndex: 20,
                    width: headerWidth,
                    // elevation: headerZindex,//required for android 
                    alignItems: 'center',

                }}>



                    <View style={{ left: '5%', backgroundColor: 'white', opacity: 1, top: 26, position: 'absolute', zIndex: 20, width: '90%', height: 40, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this.toggle} style={{ width: '20%', height: 40, justifyContent: 'center', opacity: 1, }}>
                            <Icons style={{ color: '#C7C7C7', fontSize: 17, paddingRight: 0, left: 25, }} name={"navicon"} />

                        </TouchableOpacity>


                        <TouchableOpacity onPress={this.change.bind(this)} style={{ width: '90%', height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

                            <View style={{ width: '80%', height: 40 }}>
                                <TextInput
                                    style={{ fontSize: 14, height: 40, borderColor: '#9e9e9e', borderWidth: 0, width: '100%', backgroundColor: 'white', paddingLeft: 10 }}
                                    onFocus={this.change.bind(this)}

                                    onChangeText={(text) => { this.setState({ text: text, }) }}
                                    placeholder="Search Yellow Pages"
                                    placeholderTextColor="#C7C7C7"
                                    value={this.state.text}
                                />
                            </View>

                            <View style={{ width: '10%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', opacity: 1, }}>
                                <Icons style={{ color: '#C7C7C7', fontSize: 17, paddingRight: 4 }} name={"search"} />

                            </View>


                        </TouchableOpacity>

                    </View>

                    <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />

                </Animated.View>


                <View style={styles.ParentContainer}>



                    {this.state.ShowLoder == true &&
                        <View style={styles.ActivityLoder}>
                            <ActivityIndicator style={[styles.centering, { height: 80 }]}
                                size="large" />
                        </View>
                    }

                    <ScrollView style={styles.ScrollContainer}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                        )}
                    >
                        <View style={styles.MainContainer}>
                            <View style={{ width: '100%', marginTop: 0, height: 200, alignItems: 'center' }}>
                                <ImageSlider />


                            </View>

                            <View style={[styles.ThemeColorBlack, { backgroundColor: '#FFD89E', width: '100%', height: 100, marginTop: 0 }]}>
                                <FlatList
                                    style={{ height: '100%', marginTop: 0 }}
                                    data={this.state.ProductCategories}
                                    ItemSeparatorComponent={this.space}
                                    horizontal={true}
                                    extraData={this.state.rerender}
                                    renderItem={({ item, index }) =>
                                        (
                                            <View key={index} style={{
                                                width: 90, height: 100, justifyContent: 'center', borderRightColor: 'white', borderStyle: 'solid', borderRightWidth: 0, alignItems: 'center',
                                            }}>
                                                <TouchableOpacity onPress={this.Product.bind(this, item.link)} key={index} style={{ widht: '100%', height: 100, flexDirection: 'column' }}>
                                                    <View style={{ width: 90, height: 62, margin: 2, flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                                                        <LinearGradient colors={(index == 0) ? ['#2AE6B0', '#3AC598', '#3EB38E'] : (index == 1) ? ['#FF8726', '#E58235', '#F39E75'] : (index == 2) ? ['#3CBEF2', '#3DBBDD', '#1693C2'] : (index == 3) ? ['#FEDF7C', '#F7D744', '#EED15C'] : (index == 4) ? ['#2AE6B0', '#3AC598', '#3EB38E'] : (index == 5) ? ['#FF8726', '#E58235', '#F39E75'] : (index == 6) ? ['#3CBEF2', '#3DBBDD', '#1693C2'] : (index == 7) ? ['#FEDF7C', '#F7D744', '#EED15C'] : (index == 8) ? ['#2AE6B0', '#3AC598', '#3EB38E'] : ['#FF8726', '#E58235', '#F39E75']} style={{ justifyContent: 'center', alignItems: 'center', width: 55, height: 55, borderRadius: 90 }}  >

                                                            <Image
                                                                style={{ width: 50, height: 50, borderRadius: 90 }}
                                                                source={item.Image}
                                                            />
                                                        </LinearGradient>
                                                    </View>
                                                    <View style={{ width: 90, height: 20, margin: 2, flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: 'black', fontSize: 10, textAlign: 'center' }}>
                                                            {item.name}

                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                />
                            </View>
                            <View style={[{ flexDirection: 'row', backgroundColor: '#F3F2F8', width: '100%', height: 50, marginTop: 0, marginBottom: 0, }]}>

                                <View style={{ width: '2%', marginLeft: 15, marginRight: 0, height: 14.5, top: 19, justifyContent: 'center', backgroundColor: '#5D8CD9' }}>

                                </View>

                                <View style={{ width: '97%', height: 50 }}>
                                    <Text style={{ fontSize: 18, color: '#414244', padding: '4%', fontWeight: 'bold', paddingLeft: 3 }}>
                                        PREMIUM SUPPLIERS
                                    </Text>

                                    <TouchableOpacity style={{ position: 'absolute', right: 30, top: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center' }}>More</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[{ backgroundColor: '#F3F2F8', width: '98%', height: 150, marginTop: 0, marginLeft: '1%', marginRight: '1%', borderRadius: 10 }]}>
                                <FlatList
                                    style={{ height: '100%', backgroundColor: '#F3F2F8' }}
                                    data={this.state.Premium}
                                    ItemSeparatorComponent={this.space}
                                    horizontal={true}
                                    extraData={this.state.rerender}

                                    renderItem={({ item, index }) =>
                                        (
                                            <View key={index} style={{
                                                shadowColor: '#000',
                                                backgroundColors: 'white',
                                                shadowOffset: { width: 0, height: 1 },
                                                shadowOpacity: 0.8,
                                                shadowRadius: 1,
                                                borderRadius: 20,
                                                overflow: 'hidden',
                                                elevation: 0, margin: 6, marginTop: 6, width: 120, height: 125, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRightColor: '#F3F2F8', borderStyle: 'solid', borderRightWidth: 0,
                                            }}>


                                                <View style={{ width: '50%', borderRadius: 10, height: 120, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderRadius: 0, right: 0, top: 0 }}>
                                                    <Image
                                                        style={{ width: 120, height: 120, borderRadius: 0 }}
                                                        source={item.Image}
                                                    />
                                                </View>
                                            </View>
                                        )}
                                />
                            </View>
                            <View style={[{ flexDirection: 'row', backgroundColor: '#F3F2F8', width: '100%', height: 50, marginTop: 0, marginBottom: 0, }]}>

                                <View style={{ width: '2%', marginLeft: 15, marginRight: 0, height: 14.5, top: 19, justifyContent: 'center', backgroundColor: '#F18237' }}>

                                </View>

                                <View style={{ width: '97%', height: 50 }}>
                                    <Text style={{ fontSize: 18, color: '#414244', padding: '4%', paddingLeft: 3 }}>
                                        FEATURED TRADE SHOWS
                                    </Text>

                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Tradeshow") }} style={{ position: 'absolute', right: 30, top: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center' }}>More</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.ThemeColorBlack, { backgroundColor: '#F3F2F8', width: '98%', height: 140, marginTop: 0, marginBottom: 0, marginLeft: '1%', marginRight: '1%' }]}>
                                <FlatList
                                    style={{ height: '100%', }}
                                    data={this.state.FeaturedTradeShow}
                                    ItemSeparatorComponent={this.space}
                                    horizontal={true}
                                    extraData={this.state.rerender}
                                    renderItem={({ item, index }) =>
                                        (
                                            <View key={index} style={{ marginTop: 8, margin: 0, width: screenwidth - 55, height: 140, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                                <View style={{ width: '96%', height: 120, flexDirection: 'column', borderRadius: 10, }}>

                                                    <LinearGradient colors={(index == 0) ? ['#2AE6B0', '#3AC598', '#3EB38E'] : (index == 1) ? ['#FF8726', '#E58235', '#F39E75'] : ['#3CBEF2', '#3DBBDD', '#1693C2']} style={{ width: '100%', flex: 0.6, height: 70, borderTopStartRadius: 10, borderTopEndRadius: 10, overflow: 'hidden' }}>
                                                        <Text style={{ fontSize: 14, color: 'white', paddingTop: 10, paddingLeft: 20 }}>
                                                            {item.event}
                                                        </Text>

                                                        <Text style={{ fontSize: 14, color: 'white', paddingTop: 10, paddingLeft: 20 }}>
                                                            {item.Location}
                                                        </Text>
                                                    </LinearGradient>
                                                    <LinearGradient colors={['#FFFFFF', '#fefefe']} style={{ width: '100%', flex: 0.4, marginBottom: 5, height: 50, borderBottomStartRadius: 10, borderBottomEndRadius: 10, overflow: 'hidden' }}>
                                                        <Text style={{ fontSize: 14, color: 'black', paddingTop: 10, paddingLeft: 30 }}>
                                                            {item.date}
                                                        </Text>
                                                    </LinearGradient>

                                                    <View style={{ width: 80, height: 80, backgroundColor: 'black', position: 'absolute', borderRadius: 10, right: 8, top: 20 }}>
                                                        <Image
                                                            style={{ width: 80, height: 80, borderRadius: 10 }}
                                                            source={item.Image}
                                                        />
                                                    </View>


                                                </View>

                                            </View>
                                        )}
                                />
                            </View>


                            <View style={[{ flexDirection: 'row', backgroundColor: '#F3F2F8', width: '100%', height: 50, marginTop: 0, marginBottom: 0, }]}>

                                <View style={{ width: '2%', marginLeft: 15, marginRight: 0, height: 14.5, top: 19, justifyContent: 'center', backgroundColor: '#49C69E' }}>

                                </View>

                                <View style={{ width: '97%', height: 50 }}>
                                    <Text style={{ fontSize: 18, color: '#414244', padding: '4%', paddingLeft: 3 }}>
                                        BUYER OFFERS
                                    </Text>

                                    <TouchableOpacity style={{ position: 'absolute', right: 30, top: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center' }}>More</Text>
                                    </TouchableOpacity>


                                </View>
                            </View>



                            <View style={[{ backgroundColor: '#F3F2F8', width: '98%', height: 'auto', marginTop: 0, marginLeft: '1%', marginRight: '1%', flexDirection: 'row' }]}>

                                <FlatList
                                    style={{ height: '100%', backgroundColor: '#F3F2F8' }}
                                    data={BuyerOffer}
                                    ItemSeparatorComponent={this.space}
                                    horizontal={true}
                                    extraData={this.state.rerender}

                                    renderItem={({ item, index }) =>

                                        (
                                            <View key={index} style={{
                                                shadowColor: '#000',
                                                backgroundColors: 'white',
                                                // shadowOffset: { width: 0, height: 1 },
                                                // shadowOpacity: 0.8,
                                                // shadowRadius: 1,
                                                // borderRadius: 20,
                                                // overflow: 'hidden',
                                                // elevation: 0, margin: 6, marginTop: 6,
                                                margin: 6,
                                                width: 150, height: 'auto',
                                                flexDirection: 'row',
                                                justifyContent: 'center', alignItems: 'center', borderRightColor: '#F3F2F8',
                                                borderStyle: 'solid', borderRightWidth: 0,
                                            }}>

                                                <View style={{ margin: 3, width: '100%', height: 'auto', flexDirection: 'column', backgroundColor: '#F3F2F8' }}>
                                                    <View style={{ borderTopStartRadius: 10, borderTopEndRadius: 10, width: '100%', flex: 0.80, backgroundColor: 'white' }}>

                                                        <Text style={{ paddingLeft: 10, padding: 2, textAlign: 'left', fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}> Company </Text>
                                                        <Text style={{ paddingLeft: 10, padding: 2, textAlign: 'left', fontSize: 13, textAlign: 'center' }}>{item.company_name}</Text>

                                                        <Text style={{ paddingLeft: 10, padding: 2, textAlign: 'left', fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Product </Text>
                                                        <Text style={{ paddingLeft: 10, padding: 2, textAlign: 'left', fontSize: 13, textAlign: 'center' }}>{item.title}</Text>

                                                        <Text style={{ paddingLeft: 10, padding: 2, textAlign: 'left', fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Country </Text>
                                                        <Text style={{ paddingLeft: 10, padding: 2, textAlign: 'left', fontSize: 13, textAlign: 'center' }}>{item.country}</Text>

                                                        <Text style={{ paddingLeft: 10, padding: 2, textAlign: 'left', fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>City </Text>
                                                        <Text style={{ paddingLeft: 10, padding: 2, textAlign: 'left', fontSize: 13, textAlign: 'center' }}>{item.city}</Text>

                                                        <Text style={{ paddingLeft: 10, padding: 2, textAlign: 'left', fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Date </Text>
                                                        <Text style={{ paddingLeft: 10, padding: 2, textAlign: 'left', fontSize: 13, textAlign: 'center' }}>{item.created_at}</Text>
                                                    </View>
                                                    <TouchableOpacity style={{ borderBottomStartRadius: 10, borderBottomEndRadius: 10, justifyContent: 'center', alignItems: 'center', width: '100%', flex: 0.20, backgroundColor: '#5D8CD9' }}>
                                                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 15 }}>Connect</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>



                                        )}

                                />

                                {/* <View style={{ margin: 3, width: '48%', height: 170, flexDirection: 'column', backgroundColor: '#F3F2F8' }}>
                                    <View style={{ borderTopStartRadius: 10, borderTopEndRadius: 10, width: '100%', flex: 0.85, backgroundColor: 'white' }}>

                                        <Text style={{ padding: 2, textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Prodcut</Text>
                                        <Text style={{ padding: 2, textAlign: 'center', fontSize: 12 }}>ABC</Text>
                                        <Text style={{ padding: 2, textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Quantity</Text>
                                        <Text style={{ padding: 2, textAlign: 'center', fontSize: 12 }}>200</Text>
                                        <Text style={{ padding: 2, textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>City</Text>
                                        <Text style={{ padding: 2, textAlign: 'center', fontSize: 12 }}>Karachi</Text>


                                    </View>
                                    <View style={{ borderBottomStartRadius: 10, borderBottomEndRadius: 10, justifyContent: 'center', alignItems: 'center', width: '100%', flex: 0.15, backgroundColor: '#5D8CD9' }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 15 }}>Connect</Text>
                                    </View>
                                </View> */}



                            </View>



                            <View style={[styles.ThemeColorBlack, { width: '100%', height: 80, marginTop: 5, opacity: 0.8 }]}>
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
            </SideMenu>

        );
    }
}

const styles = StyleSheet.create({

    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    ThemeColorBlack: {
        backgroundColor: Colors.BackgroundBlack
    },
    ThemeColorYellow: {
        backgroundColor: Colors.ThemeColorYellow
    },
    AdvertiseHead: {
        width: '99%',
        height: 100,
        margin: 2,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',

    },
    AdvertiseLeft: {
        backgroundColor: 'red',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: '30%',
        margin: 2,
        borderColor: '#fdda00',
        borderWidth: 2,
        borderStyle: 'solid',
        height: 95,
        left: 7,
        right: 8
    },
    AdvertiseMiddle: {
        left: 12,
        right: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: '30%',
        margin: 3,
        borderColor: '#fdda00',
        borderWidth: 2,
        borderStyle: 'solid',
        height: 95,
    },
    AdvertiseRight: {
        // backgroundColor:'green',
        left: 15,
        right: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: '30%',
        margin: 3,
        borderColor: '#fdda00',
        borderWidth: 2,
        borderStyle: 'solid',
        height: 95,
    },
    ParentContainer: {
        width: '100%',
        height: '100%',
        paddingBottom: 45
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
        height: 100,
    },
});
