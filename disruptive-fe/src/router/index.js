import { createRouter, createWebHistory } from 'vue-router';
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
    component: DefaultLayout,
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
    component: subir,
  },
  {
    path: '/ver/:contentId',
    name: 'ver',
    component: ver,
  },
  {
    path: '/crear-categoria',
    name: 'crear-categoria',
    component: CrearCategoria,
  },
  {
    path: '/crear-tematica',
    name: 'crear-tematica',
    component: CrearTematica,
  },
  {
    path: '/about',
    name: 'about',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guardia de navegación
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('x-access-token'); // Verifica si hay un x-access-token

  if (to.path !== '/login' && to.path !== '/register' && !isAuthenticated) {
    next('/login'); // Redirige a /login si no está autenticado
  } else {
    next(); // Permite la navegación
  }
});

export default router;
