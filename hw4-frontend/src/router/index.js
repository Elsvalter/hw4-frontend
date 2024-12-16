import { createRouter, createWebHistory } from 'vue-router';
import AllPosts from '../views/AllPosts.vue';
import LoginPage from '../views/LoginPage.vue';
import SignupPage from '../views/SignupPage.vue';
import AddPost from '../views/AddPost.vue';
import ContactPage from '../views/ContactPage.vue';

const routes = [
  { path: '/', name: 'Home', component: LoginPage },
  { path: '/signup', name: 'Signup', component: SignupPage },
  { path: '/allposts', name: 'AllPosts', component: AllPosts },
  { path: '/addpost', name: 'AddPost', component: AddPost },
  { path: '/contact', name: 'Contact', component: ContactPage },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
