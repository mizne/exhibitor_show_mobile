import axios from 'axios'
import local from './localstorage.service'

class ProductService {
  getProductList() {
    return axios.get(`/api/products`, {
      headers: {
        Authorization: local.getToken()
      }
    })
  }

  getProductInfo(id) {
    return axios.get(`/api/product/:${id}`)
  }
}

export default new ProductService()
