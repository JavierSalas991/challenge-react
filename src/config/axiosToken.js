import axiosClient from "./axiosClient.js";

const axiosToken = auth_token => {
    if (auth_token) {
        axiosClient.defaults.headers.common['Authorization'] = auth_token
    } else {
        delete axiosClient.defaults.headers.common['Authorization'];
    }
}

export default axiosToken;