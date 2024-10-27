import axios from '../../utils/axios-custom';

export const GetAllCourses = () => {
    return axios.get('Course/all-course');
}

export const GetUserCourseById = (id) => {
    return axios.get(`UserCourse/get-UserCourses-byUID?uid=${id}`)
}

export const GetCourseById = (id) => {
    return axios.get(`Course/get-course-by-id?id=${id}`)
}