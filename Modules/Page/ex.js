fblogin() {
    var UserData=[];
    let that = this;
    
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
        function (result) {
            if (result.isCancelled) {
                alert('Login cancelled');
            } else {

                AccessToken.getCurrentAccessToken()
                    .then((accessTokenData) => {
                        console.log(accessTokenData, 'accessTokenData')
                        console.log('accessTokenData uSER id', accessTokenData.userID)

                        return fetch('https://graph.facebook.com/' + accessTokenData.userID + '?fields=email,name&access_token=' + accessTokenData.accessToken).
                            then((response) => {
                                console.log("response", response)
                                return response.json();
                            })
                            .then((data) => {
                                console.log("data", data);
                                UserData.push(data);
                                console.log("UserData",UserData);
                                

                         })
                    }
                    );
                new GraphRequestManager().addRequest(profileRequest).start();
            }
        })
        if(UserData.length>0){
        console.log("UserData",UserData);
        
        }
    }



    
      
    development mode key 
keytool -exportcert -alias androiddebugkey -keystore "C:\Users\User\.android\debug.keystore" | openssl sha1 -binary | openssl base64
    release key app
keytool -exportcert -alias my-key-alias -keystore "D:\YP_Pak\YP_PAK\android\app\my-release-key.keystore" | openssl sha1 -binary | openssl base64

