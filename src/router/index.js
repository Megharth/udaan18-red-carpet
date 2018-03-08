import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard'
import Login from '@/components/login'
import Start from '@/components/start'
import Feedback from '@/components/feedback'
import { store } from '../store';

Vue.use(store);
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (Login, Dashboard, next) => {
        if(true)
          next();
      }
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    }
  ]
});

export default router;
