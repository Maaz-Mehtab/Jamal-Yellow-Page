
import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import { View, ScrollView, ScrollContainer,Linking, FlatList, TextInput, ToastAndroid, Alert, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "./Sidebar";
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../Helper/GenericConstants';
import { CommonMethods } from '../Helper/CommonMethods';
import { SessionManager } from '../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
import Header from './Header';
import { material,human } from 'react-native-typography';
export default class Mediapartner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            flag: false,
            isOpen: false,
            ShowLoder: false,
            text: '',
            text1: '',
            data: [{ id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' },
            { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' },
            { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }, { id: 1, name: 'Abc' }
            ]
        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.forceUpdate();
        }
        );
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

    ModalBox() {
        this.setModalVisible();
    }
    static navigationOptions = {
        page: 'Mediapartner'
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

        LoginCheck(){
            if(SessionManager.Userdata==undefined){
                this.props.navigation.navigate("Login")
            }
            else{
                ToastAndroid.show("Already Login Account ", ToastAndroid.LONG);
            }
        }
 
    render() {
        console.log("this.state.flag", this.state.flag);
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
                <View style={[styles.ThemeColorYellow,{ bottom: 0, zIndex: 10, width: '100%', height: 45,  position: 'absolute', flexDirection: 'row' }]} >

                    <TouchableOpacity onPress={this.toggle} style={{ flexDirection: 'row', width: '30%', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15, paddingRight: 4 }} name={"navicon"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>More</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ this.LoginCheck.bind(this)} style={{ width: '30%', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15 }} name={"user-plus"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>Membership</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("Classification") }}  style={{ width: '30%', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
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
                            {this.state.ShowLoder &&
                                <View style={styles.ActivityLoder}>
                                    <ActivityIndicator style={[styles.centering, { height: 80 }]}
                                        size="large" />
                                </View>
                            }


                            <View style={{ width: '98%',margin:'1%', height: 135, }}>

                                <Image
                                    style={{ width: '100%', height: 135, borderRadius: 0 }}
                                    source={require('../images/slide4.jpg')}
                                />
                            </View>

                            <View style={{ width: '100%', height: 'auto',alignItems:'center',justifyContent:'center' }}>
                                <View style={[styles.ThemeColorBlack,{ width: '96%', height: 45, margin: '2%',  borderRadius: 5, justifyContent: 'center' }]}>
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>ExportHub</Text>
                                </View>

                                <View style={{ width: '96%', marginTop: '2%', height: 150, }}>

                                    <Image
                                        style={{ width: '100%', height: 150, borderRadius: 0 }}
                                        source={require('../images/exporthub-logo.jpg')}
                                    />
                                </View>
                                <View style={{ width: '100%', height: 'auto' }}>

                                    {/* <Text style={{ color: 'black', padding: 5, fontSize: 13 ,textAlign:'justify'}}> */}
                                    <Text style={[human.subhead,{ fontSize: 13, color: 'black', padding: 4,textAlign:'justify' }]}>
                                    
                                      ExportHub Is An International B2B Marketplace Brand Formed By A Group Of B2b
                                        & Internet Marketing Experts, Who Have Spent Their Lifetime In Pursuit Of Technology Projects.
                                        People At ExportHub Have Prior Internet Marketing Experience And Are Thorough With Industry
                                        Related Knowledge. Combining Our Strong B2B Experience, Technology Expertise And Profound
                                        Knowledge Of Current Industry Trends, ExportHub Offers Innovative Solutions To Your Business Problems.
                                    </Text>

                                </View>

                            </View>




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
        height: '100%',
        paddingBottom:45 
    },
    ScrollContainer: {
        width: '100%',
        height: '100%',
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
