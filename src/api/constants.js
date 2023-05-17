import environment from '../environments/environment';

const ENDPOINTS = {
    LOGIN: `${environment.backendUrl}/v1/login`,
    WHO_AM_I: `${environment.backendUrl}/v1/who-am-i`,
    LISTINGS: `${environment.backendUrl}/v1/listings`,
    GENERATE: `${environment.backendUrl}/v1/generate`,
    BASE: `${environment.backendUrl}/v1`,
    USERS: `${environment.backendUrl}/v1/users`,
    OFFERS: `${environment.backendUrl}/v1/offers`,
    USERS_GLOBAL: `${environment.backendUrl}/v1/users-global`,
    REGISTER: `${environment.backendUrl}/v1/register`,
    STATISTICS: `${environment.backendUrl}/v1/statistics`
};

export {ENDPOINTS}