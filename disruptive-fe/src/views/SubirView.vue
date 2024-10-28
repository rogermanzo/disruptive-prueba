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
                <v-text-field variant="outlined" compact v-model="fileName" label="Nombre del Archivo" required
                  color="primary" prepend-inner-icon="mdi-file-document" />
              </v-col>
              <v-col>
                <v-file-input variant="outlined" compact v-model="file" label="Seleccionar Archivo"
                  accept=".jpg,.png,.pdf,.doc,.docx" required color="primary" prepend-inner-icon="" />
              </v-col>
            </v-row>
            <v-row class="mt-3">
              <v-col>
                <v-select variant="outlined" compact v-model="theme" label="Temática" required :items="themeOptions"
                  color="primary" prepend-inner-icon="mdi-tag" />
                <v-btn  @click="abrirDialogoTematica" class="uploadbutton mt-2">Crear temática</v-btn>
                <v-dialog v-model="dialogoTematicaVisible" max-width="800px">
                  <v-card>
                    <v-card-text>
                      <CrearTematica @cerrar-dialogo="cerrarDialogoTematica" />
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn color="secondary" text @click="cerrarDialogoTematica">Cerrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col>
                <v-select variant="outlined" compact v-model="fileCategory" :items="categories"
                  label="Categoría de Archivo" required color="primary" prepend-inner-icon="mdi-folder" />
                <v-btn   @click="abrirDialogoCategoria"  class="uploadbutton mt-2">Crear categoría</v-btn>
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
import { ref } from 'vue';

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
    const file = ref(null);
    const categories = ['Imagen', 'Documento', 'Video']; // Ejemplo de categorías
    const themeOptions = ['Futbol', 'Matematicas', 'Cocina'];

    // Variables para controlar los diálogos
    const dialogoTematicaVisible = ref(false);
    const dialogoCategoriaVisible = ref(false);

    const abrirDialogoTematica = () => {
      dialogoTematicaVisible.value = true;
    };

    const cerrarDialogoTematica = () => {
      dialogoTematicaVisible.value = false; // Cierra el diálogo de temática
    };

    const abrirDialogoCategoria = () => {
      dialogoCategoriaVisible.value = true;
    };

    const cerrarDialogoCategoria = () => {
      dialogoCategoriaVisible.value = false; // Cierra el diálogo de categoría
    };

    const submit = () => {
      if (valid.value) {
        // Lógica para manejar la subida del archivo
        alert(`Archivo "${fileName.value}" subido con éxito!`);
        clearForm();
        router.push('/'); // Redirigir a la lista de contenidos
      }
    };

    const goBack = () => {
      router.push('/listar'); // Cambia esto a la ruta correcta si es necesario
    };

    const clearForm = () => {
      fileName.value = '';
      fileCategory.value = null;
      theme.value = '';
      file.value = null;
      valid.value = false; // Resetea la validez del formulario
    };

    return {
      valid,
      fileName,
      fileCategory,
      theme,
      file,
      categories,
      themeOptions,
      dialogoTematicaVisible,
      dialogoCategoriaVisible,
      abrirDialogoTematica,
      cerrarDialogoTematica,
      abrirDialogoCategoria,
      cerrarDialogoCategoria,
      submit,
      goBack,
      clearForm,
    };
  },
};
</script>

<style scoped>
.v-card {
  background-color: #f9f9f9;
}
.uploadbutton{
  background-color:#3f51b5;
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
