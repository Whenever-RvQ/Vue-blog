import Vue from 'vue'
import Element from 'element-ui'

import {
  Button,
  Container,
  Header,
  Aside,
  Footer,
  Main,
  Message,
  Alert,
  Form,
  FormItem,
  Card,
  Input,
  Row,
  Col,
  Image,
  Menu,
  MenuItem,
  Dialog,
  Radio,
} from 'element-ui'

Vue.use(Element, { size: 'small', zIndex: 3000 });

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Alert)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Card)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Image)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Dialog)
Vue.use(Radio)

Vue.prototype.$message = Message
// Vue.prototype.$alert = Alert