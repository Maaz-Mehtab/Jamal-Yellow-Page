import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Animated,
    TouchableOpacity
} from "react-native";
import Iconsssss from 'react-native-vector-icons/MaterialIcons';
HEADER_MAX_HEIGHT = 160
HEADER_MIN_HEIGHT = 50
PROFILE_IMAGE_MAX_HEIGHT = 150
PROFILE_IMAGE_MIN_HEIGHT = 50

class Appp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            scrollY: new Animated.Value(0)
        }
    }
    render() {


        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        })
        const profileImageHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
            extrapolate: 'clamp'
        })

        const profileImageMarginTop = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            // inputRange: [0, HEADER_MIN_HEIGHT ],
            outputRange: [HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT / 2), HEADER_MAX_HEIGHT + 5],
            extrapolate: 'clamp'
        })
        const headerZindex = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
            outputRange: [0, 0, 1000],
            extrapolate: 'clamp'
        })

        const headerTitleBottom = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT
                + 26
            ],
            outputRange: [-20, -20, -20, 15],
            extrapolate: 'clamp'
        })

        const backgroundColors = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: ['transparent', 'white',],
            extrapolate: 'clamp',
        })




        return (

            <View style={{ flex: 1 }} >
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#FEDF7C',
                    height: headerHeight,
                    zIndex: headerZindex,
                    // elevation: headerZindex,//required for android 
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ position: 'absolute', left: 10, zindex: 1000, top: 0, width: '10%', height: 50, alignItems: 'center', justifyContent: 'center' }}>

                        <Iconsssss style={{ color: 'black', fontSize: 25, paddingTop: 3, padding: 2 }} name={"arrow-back"} />
                    </TouchableOpacity>


                    <Animated.View style={{ position: 'absolute', bottom: headerTitleBottom ,}}>
                        <Animated.Text style={{ color:backgroundColors, fontSize: 14, fontWeight: 'bold' }}>Varun Nath</Animated.Text>
                    </Animated.View>
                </Animated.View>

                <ScrollView style={{ flex: 1 }}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                    )}
                >

                    <Animated.View style={{
                        height: profileImageHeight,
                        width: profileImageHeight,
                        // borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
                        borderRadius: 10,
                        borderColor: 'white',
                        borderWidth: 3,
                        overflow: 'hidden',
                        marginTop: 80,
                        marginLeft: 20,

                    }}>

                        <Image source={require('../images/12004l.jpg')}
                            style={{ flex: 1, width: null, height: null }}
                        ></Image>


                    </Animated.View>
                    <View>
                    </View>

                    <View style={{ height: 1000 }}></View>
                </ScrollView>

            </View >
        );
    }
}
export default Appp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});