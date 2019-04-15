
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

class Imagesliders extends Component {
  render() {
    const images = [{Image: require("../images/advertizeee.jpg") },{ Image: require("../images/advertize.jpg") }, { Image: require("../images/Advertizee.jpg") },
 ];

    return (
        <View style={{ width: '100%', height: 200, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
        <ImageSlider
            loop
            autoPlayWithInterval={3000}
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
                    <Image source={item.Image} style={styles.customImage} />
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
                                <Text style={(position === index )?styles.buttonSelected: styles.buttton}>
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
    marginTop: -14,
    marginBottom: 0,
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
    fontSize:10,
    opacity: 1,
    color: 'red',
},
buttton: {
    fontSize:10,
    opacity: 1,
    
},
customSlide: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
},
customImage: {
    width: '100%',
    height: 200,
},
});

export default Imagesliders;