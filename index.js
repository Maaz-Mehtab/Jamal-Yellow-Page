
import { name as appName } from './app.json';
import React from "react";
import { AppRegistry } from 'react-native';
import Splashscreen from './Modules/Page/splashscreen';
import Home from './Modules/Page/Home';
import Home2 from './Modules/Page/Home2';
import Login from './Modules/Page/Login';
import Tradeshow from './Modules/Page/Tradeshow';
import Classification from './Modules/Page/Classification';
import Mediapartner from './Modules/Page/Mediapartner';
import Detail from './Modules/Page/Detail';
import Boothform from './Modules/Page/Boothform';

import ResultHome from './Modules/Page/ResultPage/ResultHome';
import Advertisercatlog from './Modules/Page/Advertisercatlog';
import ProductDetail from './Modules/Page/ProductDetail';
import InquiryFrom from './Modules/Page/InquiryFrom';
import Header from './Modules/Page/Header';
import Header2 from './Modules/Page/Header2';
import Packages from './Modules/Page/Packages';
import Test from './Modules/Page/SubClass';
import ListingRequest from './Modules/Page/ListingRequest';
import SellerLogin from './Modules/Page/SellerDashboad/SellerLogin';
import Main from './Modules/Page/SellerDashboad/Main';
import Product from './Modules/Page/SellerDashboad/Product';
import Appp from './Modules/Page/Appp';
import SocialLinks from './Modules/Page/SellerDashboad/SocialLinks';
import Information from './Modules/Page/SellerDashboad/Information';
import { StackNavigator, NavigationActions } from "react-navigation";

const HomeScreen = props => {
    props.navigation.state.params = { title: 'Home' };
    return <Home navigation={props.navigation} />;
};
const YP = StackNavigator({
    Home: { screen: Home }, 
    Splashscreen: { screen: Splashscreen },       
    Login: { screen: Login },
    Home2: { screen: Home2 },       
    Classification: { screen: Classification },
    Test: { screen: Test },
    Packages: { screen: Packages },  
     Boothform: { screen: Boothform },
    Tradeshow: { screen: Tradeshow },
    Header: { screen: Header },
    Header2: { screen: Header2 },
    Main: { screen: Main },       
    Mediapartner: { screen: Mediapartner },
    Appp: { screen: Appp }, 
    Detail: { screen: Detail },
    // Tradeshowslider: { screen: Tradeshowslider },
    Information: { screen: Information },       
    Product: { screen: Product },       
    SocialLinks: { screen: SocialLinks },       
    ListingRequest: { screen: ListingRequest },
    SellerLogin: { screen: SellerLogin },
        
    Advertisercatlog: { screen: Advertisercatlog },

    ProductDetail: { screen: ProductDetail },
    InquiryFrom: { screen: InquiryFrom },     
    ResultHome: { screen: ResultHome },     
  
    // Home: { screen: Home },
  

}, {
        headerMode: 'none'
    });
AppRegistry.registerComponent(appName, () => YP);