import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard'
import Login from '@/components/login'
import Start from '@/components/start'
import Feedback from '@/components/feedback'
import Error from '@/components/error'
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
      path: '/error',
      name: 'Error',
      component: Error
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (destination, source, next) => {
        console.log(next);
        console.warn(">", source.name, destination.name);
        if(destination.name === "Dashboard" && source.name === "Feedback"){
          next(false);
        }
        if(destination.name === "Dashboard" && source.name === "Login"){
          if(store.state.user.token){
            next();
          }
        }
      }
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback,
      beforeEnter: (destination, source, next) => {
        if(destination.name === "Feedback" && (source.name === "Login" || source.name === "Dashboard")){
          if(store.state.user.token){
            next();
          }
        }
      }
    }
  ]
});

export default router;
