import React, { Component } from 'react';
import { View, ScrollView, ScrollContainer, Linking, FlatList, TextInput, ToastAndroid, Alert, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Entypo';
import Iconssss from 'react-native-vector-icons/MaterialIcons';
import Iconsssss from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Foundation';
import { material, human, sanFranciscoWeights, webWeights } from 'react-native-typography';
export default class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            flag: false,
            isOpen: false,
            ShowLoder: false,
            company: '',
            mobile: '',
            phone: '',
            phone2: '',
            uan: '',
            fax: '',
            country: '',
            city: '',
            web: '',
            address: '',
            AboutCompany: '',
            data: [{ id: 1, name: 'Bikes', status: 'Active' }, { id: 2, name: 'Mobiles', status: 'Active' }, { id: 3, name: 'Laptops', status: 'Active' },]


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
        page: 'Information'
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

    logout() {
        this.props.navigation.navigate("Home")
    }

    render() {

        return (
            <View style={{ width: '100%' }}>
                <View style={[styles.ThemeColorYellow,{ bottom: 0, zIndex: 10, width: '100%', height: 45,  position: 'absolute', flexDirection: 'row' }]} >

                    <TouchableOpacity style={{ flexDirection: 'row', width: '30%', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15, paddingRight: 4 }} name={"info-circle"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>Information</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("SocialLinks") }} style={{ width: '30%', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15, paddingRight: 4 }} name={"external-link-square"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>Social Links</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Product") }} style={{ width: '30%', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                        <Icons style={{ color: 'white', fontSize: 15, paddingRight: 4 }} name={"product-hunt"} />
                        <Text style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', color: 'white' }}>Products</Text>
                    </TouchableOpacity>

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


                            <View style={{ width: '100%', height: 950, backgroundColor: '#f4f4f4' }}>

                                <View style={[styles.ThemeColorYellow,{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  }]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Main")} style={{ width: '10%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                                        <Iconssss style={{ color: 'black', fontSize: 20, }} name={"arrow-back"} />
                                    </TouchableOpacity>

                                    <View style={{ width: '80%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={[sanFranciscoWeights.heavy, {
                                            fontSize: 22,
                                            textAlign: 'center',
                                            color: 'black',
                                            textShadowColor: 'rgba(220, 15, 15, 0.9)',
                                            textShadowOffset: { width: 1, height: 1 },
                                            textShadowRadius: 5,
                                            borderWidth: 0,

                                        }]}>Company Information</Text>
                                    </View>
                                    <TouchableOpacity onPress={this.logout.bind(this)} style={{ width: '10%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                                        <Iconss style={{ color: 'black', fontSize: 20, }} name={"log-out"} />
                                    </TouchableOpacity>
                                </View>



                                <View style={{ width: '96%', height: 'auto', margin: '2%' }}>
                                    <View style={[styles.ThemeColorBlack,{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }]}>
                                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                                            General Information
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
                                                placeholder="Company Name"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.company}
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
                                                onChangeText={(text) => { this.setState({ mobile: text, }) }}
                                                placeholder="Mobile Number"
                                                keyboardType='numeric'
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.mobile}
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
                                                placeholder="Phone Number"
                                                keyboardType='numeric'
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.phone}
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
                                                onChangeText={(text) => { this.setState({ phone2: text, }) }}
                                                placeholder="Phone2 Number"
                                                keyboardType='numeric'
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.phone2}
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
                                                onChangeText={(text) => { this.setState({ uan: text, }) }}
                                                placeholder="Uan Number"
                                                keyboardType='numeric'
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.uan}
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
                                                onChangeText={(text) => { this.setState({ fax: text, }) }}
                                                placeholder="Fax Number"
                                                keyboardType='numeric'
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.fax}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Iconssss style={{ color: 'black', fontSize: 25 }} name={'location-on'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                style={{ height: 40, width: '100%', }}
                                                onChangeText={(text) => { this.setState({ country: text, }) }}
                                                placeholder="Country Name"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.country}
                                            />
                                        </View>
                                    </View>


                                    <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Iconsssss style={{ color: 'black', fontSize: 25 }} name={'city'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                style={{ height: 40, width: '100%', }}
                                                onChangeText={(text) => { this.setState({ city: text, }) }}
                                                placeholder="City Name"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.city}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: '98%', height: 40, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Icon style={{ color: 'black', fontSize: 25 }} name={'web'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                style={{ height: 40, width: '100%', }}
                                                onChangeText={(text) => { this.setState({ web: text, }) }}
                                                placeholder="Web"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.web}
                                            />
                                        </View>
                                    </View>



                                    <View style={{ width: '98%', height: 'auto', flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, justifyContent: 'center' }}>
                                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                                            <Iconssss style={{ color: 'black', fontSize: 25 }} name={'location-on'} />
                                        </View>
                                        <View style={{ width: '82%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                            <TextInput
                                                editable={true}
                                                multiline={true}
                                                numberOfLines={2}
                                                style={{ height: 'auto', width: '100%', }}
                                                onChangeText={(text) => { this.setState({ address: text, }) }}
                                                placeholder="Address"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.address}
                                            />
                                        </View>
                                    </View>

                                    <View style={[styles.ThemeColorBlack,{ width: '100%', height: 40,  justifyContent: 'center', alignItems: 'center' }]}>
                                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                                            About Company (200 words)
                                        </Text>
                                    </View>


                                    <View style={{ width: '98%', height: 150, flexDirection: 'row', marginTop: 10, backgroundColor: '#e0e0e0', margin: 5, borderRadius: 5, }}>

                                        <View style={{ width: '100%', height: 'auto', }}>
                                            <TextInput
                                                editable={true}
                                                multiline={true}
                                                numberOfLines={2}
                                                style={{ height: 'auto', width: '100%', }}
                                                onChangeText={(text) => { this.setState({ AboutCompany: text, }) }}
                                                placeholder="About Company"
                                                placeholderTextColor="#9e9e9e"
                                                value={this.state.AboutCompany}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 50, marginTop: 10 }}>
                                        <TouchableOpacity style={[styles.ThemeColorYellow,{ borderRadius: 5, width: '50%', height: 35, justifyContent: 'center', alignItems: 'center',  borderStyle: 'solid', borderWidth: 1, borderColor:'black' }]}>
                                            <Text style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>



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
        paddingBottom: 48
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
