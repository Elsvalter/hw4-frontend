import { createRouter, createWebHistory } from 'vue-router';
import AllPosts from '../views/AllPosts.vue';
import LoginPage from '../views/LoginPage.vue';
import SignupPage from '../views/SignupPage.vue';
import AddPost from '../views/AddPost.vue';
import ContactPage from '../views/ContactPage.vue';
import APost from '../views/APost.vue';

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/signup', name: 'Signup', component: SignupPage },
  { path: '/allposts', name: 'AllPosts', component: AllPosts },
  { path: '/addpost', name: 'AddPost', component: AddPost },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/api/apost/:id', 
    name: 'APost', 
    component: APost}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
