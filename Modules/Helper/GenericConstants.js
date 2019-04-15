
export class GenericConstants {
    // static BaseURL = "http://124.29.235.10:8081/";
    // static BaseURL = "http://tms.colgate-palmolive.com.pk:2020/";
    // static ApiURL = "http://localhost/MobileApp/";
    static ApiURL = "https://www.jamals.com/AppApi/";
    // static ImageURL="http://192.168.100.13/MobileApp/images/"
    // static ImageURLLogo='https://www.jamals.com/images/Mobile_banners/';
    static ImageURLLogo='https://www.jamals.com/images/logo-upload/';
    
    // static ApiURL = "http://124.29.235.10:8081/Services/MobileAPI.svc/";
  
    static ApiHeaders =
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    static FormDataHeaders = {
        'Content-Type': 'multipart/form-data',
    };

    static city=[{id:2,name:'Karachi'},{id:3,name:'Lahore'},{id:4,name:'Islamabad'},{id:20,name:'Abbottabad'},{id:5,name:'Alipur Chatta'},
    {id:6,name:'Attock'}]

    static  city=[{id:2,name:'Karachi'},{id:3,name:'Lahore'},{id:4,name:'Islamabad'},{id:200,name:'Abbottabad'},{id:5,name:'Alipur Chatta'},
    {id:6,name:'Attock'},{id:7,name:'Badin'},{id:8,name:'Bahawalnagar'},{id:9,name:'Bahawalpur'},{id:10,name:'Balakot'},{id:11,name:'Bannu'},
    {id:141,name:'Bhai Pheru'},{id:142,name:'Bhakkar'},{id:143,name:'Bhalwal'},{id:144,name:'Bhimber (A.K.)'},{id:145,name:'Bhurban'},{id:146,name:'Bunair'},
    {id:12,name:'Burewala'},{id:13,name:'Chakwal'},{id:14,name:'Chaman'},{id:15,name:'Charsaddah'},{id:16,name:'Chichawatni'},{id:17,name:'Chiniot'},
    {id:18,name:'Chishtian'},{id:19,name:'Chitral'},{id:20,name:'D.I. Khan'},{id:21,name:'D.G. Khan'},{id:22,name:'Dadu'},
    {id:23,name:'Dal Bandin'},{id:24,name:'Daska'},{id:25,name:'Dir'},{id:26,name:'Faisalabad'},{id:27,name:'Fatehjang'},
    {id:28,name:'Gadoon Amazai'},{id:29,name:'Ghakkar'},{id:30,name:'Ghotki'},{id:31,name:'Gilgit'},{id:32,name:'Gojra'},
    {id:33,name:'Gujar Khan'},{id:34,name:'Gujranwala'},{id:35,name:'Gujrat'},{id:36,name:'Gwadar'},{id:37,name:'Hafizabad'},
    {id:38,name:'Haripur'},{id:39,name:'Haroonabad'},{id:40,name:'Hasanabdal'},{id:41,name:'Hasil Pur'},{id:42,name:'Hazara'},
    {id:43,name:'Hub-Balochistan'},{id:44,name:'Hunza'},{id:45,name:'Hyderabad'},{id:46,name:'Jahangira'},{id:47,name:'Jalalpur Bhattian'},
    {id:48,name:'Jamshoro'},{id:49,name:'Jaranwala'},{id:50,name:'Jhang'},{id:51,name:'Jhelum'},{id:52,name:'Kamalia'},
    {id:53,name:'Kamber A.Khan'},{id:54,name:'Kamoke'},{id:55,name:'Karor Pacca'},{id:56,name:'Kasur'},{id:57,name:'Khairpur'},
    {id:58,name:'Khanewal'},{id:59,name:'Khanpur'},{id:60,name:'Kharian'},{id:61,name:'Khurianwala'},{id:62,name:'Khushab'},
    {id:63,name:'Khuzdar'},{id:64,name:'Kohat'},{id:65,name:'Kot Addu'},{id:66,name:'Kot Najib Ullah'},{id:67,name:'Kotli (A.K.)'},
    {id:68,name:'Kotri'},{id:69,name:'Lalamusa'},{id:70,name:'Lalian'},{id:71,name:'Larkana'},{id:72,name:'Layyah'},
    {id:73,name:'Liaquatpur'},{id:74,name:'Lodhran'},{id:75,name:'Mandi Bahauddin'},{id:76,name:'Mamukanjan'},{id:77,name:'Mansehra'},
    {id:78,name:'Mardan'},{id:79,name:'Mian Channu'},{id:80,name:'Mianwali'},{id:81,name:'Mingora-Swat'},{id:82,name:'Mirpur (A.K.)'},
    {id:83,name:'Mirpur Khas'},{id:84,name:'Mirpur Mathelo'},{id:85,name:'Moro'},{id:86,name:'Multan'},{id:87,name:'Muridke'},
    {id:88,name:'Murree'},{id:89,name:'Muzaffarabad (A.K.)'},{id:90,name:'Muzaffargarh'},{id:91,name:'Nankana Sahib'},{id:92,name:'Narowal'},
    {id:93,name:'Nathiagali'},{id:94,name:'Nawabshah'},{id:95,name:'Nooriabad'},{id:96,name:'Nowshera'},{id:97,name:'Okara'},
    {id:98,name:'Pakpattan'},{id:99,name:'Panjgur'},{id:100,name:'Para Chinar'},{id:101,name:'Pattokis'},{id:102,name:'Peshawar'},
    {id:103,name:'Qila Sheikhupura'},{id:104,name:'Quetta'},{id:105,name:'Rabwah'},{id:106,name:'Rahim Yar Khan'},{id:107,name:'Raiwind'},
    {id:108,name:'Rajan Pur'},{id:109,name:'Rawalakot'},{id:110,name:'Rawalpindi'},{id:111,name:'Risalpur'},{id:112,name:'Sadiqabad'},
    {id:113,name:'Sahiwal'},{id:114,name:'Sanghar'},{id:115,name:'Sangla Hill'},{id:116,name:'Sargodha'},{id:117,name:'Sehwan Sharif'},
    {id:118,name:'Shahdad Kot'},{id:119,name:'Shahdad Kot'},{id:120,name:'Shahdad Kot'},{id:121,name:'Sialkot'},{id:122,name:'Skardu'},
    {id:123,name:'Sukkur'},{id:124,name:'Swabi'},{id:125,name:'Tando Adam'},{id:126,name:'Tando Allah Yar'},{id:127,name:'Tando Jam'},
    {id:128,name:'Tando Mohd. Khan'},{id:129,name:'Taxila'},{id:130,name:'Thall'},{id:131,name:'Thatta'},{id:132,name:'Timar Garah'},
    {id:133,name:'Toba Tek Singh'},{id:134,name:'Turbat'},{id:135,name:'Uthal-Baluchistan'},{id:136,name:'Vehari'},{id:137,name:'Wazirabad'},
    {id:138,name:'Wah Cantt.'},{id:139,name:'Zhob'},{id:140,name:'Ziarat'}]
}

export class ApiMethodNames {
    static ReadPermission = "ReadPermission.php";
    static Product_category = "Product_category.php";
    static Product = "Product.php";
    static insertuser = "insertuser.php";
    static ReadResult = "ReadResult.php";
    static ReadLogin = "ReadLogin.php";
    static CreateUser = "CreateUser.php";
    static ReadSocialMedia = "ReadSocialMedia.php";
    static SendInquiry = "SendInquiry.php";
    static PackageRequest = "PackageRequest.php";
    static ReadClassificaiton = "ReadClassificaiton.php";
    static InsertInquiry = "InsertInquiry.php";
    static ReadBuyingPost = "ReadBuyingPost.php";

   
   

}

export class ResponseStatus {
    static Success = 200;
    static DataNotFound = 204;
    static DataSaved = 202;
    static AuthenticationFailure = 417;
}
export class TMSStatus {
    // static appearances = {
    //     Pending: 1,
    //     'Approved': 2,
    //     'Rejected':3
    //   }
    static Pending = "Pending";
    static Approved = "Approved";
    static Rejected = "Rejected";
}




export const LeaveType = [
    { id: 1, value: "Sick" },
    { id: 2, value: "Annual" },
    { id: 3, value: "Casual" },
    { id: 4, value: "Maternity" },
    { id: 5, value: "Default" },
    { id: 6, value: "WithoutPay" },
    { id: 7, value: "Official" },
    { id: 8, value: "HalfDay" },

]
export const Roles = [
    { id: 5, value: "Admin" },
    { id: 6, value: "Incharge" },
    { id: 7, value: "Employee" },
    { id: 8, value: "Super Admin" },
    { id: 9, value: "TimeOfficer" },
    { id: 10, value: "Group Admin" },
    { id: 11, value: "Shift Incharge" },
]

export const Menu = [
    { MenuId: 368, ManuName: "Home" },
    { MenuId: 343, ManuName: "Incharge" },
    { MenuId: 7, ManuName: "Employee" },
    { MenuId: 8, ManuName: "Super Admin" },
    { id: 9, value: "TimeOfficer" },
    { id: 10, value: "Group Admin" },
    { id: 11, value: "Shift Incharge" },
]

// export const Screen=[
//     {}
// ];

// export class Role {
//     static Incharge = "Incharge"
//     static Employee = "Employee"
//     static SuperAdmin = "Super Admin"
//     static TimeOfficer = "TimeOfficer"
//     static GroupAdmin = "Group Admin"
//     static ShiftIncharge = "Shift Incharge"
// }
export class ResponseCodes {
    static Success = "200";
}

export class ErrorMessages {
    static NoCategoryFound = "No Category Found";
    static NoRecordFound = "No Record Found";
    static EnterMobilePassword = "Please provide Mobile Number and Password";
    static NoUserLogin = "Invalid Email/Password";
    static NoFoundData = "No Found Data";
    static ApplyLeaveError = "Your Leave Request is not Correct";
    static NoDealsCategoriesFound = "No Deals Categories found";
    static LeaveHistoryNotFound = "Leave History Not Found";
}
export class Colors {
    static TextBlack = "#000000";
    static TextRed = '#fa1003';
    static TextYellow = "#FFD400";
    static TextWhite = "#FFFFFF";
    static TextGray = "#999595";
    static BorderRed = '#fa1003';
    static BorderBlack = "#000000";
    static ButtonYellow = "#FFD400";
    static BackgroundWhite = "#F7F7F7";
    static BackgroundPureWhite = "#FFFFFF";
    static MenuItemBackgroundColor = "#e9e9e9";
    static FooterRed = "#fa1003";
    static PlaceholderGray = "#c0c0c0";
    static BackgroundLightGray = "#e9e9e9";
    static BackgroundBlack = "#263948";
    static ThemeColorYellow = "#ffea00";
    
}
export class MainHeaders {
    static width = '100%';
    static alignItems = 'center';
    static flexDirection = 'row';
    // static backgroundColors = '#1ab394';
    // static backgroundColors = '#ffff00';
    static backgroundColors = '#ffea00';
    static height = 70;
}
export class MainHeaders1 {
    static width = '100%';
    static alignItems = 'center';
    static flexDirection = 'row';
    // static backgroundColors = '#1ab394';
    static backgroundColors = '#ffea00';
    // static backgroundColors = '#ffd400';
    static height = 80;
}


export class HeaderBody {

    static width = '100%';
    static height = 50;
    static alignItems = 'center';
    static justifyContent = 'center';

}
export class box1 {


    static height = 'auto';
    static width = '98%';
    static margin = 10;
    static borderColor = '#ffff00';
    static borderWidth = 2;
    static borderStyle = 'solid';
    static backgroundColor = 'white';
}
export class box1Header {
    static width = '100%';
    static height = 45;
    static backgroundColor = '#d71e17';
    // static backgroundColor = '#ffff00';
    static alignItems = 'center';
    static justifyContent = 'center';
}
export class box1Title {
    static fontSize = 18;
    static color = 'white';
    static fontWeight = 'bold';

}
export class box1Child1 {
    static width = '31%';
    static margin = 4;
    static backgroundColor = '#1ab394';
    static alignItems = 'center';
    static height = 60;
}
export class box1child1Title {
    static fontSize = 17;
    // static textDecorationLine= 'underline';
    static color = 'white';
    static height = 40;

}
export class box2child1Title {
    static fontSize = 12.25;
    static color = 'white';
    static fontWeight = 'bold';
    static alignItems = 'center';
}
export class box2child1Title2 {
    static color = 'white';
    static borderBottomWidth = 1;
    static borderBottomColor = '#d1dade';
    static borderStyle = 'solid';
    static alignItems = 'center';
}

