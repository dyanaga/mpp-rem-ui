import {ENDPOINTS} from "./constants";
import {performVoidRequest} from './rest-call'

function millions(onSuccess, onError) {
    let request = new Request(ENDPOINTS.GENERATE + "/millions", {
        method: 'POST',
    });
    performVoidRequest(request, onSuccess, onError)
}

function batch(onSuccess, onError) {
    let request = new Request(ENDPOINTS.GENERATE + "/batch", {
        method: 'POST',
    });
    performVoidRequest(request, onSuccess, onError)
}

function cleanup(onSuccess, onError) {
    let request = new Request(ENDPOINTS.GENERATE + "/cleanup", {
        method: 'POST',
    });
    performVoidRequest(request, onSuccess, onError)
}

function pagePreference(preference, onSuccess, onError) {
    let request = new Request(ENDPOINTS.USERS_GLOBAL + `/page-size/${preference}`, {
        method: 'POST',
    });
    performVoidRequest(request, onSuccess, onError)
}

export {millions, batch, cleanup, pagePreference};
