import axios from 'axios'

const BASE_URL = 'http://localhost:12847/api/'
const ENDPOINTS = {
  CUSTOMER: 'Customer',
  FOODITEM: 'FoodItem',
  ORDER: 'Order',
}
// console.log('api ngoai')
const createdAPIEndpoint = (endpoint) => {
  // console.log('api')
  let url = BASE_URL + endpoint + '/'
  return {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    create: (newRecord) => axios.post(url, newRecord),
    update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  }
}
// console.log(createdAPIEndpoint())
export { createdAPIEndpoint, ENDPOINTS }
