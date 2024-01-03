import axiosInstance from '../utils/axiosInstance'

export const getCryptos = () => {
  return axiosInstance.get('/cryptos?pageSize=100')
}

export const getCurrencies = () => {
  return axiosInstance.get('/currency')
}

export const convertCurrency = (requestData) => {
  return axiosInstance.post('/convert', requestData)
}
