import React, { Component } from 'react';
import { View, ScrollView, StatusBar, ScrollContainer, Linking, FlatList, TextInput, ToastAndroid, Alert, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Entypo';
import Iconsss from 'react-native-vector-icons/EvilIcons';
import { material, human, sanFranciscoWeights, webWeights } from 'react-native-typography';
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            flag: false,
            isOpen: false,
            ShowLoder: false,


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
        page: 'Main'
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
                <View style={[styles.ThemeColorYellow, { bottom: 0, zIndex: 10, width: '100%', height: 45, position: 'absolute', flexDirection: 'row' }]} >

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Information") }} style={{ flexDirection: 'row', width: '30%', justifyContent: 'center', backgroundColor: 'black', opacity: 0.9, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 5 }}>
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
                    <StatusBar backgroundColor="#fdda00" barStyle="light-content" hidden={false} translucent={true} />



                    <ScrollView style={styles.ScrollContainer}>
                        <View style={styles.MainContainer}>
                            {this.state.ShowLoder &&
                                <View style={styles.ActivityLoder}>
                                    <ActivityIndicator style={[styles.centering, { height: 80 }]}
                                        size="large" />
                                </View>
                            }


                            <View style={{ width: '100%', height: 'auto', backgroundColor: '#f4f4f4' }}>

                                <View style={[styles.ThemeColorYellow, { top: 15, width: '100%', height: 64, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                                    <View style={{ width: '90%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={[sanFranciscoWeights.heavy, {
                                            fontSize: 26,
                                            textAlign: 'center',
                                            color: 'black',
                                            // textShadowColor: 'rgba(220, 15, 15, 0.9)',
                                            // textShadowOffset: { width: 1, height: 1 },
                                            // textShadowRadius: 5,
                                            borderWidth: 0,

                                        }]}>Dashboard</Text>
                                    </View>
                                    <TouchableOpacity onPress={this.logout.bind(this)} style={{ width: '10%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                                        <Iconss style={{ color: 'black', fontSize: 20, }} name={"log-out"} />
                                    </TouchableOpacity>
                                </View>


                                <View style={{ width: '100%', height: 200, flexDirection: 'row', top: 30 }}>
                                    <View style={{ width: '48%', justifyContent: 'center', alignItems: 'center', height: 196, margin: '1%', marginTop: 0, borderStyle: 'solid', borderColor: '#ff4081', borderWidth: 0, shadowColor: '#ff4081', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, }}>
                                        <View style={{ width: '96%', height: 40, backgroundColor: '#81c860', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 13, color: 'white' }}>
                                                ACCOUNT TYPE
                                              </Text>
                                        </View>



                                        <View style={{ width: '100%', height: 140, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '57%', flex: 0.7, backgroundColor: '#81c860', borderRadius: 90, justifyContent: 'center', alignItems: 'center' }}>
                                                <Iconsss style={{ color: 'white', fontSize: 100, textAlign: 'center' }} name={"user"} />
                                            </View>
                                            <View style={{ width: '100%', flex: 0.1, alignItems: 'center' }}>
                                                <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, paddingTop: 8 }}>
                                                    5
                                                </Text>
                                            </View>


                                        </View>
                                    </View>
                                    <View style={{ width: '48%', justifyContent: 'center', alignItems: 'center', height: 196, margin: '1%', marginTop: 0, borderStyle: 'solid', borderColor: '#ff4081', borderWidth: 0, shadowColor: '#ff4081', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, }}>

                                        <View style={{ width: '96%', height: 40, backgroundColor: '#ffa726', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 13, color: 'white' }}>
                                                PRODUCTS LIMIT
                                            </Text>
                                        </View>

                                        <View style={{ width: '100%', height: 140, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '57%', flex: 0.7, backgroundColor: '#ffa726', borderRadius: 90, justifyContent: 'center', alignItems: 'center' }}>
                                                <Icons style={{ color: 'white', fontSize: 70, textAlign: 'center' }} name={"text-width"} />
                                            </View>
                                            <View style={{ width: '100%', flex: 0.1, alignItems: 'center' }}>
                                                <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, paddingTop: 8 }}>
                                                    0
                                                </Text>
                                            </View>


                                        </View>
                                    </View>


                                </View>

                                <View style={{ width: '100%', height: 200, flexDirection: 'row', top: 30 }}>

                                    <View style={{ width: '48%', justifyContent: 'center', alignItems: 'center', height: 196, margin: '1%', marginTop: 0, borderStyle: 'solid', borderColor: '#ff4081', borderWidth: 0, shadowColor: '#ff4081', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, }}>
                                        <View style={{ width: '96%', height: 40, backgroundColor: '#0e8bcb', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 13, color: 'white' }}>
                                                ACTIVE PRODUCTS
                                         </Text>
                                        </View>

                                        <View style={{ width: '100%', height: 140, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '57%', flex: 0.7, backgroundColor: '#0e8bcb', borderRadius: 90, justifyContent: 'center', alignItems: 'center' }}>
                                                <Icons style={{ color: 'white', fontSize: 100, textAlign: 'center' }} name={"check-circle"} />
                                            </View>
                                            <View style={{ width: '100%', flex: 0.1, alignItems: 'center' }}>
                                                <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, paddingTop: 8 }}>
                                                    5
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ width: '48%', justifyContent: 'center', alignItems: 'center', height: 196, margin: '1%', marginTop: 0, borderStyle: 'solid', borderColor: '#ff4081', borderWidth: 0, shadowColor: '#ff4081', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, }}>
                                        <View style={{ width: '96%', height: 40, backgroundColor: '#fd6b9c', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 13, color: 'white' }}>
                                                INACTIVE PRODUCTS
                                            </Text>
                                        </View>

                                        <View style={{ width: '100%', height: 140, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '57%', flex: 0.7, backgroundColor: '#fd6b9c', borderRadius: 90, justifyContent: 'center', alignItems: 'center' }}>
                                                <Iconss style={{ color: 'white', fontSize: 100, textAlign: 'center' }} name={"circle-with-cross"} />
                                            </View>
                                            <View style={{ width: '100%', flex: 0.1, alignItems: 'center' }}>
                                                <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, paddingTop: 8 }}>
                                                    0
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ width: '100%',marginBottom:40, height: 200, flexDirection: 'row', top: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: '75%', height: 196, margin: '1%', borderStyle: 'solid', borderColor: '#1565c0', borderWidth: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, }}>
                                        <View style={{ width: '98%', justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: '#f44336', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 13, color: 'white' }}>
                                                EACH PRODUCT IMAGE/IMAGES
                                            </Text>
                                        </View>

                                        <View style={{ width: '100%', height: 140, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '38%', flex: 0.7, backgroundColor: '#f44336', borderRadius: 90, justifyContent: 'center', alignItems: 'center' }}>
                                                <Iconss style={{ color: 'white', fontSize: 75, textAlign: 'center' }} name={"attachment"} />
                                            </View>
                                            <View style={{ width: '100%', flex: 0.1, alignItems: 'center' }}>
                                                <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, paddingTop: 8 }}>
                                                    5
                                                </Text>
                                            </View>


                                        </View>
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
