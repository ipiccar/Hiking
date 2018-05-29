import {
    LOGGED_IN,
    ADMIN_LOGIN,
    LOADING,
    NEW_USER,
    ALREADY_EXISTS,
    url
} from "./constants"
import {Actions} from "react-native-router-flux";

export function fetch_login (hikerName){
    return function(dispatch) {

        dispatch(isFetching());
        console.log(hikerName);
        fetch(url + 'users/name/' + hikerName)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Response received : ");
                console.log(responseJson);

                if(responseJson.type!=undefined){
                  //User exists
                    if(responseJson.type.toUpperCase()=="ADMIN"){
                      //User is ADMIN
                        console.log("Admin");
                        dispatch(userFetched(responseJson));
                        Actions.login();
                    }else if (responseJson.type.toUpperCase()=="PLAYER"){
                      //User is PLAYER and exists
                        dispatch(userExists(responseJson));
                    }
                } else {
                  //User don't exists
                    console.log("after isFetching");
                    fetch(url + 'users/', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: hikerName,
                            MAC: "MASI123456700",
                            type: "player"
                        }),
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);
                            if(responseJson._id){
                                dispatch(userFetched(responseJson));
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

//Dispatchers

function isFetching(){
    return {
        type: LOADING,
        loading: true
    }
}

function userExists(response){
  return {
    type: ALREADY_EXISTS,
    name: response.name,
    userType: response.type,
    alreadyExists: true,
    loading: false
  }
}

function userFetched(response){
    return {
        type: LOGGED_IN,
        userId: response._id,
        name: response.name,
        userType: response.type,
        mac: response.MAC,
        loading: false
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
