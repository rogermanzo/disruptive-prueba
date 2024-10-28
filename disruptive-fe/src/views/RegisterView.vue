<template>
  <v-app>
    <v-container fluid fill-height>
      <v-row class="d-flex justify-center align-center">
        <v-col cols="12" sm="8" md="4">
          <v-card-title class="text-h6 text-center">
            <v-icon left>mdi-account-plus</v-icon>
            Registrar Usuario
          </v-card-title>

          <v-card>
            <v-card-text>
              <v-form ref="form" @submit.prevent="registerUser">
                <v-text-field
                  v-model="username"
                  variant="outlined"
                  density="compact"
                  label="Nombre de Usuario"
                  prepend-inner-icon="mdi-account-outline"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  density="compact"
                  placeholder="Email address"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  required
                ></v-text-field>
                <v-text-field
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'"
                  density="compact"
                  v-model="password"
                  placeholder="Enter your password"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  @click:append-inner="visible = !visible"
                  required
                ></v-text-field>
                <v-select
                  v-model="userRole"
                  variant="outlined"
                  prepend-inner-icon="mdi-account-tie"
                  density="compact"
                  :items="roles"
                  label="Rol de Usuario"
                  required
                  outlined
                ></v-select>
                <v-btn type="submit" rounded color="primary" block class="mt-4">Registrar Usuario</v-btn>
              </v-form>
            </v-card-text>
            
            <v-card-actions>
              <v-row justify="center">
                <v-col cols="auto">
                  <v-btn rounded @click="goToLogin">Logeate</v-btn>
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
    const visible = ref(false);
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const userRole = ref(null);
    const roles = ['lector', 'creador']; 

    const goToLogin = () => {
      router.push('/login');
    };

    const registerUser = async () => {
      const userData = {
        email: email.value, 
        username: username.value,
        password: password.value,
        role: userRole.value ? userRole.value.toLowerCase() : '', 
      };

      try {
        const response = await axios.post('http://localhost:5000/users', userData);
        console.log('Usuario registrado:', response.data);
        goToLogin(); 
      } catch (error) {
        console.error('Error al registrar el usuario:', error.response.data.message);
      }
    };

    return {
      visible,
      username,
      email,
      password,
      userRole,
      roles,
      goToLogin,
      registerUser,
    };
  },
};
</script>

<style scoped>
body {
  background-color: #f5f5f5;
}
</style>
