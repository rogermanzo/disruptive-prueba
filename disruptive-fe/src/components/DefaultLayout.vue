<!--<template>
    <v-container>
      <v-card>
        <v-card-title>
          <v-row justify="space-between" align="center">
            
            <v-col class="text-right">
              <p>¡Hola, {{ userName }}! ({{ userRole }})</p>
            </v-col>
            <v-col>
              <v-btn @click="logout" color="red">Cerrar sesión</v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <router-view />
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userName: 'Nombre Usuario',
        userRole: 'Rol Usuario',
      };
    },
    methods: {
      logout() {
        console.log('Cerrar sesión');
      },
    },
  };
  </script>
  
  <style>
  .layout-container {
    margin: 16px;
  }
  </style>-->
  <!-- src/components/DefaultLayout.vue -->
<template>
    <v-app>
      <v-app-bar app>
        <v-toolbar-title>Mi Aplicación - Bienvenido!, (Usuario) (rol) </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="goHome">Inicio</v-btn>
        <v-btn color="red" @click="logout">Cerrar sesión</v-btn>
      </v-app-bar>
  
      <v-navigation-drawer app>
        <v-list>
          <v-list-item v-for="item in menuItems" :key="item.title" @click="goTo(item.route)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <v-container>
          <slot></slot>
        </v-container>
      </v-main>
  
      <v-footer app>
        <v-container>
          <span>© 2024 - Mi Aplicación</span>
        </v-container>
      </v-footer>
    </v-app>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  
  export default {
    setup() {
      const router = useRouter();
      const userName = ref('Usuario'); // Cambia esto al nombre del usuario real
      const userRole = ref('Administrador'); // Cambia esto al rol del usuario real
      const menuItems = [
        { title: 'una pagina', route: '/una-pagina' },
        { title: 'otra Página', route: '/otra-pagina' },
      ];
  
      const goTo = (route) => {
        router.push(route);
      };
  
      const goHome = () => {
        router.push('/listar');
      };
  
      const logout = () => {
        // Lógica para cerrar sesión
        alert('Sesión cerrada'); // Reemplaza esto con la lógica real
        router.push('/login'); // Redirige a la página de inicio de sesión
      };
  
      return { userName, userRole, menuItems, goTo, goHome, logout };
    },
  };
  </script>
  
  <style scoped>
   .layout-container {
    margin: 16px;
  }
  .red {
  background-color:red;
  /* Fondo claro */
}
  </style>
  