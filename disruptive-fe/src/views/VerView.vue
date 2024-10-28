<template>
  <v-app>
    <v-container fluid>
      <v-card class="mt-5">
        <v-card-title class="text-h5"><!--{{ content.name }}--></v-card-title>
        <v-card-subtitle class="text-subtitle-1">Autor: <!--{{ content.author }}--></v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col>
              <p><strong>Categoría:</strong> <!--{{ content.category }}--></p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p><strong>Archivo:</strong> <!--{{ content.temathic }}--></p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-row justify="center" class="mt-4">
          <v-col cols="auto">
            <v-btn color="primary">Abrir el archivo</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="secondary" @click="goBack">Regresar</v-btn>
          </v-col>
        </v-row>
        <br>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.push('/listar');
    };

    return { goBack };
  },
};
</script>

<style scoped></style>
