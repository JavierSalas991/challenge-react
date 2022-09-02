import React, { useReducer } from 'react';
import AuthContext from './AuthContext.js';
import authReducer from './authReducer';
import axiosClient from '../../config/axiosClient.js'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import {
    AUTH_LOADING,
    LOGIN_FAIL,
    SET_USER,
    SIGNUP_FAIL,
    USER_LOGIN,
    USER_LOGOUT,
    USER_SIGNUP
} from '../../types/authTypes'


const AuthState = (props) => {
    const navigate = useNavigate();
    const initialState = {
        currentUser: null,
        auth_token: null,
        user_id: null,
        user_name: 'Natalia',
        loading: false,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const logIn = async userLog => {
        try {
            dispatch({
                type: AUTH_LOADING
            })
            const apiRequest = await axiosClient.post(`/api/Autheticate/login`, userLog);
            console.log(apiRequest.data)
            dispatch({
                type: USER_LOGIN,
                payload: apiRequest.data.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_FAIL
            })
            swal("Error!", "No fue posible conectar con el servidor, intentalo de nuevo..");
        }
    }
    
    const signUp = async newUser => {
        try {
            dispatch({
                type: AUTH_LOADING
            })
            // const apiRequest = await axiosClient.post(`/auth/signup`, newUser);
            dispatch({
                type: USER_SIGNUP
            });
            navigate('/');
            swal("Datos enviados!", "El administrador debe aprobar tu cuenta para que puedas empezar a usarla.");
        } catch (error) {
            console.log(error);
            dispatch({
                type: SIGNUP_FAIL
            })
            swal("Error!", "No fue posible conectar con el servidor, intentalo de nuevo..");
        }
    }

    const logOut = async ()=> {
        try {
            // const apiRequest = await axiosClient.post(`/auth/logout`);
            // console.log(apiRequest);
            dispatch({
                type: USER_LOGOUT
            })            
        } catch (error) {
            console.log(error)
        }
    }

    const setCurrentUser = () => {
        dispatch({
            type: SET_USER
        })
    }

    return (
        <AuthContext.Provider
            value={{
                auth_token: state.auth_token,
                user_id: state.user_id,
                user_name: state.user_name,
                loading: state.loading,
                logOut,
                logIn,
                signUp,
                setCurrentUser
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;