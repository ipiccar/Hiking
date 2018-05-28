import {
    LOGGED_IN,
    ADMIN_LOGIN,
    LOADING,
    NEW_USER,
    url
} from "./constants"
import {Actions} from "react-native-router-flux";

const myRequest = new Request(url+'/game', {method: 'GET'});

export function fetch_login (hikerName){
    return function(dispatch) {

        dispatch(isFetching());
        console.log(hikerName);
        fetch(url + 'users/name/' + hikerName)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Response received : " + responseJson.toString());
                dispatch(userFetched(responseJson));
                if(responseJson.type!=undefined){
                    if(responseJson.type.toUpperCase()=="ADMIN"){
                        console.log("Admin");

                        Actions.login({hikerName: hikerName});
                    }
                    else{
                        console.log("This hiker name already exists");
                    }
                }
                else{
                    dispatch(isFetching());
                    console.log("after isFetching");
                    fetch(url + 'users/', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: hikerName,
                            MAC: "MASI123456700"
                        }),
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);
                            dispatch(createUser(responseJson));
                            if(responseJson._id){
                                Actions.scan({hikerName: hikerName, userId:responseJson._id});
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }

            })
            .catch((error) => {
                console.error(error);
            });

    }
}
export function create_user (userName){
    return function(dispatch) {


    }
}

export function fetch_admin_login(name, password){
    return function(dispatch) {

        dispatch(isFetching());
        fetch(url+'users/login/' + name + '/' + password)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(resultLogin(responseJson));
                if(responseJson){
                    Actions.adminMain({name:name});
                }
                else{
                    console.log("LE PASSWORD EST WROOOONG");
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }
}

function isFetching(){
    return {
        type: LOADING,
        loading: true
    }
}

function userFetched(response, res){
    return {
        type: LOGGED_IN,
        userId: response._id,
        name: response.name,
        user_type: response.type,
        pass: response.pass,
        loading: false,
        res:res
    }
}
function resultLogin(response) {
    return {
        type: ADMIN_LOGIN,
        res: response,
        loading: false
    }
}
function createUser(res) {
    return {
        type: NEW_USER,
        res: res,
        loading: false
    }
}