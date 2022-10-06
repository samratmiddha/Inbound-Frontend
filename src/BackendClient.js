import axios from "axios";


const BackendClient = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
    // headers: {"Access-Control-Allow-Origin": "*"}
})

export default BackendClient