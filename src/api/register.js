import {ENDPOINTS} from "./constants";

function register(content, onSuccess, onError) {
    let request = new Request(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
    });
    fetch(request).then(response => {
        if (response.ok) {
            response.json()
                .then(json => onSuccess(json, response.status));
        } else {
            onError(response.status);
        }
    })
        .catch(function (err) {
            console.log(`Perform request catch of ${err}`);
            onError(503)
        });
}

function confirmRegister(userId, onSuccess, onError) {
    let request = new Request(ENDPOINTS.REGISTER + "/confirm/" + userId, {
        method: 'POST'
    });
    fetch(request).then(response => {
        if (response.ok) {
            response.json()
                .then(json => onSuccess(json, response.status));
        } else {
            onError(response.status);
        }
    })
        .catch(function (err) {
            console.log(`Perform request catch of ${err}`);
            onError(503)
        });
}

export {register, confirmRegister};
