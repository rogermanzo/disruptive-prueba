<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        Mi Aplicación - Bienvenido!
      </v-toolbar-title>
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
import { defineComponent, markRaw } from 'vue';
import { useRouter } from 'vue-router';

export default markRaw(defineComponent({
  setup() {
    const router = useRouter();
    const menuItems = [
      { title: 'Eliminar tematica', route: '/una-pagina' },
      { title: 'Eliminar categoria', route: '/otra-pagina' },
      { title: 'Eliminar contenido', route: '/otra-pagina' },
      { title: 'Categoria eliminadas', route: '/otra-pagina' },
      { title: 'Actualizar contenido', route: '/otra-pagina' },

    ];

    const goTo = (route) => {
      router.push(route);
    };

    const goHome = () => {
      router.push('/listar');
    };

    const logout = () => {
      localStorage.removeItem('x-access-token');
      router.push('/login');
    };

    return { menuItems, goTo, goHome, logout };
  },
}));
</script>

<style scoped>
.layout-container {
  margin: 16px;
}
.red {
  background-color: red;
}
</style>
