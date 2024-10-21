import axios from '../../utils/axios-custom';


export const GetAllUsers = () => {
    return axios.get('User');
}