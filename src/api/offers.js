import {ENDPOINTS} from "./constants";
import {performRequest} from './rest-call'

function createOffer(id, offer, onSuccess, onError) {
    let request = new Request(ENDPOINTS.LISTINGS + "/" + id + "/offers", {
        method: 'POST',
        body: JSON.stringify({...offer})
    });
    performRequest(request, onSuccess, onError)
}

function enroll(id, onSuccess, onError) {
    let request = new Request(ENDPOINTS.LISTINGS + "/" + id + "/enroll", {
        method: 'POST',
    });
    performRequest(request, onSuccess, onError)
}

function quit(id, onSuccess, onError) {
    let request = new Request(ENDPOINTS.LISTINGS + "/" + id + "/enroll", {
        method: 'DELETE',
    });
    performRequest(request, onSuccess, onError)
}
export {createOffer, enroll, quit};
