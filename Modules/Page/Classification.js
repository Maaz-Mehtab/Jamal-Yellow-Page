
import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Foundation';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/SimpleLineIcons';
import { View, ScrollView, ScrollContainer, FlatList, TextInput, ToastAndroid, Alert, Text, Modal, StyleSheet, Dimensions, Image, processColor, ActivityIndicator, TouchableOpacity, BackHandler, BackAndroid } from 'react-native';
import Sidebar from "./Sidebar";
import { Colors, MainHeaders, MainHeaders1, HeaderBody, box1, box1Header, box1Title, box1Child1, box1child1Title, box2child1Title, box2child1Title2 } from '../Helper/GenericConstants';
import { CommonMethods } from '../Helper/CommonMethods';
import { SessionManager } from '../Helper/SessionsManager';
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from '../Helper/GenericConstants';
const screenheight = Dimensions.get('window').height;
import ModalFilterPicker from 'react-native-modal-filter-picker'
import Header from './Header';

export default class Classification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            picked: '',
            Classification: '',
            modalVisible: false,
            flag: false,
            isOpen: false,
            ShowLoder: false,
            text: '',
            text1: '',
            Product: '',
            click: false,
            selected: 0,
            selected2: 0,
            click2: false,
            Categories: [
                { id: 1, name: 'Agriculture Foods', Icon: 'th-large' }, { id: 2, name: 'Apparel Textile & Accessories', Icon: 'th-large' },
                { id: 3, name: 'Auto & Transportation', Icon: 'th-large' }, { id: 4, name: 'Bags Shoes & Accessories', Icon: 'th-large' },
                { id: 5, name: 'Electircal Equipment Components', Icon: 'th-large' }, { id: 6, name: 'Electronic', Icon: 'th-large' },
                { id: 7, name: 'Gifts Sports & Toys', Icon: 'th-large' }, { id: 8, name: 'Health & Beauty', Icon: 'th-large' },
                { id: 9, name: 'Home Light & Construction', Icon: 'th-large' }, { id: 10, name: 'Machinery Industrial Parts & Tools', Icon: 'th-large' },
                { id: 11, name: 'Metallargy Chemicals Rubber & Plastic', Icon: 'th-large' }, { id: 12, name: 'Packing Advertising & Office', Icon: 'th-large' },
                { id: 13, name: 'Cinematographic Films', Icon: 'th-large' }, { id: 14, name: 'Other Services', Icon: 'th-large' },
            ],
            subcategories: [],
            childcategorires: [],
            allchildcategories: [{ subcategories: 1, mainclass: 1, id: 1, name: 'Agriculture Foods', Icon: 'th-large' }, { subcategories: 1, mainclass: 1, id: 2, name: 'Apparel Textile & Accessories', Icon: 'th-large' },
            { subcategories: 1, mainclass: 1, id: 3, name: 'Auto & Transportation', Icon: 'th-large' }, { subcategories: 2, mainclass: 1, id: 1, name: 'Agriculture Foods', Icon: 'th-large' }, { subcategories: 1, mainclass: 1, id: 2, name: 'Apparel Textile & Accessories', Icon: 'th-large' },
            { subcategories: 2, mainclass: 1, id: 3, name: 'Auto & Transportation', Icon: 'th-large' },],


            allsubcategories: [{ mainclass: 1, id: 1, name: 'Agriculture', Icon: 'th-large' }, { mainclass: 1, id: 2, name: 'Food & Beverage', Icon: 'th-large' },
            { mainclass: 2, id: 3, name: 'Apparel', Icon: 'th-large' }, { mainclass: 2, id: 4, name: 'Jewelry', Icon: 'th-large' },
            { mainclass: 2, id: 5, name: 'Leather', Icon: 'th-large' }, { mainclass: 2, id: 6, name: 'Accessorices', Icon: 'th-large' },
            { mainclass: 2, id: 7, name: 'Textile', Icon: 'th-large' }, { mainclass: 2, id: 47, name: 'Uniforms', Icon: 'th-large' },

            { mainclass: 3, id: 7, name: 'Vehicle & Accessories', Icon: 'th-large' },
            { mainclass: 4, id: 9, name: 'Luggage, Bag & Cases', Icon: 'th-large' }, { mainclass: 4, id: 10, name: 'Shoes & Accessorices', Icon: 'th-large' },
            { mainclass: 5, id: 11, name: 'Electrical Equipment', Icon: 'th-large' }, { mainclass: 5, id: 12, name: 'Telecommunication', Icon: 'th-large' },
            { mainclass: 5, id: 40, name: 'Electrical Equipment & Supplies', Icon: 'th-large' },
            { mainclass: 5, id: 48, name: 'Electronic Components & Supplies', Icon: 'th-large' },

            { mainclass: 6, id: 13, name: 'Consumer Electronic', Icon: 'th-large' }, { mainclass: 6, id: 14, name: 'Home Appliance', Icon: 'th-large' },
            { mainclass: 6, id: 15, name: 'Security & Protection', Icon: 'th-large' }, { mainclass: 6, id: 46, name: 'Digital Battery', Icon: 'th-large' },

            { mainclass: 7, id: 16, name: 'Gifts & Crafts', Icon: 'th-large' }, { mainclass: 7, id: 41, name: 'Sports & Entertainment', Icon: 'th-large' },
            { mainclass: 7, id: 42, name: 'Toys & Hobbies', Icon: 'th-large' },
            { mainclass: 7, id: 49, name: 'Home Decoration', Icon: 'th-large' },

            { mainclass: 8, id: 17, name: 'Beauty & Personal Care', Icon: 'th-large' }, { mainclass: 8, id: 18, name: 'Health & Medical', Icon: 'th-large' },
            { mainclass: 8, id: 52, name: 'Medicine', Icon: 'th-large' },

            { mainclass: 9, id: 19, name: 'Construction & Real Estate', Icon: 'th-large' }, { mainclass: 9, id: 20, name: 'Furniture', Icon: 'th-large' },
            { mainclass: 9, id: 21, name: 'Home & Garden', Icon: 'th-large' }, { mainclass: 9, id: 22, name: 'Lights & Lighting', Icon: 'th-large' },
            { mainclass: 9, id: 53, name: 'EngineeringÂ EquipmentÂ &Â Services', Icon: 'th-large' }, { mainclass: 9, id: 54, name: 'HVAC Systems & Parts', Icon: 'th-large' },

            { mainclass: 10, id: 23, name: 'Industrial Parts & Fabrication Services', Icon: 'th-large' }, { mainclass: 10, id: 24, name: 'Machinery', Icon: 'th-large' },
            { mainclass: 10, id: 25, name: 'Tools & Hardware', Icon: 'th-large' },

            { mainclass: 11, id: 26, name: 'Chemical', Icon: 'th-large' }, { mainclass: 11, id: 27, name: 'Energy', Icon: 'th-large' },
            { mainclass: 11, id: 28, name: 'Minerals & Metallurgy', Icon: 'th-large' }, { mainclass: 11, id: 29, name: 'Rubber & Plastic', Icon: 'th-large' },
            { mainclass: 11, id: 30, name: 'Shoes, & Accessorices Rubber & Plastics', Icon: 'th-large' },
            { mainclass: 11, id: 43, name: 'Environment', Icon: 'th-large' },

            { mainclass: 12, id: 31, name: 'Office & School Supplies', Icon: 'th-large' }, { mainclass: 12, id: 32, name: 'Packaging & Printing', Icon: 'th-large' },
            { mainclass: 12, id: 33, name: 'Service Equipment', Icon: 'th-large' },

            { mainclass: 2, id: 35, name: 'Shoes, & Accessorices', Icon: 'th-large' }, { mainclass: 2, id: 36, name: 'Textile & Leather Product', Icon: 'th-large' },
            { mainclass: 2, id: 37, name: 'Fashion Accessories', Icon: 'th-large' }, { mainclass: 2, id: 38, name: 'Timepieces, Jewelry, Eyewear', Icon: 'th-large' },

            { mainclass: 14, id: 44, name: 'TravelÂ &Â Tour', Icon: 'th-large' }, { mainclass: 14, id: 45, name: 'Construction & Bulding', Icon: 'th-large' },
            { mainclass: 14, id: 55, name: 'Advertising & Marketing', Icon: 'th-large' }, { mainclass: 14, id: 56, name: 'Home & Office', Icon: 'th-large' },
            { mainclass: 14, id: 57, name: 'Import & Export', Icon: 'th-large' }, { mainclass: 14, id: 60, name: 'Professional Services', Icon: 'th-large' },
            { mainclass: 14, id: 61, name: 'Transportation', Icon: 'th-large' },
            ],
            dropdown:
                [
                    { key: 1, label: 'a' }, { key: 2, label: 'b' }, { key: 3, label: 'c' }, { key: 4, label: 'd' }, { key: 5, label: 'e' }, { key: 6, label: 'f' },
                    { key: 7, label: 'g' }, { key: 8, label: 'h' }, { key: 9, label: 'i' }, { key: 10, label: 'j' }, { key: 11, label: 'k' }, { key: 12, label: 'l' },
                    { key: 13, label: 'm' }, { key: 14, label: 'n' }, { key: 15, label: 'o' }, { key: 16, label: 'p' }, { key: 17, label: 'q' }, { key: 18, label: 'r' },
                    { key: 19, label: 's' }, { key: 20, label: 't' }, { key: 21, label: 'u' }, { key: 22, label: 'v' }, { key: 23, label: 'w' }, { key: 24, label: 'x' },
                    { key: 25, label: 'y' }, { key: 26, label: 'z' }
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
    onShow = () => {
        this.setState({ visible: true });
    }

    onSelect = (picked) => {

        var aa = this.state.dropdown.filter(a => a.key == picked)[0].label

        this.setState({
            picked: this.state.dropdown.filter(a => a.key == picked)[0].label,
            visible: false
        })
    }

    onCancel = () => {
        this.setState({
            visible: false,
            picked: ''
        });
    }

    componentWillMount() {
        // this.ClassificationData();
        this.setState({
            ShowLoder: true
        })
    }

    search(id) {
        console.log("id", id);
        this.ClassificationData();
    }
    ClassificationData() {
        var Params = {
            param: this.state.picked
        }
        this.setState({
            ShowLoder: false,
            Classification: []
        }, () => {
            var data = [];
            console.log("ShowLoder", this.state.ShowLoder);
            CommonMethods.CallGETApi(ApiMethodNames.ReadClassificaiton, Params)
                .then(Response => {
                    console.log("Response", Response.Data);
                    this.setState({ ResponseData: Response.Data },
                        () => {
                            if (this.state.ResponseData != undefined) {

                                this.setState({
                                    Classification: this.state.ResponseData.records,
                                    // Classification: data,
                                    ShowLoder: true
                                }, () => {
                                    console.log("ShowLoder", this.state.ShowLoder);
                                    console.log("Classification", this.state.Classification);
                                })
                            }
                            else
                                ToastAndroid.show(ErrorMessages.NoCategoryFound, ToastAndroid.LONG);
                            this.setState({
                                ShowLoder: true
                            });
                        }
                    )
                }
                );
        })
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


    clickbtn(val) {
        console.log("val", val)

        var Params = {
            param: val.name,
            location:'',
            offset:1
        }
        this.setState({
            ShowLoder: true
        }, () => {
            CommonMethods.CallGETApi(ApiMethodNames.ReadResult, Params)
                    .then(Response => {
                    console.log("Response", Response);
                    console.log("Response.Data", Response.Data);
                    this.setState({ ResponseData: Response.Data },
                        () => {
                            if (this.state.ResponseData != undefined && Response.Data.message == undefined) {
                                this.setState({ Product: this.state.ResponseData, }, () => {
                                    console.log("Product", this.state.Product);
                                    this.props.navigation.navigate('ResultHome', { data: this.state.Product.records, da: val.name, location: "",Params :Params})

                                    console.log("Product", this.state.Product);
                                })
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
    click(val, ind) {
        console.log("Val", val)
        console.log("ind", ind)
        this.setState({
            click: (val.id == this.state.selected) ? !this.state.click : true,
            click2: false,
            selected: val.id,
            subcategories: this.state.allsubcategories.filter(a => a.mainclass == val.id)
        }, () => {
            console.log("subcategories", this.state.subcategories);
            this.forceUpdate();
        })
    }
    click2(val, ind) {
        console.log("Val", val)
        console.log("ind", ind)
        this.setState({
            click2: (val.id == this.state.selected2) ? !this.state.click2 : true,
            // click2: !this.state.click2,
            childcategorires: [],
            selected2: val.id,
            // childcategorires: this.state.allchildcategories.filter(a => a.subcategories == val.id)
        }, () => {

            var Params = {
                param: val.id
            }

            CommonMethods.CallGETApi(ApiMethodNames.ReadClassificaiton, Params)
                .then(Response => {
                    console.log("Response", Response.Data);
                    this.setState({ ResponseData: Response.Data },
                        () => {
                            if (this.state.ResponseData != undefined) {

                                this.setState({
                                    childcategorires: this.state.ResponseData.records,
                                    // Classification: data,

                                }, () => {
                                    console.log("Classification", this.state.childcategorires);
                                })
                            }
                            else
                                ToastAndroid.show(ErrorMessages.NoCategoryFound, ToastAndroid.LONG);
                            this.setState({
                                ShowLoder: true
                            });
                        }
                    )
                }
                );
            console.log("childcategorires", this.state.childcategorires);
            this.forceUpdate();
        })
    }

    click3(val, ind) {
        console.log("ind", ind);
        console.log("val", val);
        var Params = {
            param: val.name,
            location:'',
            offset:1
        }
        this.setState({
            ShowLoder: false
        }, () => {
            CommonMethods.CallGETApi(ApiMethodNames.ReadResult, Params)
                    .then(Response => {
                    console.log("Response", Response);
                    console.log("Response.Data", Response.Data);
                    this.setState({ ResponseData: Response.Data },
                        () => {
                            if (this.state.ResponseData != undefined && Response.Data.message == undefined) {
                                this.setState({ Product: this.state.ResponseData, }, () => {
                                    console.log("Product", this.state.Product);
                                    this.props.navigation.navigate('ResultHome', { data: this.state.Product.records, da: val.name, location: "",Params:Params })

                                    console.log("Product", this.state.Product);
                                })
                            }
                            else
                                ToastAndroid.show(ErrorMessages.NoRecordFound, ToastAndroid.LONG);
                            this.setState({
                                ShowLoder: true
                            });
                        }
                    )
                }
                );

        })


    }

    render() {

        let { Categories, selected, selected2 } = this.state
        const { visible, picked } = this.state.dropdown;
        let subcategories = [];
        subcategories = this.state.subcategories;
        console.log("subcategories", subcategories);

        var Classification = [];
        Classification = this.state.Classification;
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
                <View style={styles.ParentContainer}>
                    <Header props={this.props.navigation} />

                    {/* <ScrollView style={styles.ScrollContainer}> */}
                    <View style={styles.MainContainer}>
                        {this.state.ShowLoder == false &&
                            <View style={styles.ActivityLoder}>
                                <ActivityIndicator style={[{ height: screenheight, }]}
                                    size="large" />
                            </View>
                        }
                        {(this.state.click == false) ?
                            <ScrollView >
                                <View style={{ width: '100%', height: '100%' }}>
                                    {(this.state.Categories.map((val, ind) => {
                                        return (

                                            <View key={ind} style={{ width: '100%', flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={this.click.bind(this, val, ind)} style={{ width: '100%', height: 'auto', flexDirection: 'row', padding: 10 }}>
                                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                                        <View style={{ width: '15%', }}>
                                                            <Icons style={{ color: '#646464', fontSize: 20, padding: 5 }} name={"th-large"} />
                                                        </View>
                                                        <View style={{ width: '85%' }}>
                                                            <Text style={{ fontSize: 16, color: 'black', paddingLeft: 0, paddingTop: 2 }}>{val.name}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                        )
                                    }
                                    ))
                                    }
                                </View>
                            </ScrollView>
                            :

                            (this.state.click2 == false) ?
                                <ScrollView>
                                    <View style={{ width: '100%', flexDirection: 'row', height: 'auto', }}>
                                        <View style={{ width: '20%' }}>
                                            {(this.state.Categories.map(
                                                (val, ind) => {
                                                    return (
                                                        <View style={{ width: '100%', }}>
                                                            <TouchableOpacity onPress={this.click.bind(this, val, ind)} key={ind} style={{ width: '100%', padding: 10, height: 'auto', backgroundColor: (selected == val.id) ? 'gray' : 'transparent' }}>
                                                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                                                    <Icons style={{ color: (selected == val.id) ? 'white' : '#646464', fontSize: 20, padding: 5 }} name={"th-large"} />
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                            )}
                                        </View>
                                        <View style={{ width: '80%', backgroundColor: '#646464' }}>
                                            {(this.state.subcategories.map((val, ind) => {
                                                return (
                                                    <TouchableOpacity key={ind} onPress={this.click2.bind(this, val, ind)} key={ind} style={{ width: '100%', padding: 10, height: 'auto', }}>
                                                        <View style={{ width: '100%', flexDirection: 'row' }}>
                                                            {/* <Text>{val.name}</Text> */}
                                                            <Text style={{ fontSize: 16, color: 'white', paddingLeft: 0, paddingTop: 2 }}>{val.name}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }))}
                                        </View>
                                    </View>
                                </ScrollView>

                                :
                                <View style={{ width: '100%', flexDirection: 'row', height: 'auto', }}>
                                    <View style={{ flex: 1, width: '20%' }}>
                                        <ScrollView>
                                            {(this.state.Categories.map(
                                                (val, ind) => {
                                                    return (
                                                        <View style={{ width: '100%', }}>
                                                            <TouchableOpacity onPress={this.click.bind(this, val, ind)} key={ind} style={{ width: '100%', padding: 10, height: 'auto', backgroundColor: (selected == val.id) ? '#646464' : 'transparent' }}>
                                                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                                                    <Icons style={{ color: (selected == val.id) ? 'white' : '#646464', fontSize: 20, padding: 5 }} name={"th-large"} />
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                            )}
                                        </ScrollView>
                                    </View>

                                    <View style={{ flex: 2, width: '25%', backgroundColor: '#646464' }}>
                                        <ScrollView>
                                            {(this.state.subcategories.map((val, ind) => {
                                                return (
                                                    <TouchableOpacity key={ind} onPress={this.click2.bind(this, val, ind)} key={ind} style={{ backgroundColor: (selected2 == val.id) ? '#2B2B2B' : 'transparent', width: '100%', padding: 10, height: 'auto', }}>
                                                        <View style={{ width: '100%', flexDirection: 'row' }}>
                                                            <Text style={{ paddingLeft: 0, fontSize: 16, paddingTop: 2, color: (selected2 == val.id) ? 'white' : 'white', }}>{val.name}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }))}
                                        </ScrollView>
                                    </View>

                                    <View style={{ flex: 3, width: '55%', backgroundColor: '#2B2B2B' }}>
                                        <ScrollView>
                                            {this.state.childcategorires.length > 0 &&
                                                (this.state.childcategorires.map((val, ind) => {
                                                    return (
                                                        <TouchableOpacity key={ind} onPress={this.click3.bind(this, val, ind)} key={ind} style={{ width: '100%', padding: 10, height: 'auto', }}>
                                                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                                                <Text style={{ color: 'white', paddingLeft: 0, fontSize: 16, paddingTop: 2, }}>{val.name}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                }))}
                                        </ScrollView>

                                    </View>
                                </View>
                        }
                        {/* </ScrollView> */}

                    </View>
                    {/* </ScrollView> */}
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

    ParentContainer: {
        width: '100%',
        height: '100%',
        paddingBottom: 40
    },
    ScrollContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f1f0ea'
        // backgroundColor: Colors.BackgroundPureWhite
    },
    MainContainer: {
        flex: 1,
        backgroundColor: '#f1f0ea',
        flexDirection: 'column',
        // backgroundColor: '#fff',
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
