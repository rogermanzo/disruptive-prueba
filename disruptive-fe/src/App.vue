<template>
  <v-app>
    <v-main>
      <component :is="layout">
        <router-view />
      </component>
    </v-main>
  </v-app>
</template>

<script>
import DefaultLayout from './components/DefaultLayout.vue';

export default {
  name: 'App',

  data() {
    return {
      layout: 'div', // Valor por defecto (sin layout)
    };
  },

  created() {
    this.setLayout();
  },

  watch: {
    '$route'() {
      this.setLayout();
    },
  },

  methods: {
    setLayout() {
      const nonLayoutRoutes = ['login', 'register'];
      const currentRoute = this.$route.name;

      // Determina si usar el layout por defecto o no
      this.layout = nonLayoutRoutes.includes(currentRoute) ? 'div' : DefaultLayout;
    },
  },
};
</script>

<style>
.app-container {
  margin: 16px;
}
</style>
