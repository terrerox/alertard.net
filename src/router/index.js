import { createRouter, createWebHistory } from 'vue-router'
import BlogPost from '../views/BlogPost.vue'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/:slug',
    name: 'BlogPost',
    component: BlogPost,
    props: true
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router