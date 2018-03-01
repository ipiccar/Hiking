export const DATA_AVAILABLE = 'DATA_AVAILABLE';

const myRequest = new Request('http://10.113.101.58:8000/users', {method: 'GET'});

export function getData(){
    return (dispatch) => {
        fetch(myRequest)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(response => {
                console.log("response : ", response);
                dispatch({
                    type: DATA_AVAILABLE, data: response

                })
                console.debug(response);
                // ...
            }).catch(error => {
            console.error(error);
        });

        //Make API Call
        //For this example, I will be using the sample data in the json file
        //delay the retrieval [Sample reasons only]

    }
}
