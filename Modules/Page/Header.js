
import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import { View, NetInfo,StatusBar, ScrollView, FlatList, UIManager, Animated, Keyboard, TextInput, ToastAndroid, Alert, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "./Sidebar";
import { Colors, YellowBox, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../Helper/GenericConstants';
import { CommonMethods } from '../Helper/CommonMethods';
import { SessionManager } from '../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
import ModalFilterPicker from 'react-native-modal-filter-picker'
import { withNavigation } from 'react-navigation';
import ImageSlider from './Slider';
import LinearGradient from 'react-native-linear-gradient';
import { Toast } from 'native-base';
import SearchableDropdown from 'react-native-searchable-dropdown';
const { State: TextInputState } = TextInput;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            Product: '',
            ProductCategories: [{ Image: require("../images/c1.png"), name: "Surgical Instruments", link: 'Surgical_Instruments_Mfrs_and_Exporters' },
            { Image: require("../images/c9.png"), name: "Fire Fighting & Safety", link: 'Fire_Fighting_%26_Safety_Equipment' },
            { Image: require("../images/bagdes.png"), name: "Badges & Insignia Mfrs", link: 'Badges' },
            { Image: require("../images/generatordealer.png"), name: "Generator Dealers", link: 'Generator_Dealers_and_Importers' },
            { Image: require("../images/security.png"), name: "Security Equipment", link: 'Security_Equipment' },
            { Image: require("../images/steel.png"), name: "Steel Re-Rolling Mills", link: 'Steel_Re-Rolling_Mills' },
            { Image: require("../images/travelagent.png"), name: "Travel Agents", link: 'Travel_Agents' },
            { Image: require("../images/c9.png"), name: "Architects & Engineers", link: 'Architects_%26_Engineers' },

            ]

        }

        console.disableYellowBox = true;


        this.ModalBox = this.ModalBox.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {

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

    search() {
        console.log("search");
        // var Params = {
        //     param: this.state.text1,
        //     location: this.state.text2.name
        // }
        // console.log("Params",Params)

        if (this.state.text1 == "") {
            ToastAndroid.show("Enter Classification ", ToastAndroid.LONG)
        }
        else if (this.state.text2 == "") {
            ToastAndroid.show("Select City ", ToastAndroid.LONG)
        }
        else {


            var Params = {
                param: this.state.text1,
                location: this.state.text2.name,
                offset: 1
            }
            if (Params.location == "") {
                delete Params.location;
                this.setState({
                    ShowLoder: true
                }, () => {

                    NetInfo.isConnected.fetch().then(isConnected => {
                        console.log('First, is ' + (isConnected ? 'online' : 'offline'));
                        if(isConnected){
                    CommonMethods.CallGETApi(ApiMethodNames.ReadResult, Params)

                        .then(Response => {
                            console.log("Response", Response);
                            console.log("Response.Data", Response.Data);
                            this.setState({ ResponseData: Response.Data },
                                () => {
                                    if (this.state.ResponseData != undefined && Response.Data.message == undefined) {
                                       if (this.state.ResponseData.records.length == 0 || this.state.ResponseData.records == []) {
                                            ToastAndroid.show(ErrorMessages.NoRecordFound, ToastAndroid.LONG);
                                        }
                                        else {
                                            this.setState({ Product: this.state.ResponseData, }, () => {
                                                console.log("Product", this.state.Product);
                                                this.props.navigation.navigate('ResultHome', { data: this.state.Product.records, da: this.state.text1, location: this.state.picked, Params: Params })

                                                console.log("Product", this.state.Product);
                                            })
                                        }
                                    }
                                    else
                                        ToastAndroid.show(ErrorMessages.NoRecordFound, ToastAndroid.LONG);
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
            else {
                console.log("Params", Params);
                this.setState({
                    ShowLoder: true
                }, () => {

                    NetInfo.isConnected.fetch().then(isConnected => {
                        console.log('First, is ' + (isConnected ? 'online' : 'offline'));
                        if(isConnected){
                    CommonMethods.CallGETApi(ApiMethodNames.ReadResult, Params)

                        .then(Response => {
                            console.log("Response", Response);
                            console.log("Response.Data", Response.Data);
                            this.setState({ ResponseData: Response.Data },
                                () => {
                                    if (this.state.ResponseData != undefined && Response.Data.message == undefined) {
                                        if (this.state.ResponseData.records.length == 0 || this.state.ResponseData.records == []) {
                                            ToastAndroid.show(ErrorMessages.NoRecordFound, ToastAndroid.LONG);
                                        }
                                        else {
                                            this.setState({ Product: this.state.ResponseData, }, () => {
                                                console.log("Product", this.state.Product);
                                                this.props.navigation.navigate('ResultHome', { data: this.state.Product.records, da: this.state.text1, location: this.state.picked, Params: Params })

                                                console.log("Product", this.state.Product);
                                            })
                                        }
                                    }
                                    else
                                        ToastAndroid.show(ErrorMessages.NoRecordFound, ToastAndroid.LONG);
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
        }


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
                if(isConnected){
            CommonMethods.CallGETApi(ApiMethodNames.ReadResult, Params)
                .then(Response => {
                    console.log("Response", Response.Data);

                    this.setState({ ResponseData: Response.Data },
                        () => {
                            if (this.state.ResponseData != undefined) {
                                let da = this.state.ProductCategories.filter(a => a.link == Params.param)[0].name

                                this.setState({ Product: this.state.ResponseData, }, () => {
                                    console.log("this.state.Product.records", this.state.Product.records);
                                    this.props.navigation.navigate('ResultHome', { data: this.state.Product.records, da: da, location: this.state.picked, Params })

                                    console.log("Product", this.state.Product.records);
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

    render() {
        // const { navigation } = this.props;
        // this.props.navigation.state.params = { title: 'Header' };
        // const menu = <Sidebar navigation={this.props.navigation} />;
        // const Dimensions = require('Dimensions')
        const { visible, picked } = this.state.city;

        return (
            <View>
                {/* <StatusBar backgroundColor='#EED15C' barStyle="dark-content" hidden={false} translucent={true} /> */}
                <StatusBar backgroundColor='#FEDF7C' barStyle="dark-content" hidden={false} translucent={true} />

                {(this.state.flag == false) ?

                    // <View style/={styles.MainHeader}>
                    // <LinearGradient style={styles.MainHeader} colors={['#FEDF7C', '#F7D744', '#F7D744', '#EED15C']}  >
                    <LinearGradient style={styles.MainHeader} colors={['#FEDF7C', '#FEDF7C']}  >
                        <View style={{ width: '20%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                style={{ width: 40, height: 45, borderRadius: 0 }}
                                source={require('../images/footer-logo.png')}
                            />
                        </View>

                        <TouchableOpacity onPress={() => { this.setState({ flag: true }) }} style={{ width: '75%', height: 60, alignItems: 'center', justifyContent: 'center' }}>

                            <TextInput
                                style={{ fontSize: 12, height: 33, right: 20, borderColor: '#4D4D4D', borderWidth: 1, width: '80%', backgroundColor: '#eeeeee', textAlign: 'center' }}
                                onFocus={() => { this.setState({ flag: true }) }}
                                onChangeText={(text) => { this.setState({ text: text, }) }}
                                placeholder="Search Yellow Pages"
                                placeholderTextColor="#4D4D4D"
                                value={this.state.text}
                            />
                        </TouchableOpacity>
                    </LinearGradient>
                    :
                    <View style={{ marginTop: 0, width: '100%', backgroundColor: 'white', height: screenheight, alignItems: 'center', }}>

                        <View style={{ marginTop: 24, width: '100%', backgroundColor: '#DCDEE3', height: screenheight, alignItems: 'center', }}>
                            {/* <LinearGradient colors={['#FEDF7C', '#F7D744', '#EED15C']} style={{ width: '100%', height: 90 }}> */}
                            <LinearGradient colors={['#FEDF7C', '#FEDF7C', '#FEDF7C']} style={{ width: '100%', height: 90 }}>
                                <View style={{ width: '100%', alignItems: 'center', height: 40, flexDirection: 'row', top: 2 }}>
                                    <View style={{ margin: 5, width: '69%', height: 40, }}>
                                        <TextInput
                                            autoFocus={false}
                                            style={{ height: 40, borderColor: '#4D4D4D', borderWidth: 1, width: '100%', textAlign: 'center', backgroundColor: '#eeeeee' }}
                                            onChangeText={(text) => { this.setState({ text1: text, }) }}
                                            placeholder="Search Yellow Pages"
                                            placeholderTextColor="#4D4D4D"
                                            value={this.state.text1}
                                        />


                                    </View>

                                    <TouchableOpacity onPress={() => { this.props.navigation.goBack(); this.setState({ flag: false, picked: '' }) }} style={{ backgroundColor: 'transparent', width: '25%', height: 40, margin: 5, borderRadius: 10, justifyContent: 'center' }}>
                                        <Text style={{ color: 'black', margin: 2, textAlign: 'center' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>


                                <View style={{ width: '100%', height: 240, flexDirection: 'row', top: 5 }}>

                                    <SearchableDropdown
                                        //On text change listner on the searchable input
                                        onItemSelect={item => {
                                            this.setState({
                                                text2: item
                                            })
                                        }}
                                        containerStyle={{ padding: 5, width: '72%' }}
                                        textInputStyle={{
                                            left: 5,
                                            position: 'absolute',
                                            color: '#4D4D4D',
                                            height: 40, borderColor: '#4D4D4D', borderWidth: 1, width: '100%', textAlign: 'center', backgroundColor: 'white'
                                        }}

                                        itemStyle={{
                                            //single dropdown item style
                                            padding: 10,
                                            marginTop: 2,
                                            backgroundColor: '#FAF9F8',
                                            borderColor: '#bbb',
                                            borderWidth: 1,
                                            width: '100%'
                                        }}
                                        itemTextStyle={{
                                            //single dropdown item's text style
                                            color: '#4D4D4D',
                                        }}
                                        itemsContainerStyle={{
                                            //items container style you can pass maxHeight
                                            //to restrict the items dropdown hieght
                                            zIndex: 20,
                                            position: 'absolute',
                                            marginLeft: 20,
                                            marginTop: 50,
                                            width: '100%',
                                            maxHeight: 200,
                                        }}
                                        items={this.state.city}
                                        //mapping of item array
                                        defaultIndex={0}
                                        //default selected item index
                                        placeholder="Select City"
                                        //place holder for the search input
                                        resetValue={true}
                                        //reset textInput Value with true and false state
                                        underlineColorAndroid="transparent"
                                    //To remove the underline from the android input
                                    />


                                    <TouchableOpacity onPress={this.search.bind(this)} style={[styles.ThemeColorBlack, { width: '25%', height: 40, margin: 5, marginTop: 0, borderRadius: 10, justifyContent: 'center' }]}>
                                        <Text style={{ color: 'white', margin: 2, textAlign: 'center' }}>Search</Text>
                                    </TouchableOpacity>
                                </View>

                            </LinearGradient>
                            <View style={{ width: '100%', marginTop: 4, height: 180, backgroundColor: 'white', flexDirection: 'row', flexWrap: 'wrap', }}>
                                {(this.state.ProductCategories.map((val, ind) => {
                                    return (


                                        <TouchableOpacity onPress={this.Product.bind(this, val.link)} key={ind} style={{ width: '46%', backgroundColor: '#DCDEE3', borderRadius: 5, margin: 6, height: 30, borderWidth: 1, borderColor: 'gray', borderStyle: "solid" }}>
                                            <Text style={{ color: 'black', textAlign: 'center', padding: 3 }}>
                                                {val.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }))}
                            </View>
                        </View>


                    </View>
                }

                {this.state.ShowLoder == true &&
                    <View style={styles.ActivityLoder}>
                        <ActivityIndicator style={[styles.centering, { height: screenheight }]}
                            size="large" />
                    </View>
                }
            </View>
        )
    }
}
export default withNavigation(Header);

const styles = StyleSheet.create({

    ThemeColorBlack: {
        backgroundColor: Colors.BackgroundBlack
    },
    ThemeColorYellow: {
        backgroundColor: Colors.ThemeColorYellow
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
        marginTop: 24,
        width: MainHeaders.width,
        alignItems: MainHeaders.alignItems,
        flexDirection: MainHeaders.flexDirection,
        backgroundColor: MainHeaders.backgroundColors,
        height: 50,
    },

    MainHeader1: {
        width: '100%',
        alignItems: 'center',
        //  backgroundColors = '#1ab394',
        backgroundColor: '#ffff00',
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
        height: screenheight,
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
