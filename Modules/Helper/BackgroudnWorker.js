import BackgroundJob from "react-native-background-job";
var SQLite = require('react-native-sqlite-storage');
import { GenericConstants, ApiMethodNames, ErrorMessages, ResponseCodes, ResponseStatus } from './GenericConstants';
import { CommonMethods } from './CommonMethods';
var db = SQLite.openDatabase({ name: "User2", createFromLocation: "/User2.db" }, (okCallback, errorCallback) => {
    if (errorCallback)
        console.log("errorCallback", errorCallback)
    else
        console.log("okCallback", okCallback)
});
const foregroundJobKey = "foregroundJobKey";

var data;
export class backgroundWorker {

    RandomNameGenerator() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    BackgroundJobs() {
        var arr = [];
        BackgroundJob.register({
            jobKey: foregroundJobKey,
            job: () => {
                db.executeSql('SELECT * FROM Checked where Is_Send = 0 and ImageLoad = 0', [], (results) => {
                    console.log("SELECT * FROM Checked results ", results);
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        console.log("row", row);
                        if (row.Is_Send == 0 && row.ImageLoad == 0)
                            arr.push(row);
                        else
                            arr.push([]);
                    }
                })
                console.log("Arr", arr);
                   var res = Array.from(new Set(arr.map(s => s.id)))
                        .map(id => {
                            return {
                                id: id,
                                EmpCode: arr.find(s => s.id === id).EmpCode,
                                ImgName: JSON.parse(arr.find(s => s.id === id).ImgName),
                                Is_Send: arr.find(s => s.id === id).Is_Send,
                                ImageLoad: arr.find(s => s.id === id).ImageLoad,
                                Lat: arr.find(s => s.id === id).Lat,
                                LocationId: arr.find(s => s.id === id).LocationId,
                                Long: arr.find(s => s.id === id).Long,
                                currenttime: arr.find(s => s.id === id).currenttime,
                                UserIP: arr.find(s => s.id === id).UserIP,
                            }
                        })
                        console.log("res",res);
                arr = [];
                for (var i = 0; i < res.length; i++) {
                    console.log("res[i].ImageLoad == 0", res[i].ImageLoad);
                    if (res[i].ImageLoad == 0) {
                        var Params = {
                            id: res[i].id,
                            EmpCode: res[i].EmpCode,
                            UserIP: res[i].UserIP,
                            LocationId: res[i].LocationId,
                            Lat: res[i].Lat,
                            Long: res[i].Long,
                            ImgName: res[i].ImgName.uri,
                            ImageTime: res[i].currenttime,
                            ImageLoad: res[i].ImageLoad
                        }
                        console.log("Params", Params);
                        var imagedate = Params.ImgName;
                        var PictureData = new FormData();
                        PictureData.append("file", { uri: imagedate, type: 'image/jpeg', name: this.RandomNameGenerator() + '.jpg' });
                        console.log('PictureData:!!!!!!! ', PictureData);
                        var imageResponseData = undefined;
                        CommonMethods.UploadFile(PictureData)
                            .then(Response => {
                                imageResponseData = Response;
                                console.log("imageResponseData", imageResponseData)
                                if (Response.Data.Status == "True") {
                                    db.executeSql(`Update  Checked set  ImageLoad = 1 where id=${Params.id}`, [], (results) => {
                                        console.log("Update Checked results ", results);
                                    })
                                    var ResponseData = undefined
                                    var CheckinStatus;
                                    CommonMethods.CallGETApi(ApiMethodNames.HandPunchActivity, Params)
                                        .then(Responses => {
                                            console.log("Responses", Responses);
                                            ResponseData = Responses.Data;
                                            console.log("Responses", ResponseData);
                                            if (ResponseData != undefined) {
                                                console.log("Params.id", Params.id);
                                                db.executeSql(`Update  Checked set Is_Send = 1 where id=${Params.id}`, [], (results) => {
                                                    console.log("Update Checked results ", results);
                                                    var len = results.rows.length;
                                                    for (let i = 0; i < len; i++) {
                                                        let row = results.rows.item(i);
                                                        console.log("row", row);
                                                    }
                                                })
                                                res.splice(res.filter(a => a.id == Params.id), 1)
                                                arr.splice(arr.filter(a => a.id == Params.id), 1)
                                                console.log("arr", arr);
                                                console.log("res", res);
                                            }
                                            else
                                                CommonMethods.NotificationDialog(ErrorMessages.NoUserLogin)
                                        })
                                }
                                else {
                                    alert("Again Check in");
                                }
                            }
                            );
                    }
                }
                res = [];
            }
        });

        BackgroundJob.schedule({
            jobKey: foregroundJobKey,
            // period: 60000,
            period: 10000,
            exact: true,
            allowExecutionInForeground: true
        })

    }
}



// export class SQLITETABLE {

//      checkedTable() {
//         var arr = [];
//         db.executeSql('SELECT * FROM Checked where Is_Send = 0', [], (results) => {
//             console.log("SELECT * FROM Checked results ", results);
//             var len = results.rows.length;
//             for (let i = 0; i < len; i++) {
//                 let row = results.rows.item(i);
//                 arr.push(row);

//                 // console.log(`Employee name: ${row.LoginId}, Dept Name: ${row.Password}`);
//             }
//         })
//     }
// }