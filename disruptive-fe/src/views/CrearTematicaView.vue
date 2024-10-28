<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h2>Crear Temáticas</h2>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field variant="outlined" compact v-model="nombreTematica" label="Nombre de Temática" required>
              </v-text-field>
            </v-col>
            <v-col>
              <v-select variant="outlined" compact v-model="permisos" :items="permisosOptions" label="Permisos" multiple required>
              </v-select>
            </v-col>
          </v-row>
          <v-btn @click="agregarTematica" color="primary">Agregar Temática</v-btn>
        </v-form>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="tematica in tematicas" :key="tematica.id">
              <v-list-item-content>
                <div>{{ tematica.nombre }}</div>
                <div>{{ tematica.permisos.join(', ') }}</div>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      nombreTematica: '',
      permisos: [],
      tematicas: [],
      permisosOptions: [],
    };
  },
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.push('/subir'); 
    };

    return { goBack };
  },
  methods: {
    async obtenerPermisos() { 
      this.permisosOptions = ["videos", "imagenes", "documentos"];
/*
      const token = localStorage.getItem('x-access-token'); // Obtener el token del localStorage
      try {
        const response = await axios.get('http://localhost:5000/categories', {
          headers: {
            'x-access-token': token, // Añadir el token en las cabeceras
          },
        });
        // Extraer tipos de permisos
        this.permisosOptions = response.data.map(category => category.type); // [" .txt", ".mp4", ".png"]
      } catch (error) {
        console.error('Error obteniendo los permisos:', error);
      }*/
    },
    async agregarTematica() {
      if (this.nombreTematica && this.permisos.length) {
        try {
          const token = localStorage.getItem('x-access-token'); // Obtener el token del localStorage
          const response = await axios.post('http://localhost:5000/thematic', {
            name: this.nombreTematica,
            permission: this.permisos, 
          }, {
            headers: {
              'x-access-token': token, 
            },
          });

          console.log(response.data.message); 
          this.$emit('tematica-agregada'); 
          this.$emit('cerrarDialogoTematica'); 
          this.tematicas.push({
            id: Date.now(),
            nombre: this.nombreTematica,
            permisos: this.permisos,
          });
          this.nombreTematica = '';
          this.permisos = [];
        } catch (error) {
          console.error('Error al crear la temática:', error);
        }
      }
    },
  },
  mounted() {
    this.obtenerPermisos(); 
  },
};
</script>


<style scoped>
</style>
