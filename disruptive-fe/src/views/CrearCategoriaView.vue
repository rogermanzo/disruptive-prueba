<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h2>Crear Categorías</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="agregarCategoria">
          <v-text-field 
            variant="outlined" 
            compact 
            v-model="nuevaCategoria" 
            label="Tipo de Categoría" 
            required
          ></v-text-field>
          <v-btn type="submit" color="primary">Agregar Categoría</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nuevaCategoria: '',
    };
  },
  methods: {
    async agregarCategoria() {
      try {
        const token = localStorage.getItem('x-access-token'); 
        const response = await axios.post('http://localhost:5000/category', {
          type: this.nuevaCategoria,
        }, {
          headers: {
            'x-access-token': token, 
          },
        });/* Aquí puedes agregar estilos específicos para este componente */
        
        console.log(response.data.message); 
        this.nuevaCategoria = ''; 
        this.$emit('categoria-agregada'); 
        this.$emit('cerrar-dialogo'); 
      } catch (error) {
        if (error.response) {
          console.error(error.response.data.message || 'Error al crear la categoría');
        } else {
          console.error(error);
        } 
      }
    },
  },
};
</script>

<style scoped>

</style>
