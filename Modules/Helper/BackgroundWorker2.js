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
    BackgroundJobs() {
        var arr = [];
        BackgroundJob.register({
            jobKey: foregroundJobKey,
            job: () => {
                console.log(`Exact Job fired!. Key = ${foregroundJobKey}`)
                console.log("background job started")
               
                db.executeSql('SELECT * FROM Checked where Is_Send=0', [], (results) => {
                    console.log("SELECT * FROM Checked results ", results);
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        arr.push(row);
                    }
                })
                console.log("arr",arr);
                    var res = Array.from(new Set(arr.map(s => s.id)))
                        .map(id => {
                            return {
                                id: id,
                                EmpCode: arr.find(s => s.id === id).EmpCode,
                                ImgName: arr.find(s => s.id === id).ImgName,
                                Is_Send: arr.find(s => s.id === id).Is_Send,
                                Lat: arr.find(s => s.id === id).Lat,
                                LocationId: arr.find(s => s.id === id).LocationId,
                                Long: arr.find(s => s.id === id).Long,
                                currenttime: arr.find(s => s.id === id).currenttime,
                                UserIP: arr.find(s => s.id === id).UserIP,
                            }
                        })
                    console.log("res", res);
                    for (var i = 0; i < res.length; i++) {
                        var Params = {
                            EmpCode: res[i].EmpCode,
                            UserIP: res[i].UserIP,
                            LocationId: res[i].LocationId,
                            Lat: res[i].Lat,
                            Long: res[i].Long,
                            ImgName: res[i].ImgName,
                            ImageTime: res[i].currenttime
                        }
                        console.log("Params", Params);
                        var ResponseData = undefined
                        Params.id = res[i].id
                        console.log("ParamsId", Params);
                        var CheckinStatus;
                        CommonMethods.CallGETApi(ApiMethodNames.HandPunchActivity, Params)
                            .then(Responses => {
                                console.log("Responses", Responses);
                                ResponseData = Responses.Data;
                                console.log("Responses", ResponseData);
                                if (ResponseData != undefined) {
                                    db.executeSql(`Update  Checked set  Is_Send = 1 where id=${Params.id}`, [], (results) => {
                                        console.log("Update Checked results ", results);
                                    }, () => {
                                        checkedTable();
                                    })
                                }
                                else
                                    CommonMethods.NotificationDialog(ErrorMessages.NoUserLogin)
                            })

                    }

                
            
            }
        });

        BackgroundJob.schedule({
            jobKey: foregroundJobKey,
            period: 30000,
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