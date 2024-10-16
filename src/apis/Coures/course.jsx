import axios from '../../utils/axios-custom';

export const GetCourses = () => {
    return axios.get('/courses');
}