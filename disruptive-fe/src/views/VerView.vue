<template>
  <v-container v-if="!isLoading">
    <v-card>
      <v-card-title>
        <h2>Detalles del Contenido</h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <strong>ID:</strong> {{ content._id || 'No disponible' }}
          </v-col>
          <v-col>
            <strong>Autor:</strong> {{ content.author || 'No disponible' }}
          </v-col>
          <v-col>
            <strong>Categoría:</strong> {{ content.category || 'No disponible' }}
          </v-col>
          <v-col>
            <strong>Temática:</strong> {{ content.thematic || 'No disponible' }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <strong>Archivos:</strong>
            <ul>
              <li v-for="file in content.files" :key="file._id">
                {{ file.filename }}
                <v-btn @click="downloadFile(file.path)">Descargar</v-btn>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>
</template>




<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const route = useRoute();
    const content = ref({});
    const isLoading = ref(true);
    const categories = ref([]); 
    const thematics = ref([]); 

    const getContentById = async () => {
      const contentId = route.params.contentId; 
      try {
        const token = localStorage.getItem('x-access-token'); 
        const response = await axios.get(`http://localhost:5000/content/${contentId}`, {
          headers: {
            'x-access-token': token,
          },
        });
        content.value = response.data; 

        await fetchCategoriesAndThematics();
      } catch (error) {
        console.error('Error al obtener el contenido:', error.response?.data?.message || error.message);
      } finally {
        isLoading.value = false; 
      }
    };

    const fetchCategoriesAndThematics = async () => {
      const token = localStorage.getItem('x-access-token');
      try {
        const [categoriesResponse, thematicsResponse] = await Promise.all([
          axios.get('http://localhost:5000/categories', {
            headers: {
              'x-access-token': token,
            },
          }),
          axios.get('http://localhost:5000/thematics', {
            headers: {
              'x-access-token': token,
            },
          }),
        ]);

        categories.value = categoriesResponse.data;
        thematics.value = thematicsResponse.data;
      } catch (error) {
        console.error('Error al obtener categorías y temáticas:', error.message);
      }
    };

    const getCategoryName = (id) => {
      const category = categories.value.find(cat => cat._id === id);
      return category ? category.name : 'Desconocido';
    };

    const getThematicName = (id) => {
      const thematic = thematics.value.find(thm => thm._id === id);
      return thematic ? thematic.name : 'Desconocido';
    };

    onMounted(() => {
      getContentById(); 
    });

    const downloadFile = (path) => {
      window.open(path, '_blank');
    };

    return { content, isLoading, downloadFile, getCategoryName, getThematicName };
  },
};
</script>




<style scoped>
.v-img {
  border-radius: 8px;
}
</style>
