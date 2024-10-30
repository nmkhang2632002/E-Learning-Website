import axios from '../../utils/axios-custom';

export const GetUserPaypalById = (id) => {
    return axios.get(`Payment/all-Payment-byUID?uid=${id}`)
}