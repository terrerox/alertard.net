import { createRouter, createWebHistory } from 'vue-router'
import BlogPost from '../views/BlogPost.vue'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
const routes = [
  {
    path: '/:slug',
    name: 'BlogPost',
    component: BlogPost,
    props: true
  },
  {
    path: '/categoria/:category',
    name: 'Category',
    component: Category,
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