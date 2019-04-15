
import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import Iconsssss from 'react-native-vector-icons/MaterialIcons';
import { View, ScrollView, ScrollContainer, FlatList, TextInput, ToastAndroid, Alert, Text, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "./Sidebar";
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../Helper/GenericConstants';
import { CommonMethods } from '../Helper/CommonMethods';
import { SessionManager } from '../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
import ModalFilterPicker from 'react-native-modal-filter-picker'
const { width, height } = Dimensions.get('window')
export default class Advertisercatlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            picked: null,
            dropdown: [
                {
                    key: 'kenya',
                    label: 'Kenya',
                },
                {
                    key: 'uganda',
                    label: 'Uganda',
                },
                {
                    key: 'libya',
                    label: 'Libya',
                },
                {
                    key: 'morocco',
                    label: 'Morocco',
                },
                {
                    key: 'estonia',
                    label: 'Estonia',
                },
            ],
            category: 'Platinum',
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
        this.onShow = this.onShow.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);

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
        page: 'Advertisercatlog'
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

    onShow = () => {
        this.setState({ visible: true });
    }

    onSelect = (picked) => {

        this.setState({
            picked: picked,
            visible: false
        })
    }

    onCancel = () => {
        this.setState({
            visible: false
        });
    }


    render() {
        const { visible, picked } = this.state.dropdown;
        console.log("this.state.flag", this.state.flag);
        const { navigation } = this.props;
        this.props.navigation.state.params = { title: 'Advertisercatlog' };
        const menu = <Sidebar navigation={this.props.navigation} />;
        const Dimensions = require('Dimensions')
        if (this.state.category == "Platinum") {
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

                                <View style={styles.container}>
                                    <View style={{ width: '96%', margin: '1%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <TextInput
                                            style={{ height: 40, borderColor: '#9e9e9e', borderWidth: 1, width: '70%' }}
                                            onFocus={() => { this.setState({ visible: true }) }}
                                            onChangeText={(text) => { this.setState({ text: this.state.picked }) }}
                                            placeholder="Category"
                                            placeholderTextColor="#9e9e9e"
                                            value={this.state.picked}
                                        />
                                        <TouchableOpacity style={{ backgroundColor: 'black', width: 40, height: 40, borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                                            {/* <Text style={{textAlign:'center',color:'white'}}>Search </Text> */}
                                            <Icons style={{ color: 'white', textAlign: 'center', fontSize: 15, marginLeft: 5 }} name={"search"} />
                                        </TouchableOpacity>
                                    </View>
                                    <ModalFilterPicker
                                        visible={this.state.visible}
                                        onSelect={this.onSelect}
                                        onCancel={this.onCancel}
                                        options={this.state.dropdown}
                                    />
                                </View>
                                <View style={{ width: '100%', height: 'auto', marginBottom: 5 }}>

                                    <View style={{ width: '96%', height: 45, margin: '2%', backgroundColor: 'red', borderRadius: 5, justifyContent: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center', }}>
                                            PLATINUM
                                    </Text>
                                    </View>

                                    {/* 1st Tab */}
                                    <View  style={{shadowColor: '#000', shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 5 ,backgroundColor:'white', width: '100%', flexDirection: 'row',borderRadius:0, height: 125, width: '98%', margin: '1%', marginBottom: 0, }}>

                                            <View style={{ width: '30%', height: 123, alignItems: 'center', justifyContent: 'center', borderRightColor: 'black', borderRightWidth: 1, borderStyle: 'solid' }}>
                                                <Image
                                                    style={{ width: '100%', height: 123,  }}
                                                    source={require('../images/mm.gif')}
                                                />
                                            </View>
                                            <View style={{ width: '100%', height: 'auto', flexDirection: 'column' }}>
                                                <View style={{ width: '70%', height: 'auto' }}>
                                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: 'black', textDecorationLine: 'underline' }}>
                                                        5 STAR INSTITUTE ISLAMABAD
                                           
                                                    </Text>
                                                </View>

                                                <View style={{ width: '70%', height: 'auto', flexDirection: 'row' }}>
                                                    <View style={{ width: '10%', height: '100%' }}>
                                                        <Iconsssss style={{ color: 'black', fontSize: 15, paddingTop: 5, padding: 2 }} name={"location-on"} />
                                                    </View>
                                                    <View style={{ width: '90%', height: 'auto' }}>
                                                        <Text style={{ fontSize: 12, padding: 2, color: '#9e9e9e', }}>
                                                    5 Star Institute,G-10 Markaz,Park View Plaza,Infront of Park , Islamabad
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View style={{ width: '70%', height: 'auto', flexDirection: 'row' }}>
                                                    <View style={{ width: '10%', height: '100%' }}>
                                                        <Icons style={{ color: 'black', fontSize: 15, paddingTop: 5, padding: 2 }} name={"phone"} />
                                                    </View>
                                                    <View style={{ width: '90%', height: 'auto' }}>
                                                        <Text style={{ fontSize: 12, padding: 2, color: '#0277bd', }}>
                                                        (92 51 ) 2351379
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View style={{ width: '70%', height: '20%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                  <TouchableOpacity  style={{ margin: '1%', alignItems: 'center', justifyContent: 'center', width: '40%', backgroundColor: '#ffff00', borderRadius: 90 }}>
                                                        <Text style={{ color: 'black', textAlign: 'center' }}>View More</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity  style={{ margin: '1%', alignItems: 'center', justifyContent: 'center', width: '40%', backgroundColor: '#ffff00', borderRadius: 90 }}>
                                                        <Text style={{ color: 'black', textAlign: 'center' }}>Send Inquiry</Text>
                                                    </TouchableOpacity>
                                                </View>


                                            </View>
                                        </View>

                                    {/* 2nd Tab */}
                                    <View  style={{shadowColor: '#000', shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 5 ,backgroundColor:'white', width: '100%', flexDirection: 'row',borderRadius:0, height: 125, width: '96%', margin: '2%', marginBottom: 0, borderColor: 'gray', borderStyle: 'solid', borderWidth: 1 }}>

<View style={{ width: '30%', height: 123, alignItems: 'center', justifyContent: 'center', borderRightColor: 'black', borderRightWidth: 1, borderStyle: 'solid' }}>
    <Image
        style={{ width: '100%', height: 123,  }}
        source={require('../images/mm.gif')}
    />
</View>
<View style={{ width: '100%', height: 'auto', flexDirection: 'column' }}>
    <View style={{ width: '70%', height: 'auto' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: 'black', textDecorationLine: 'underline' }}>
            5 STAR INSTITUTE ISLAMABAD

        </Text>
    </View>

    <View style={{ width: '70%', height: 'auto', flexDirection: 'row' }}>
        <View style={{ width: '10%', height: '100%' }}>
            <Iconsssss style={{ color: 'black', fontSize: 15, paddingTop: 5, padding: 2 }} name={"location-on"} />
        </View>
        <View style={{ width: '90%', height: 'auto' }}>
            <Text style={{ fontSize: 12, padding: 2, color: '#9e9e9e', }}>
        5 Star Institute,G-10 Markaz,Park View Plaza,Infront of Park , Islamabad
            </Text>
        </View>
    </View>

    <View style={{ width: '70%', height: 'auto', flexDirection: 'row' }}>
        <View style={{ width: '10%', height: '100%' }}>
            <Icons style={{ color: 'black', fontSize: 15, paddingTop: 5, padding: 2 }} name={"phone"} />
        </View>
        <View style={{ width: '90%', height: 'auto' }}>
            <Text style={{ fontSize: 12, padding: 2, color: '#0277bd', }}>
            (92 51 ) 2351379
            </Text>
        </View>
    </View>

    <View style={{ width: '70%', height: '20%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
      <TouchableOpacity  style={{ margin: '1%', alignItems: 'center', justifyContent: 'center', width: '40%', backgroundColor: '#ffff00', borderRadius: 90 }}>
            <Text style={{ color: 'black', textAlign: 'center' }}>View More</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={{ margin: '1%', alignItems: 'center', justifyContent: 'center', width: '40%', backgroundColor: '#ffff00', borderRadius: 90 }}>
            <Text style={{ color: 'black', textAlign: 'center' }}>Send Inquiry</Text>
        </TouchableOpacity>
    </View>


</View>
</View>

                                    {/* 3rd Tab */}
                                    <View style={{ width: '100%',backgroundColor:'white', flexDirection: 'row', height: 122, width: '96%', margin: '2%', borderColor: 'gray', borderStyle: 'solid', borderWidth: 1 }}>


                                        <View style={{ width: '30%', height: '100%' }}>
                                            <Image
                                                style={{ width: '100%', height: 120, borderRadius: 0 }}
                                                source={require('../images/INAPA2019.gif')}
                                            />
                                        </View>
                                        <View style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
                                            <View style={{ width: '70%', height: '20%' }}>
                                                <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: 'black', textDecorationLine: 'underline' }}>5A ENGINEERING</Text>
                                            </View>

                                            <View style={{ width: '70%', height: 'auto', flexDirection: 'row' }}>
                                                <View style={{ width: '10%', height: '100%' }}>
                                                    <Iconsssss style={{ color: 'black', fontSize: 15, paddingTop: 5, padding: 2 }} name={"location-on"} />
                                                </View>
                                                <View style={{ width: '90%', height: 'auto' }}>
                                                    <Text style={{ fontSize: 12, padding: 2, color: 'black', }}>
                                                        Barkat Town,Bund Road,Near Karol Ghati,Under Pass,Ring Road , Lahore
                                            </Text>
                                                </View>
                                            </View>

                                            <View style={{ width: '70%', height: 'auto', flexDirection: 'row' }}>
                                                <View style={{ width: '10%', height: '100%' }}>
                                                    <Icons style={{ color: 'black', fontSize: 15, paddingTop: 5, padding: 2 }} name={"phone"} />
                                                </View>
                                                <View style={{ width: '90%', height: 'auto' }}>
                                                    <Text style={{ fontSize: 12, padding: 2, color: 'black', }}>
                                                        (92 42 ) 36885656 , 37242786
                                        </Text>
                                                </View>
                                            </View>

                                            <View style={{ width: '70%', height: '20%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                <TouchableOpacity style={{ margin: '1%', alignItems: 'center', justifyContent: 'center', width: '40%', backgroundColor: '#ffff00', borderRadius: 90 }}>
                                                    <Text style={{ color: 'black', textAlign: 'center' }}>View More</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ margin: '1%', alignItems: 'center', justifyContent: 'center', width: '40%', backgroundColor: '#ffff00', borderRadius: 90 }}>
                                                    <Text style={{ color: 'black', textAlign: 'center' }}>Send Inquiry</Text>
                                                </TouchableOpacity>
                                            </View>


                                        </View>
                                    </View>
                                </View>
                            </View>


                        </ScrollView>
                    </View>

                </SideMenu >

            )
        }

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
        // backgroundColor: '#fff',
        backgroundColor: '#eeeeee',
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
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleTextStyle: {
        flex: 0,
        color: '#fff',
        fontSize: 20,
        marginBottom: 15
    },
    listContainer: {
        flex: 1,
        width: width * 0.8,
        maxHeight: height * 0.7,
        backgroundColor: '#fff',
        borderRadius: 0,
        marginBottom: 15
    },
    cancelContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelButton: {
        flex: 0,
        backgroundColor: '#999',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    cancelButtonText: {
        textAlign: 'center',
        fontSize: 18
    },
    filterTextInputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#999'
    },
    filterTextInput: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 0,
        height: 50
    },
    categoryStyle: {
        ...optionStyle
    },
    categoryTextStyle: {
        ...optionTextStyle,
        color: '#999',
        fontStyle: 'italic',
        fontSize: 16
    },
    optionStyle: {
        ...optionStyle
    },
    optionStyleLastChild: {
        borderBottomWidth: 0
    },
    optionTextStyle: {
        ...optionTextStyle
    },
    selectedOptionStyle: {
        ...optionStyle
    },
    selectedOptionStyleLastChild: {
        borderBottomWidth: 0
    },
    selectedOptionTextStyle: {
        ...optionTextStyle,
        fontWeight: '700'
    },
    noResults: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    noResultsText: {
        flex: 1,
        textAlign: 'center',
        color: '#ccc',
        fontStyle: 'italic',
        fontSize: 22
    }

});

const optionStyle = {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
}

const optionTextStyle = {
    flex: 1,
    textAlign: 'left',
    color: '#000',
    fontSize: 22
}