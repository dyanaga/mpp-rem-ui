import {ENDPOINTS} from "./constants";

function login(username, password, onSuccess, onError) {
    let request = new Request(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            loginId: username,
            password: password,
        })
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

export {login};
