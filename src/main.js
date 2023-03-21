import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './main.css';

// Create the app by mounting the root App.vue component using the createApp() function:
const app = createApp(App)
// Configure the router (needed for routing app if there was more than a single page/view):
app.use(router)
// Mount the app:
app.mount('#app')