import axios from 'axios'

const service = axios.create({
    timeout: 5000,
})

service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default service
