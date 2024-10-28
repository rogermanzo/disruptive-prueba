<template>
  <v-row>
    <v-col cols="12" class="mb-4">
      <v-text-field variant="outlined" label="Buscar por nombre de contenido" clearable prepend-inner-icon="mdi-magnify"
        v-model="searchQuery" />
      <v-select variant="outlined" compact label="Filtrar por temática" clearable class="mt-2" v-model="selectedTheme"
        :items="themes" prepend-inner-icon="mdi-filter" />
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
            <v-col>Tematica</v-col>
            <v-col></v-col>

          </v-row>
        </v-card-title>
        <v-card-text>
          <div v-for="content in paginatedContent" :key="content.id">
            <v-row>
              <v-col>{{ content.title }}</v-col>
              <v-col>{{ content.type }}</v-col>
              <v-col>{{ content.theme }}</v-col>
              <v-col>
                <v-btn color="primary" @click="goToVer" class="mr-3">
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const searchQuery = ref('');
    const selectedTheme = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = 5; 
    const themes = ref(['Tema 1', 'Tema 2', 'Tema 3']);

    const contentList = ref([
      { id: 1, type: 'imagen', title: 'Foto de paisaje', theme: 'Tema 1' },
      { id: 2, type: 'imagen', title: 'Retrato de una persona', theme: 'Tema 2' },
      { id: 3, type: 'video', title: 'Documental sobre naturaleza', theme: 'Tema 1' },
      { id: 4, type: 'video', title: 'Tutorial de cocina', theme: 'Tema 3' },
      { id: 5, type: 'texto', title: 'Artículo sobre tecnología', theme: 'Tema 2' },
      { id: 6, type: 'texto', title: 'Historia de la humanidad', theme: 'Tema 1' },
      { id: 7, type: 'imagen', title: 'Atardecer en la playa', theme: 'Tema 1' },
      { id: 8, type: 'texto', title: 'Ciencia ficción en la literatura', theme: 'Tema 3' },
      { id: 9, type: 'video', title: 'Guía de ejercicio en casa', theme: 'Tema 2' },
    ]);

    const filteredContentList = computed(() => {
      return contentList.value.filter(content => {
        const matchesSearch = content.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesTheme = selectedTheme.value ? content.theme === selectedTheme.value : true;
        return matchesSearch && matchesTheme;
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
    const goToVer = () => {
      router.push('/ver');
    };

    const updatePage = (page) => {
      currentPage.value = page;
    };

    return {
      searchQuery,
      selectedTheme,
      currentPage,
      themes,
      paginatedContent,
      totalPages,
      goSubir,
      updatePage,
      goToVer,
    };
  },
};
</script>

<style scoped>
/* Agrega estilos aquí si es necesario */
.v-divider {
  margin: 10px 0;
  /* Espaciado entre filas */
}
</style>
