import {
    LOGGED_IN,
    ADMIN_LOGIN,
    LOADING,
    url
} from "./constants"

const myRequest = new Request(url+'/game', {method: 'GET'});

export function fetch_login (hikerName){
    return function(dispatch) {

        dispatch(isFetching());

        fetch(url + '/users/name/' + hikerName)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(userFetched(responseJson));
            })
            .catch((error) => {
                console.error(error);
            });

    }
}

export function fetch_admin_login (name, password){
    return function(dispatch) {

        dispatch(isFetching());

        fetch(url+'/users/login/' + name + '/' + password)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(resultLogin(responseJson));
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
function resultLogin(response){
    return {
        type: ADMIN_LOGIN,
        res: response,
        loading: false
    }