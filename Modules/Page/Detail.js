
import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import { View, CheckBox, ScrollView, ScrollContainer, FlatList, TextInput, ToastAndroid, Alert, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "./Sidebar";
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../Helper/GenericConstants';
import { CommonMethods } from '../Helper/CommonMethods';
import { SessionManager } from '../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;


export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            flag: false,
            isOpen: false,
            ShowLoder: false,
            text: '',
            text1: '',
            checked: false

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
        page: 'Classification'
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

    render() {
        console.log("this.state.flag", this.state.flag);
        const { navigation } = this.props;
        this.props.navigation.state.params = { title: 'Classification' };
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
                    {(this.state.flag == false) ?

                        <View style={styles.MainHeader}>
                            <View style={{ width: '20%', height: 70, alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    style={{ width: 40, height: 70, borderRadius: 0 }}
                                    source={require('../images/footer-logo.png')}
                                />
                            </View>

                            <TouchableOpacity onPress={() => { this.setState({ flag: true }) }} style={{ width: '75%', height: 60, alignItems: 'center', justifyContent: 'center' }}>

                                <TextInput
                                    style={{ height: 35, borderColor: '#9e9e9e', borderWidth: 1, width: '100%' }}
                                    onFocus={() => { this.setState({ flag: true }) }}
                                    onChangeText={(text) => { this.setState({ text: text, }) }}
                                    placeholder="search yellow pages"
                                    placeholderTextColor="#9e9e9e"
                                    value={this.state.text}
                                />
                            </TouchableOpacity>
                        </View>
                        :
                        // <View style={styles.MainHeader1}>
                        <View style={{ width: '100%', height: 90, backgroundColor: '#ffff00', }}>
                            <View style={{ width: '100%', alignItems: 'center', height: 40, flexDirection: 'row', top: 2 }}>
                                <View style={{ margin: 5, width: '69%', height: 40, }}>
                                    <TextInput
                                        style={{ height: 40, borderColor: '#9e9e9e', borderWidth: 1, width: '100%', textAlign: 'center' }}
                                        onChangeText={(text) => { this.setState({ text1: text, }) }}
                                        placeholder="search yellow pages"
                                        placeholderTextColor="#9e9e9e"
                                        value={this.state.text1}
                                    />


                                </View>

                                <TouchableOpacity onPress={() => { this.setState({ flag: false }) }} style={{ backgroundColor: 'transparent', width: '25%', height: 40, margin: 5, borderRadius: 10, justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', margin: 2, textAlign: 'center' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ width: '100%', alignItems: 'center', height: 40, flexDirection: 'row', top: 5 }}>
                                <View style={{ margin: 5, width: '69%', height: 40, }}>
                                    <TextInput
                                        style={{ height: 40, borderColor: '#9e9e9e', borderWidth: 1, width: '100%', textAlign: 'center' }}
                                        onChangeText={(text) => { this.setState({ text1: text, }) }}
                                        placeholder="Location"
                                        placeholderTextColor="#9e9e9e"
                                        value={this.state.text1}
                                    />
                                </View>

                                <TouchableOpacity style={{ backgroundColor: 'black', width: '25%', height: 40, margin: 5, borderRadius: 10, justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', margin: 2, textAlign: 'center' }}>Search</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    }
                    <ScrollView style={styles.ScrollContainer}>
                        <View style={styles.MainContainer}>
                            {this.state.ShowLoder &&
                                <View style={styles.ActivityLoder}>
                                    <ActivityIndicator style={[styles.centering, { height: 80 }]}
                                        size="large" />
                                </View>
                            }


                            <View style={{ width: '100%', marginTop: 2, height: 225, }}>

                                <Image
                                    style={{ width: '100%', height: 225, borderRadius: 0 }}
                                    source={require('../images/INAPA20191.gif')}
                                />
                            </View>

                            <View style={{ width: '100%', height: 'auto', marginBottom: 5 }}>

                                <View style={{ width: '96%', height: 45, margin: '2%', backgroundColor: '#d71e17', borderRadius: 5, justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>
                                        INAPA – Automotive Industry Marketplace in ASEAN
                                    </Text>
                                </View>

                                <View style={{ width: '96%', margin: '2%' }}>
                                    <Text style={{ padding: 5, color: 'black' }}>
                                        The 10th edition of INAPA welcomed 1,012 exhibitors from 29 countries across the different sectors of the show
                                        and interacting with 23,353 from 37 countries. INAPA becomes the most comprehensive exhibition in Southeast
                                        Asia, especially for the automotive sector.

                                        Entering the 11th year, INAPA 2019 is more strengthen as the ASEAN’s largest trade exhibition for
                                         automotive industries. The show will take place from March 20 – 22, 2019 at Jakarta International
                                         Expo (JIEXPO) Kemayoran, Jakarta – Indonesia. INAPA 2019 will be held together with INABIKE 2019,
                                         Tyre & Rubber Indonesia 2019, LUBE INDONESIA 2019 and Busworld South East Asia 2019.
                                    </Text>
                                </View>

                                <View style={{ width: '96%', height: 50, alignItems: 'center', justifyContent: 'center', margin: '2%', flexDirection: 'row' }}>

                                    <TouchableOpacity onPress={this.ModalBox} style={{ width: '46%', margin: '2%', backgroundColor: '#d71e17', borderRadius: 10 }}>
                                        <Text style={{ color: 'white', fontSize: 16, padding: 4, textAlign: 'center' }}>Visitor</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '46%', margin: '2%', backgroundColor: '#d71e17', borderRadius: 10 }}>
                                        <Text style={{ color: 'white', fontSize: 16, padding: 4, textAlign: 'center' }}>Exhibitor</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ width: '100%', height: 100, marginTop: 5, backgroundColor: 'black', opacity: 0.8 }}>
                                <Text style={{ color: 'white', fontSize: 14, padding: 5, textAlign: 'center' }}>
                                    Copyright © 2019 Jamals Yellow Pages
                                </Text>

                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>


                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 50, height: 50, margin: 5, backgroundColor: '#29487d' }}>
                                        <Icons style={{ color: 'white', fontSize: 25, alignItems: 'center', justifyContent: 'center' }} name={'facebook'} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 50, height: 50, margin: 5, backgroundColor: '#55acee' }}>
                                        <Icons style={{ color: 'white', fontSize: 25, alignItems: 'center', justifyContent: 'center' }} name={'twitter'} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 50, height: 50, margin: 5, backgroundColor: '#006097' }}>
                                        <Icons style={{ color: 'white', fontSize: 25, alignItems: 'center', justifyContent: 'center' }} name={'linkedin'} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 50, height: 50, margin: 5, backgroundColor: '#d71e17' }}>
                                        <Icons style={{ color: 'white', fontSize: 25, alignItems: 'center', justifyContent: 'center' }} name={'youtube-square'} />
                                    </TouchableOpacity>


                                </View>
                            </View>

                        </View>

                        <View style={{ width: '100%', }}>
                            <Modal
                                style={{ width: '50%', alignContent: 'center', justifyContent: 'center', }}
                                animationType="slide"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                }}>
                                <View style={{ marginTop: 10, height: (screenheight) - 115, width: '99%', alignItems: 'center', marginLeft: 2, marginRight: 2, }}>
                                    <View style={[styles.box1, { width: '98%', height: 'auto' }]}>
                                        <View style={styles.box1Header}>
                                            <Text style={styles.box1Title}>
                                                Visitor Registration From
                                            </Text>
                                        </View>


                                        <ScrollView style={{ width: '100%', height: '100%' }}>


                                            <View style={{ width: '100%', height: 'auto', alignItems: 'center' }}>

                                                <View style={{ margin: 5, width: '80%', height: 40, }}>
                                                    <TextInput
                                                        style={{ height: 40, borderRadius: 30, borderColor: '#9e9e9e', borderWidth: 1, width: '100%', textAlign: 'center' }}
                                                        onChangeText={(text) => { this.setState({ text1: text, }) }}
                                                        placeholder="Institute / Company Name"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.text1}
                                                    />
                                                </View>

                                                <View style={{ margin: 5, width: '80%', height: 40, }}>
                                                    <TextInput
                                                        style={{ height: 40, borderRadius: 30, borderColor: '#9e9e9e', borderWidth: 1, width: '100%', textAlign: 'center' }}
                                                        onChangeText={(text) => { this.setState({ text1: text, }) }}
                                                        placeholder="Name"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.text1}
                                                    />
                                                </View>

                                                <View style={{ margin: 5, width: '80%', height: 40, }}>
                                                    <TextInput
                                                        style={{ height: 40, borderRadius: 30, borderColor: '#9e9e9e', borderWidth: 1, width: '100%', textAlign: 'center' }}
                                                        onChangeText={(text) => { this.setState({ text1: text, }) }}
                                                        placeholder="Designation"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.text1}
                                                    />
                                                </View>

                                                <View style={{ margin: 5, width: '80%', height: 40, }}>
                                                    <TextInput
                                                        style={{ height: 40, borderRadius: 30, borderColor: '#9e9e9e', borderWidth: 1, width: '100%', textAlign: 'center' }}
                                                        onChangeText={(text) => { this.setState({ text1: text, }) }}
                                                        placeholder="Address"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.text1}
                                                    />
                                                </View>

                                                <View style={{ margin: 5, width: '80%', height: 40, }}>
                                                    <TextInput
                                                        style={{ height: 40, borderRadius: 30, borderColor: '#9e9e9e', borderWidth: 1, width: '100%', textAlign: 'center' }}
                                                        onChangeText={(text) => { this.setState({ text1: text, }) }}
                                                        placeholder="City"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.text1}
                                                    />
                                                </View>

                                                <View style={{ margin: 5, width: '80%', height: 40, }}>
                                                    <TextInput
                                                        style={{ height: 40, borderRadius: 30, borderColor: '#9e9e9e', borderWidth: 1, width: '100%', textAlign: 'center' }}
                                                        onChangeText={(text) => { this.setState({ text1: text, }) }}
                                                        placeholder="Country"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.text1}
                                                    />
                                                </View>

                                                <View style={{ margin: 5, width: '80%', height: 40, }}>
                                                    <TextInput
                                                        style={{ height: 40, borderRadius: 30, borderColor: '#9e9e9e', borderWidth: 1, width: '100%', textAlign: 'center' }}
                                                        onChangeText={(text) => { this.setState({ text1: text, }) }}
                                                        placeholder="Cell"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.text1}
                                                    />
                                                </View>

                                                <View style={{ margin: 5, width: '80%', height: 40, }}>
                                                    <TextInput
                                                        style={{ height: 40, borderRadius: 30, borderColor: '#9e9e9e', borderWidth: 1, width: '100%', textAlign: 'center' }}
                                                        onChangeText={(text) => { this.setState({ text1: text, }) }}
                                                        placeholder="E-mail"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.text1}
                                                    />
                                                </View>

                                                <View style={{ margin: 5, width: '80%', height: 40, }}>
                                                    <TextInput
                                                        style={{ height: 40, borderRadius: 30, borderColor: '#9e9e9e', borderWidth: 1, width: '100%', textAlign: 'center' }}
                                                        onChangeText={(text) => { this.setState({ text1: text, }) }}
                                                        placeholder="Web Address"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.text1}
                                                    />
                                                </View>

                                                <View style={{ margin: 5, width: '80%', height: 40, }}>
                                                    <TextInput
                                                        style={{ height: 40, borderRadius: 30, borderColor: '#9e9e9e', borderWidth: 1, width: '100%', textAlign: 'center' }}
                                                        onChangeText={(text) => { this.setState({ text1: text, }) }}
                                                        placeholder="Main line of your business"
                                                        placeholderTextColor="#9e9e9e"
                                                        value={this.state.text1}
                                                    />
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', width: '70%', left: 20, }}>
                                                <CheckBox
                                                    value={this.state.checked}
                                                    onValueChange={() => this.setState({ checked: !this.state.checked })}
                                                />
                                                <Text style={{ marginTop: 5 }}> Make New Orders</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', width: '70%', left: 20, }}>
                                                <CheckBox
                                                    value={this.state.checked}
                                                    onValueChange={() => this.setState({ checked: !this.state.checked })}
                                                />
                                                <Text style={{ marginTop: 5 }}> Buy Products</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', width: '70%', left: 20, }}>
                                                <CheckBox
                                                    value={this.state.checked}
                                                    onValueChange={() => this.setState({ checked: !this.state.checked })}
                                                />
                                                <Text style={{ marginTop: 5 }}> Seek Cooperation</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', width: '70%', left: 20, }}>
                                                <CheckBox
                                                    value={this.state.checked}
                                                    onValueChange={() => this.setState({ checked: !this.state.checked })}
                                                />
                                                <Text style={{ marginTop: 5 }}> Get information of the industry</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', width: '70%', left: 20, }}>
                                                <CheckBox
                                                    value={this.state.checked}
                                                    onValueChange={() => this.setState({ checked: !this.state.checked })}
                                                />
                                                <Text style={{ marginTop: 5 }}> Seek Agents</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', width: '70%', left: 20, }}>
                                                <CheckBox
                                                    value={this.state.checked}
                                                    onValueChange={() => this.setState({ checked: !this.state.checked })}
                                                />
                                                <Text style={{ marginTop: 5 }}> Other, Please Specify</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', width: '70%', left: 20, }}>

                                                <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Are you interested in?</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', width: '70%', left: 20, }}>
                                                <CheckBox
                                                    value={this.state.checked}
                                                    onValueChange={() => this.setState({ checked: !this.state.checked })}
                                                />
                                                <Text style={{ marginTop: 5 }}>Advertising</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', width: '70%', left: 20, }}>
                                                <CheckBox
                                                    value={this.state.checked}
                                                    onValueChange={() => this.setState({ checked: !this.state.checked })}
                                                />
                                                <Text style={{ marginTop: 5 }}> Sponsorship</Text>
                                            </View>
                                            {/* </View> */}

                                            <View style={{ width: '100%', height: 50, alignItems: 'center' }}>
                                                <TouchableOpacity
                                                    style={{ width: '90%', marginTop: 10, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: '#d71e17', borderRadius: 10 }}
                                                    onPress={() => {
                                                        this.setModalVisible(!this.state.modalVisible);
                                                    }}>
                                                    <Text style={{ fontSize: 16, textAlign: 'center', color: 'white', }}>Register</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ width: '100%', height: 50, alignItems: 'center' }}>
                                                <TouchableOpacity
                                                    style={{ width: '90%', marginTop: 10, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: '#d71e17', borderRadius: 10 }}
                                                    onPress={() => {
                                                        this.setModalVisible(!this.state.modalVisible);
                                                    }}>
                                                    <Text style={{ fontSize: 16, textAlign: 'center', color: 'white', }}>close</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            </Modal>
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
