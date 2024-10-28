import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/LoginView.vue';
import register from '../views/RegisterView.vue';
import Listar from '../views/ListarView.vue';
import subir from '../views/SubirView.vue';
import ver from '../views/VerView.vue';
import CrearCategoria from '../views/CrearCategoriaView.vue';
import CrearTematica from '../views/CrearTematicaView.vue';
import DefaultLayout from '../components/DefaultLayout.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component:'DefaultLayout',  
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/listar',
    name: 'Listar',
    component: Listar,

  },
  {
    path: '/subir',
    name: 'subir',
    component: subir,CrearCategoria,CrearTematica,
  },
  {
    path: '/ver',
    name: 'ver',
    component: ver,

  },
  {
    path: '/about',
    name: 'about',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
