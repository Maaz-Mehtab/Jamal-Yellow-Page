
import { GenericConstants, ApiMethodNames } from './GenericConstants.js';

export class CommonMethods {

    static GetApiURL() {
        return GenericConstants.ApiURL;
    }
    static GetBaseURL() {
        return GenericConstants.BaseURL;
    }
    
    static GetApiHeaders() {
        return GenericConstants.ApiHeaders;
    }  
    static NotificationDialog(Message) {
        alert(Message);
    }

    static CallGETApi(ApiMethodName, Params) {
        console.log(JSON.stringify(Params));
        var parameters = this.GenerateGETParams(Params)
        console.log("parameters",parameters);
        console.log("CAll Api",this.GetApiURL() + ApiMethodName + parameters)
        return fetch(this.GetApiURL() + ApiMethodName + parameters, {
            method: 'GET',
            headers: this.GetApiHeaders(),
            // body: JSON.stringify(Params)
        })
        .then(response => response.json())
        .then(jsondata => {
           ResponseData = { Data: jsondata };
            return ResponseData;
        })
        .catch(error => {
            console.log('OnError');
            console.log(JSON.stringify(error));
            ResponseData = { Error: error };
            return ResponseData;
        });
    }

    static UploadFile(formdata) {
        return fetch(this.GetBaseURL() + 'UploadImageHandler.ashx', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata
        }).then(response => response.json())
            .then(jsondata => {
                console.log(JSON.stringify(jsondata));
                ResponseData = { Data: jsondata };
                return ResponseData;
            })
            .catch(error => {
                console.log(JSON.stringify(error));
                let ResponseData = { Error: error };
                return ResponseData;
            });
    }


    
    static GenerateGETParams(params) {
        var Keys = Object.keys(params)
        var parameters = Keys.length > 0 ? "?" : "";
        
        Keys.forEach((element, index) => {
            parameters += element + "=" + params[element] + "&"
        });
        parameters = Keys.length > 0 ? parameters.substring(0, parameters.length - 1) : parameters
        return parameters
    }

    static CallApi(ApiMethodName, Params) {
        console.log(JSON.stringify(Params));
        
        return fetch(this.GetApiURL() + ApiMethodName, {
            method: 'POST',
            headers: this.GetApiHeaders(),
            body: JSON.stringify(Params)
        })
        .then(response => response.json())
        .then(jsondata => {
            console.log('OnSucess');
            console.log(JSON.stringify(jsondata));
            ResponseData = { Data: jsondata };
            return ResponseData;
        })
        .catch(error => {
            console.log('OnError');
            console.log(JSON.stringify(error));
            ResponseData = { Error: error };
            return ResponseData;
        });
    }
    
}
