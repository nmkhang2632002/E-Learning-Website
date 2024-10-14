import axios from "../../utils/axios-custom"

export const DoLogin = (username, password) => {
    return axios.post('auth/login',
        {
            username: username,
            password: password,
        })
}