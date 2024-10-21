import axios from "../../utils/axios-custom"

export const DoLogin = (username, password) => {
    return axios.post('Authorize/Login',
        {
            username: username,
            password: password,
        })
}