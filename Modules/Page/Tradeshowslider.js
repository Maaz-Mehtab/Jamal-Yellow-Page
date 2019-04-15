
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import ImageSlider from 'react-native-image-slider';
const imageurl = 'https://www.jamals.com/banners/';
class Tradeshowslider extends Component {
    constructor(props){
        super(props);
        this.state={
            trade:[]
        }
        this.trade();

    }

   
    trade() {
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
                            CommonMethods.NotificationDialog(ErrorMessages.NoCategoryFound)
                        this.setState({
                            ShowLoder: false
                        });
                    }
                )
            }
            );
    }
  render() {

    var data=[];
    
    if(this.state.trade.length> 0){
        for(var i=0 ; i< 5; i++){
            data.push(this.state.trade[i])
        }
        console.log("data",data);
    }

    const images = [{ Image: require("../images/slide1.jpg") }, { Image: require("../images/slide2.jpg") },
    { Image: require("../images/slide3.jpg") }, { Image: require("../images/slide4.jpg") }];

    return (
        <View style={{ width: '100%', height: 180, backgroundColor: 'steelblue', alignItems: 'center', justifyContent: 'center' }}>
     
        <ImageSlider
            loop
            autoPlayWithInterval={5000}
            images={images}
            onPress={({ index }) => alert(index)}
            customSlide={({ index, item, style, width }) => (
                // It's important to put style here because it's got offset inside
                <View
                    key={index}
                    style={[
                        style,
                        styles.customSlide,
                        { backgroundColor: index % 2 === 0 ? 'yellow' : 'green' },
                    ]}
                >

                    {/* source={{ uri: item }} */}
                    {/* source={item.Image} */}
                   
                    <Image  source={{ uri: imageurl + "" + data.logo }} style={styles.customImage} />
                </View>
            )}
            customButtons={(position, move) => (
                <View style={styles.buttons}>
                    {images.map((image, index) => {
                        return (
                            <TouchableHighlight
                                key={index}
                                underlayColor="#ccc"
                                onPress={() => move(index)}
                                style={styles.button}
                            >
                                <Text style={position === index && styles.buttonSelected}>
                                    {index + 1}
                                </Text>
                            </TouchableHighlight>
                        );
                    })}
                </View>
            )}
        />
   
    </View>
    );
  }
}

const styles = StyleSheet.create({
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
    height: '100%',
},
});

export default Tradeshowslider;