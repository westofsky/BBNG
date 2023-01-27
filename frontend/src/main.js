import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import axios from 'axios'
import store from './vuex/store'
import { ref } from 'vue'

const app = createApp(App)

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$store = store;
app.config.globalProperties.$socket = ref(null);
app.use(store);
app.use(vue3GoogleLogin, {
    clientId : '1012169882589-nav8riddt3ni6ubo73j7g1u4vr5hil9a.apps.googleusercontent.com'
})

app.use(router).mount('#app')