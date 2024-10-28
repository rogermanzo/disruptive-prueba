<template>
  <v-row>
    <v-col cols="12" class="mb-4">
      <v-text-field variant="outlined" label="Buscar por nombre de contenido" clearable prepend-inner-icon="mdi-magnify"
        v-model="searchQuery" />
      <v-select variant="outlined" compact label="Filtrar por temática" clearable class="mt-2" v-model="tematicsTrue"
        :items="tematicsNameTrue" item-text="text" item-value="value" :item-props="itemPropsTematic"
        prepend-inner-icon="mdi-filter" />
      <v-btn color="primary" @click="goSubir" class="mr-3">
        <v-icon left>mdi-upload</v-icon>
        Subir un archivo
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col>Título</v-col>
            <v-col>Contenido</v-col>
            <v-col>Temática</v-col>
            <v-col>Archivo</v-col>
            <v-col></v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <div v-for="content in paginatedContent" :key="content._id">
            <v-row>
              <v-col>{{ content.name || 'Sin nombre' }}</v-col>
              <v-col>{{ content.thematicName }}</v-col>
              <v-col>{{ content.categoryName }}</v-col>
              <v-col>{{ content.files[0]?.filename || 'Sin archivo' }}</v-col>
              <v-col>
                <v-btn color="primary" @click="goToVer(content._id)" class="mr-3">
                  <v-icon left>mdi-eye</v-icon>
                  Ver
                </v-btn>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
        </v-card-text>
        <v-pagination v-model="currentPage" :length="totalPages" class="mt-4" @input="updatePage" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const searchQuery = ref('');
    const selectedTheme = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = 5;
    const tematics = ref([]);
    const contentList = ref([]);
    const categories = ref([]);
    const thematics = ref([]);
    const tematicsTrue = ref();
    const tematicsNameTrue = ref([]);

    const getTematicsTrue = async () => {
      const token = localStorage.getItem('x-access-token');
      try {
        const response = await axios.get('http://localhost:5000/thematics', {
          headers: {
            'x-access-token': token,
          },
        });
        tematicsNameTrue.value = response.data;
      } catch (error) {
        console.error('Error obteniendo las categorías:', error);
      }
    };


    const itemPropsTematic = (tematic) => {
      return {
        title: tematic.name || tematic.type,
      };
    };

    onMounted(() => {
      getTematicsTrue();
    });

    const name = ref();
    const fetchContents = async () => {
      const token = localStorage.getItem('x-access-token');
      try {
        const response = await axios.get('http://localhost:5000/contents', {
          headers: {
            'x-access-token': token,
          },
        });
        contentList.value = response.data;
        await fetchCategoriesAndThematics();
      } catch (error) {
        console.error('Error al obtener los contenidos:', error);
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

        tematics.value = thematics.value.map(item => ({
          text: item.name || item.type,
          value: item._id,
        }));
      } catch (error) {
        console.error('Error al obtener categorías y temáticas:', error);
      }
    };

    const filteredContentList = computed(() => {
      return contentList.value.filter(content => {
        const name = content.files && content.files.length > 0 ? content.files[0].filename : ''; // Cambié a filename
        const matchesSearch = name.includes(searchQuery.value);
        const matchesTheme = !tematicsTrue.value || content.thematic === tematicsTrue.value; // Asegúrate de que `selectedTheme` tenga el valor correcto

        return matchesSearch && matchesTheme;
      }).map(content => {
        return {
          ...content,
          categoryName: categories.value.find(cat => cat._id === content.category)?.type || 'Desconocido',
          thematicName: thematics.value.find(thm => thm._id === content.thematic)?.name || 'Desconocido',
          name: content.name,
        };
      });
    });



    const paginatedContent = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return filteredContentList.value.slice(start, start + itemsPerPage);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredContentList.value.length / itemsPerPage);
    });

    const goSubir = () => {
      router.push('/subir');
    };

    const goToVer = (id) => {
      router.push(`/ver/${id}`);
    };

    const updatePage = (page) => {
      currentPage.value = page;
    };

    onMounted(() => {
      fetchContents();
    });

    return {
      searchQuery,
      selectedTheme,
      currentPage,
      tematics,
      paginatedContent,
      totalPages,
      goSubir,
      updatePage,
      goToVer,
      name,
      tematicsTrue,
      tematicsNameTrue,
      itemPropsTematic,

    };
  },
};
</script>

<style scoped>
.v-divider {
  margin: 10px 0;
}
</style>
