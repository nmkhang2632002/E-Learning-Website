import axios from '../../utils/axios-custom';

export const GetAllCourses = () => {
    return axios.get('Course/all-course');
}