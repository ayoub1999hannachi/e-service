import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginForm from '../components/LoginForm.vue';
import CreateAccount from '../components/CreateAccount.vue';
import EmployeeCrud from '../components/EmployeeCrud';
import Dashboard from '../components/dashboard.vue';
import profile from '../components/profile.vue';
import AddSpec from '../components/addspec.vue';
import UserProfile from '../components/UserProfile.vue';
import UsersWithSpecialite from '../components/UserWithSpecialite.vue';
import SignupClient from '../components/SignupClient.vue';
import AdminPanel from '../components/AdminPanel.vue';
import UserManagement from '../components/UserManagement.vue';
import Statistics from '../components/Statistics.vue';
import Settings from '../components/Settings.vue';
import Addspec from '../components/addspec.vue';
import message from '../components/message.vue';
const routes = [
  {
    path: '/admin',
    name :AdminPanel,
    component: AdminPanel,
    children: [
      { path: 'users', component: UserManagement },
      { path: 'stats', component: Statistics },
      { path: 'settings', component: Settings },
      { path: 'addspec', component:Addspec},
    ],
    
  }, 
  {
    path: '/message', 
    name: 'message',
    component: message,
  },
  {
    path: '/Signupc', 
    name: 'SignupClient',
    component: SignupClient,
  },
  {
    path: '/profile',
    name: 'profile', 
    component: profile,
    
  },
  {
    path: '/user/:id',
    name: 'UserProfile', 
    component: UserProfile,
    props: true,
  },
  {
    path: '/specialite/:specialiteId',
    name: 'UsersWithSpecialite',
    component: UsersWithSpecialite,
    props: true,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm,
    meta: { requiresGuest: true }, 
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: CreateAccount,
    meta: { requiresGuest: true },
  },
  {
    path: '/crud',
    name: 'EmployeeCrud',
    component: EmployeeCrud,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/:userId',
    name: 'dashboard',
    component: Dashboard,
  
  },
  {
    path: '/addspec',
    name: 'addspec',
    component: AddSpec,
    
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});
export default router;
