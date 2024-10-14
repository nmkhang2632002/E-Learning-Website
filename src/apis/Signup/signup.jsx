import axios from "../../utils/axios-custom"

export const DoSignUp = (username, email, password) => {
    return axios.post('auth/register',
        {
            username: username,
            email: email,
            password: password,
        })
}