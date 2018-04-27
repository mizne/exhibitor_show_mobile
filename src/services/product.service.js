import axios from 'axios'
import local from './localstorage.service'

class ProductService {
  getProductList(exhibitorID) {
    return axios
      .post(`/v2/data/queryList/Product`, {
        params: {
          condition: {
            ExhibitorId: exhibitorID
          }
        }
      })
      .then(res => {
        if (res.data.resCode === 0) {
          return res.data.result.map(e => ({
            Id: e.RecordId,
            Name: e.ProductName,
            Banner: e.PicList.length > 0 ? e.PicList[0].PicPath : ''
          }))
        }
        console.warn(
          `fetch product list error, code: ${res.data.resCode}, message: ${
            res.data.resMsg
          }`
        )
        return []
      })
  }

  getProductInfo(id) {
    return axios.get(`/api/product/:${id}`)
  }
}

export default new ProductService()
