// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/font/iconfont.css'
import Layout from './views/layout'
import {
  Button,
  Select,
  Input,
  Table,
  Alert,
  Checkbox,
  Form,
  FormItem,
  Message,
  Radio,
  RadioGroup,
  Upload,
  DatePicker,
  TimePicker,
  Dialog
} from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Input)
Vue.use(Table)
Vue.use(Alert)
Vue.use(Message)
Vue.use(Checkbox)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Upload)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Dialog)

Vue.prototype.$message = Message
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Layout },
  template: '<Layout/>'
})
