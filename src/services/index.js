import axios from 'axios'
import activityService from './activity.service'
import companyService from './company.service'
import customerService from './customer.service'
import exhibitionService from './exhibition.service'
import exhibitorService from './exhibitor.service'
import helpService from './help.service'
import likeService from './like.service'
import localstorageService from './localstorage.service'
import lookerService from './looker.service'
import orderService from './order.service'
import phoneService from './phone.service'
import productService from './product.service'
import uploadService from './upload.service'
import userService from './user.service'
import wechatService from './wechat.service'

axios.defaults.baseURL = 'http://huizhanren.xiaovbao.cn'

export {
  activityService,
  companyService,
  customerService,
  exhibitionService,
  exhibitorService,
  helpService,
  likeService,
  localstorageService,
  lookerService,
  orderService,
  phoneService,
  productService,
  uploadService,
  userService,
  wechatService
}
