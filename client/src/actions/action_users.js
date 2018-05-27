import {
    LOGGED_IN,
    ADMIN_LOGIN,
    LOADING,
    url
} from "./constants"
import {Actions} from "react-native-router-flux";

const myRequest = new Request(url+'/game', {method: 'GET'});

export function fetch_login (hikerName){
    return function(dispatch) {

        dispatch(isFetching());
        console.log("Trying to acces : " + url + 'users/name/' + hikerName);
        fetch(url + 'users/name/' + hikerName)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Response received : " + responseJson);
                dispatch(userFetched(responseJson));
                if(responseJson.type!=undefined){
                    if(responseJson.type.toUpperCase()=="ADMIN"){
                        Actions.login({hikerName: hikerName});
                    }
                    else{
                        console.log("This hiker name already exists");
                    }
                }
                else{
                    Actions.scan({hikerName: hikerName});
                }
            })
            .catch((error) => {
                console.error(error);
            });

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

function userFetched(response){
    return {
        type: LOGGED_IN,
        userId: response._id,
        name: response.name,
        user_type: response.type,
        pass: response.pass,
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