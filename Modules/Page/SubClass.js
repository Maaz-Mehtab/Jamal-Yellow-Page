import React, { Component } from 'react';
import { Platform, StyleSheet, PermissionsAndroid,TouchableOpacity , Text, View, Image, StatusBar } from 'react-native';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
                Categories: [
                    { id: 1, name: 'Agriculture Foods', Icon: 'th-large' }, { id: 2, name: 'Apparel Textile & Accessories', Icon: 'th-large' },
                    { id: 3, name: 'Auto & Transportation', Icon: 'th-large' }, { id: 4, name: 'Home Light & Construction', Icon: 'th-large' },
                    { id: 5, name: 'Bags Shoes & Accessories', Icon: 'th-large' }, { id: 6, name: 'Gifts Sports & Toys', Icon: 'th-large' },
                    { id: 7, name: 'Machinery Industrial Parts & Tools', Icon: 'th-large' }, { id: 8, name: 'Electircal Equipment Components', Icon: 'th-large' },
                    { id: 9, name: 'Metallargy Chemicals Rubber & Plastic', Icon: 'th-large' }, { id: 10, name: 'Packing Advertising & Office', Icon: 'th-large' },
                    { id: 11, name: 'Health & Beauty', Icon: 'th-large' }, { id: 12, name: 'Electronic', Icon: 'th-large' },
                ],
                selected: 3
            }
    }


    render(){
        let {Categories,selected} = this.state
        return(
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex: 1,backgroundColor:'red'}}>
                    {
                        (Categories.map((val,ind)=>{
                            return(
                                <View  style={(selected == val.id)? {marginVertical: 5, backgroundColor: 'yellow'}:{marginVertical: 5} }>
                                    <Text>
                                        {val.name}
                                    </Text>
                                </View>
                            )
                        }))
                    }
                </View>
                <View style={{flex: 1,backgroundColor: 'yellow'}}>

                </View>
                <View style={{flex:2,backgroundColor: 'blue'}}>

                </View>
            </View>
        )
    }
}