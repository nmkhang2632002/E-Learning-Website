import axios from '../../utils/axios-custom';


export const GetAllUsers = () => {
    return axios.get('User');
}

export const DoAddNewUser = (fullName, phoneNumber, email, password) => {
    return axios.post('User', {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        password: password
    })
}