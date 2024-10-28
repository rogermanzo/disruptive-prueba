<template>
  <v-app>
    <v-container fluid>
      <v-card class="mt-5 elevation-2" outlined>
        <v-card-title class="text-center">
          <v-icon left>mdi-upload</v-icon>
          Subir Archivo
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" class="pa-4">
            <v-row>
              <v-col>
                <v-text-field variant="outlined" compact v-model="name" label="Nombre del Archivo" required
                  color="primary" prepend-inner-icon="mdi-file-document" />
              </v-col>
              <v-col>
                <v-file-input variant="outlined" compact v-model="files" label="Seleccionar Archivo"
                  accept=".jpg,.png,.pdf,.doc,.docx" required color="primary" prepend-inner-icon="" />
              </v-col>
            </v-row>
            <v-row class="mt-3">
              <v-col>
                <v-select variant="outlined" compact v-model="tematics" :items="tematicsName" item-text="name"
                  label="Temática" required color="primary" prepend-inner-icon="mdi-tag" item-value="_id"
                  :item-props="itemPropsTematic" />
                <v-btn @click="abrirDialogoTematica" class="uploadbutton mt-2">Crear temática</v-btn>
                <v-dialog v-model="dialogoTematicaVisible" max-width="800px">
                  <v-card>
                    <v-card-text>
                      <CrearTematica @cerrarDialogoTematica="cerrarDialogoTematica"
                        @tematica-agregada="actualizarTematicas" />
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn color="secondary" text @click="cerrarDialogoTematica">Cerrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col>
                <v-select @cerrar-dialogo="cerrarDialogoCategoria" @categoria-agregada="actualizarCategorias"
                  variant="outlined" compact v-model="fileCategory" :items="categories" item-text="type"
                  item-value="_id" label="Categoría de Archivo" required color="primary" prepend-inner-icon="mdi-folder"
                  :item-props="itemProps" />
                <v-btn @click="abrirDialogoCategoria" class="uploadbutton mt-2">Crear categoría</v-btn>
                <v-dialog v-model="dialogoCategoriaVisible" max-width="800px">
                  <v-card>
                    <v-card-text>
                      <v-row>
                        <v-col>
                          <CrearCategoria @cerrar-dialogo="cerrarDialogoCategoria" />
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn color="secondary" @click="cerrarDialogoCategoria">Cerrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row justify="center" class="mt-4">
              <v-col cols="auto" class="d-flex justify-center">
                <v-btn color="primary" @click="submit" class="mr-3">Subir</v-btn>
              </v-col>
              <v-col cols="auto" class="d-flex justify-center">
                <v-btn color="secondary" @click="goBack">Atrás</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center"></v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import CrearCategoria from './CrearCategoriaView.vue';
import CrearTematica from './CrearTematicaView.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  components: {
    CrearCategoria,
    CrearTematica,
  },
  setup() {
    const router = useRouter();
    const valid = ref(false);
    const fileName = ref('');
    const fileCategory = ref(null);
    const theme = ref('');
    const files = ref(null);
    const name = ref(null);

    const categories = ref([]);
    const tematics = ref();
    const tematicsName = ref([]);
    const dialogoTematicaVisible = ref(false);
    const dialogoCategoriaVisible = ref(false);
    const abrirDialogoTematica = () => {
      dialogoTematicaVisible.value = true;
    };
    const cerrarDialogoTematica = () => {
      dialogoTematicaVisible.value = false;
      actualizarTematicas();
    };


    const abrirDialogoCategoria = () => {
      dialogoCategoriaVisible.value = true;
    };
    const goBack = () => {
      router.push('/listar');
    };

    const submit = async () => {
      if (valid.value && files.value) {
        const formData = new FormData();
        formData.append('files', files.value);
        formData.append('category', fileCategory.value);
        formData.append('thematic', tematics.value);
        formData.append('name', name.value);

        try {
          const token = localStorage.getItem('x-access-token');
          const response = await axios.post('http://localhost:5000/content', formData, {
            headers: {
              'x-access-token': token,
              'Content-Type': 'multipart/form-data',
            },
          });
          alert(response.data.message);
          clearForm();
          router.push('/listar');
        } catch (error) {
          console.error('Error al subir el contenido:', error);
          alert('Error al subir el contenido');
        }
      } else {
        alert('Por favor, completa todos los campos requeridos.');
      }
    };

    const itemProps = (categories) => {
      return {
        title: categories.type,
      };
    };

    const itemPropsTematic = (tematic) => {
      return {
        title: tematic.name || tematic.type,
      };
    };

    const clearForm = () => {
      fileCategory.value = null;
      tematics.value = null;
      files.value = null;
      valid.value = false;
    };

    const actualizarCategorias = async () => {
      const token = localStorage.getItem('x-access-token');
      try {
        const response = await axios.get('http://localhost:5000/categories', {
          headers: {
            'x-access-token': token,
          },
        });
        categories.value = response.data;
      } catch (error) {
        console.error('Error obteniendo las categorías:', error);
      }
    };

    const actualizarTematicas = async () => {
      const token = localStorage.getItem('x-access-token');
      try {
        const response = await axios.get('http://localhost:5000/thematics', {
          headers: {
            'x-access-token': token,
          },
        });
        tematicsName.value = response.data;
      } catch (error) {
        console.error('Error obteniendo las temáticas:', error);
      }
    };


    const cerrarDialogoCategoria = () => {
      dialogoCategoriaVisible.value = false;
      actualizarCategorias();
    };


    const getCategories = async () => {
      const token = localStorage.getItem('x-access-token');
      try {
        const response = await axios.get('http://localhost:5000/categories', {
          headers: {
            'x-access-token': token,
          },
        });
        categories.value = response.data;
      } catch (error) {
        console.error('Error obteniendo las categorías:', error);
      }
    };

    const getTematics = async () => {
      const token = localStorage.getItem('x-access-token');
      try {
        const response = await axios.get('http://localhost:5000/thematics', {
          headers: {
            'x-access-token': token,
          },
        });
        tematicsName.value = response.data;
      } catch (error) {
        console.error('Error obteniendo las categorías:', error);
      }
    };

    onMounted(() => {
      getCategories();
      getTematics();
    });
    return {
      valid,
      fileName,
      fileCategory,
      theme,
      files,
      categories,
      dialogoTematicaVisible,
      dialogoCategoriaVisible,
      abrirDialogoTematica,
      cerrarDialogoTematica,
      abrirDialogoCategoria,
      cerrarDialogoCategoria,
      submit,
      goBack,
      itemProps,
      tematics,
      itemPropsTematic,
      tematicsName,
      actualizarCategorias,
      actualizarTematicas,
      name,
    };
  },
};
</script>

<style scoped>
.v-card {
  background-color: #f9f9f9;
}

.uploadbutton {
  background-color: #3f51b5;
  color: #f9f9f9;

}

.text-h5 {
  font-weight: bold;
  color: #3f51b5;
}

.v-divider {
  margin: 10px 0;
}

.pa-4 {
  padding: 20px;
}

.v-btn {
  min-width: 120px;
}
</style>
