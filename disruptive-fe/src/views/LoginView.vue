<template>
  <v-app>
    <v-container fluid fill-height>
      <v-card-title class="text-h6 text-center">
        <v-icon left>mdi-login</v-icon>
        Iniciar Sesión
      </v-card-title>
      <v-row class="d-flex justify-center align-center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="email" variant="outlined" density="compact" label="Correo electronico"
                  prepend-inner-icon="mdi-email-outline" required outlined></v-text-field>
                <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'" density="compact" placeholder="Contraseña"
                  prepend-inner-icon="mdi-lock-outline" variant="outlined"
                  @click:append-inner="visible = !visible"></v-text-field>
                <v-btn rounded color="primary" block class="mt-4" type="submit">Iniciar Sesión</v-btn>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const visible = ref(false);

    const goToRegister = () => {
      router.push('/register');
    };

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:5000/login', {
          email: email.value,
          password: password.value
        });
        localStorage.setItem('x-access-token', response.data.token);
        router.push('/listar');

        console.log(response.data);
      } catch (error) {
        console.error('Error de inicio de sesión:', error);
      }
    };

    return {
      email,
      password,
      visible,
      goToRegister,
      login,
    };
  },
};
</script>

<style scoped>
body {
  background-color: #f5f5f5;
}
</style>
