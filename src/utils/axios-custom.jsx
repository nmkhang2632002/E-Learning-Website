import axios from 'axios';

// const baseURL = process.env.BE_API_URL;
const baseURL = "https://localhost:7222/api/";

// Tạo instance axios với baseURL và header chứa token
const instance = axios.create({
    baseURL: baseURL,
    // withCredentials: true,
});

instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }

// Thêm một bộ đón chặn request
// axios.interceptors.request.use(function (config) {
//     // Làm gì đó trước khi request dược gửi đi
//     return config;
// }, function (error) {
//     // Làm gì đó với lỗi request
//     return Promise.reject(error);
// });

// // Thêm một bộ đón chặn response
// axios.interceptors.response.use(function (response) {
//     // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
//     // Làm gì đó với dữ liệu response
//     return response;
// }, function (error) {
//     // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
//     // Làm gì đó với lỗi response
//     return Promise.reject(error);
// });


export default instance;
