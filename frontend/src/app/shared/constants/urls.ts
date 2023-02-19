const BASE_URL = 'http://localhost:5000';



export const USER_LOGIN_URL = BASE_URL + '/api/users/login';

export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const UPLOAD_ITEM_URL = BASE_URL + '/api/items/upload';

export const POST_ITEM_URL = BASE_URL + '/api/items/post';

export const GET_FOUND_ITEM_URL = BASE_URL + '/api/items/found';

export const GET_LOST_ITEM_URL = BASE_URL + '/api/items/lost';

export const GET_FOUND_ITEM_SEARCH_URL = GET_FOUND_ITEM_URL + '/search/';

export const GET_LOST_ITEM_SEARCH_URL = GET_LOST_ITEM_URL + '/search/';
