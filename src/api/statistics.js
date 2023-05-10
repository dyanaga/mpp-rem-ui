import {ENDPOINTS} from "./constants";
import {performRequest} from './rest-call'

function listingsPerNeighbourhood(onSuccess, onError) {
    let request = new Request(`${ENDPOINTS.STATISTICS}/listings-per-neighbourhood`, {
        method: 'GET',
    });
    performRequest(request, onSuccess, onError)
}

function listingsByOffers(onSuccess, onError) {
    let request = new Request(`${ENDPOINTS.STATISTICS}/listings-by-offers`, {
        method: 'GET',
    });
    performRequest(request, onSuccess, onError)
}


export {
    listingsPerNeighbourhood, listingsByOffers
};