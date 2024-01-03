import axios from 'axios'
import { toast } from 'react-toastify'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response && error.response.status === 429) {
      toast.error(`You've exceeded the Rate Limit. Please try after sometime`)
    }
    return Promise.reject(error)
  },
)

export default instance
