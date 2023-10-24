import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Polygon from './components/Polygon.vue'
import Map from './components/Map.vue'
import App from './App.vue'
import './style.css'

const routes = [
    { path: '/', redirect: '/map' },
    { path: '/map', component: Map },
    { path: '/polygon', component: Polygon },
]
  
// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

createApp(App).use(router).mount('#app')
