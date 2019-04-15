import prompt from 'react-native-prompt-android';
import React, { Component } from 'react';
import {
    Container, Left, Button, Header, H1, Text, Content, Icon,
    Spinner, Card, CardItem, Thumbnail, Body, Right, H2
} from 'native-base';
import SideBar from './Sidebar';
import { Image, StatusBar, StyleSheet, View, Platform, FlatList, TouchableOpacity, ActivityIndicator,Dimensions } from 'react-native';
// import { Image, StatusBar, StyleSheet, View,TouchableOpacity } from "react-native";
import Icons from 'react-native-vector-icons/FontAwesome';
import { Col, Row, Grid } from 'react-native-easy-grid';


import Footer from './Footer';
import Calender from './Calender';
import Article from './Article';
import Newpaper from './newspaper';
import Videos from './Video';
import JagoPaskitandetail from './JagoPakistandetail';
const screenwidh = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;
const sum = screenheight + screenwidh;
const REQUEST_URL_for_pakistan = 'http://jagotimes.com/wp-json/wp/v2/posts?categories=1&page=';
var striptags = require('striptags');
const img_for_pakistan = [];
const title_for_pakistan = [];
const Headline_pakistan = [];
const photo=undefined;
class Pakistan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: false,
            pakistan_images: '',
            pakistan_title: '',
            main_pakistan_image: '',
            main_text_pakistan: '',
            main_news_pakistan: '',
            Headline_pakistan: '',
            Pakdata: [],
            isLoading: true,
            JSON_from_server: [],
            fetching_Status: false,
        }
        this.page = 0
    }

    componentDidMount() {
       
        img_for_pakistan=[];
        title_for_pakistan=[];
        Headline_pakistan=[];
        if(img_for_pakistan.length==0 && title_for_pakistan.length==0  ){
            console.log("component Did Mount this.state.main_pakistan_image",this.state.main_pakistan_image)
        this.page = this.page + 1;
        fetch(REQUEST_URL_for_pakistan + this.page)
        .then((response) => response.json())
        .then((responseData) => {
            console.log("PAK", responseData);
            let res1 = responseData[0].content.rendered;
            let pattern1 = /<img.+src=[\'"]([^\'"]+)[\'"].*>/i.exec(res1);
            let main_text_pakistan = responseData[0].title.rendered;
            if(pattern1!=null){
                main_pakistan_image = pattern1[1];
               }
               else{
                 main_pakistan_image=photo;
               }
           
           
            let main_news_pakistan;
            let html = responseData[0].content.rendered;
            striptags(html);
            striptags(html, '<p>');
            let title = striptags(html, [], '\n');
            main_news_pakistan=title;
            for (var i = 1; i < responseData.length; i++) {
                let Headline_pakistan_title=responseData[i].title.rendered
                Headline_pakistan.push(Headline_pakistan_title)
                let html = responseData[i].content.rendered;
                striptags(html);
                striptags(html, '<p>');
                let title = striptags(html, [], '\n');
                title_for_pakistan.push(title);
                URL1 = responseData[i].content.rendered;
                let pattern = /<img.+src=[\'"]([^\'"]+)[\'"].*>/i.exec(URL1);
               
                if(pattern!=null){
                    let img = pattern[1];
                    img_for_pakistan.push(img);
                }
                else{
                    img_for_pakistan.push(photo);
                     }
               
              
                console.log("pattern", pattern[1]);
                console.log("title_for_pakistan", title_for_pakistan);
                console.log("img_for_pakistan", );
                if (img_for_pakistan.length != 0 && title_for_pakistan.length != 0) {
                    this.setState({
                        img: true,
                        pakistan_title: title_for_pakistan,
                        pakistan_images: img_for_pakistan,
                        Headline_pakistan:Headline_pakistan,
                        main_pakistan_image: main_pakistan_image,
                        main_text_pakistan: main_text_pakistan,
                        main_news_pakistan:main_news_pakistan,
                    })
                }
            }   
        }).done()
    }
    }


    fetch_more_data_from_server = () => {
        this.page = this.page + 1;
        this.setState({ fetching_Status: true }, () => {
        this.page = this.page + 1;
            fetch(REQUEST_URL_for_pakistan + this.page)
                .then((response) => response.json())
                    .then((responseData) => {
                        console.log("PAK", responseData);
                        for (var i = 0; i < responseData.length; i++) {
                            let Headline_pakistan_title = responseData[i].title.rendered
                            Headline_pakistan.push(Headline_pakistan_title)
                            let html = responseData[i].content.rendered;
                            striptags(html);
                            striptags(html, '<p>');
                            let title = striptags(html, [], '\n');
                            title_for_pakistan.push(title);
                            URL1 = responseData[i].content.rendered;
                            let pattern = /<img.+src=[\'"]([^\'"]+)[\'"].*>/i.exec(URL1);
                            if (pattern != null) {
                                let img = pattern[1];
                                img_for_pakistan.push(img);
                            }
                            else{
                                img_for_pakistan.push(photo);
                            }
                            if (img_for_pakistan.length != 0 && title_for_pakistan.length != 0) {
                                this.setState({
                                    img: true,
                                    pakistan_title: title_for_pakistan,
                                    pakistan_images: img_for_pakistan,
                                    main_pakistan_image: main_pakistan_image,
                                    main_text_pakistan: main_text_pakistan,
                                    Headline_pakistan: Headline_pakistan,
                                    isLoading: false
                                })
                            }
                        }
            }).done()
        });
    }


    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            >
            </View>
        );
    }

    Render_Footer = () => {
        return (
            <View style={styles.footerStyle}>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.TouchableOpacity_style}
                    // style={{backgroundColor:'#4267b2'}}
                    onPress={this.fetch_more_data_from_server}
                >

                    <Text style={styles.TouchableOpacity_Inside_Text}>Load More News</Text>
                    {
                        (this.state.fetching_Status)
                            ?
                            <ActivityIndicator color="#fff" style={{ marginLeft: 6 }} />
                            :
                            null
                    }

                </TouchableOpacity>

            </View>
        )
    }

    
    seleceteditem(val,ind){
        console.log("val",val);
        console.log("ind",ind);
        this.props.navigation.navigate("Detail",{val:val,category:'Pakistan'})
    }
    readmore(){
        var val={
            Image:this.state.main_pakistan_image,
            News:this.state.main_text_pakistan,
            Title:this.state.main_news_pakistan
             };
             console.log("val readmore",val);
       
        this.props.navigation.navigate("Detail",{val:val,category:'Pakistan'})
    }
    
    
    render() {
        console.log("this.state.pakistan_title", this.state.pakistan_title)
        console.log("this.state.pakistan_images", this.state.pakistan_images)
        
        const images = [];
        if (this.state.img === true) {
            for (var i = 0; i < this.state.pakistan_images.length; i++) {
                images.push(this.state.pakistan_images[i])
            }
            console.log("images", images);
            var Pakistan = [];
            this.state.pakistan_images.forEach((element, index) => {
                Pakistan.push({
                    Image: element,
                    Title: this.state.pakistan_title[index],
                    News: this.state.Headline_pakistan[index]
                })
            })
            console.log("Pakistan", Pakistan);
        }
        
        
        
        
        let st = "<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>"
        let stt = "<<<<<<<<<<>>>>>>>>>>>"
        return (
           <Container>
                {(images.length == 0) ?
                    <Content >
                        <View style={{width:screenwidh,height:screenheight,justifyContent:'center',alignItems:'center'}}>
                            <Spinner  color="#4267b2" />
                            <Text style={{alignItems:'center',justifyContent:'center',fontSize:sum/50,color:'black'}}>Loading...</Text>
                        </View>
                    </Content>
                    :
                    <Content>
                        <View style={{ width: '100%', backgroundColor: '#4267b2', height: 60, flexDirection: 'row',opacity:0.7 }}>
                            <View style={{ width: '15%', backgroundColor: '#4267b2' }}>
                                <Button transparent style={{ width: 60, height: 60 }} onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                    <Icon style={{ color: 'white', fontSize: 30 }} name="md-menu" />
                                </Button>
                            </View>
                        <View style={{ width: '85%', backgroundColor: '#4267b2' }}>
                            <Image
                            style={{ margin: 1 }}
                            source={require('../images/header4.png')}
                            />
                        </View>
                        </View> 
                        <View style={{ width: '100%', backgroundColor: 'black',opacity:1, flexDirection: 'row', alignItems: 'center', height: 50 }}>
                            <View style={{ left: 10, width: '100%' }}>
                                <Text style={{ color: 'white', fontSize: sum/60, fontFamily: 'MarkPro Medium', paddingTop: 3, margin: 5 }}>
                                Pakistan / Search For Result
                                </Text>
                            </View>
                        </View>
                        <View style={{ width: '100%',  height: 35, backgroundColor: '#4267b2', marginTop: 5,marginBottom:5 ,justifyContent: 'center', alignItems: 'center',}}>
                            <View style={{ width: '100%',opacity:0.8, height: 35, backgroundColor: '#dc152c',justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{justifyContent: 'center', alignItems: 'center', color: 'white',fontSize: sum/60, fontFamily: 'MarkPro Medium',  }}> Breaking News </Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', marginTop: 5, backgroundColor: 'black', height: 50 ,}}>
                    <Text style={{ color: 'white', paddingTop: 5, fontSize: sum/40, fontWeight: 'bold',paddingLeft:10 }}>
                    Pakistan
                    </Text>
                </View>
                <View style={{ borderBottomColor: 'orange', borderBottomWidth: 5, borderStyle: 'solid' }}>
                    <View style={{ width: '100%' - 4, borderStyle: 'solid', borderBottomColor: 'black',borderColor:'black',borderWidth:3, borderBottomWidth: 3, margin: 2 }}>
                        <View>
                             {(this.state.main_pakistan_image==undefined)?
                                <Image
                                style={{ margin: 1, width: '100%', height: 300 }}
                                source={require('../images/unknown.png')}
                                />  
                             :
                                <Image
                                style={{ margin: 1, width: '100%', height: 300 }}
                                source={ {uri :this.state.main_pakistan_image}}
                                />  
                            }
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: sum/65,fontFamily:'MarkPro Medium', color: 'black', margin: 2, justifyContent: 'center', alignItems: 'center' }}>
                            {this.state.main_text_pakistan}
                            </Text>
                        </View>
                        <View style={{width:'100%',flex:1,flexDirection:'row', justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                            <View style={{width:'50%'}}>
                                </View>
                                <View style={{width:'30%',alignItems:'center',justifyContent:'center'}}>
                            <Button onPress={this.readmore.bind(this)} 
                             style={{backgroundColor:'#4267b2', width: 150, margin: 10,alignItems:'center',justifyContent:'center' }} >
                                <Text style={{alignItems:'center',justifyContent:'center'}}>Read More </Text>
                            </Button>
                        </View>
                        <View style={{width:'20%'}}>
                                </View>
                        </View>
                    </View>
                       {(Pakistan != undefined) ?
                            <FlatList
                            style={{ width: '100%' }}
                            keyExtractor={(item, index) => index}
                            data={Pakistan}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            removeClippedSubviews={false}
                            renderItem={({ item, index }) => {
                            return (
                                  <TouchableOpacity onPress={this.seleceteditem.bind(this, item, index)}
                                    key={index} style={{width:'100%',borderTopColor:'#4267b2',borderBottomColor:'#4267b2',borderBottomWidth:3,borderTopWidth:0,borderStyle:'solid', flex: 1, flexDirection: 'row', backgroundColor: 'white', marginTop: 6,marginBottom:6 }}>
                                        <View style={{ width:'35%' }}>
                                            <Image
                                            style={{ margin: 1, width: 120, height: 100 }}
                                            source={(item.Image==undefined)? require('../images/unknown.png'):{ uri: item.Image }} />
                                            {/* source={{ uri: item.Image }} /> */}
                                        </View>
                                        <View style={{  width:'65%', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{  fontSize: sum/65,fontFamily:'MarkPro Medium', alignItems: 'center', justifyContent: 'center' }}>
                                            {item.News}
                                            </Text>
                                        </View>
                                   </TouchableOpacity>
                                 )
                            }
                        }
                        ListFooterComponent={this.Render_Footer}
                        />
                        :
                         null
                         }
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Videos />
                    </View>         
            
                    <View style={{ marginTop: 20 }}>
                        <Newpaper />
                    </View>
                     <View style={{ marginTop: 20 }}>
                     <Article />
                     </View>
                    <View style={{ marginTop: 20 }}>
                        <Text>Jago Old Issue {stt}</Text>
                        <Calender />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Footer />
                    </View>
            </Content>
        }
  </Container>
)
}
}
export default Pakistan;

const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            margin: 5,
            paddingTop: (Platform.OS === 'ios') ? 20 : 0
        },
        
        footerStyle:
        {
            padding: 7,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopWidth: 2,
            borderTopColor: '#009688'
        },
        
        TouchableOpacity_style:
        {
            padding: 7,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#F44336',
            borderRadius: 5,
            backgroundColor:'#4267b2'
        },
        
        TouchableOpacity_Inside_Text:
        {
            textAlign: 'center',
            color: '#fff',
            fontSize: 18
        },
        
        flatList_items:
        {
            fontSize: 20,
            color: '#000',
            padding: 10
        }
    });