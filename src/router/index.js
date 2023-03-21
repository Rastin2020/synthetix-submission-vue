import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/* This is where we define our routes in vue-router. We configure the passed-in object below to render a 
vue component (.vue file) based on the url. In this app we just have the one homepage, which we use to
render the HomeVue.vue component: */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router