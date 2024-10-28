<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h2>Crear Categorías</h2>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field variant="outlined" compact v-model="nuevaCategoria" label="Tipo de Categoría" required></v-text-field>
          <v-btn @click="agregarCategoria" color="primary">Agregar Categoría</v-btn>
        </v-form>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="categoria in categorias" :key="categoria.id">
              <v-list-item-content>{{ categoria.tipo }}</v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      nuevaCategoria: '',
      categorias: [],
    };
  },
  setup() {
    const router = useRouter();
    
    const goBack = () => {
      router.push('/subir'); // Cambia esto a la ruta de tu lista de contenidos
    };

    return { goBack };
  },
  methods: {
    
    agregarCategoria() {
      if (this.nuevaCategoria) {
        this.categorias.push({ id: Date.now(), tipo: this.nuevaCategoria });
        this.nuevaCategoria = '';
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados aquí */
</style>
