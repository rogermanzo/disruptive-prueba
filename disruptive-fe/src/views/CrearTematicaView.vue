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

export default {
  data() {
    return {
      nombreTematica: '',
      permisos: [],
      tematicas: [],
      permisosOptions: ['Leer', 'Escribir', 'Eliminar'],
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
    agregarTematica() {
      if (this.nombreTematica && this.permisos.length) {
        this.tematicas.push({
          id: Date.now(),
          nombre: this.nombreTematica,
          permisos: this.permisos,
        });
        this.nombreTematica = '';
        this.permisos = [];
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados aquí */
</style>
