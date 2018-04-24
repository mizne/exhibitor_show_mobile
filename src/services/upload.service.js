import axios from 'axios'

class UploadService {
  uploadImage(file, fileName) {
    const params = new FormData()
    params.append('file', file, fileName)
    return axios.post('/api/upload/images', params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default new UploadService()
