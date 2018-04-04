import axios from 'axios'

//  Axios Global Configration

let http = axios.create({
  baseURL: 'http://localhost:3000'
})

http.interceptors.request.use((config) => {
  config.headers['authorization'] = 'Bearer ' + localStorage.getItem('token')
  config.headers['post'] = 'application/x-www-form-urlencoded'
  return config
}, function (error) {
  return Promise.reject(error)
})

export default http
