import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    // import whats inside the environment variable file
    baseURL : import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            config.headers.Authorization = `Bearer ${token}` //this is how you pass jwt token
        }
        return config
    },
    // another function error
    (error)=>{
        return Promise.reject(error)
    }
)
export default api