import environment from '../environments/environment';

const ENDPOINTS = {
    LOGIN: `${environment.backendUrl}/v1/login`,
    WHO_AM_I: `${environment.backendUrl}/v1/who-am-i`,
    LISTINGS: `${environment.backendUrl}/v1/listings`,
    USERS: `${environment.backendUrl}/v1/users`
};

export {ENDPOINTS}