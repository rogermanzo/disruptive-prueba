<template>
  <v-app>
    <v-container fluid fill-height>
      <v-card-title class="text-h6 text-center">
        <v-icon left>mdi-login</v-icon> <!-- Usando un ícono de Material Design Icons -->
        Iniciar Sesión
      </v-card-title>
      <v-row class="d-flex justify-center align-center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-text>
              <v-form>
                <v-text-field variant="outlined" density="compact" label="Nombre de Usuario"
                  prepend-inner-icon="mdi-account-outline" required outlined>
                </v-text-field>
                <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                  variant="outlined">
                </v-text-field>
                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                  prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible">
                </v-text-field>
                <v-btn rounded color="primary" block class="mt-4">Iniciar Sesión</v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-row justify="center">
                <v-col cols="auto">
                  <v-btn rounded @click="goToRegister">Regístrate</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  data: () => ({
      visible: false,
    }),
  setup() {
    const router = useRouter();

    const goToRegister = () => {
      router.push('/register');
    };

    return {
      goToRegister,
    };
  },
};
</script>
<style scoped>
body {
  background-color: #f5f5f5;
  /* Fondo claro */
}
</style>
