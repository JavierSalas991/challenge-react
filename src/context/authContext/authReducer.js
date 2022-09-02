import getCookieValue from "../../helpers/getCookieValue";
import axiosToken from '../../config/axiosToken.js';
import {
    AUTH_LOADING,
    LOGIN_FAIL,
    SET_USER,
    SIGNUP_FAIL,
    USER_LOGIN,
    USER_LOGOUT,
    USER_SIGNUP
} from "../../types/authTypes";

const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case USER_LOGIN:
            document.cookie = `auth_token=${action.payload.auth_token}`;
            document.cookie = `user_id=${action.payload.user_id}`;
            axiosToken(action.payload.auth_token)
            return {
                ...state,
                auth_token: action.payload.auth_token,
                user_id: action.payload.user_id,
                loading: false
            };
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            return {
                ...state,
                loading: false
            }
        case USER_SIGNUP:
            return {
                ...state,
                loading: false
            };
        case USER_LOGOUT:
            axiosToken(null)
            document.cookie = "auth_token=0; expires=Thu, 18 Dec 2000 12:00:00 UTC";
            document.cookie = "user_id=0; expires=Thu, 18 Dec 2000 12:00:00 UTC";
            return {
                ...state,
                auth_token: null,
                user_id: null
            }
        case SET_USER:
            const token = getCookieValue('auth_token')
            axiosToken(token)
            return {
                ...state,
                auth_token: getCookieValue('auth_token'),
                user_id: getCookieValue('user_id')
            };
        default:
            return state;
    }
}

export default authReducer;