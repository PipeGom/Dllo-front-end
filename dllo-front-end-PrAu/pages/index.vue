<template>


   
      <v-card class="carta" variant="tonal" >
      <v-form class="formulario"  fast-fail @submit.prevent @submit="login" >

      <v-text-field 
        type="email"
        v-model="email"
        label="email"
        :rules="emailRules"
      ></v-text-field>

      <v-text-field
        type="password"
        v-model="password"
        label="password"
        :rules="passwordRules"
       
      ></v-text-field>

      <v-btn type="submit" class="boton" >Ingresar</v-btn>

    </v-form>
  </v-card>


</template>

<style scoped>

.carta{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    
}
.formulario{
  width: 30%;
  
}
.boton{
  max-width: 50%;
  margin-left: 40%;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordRules: [
        value => {
          if (value) return true;
          return 'El campo es obligatorio.';
        }
      ],
      user: [],
      emailRules: [
        value => {
          if (value) return true;
          return 'El campo es obligatorio.';
        },
        value => {
          if (/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(value)) return true;
          return 'Correo no válido.';
        }
      ]
    };
  },
  methods: {
  async login() {
    try {
      // Realizar una solicitud GET a tu servidor para obtener los usuarios
      const response = await axios.get('http://localhost:3000/user'); // Asegúrate de usar la URL correcta

      // Buscar un usuario con el email y la contraseña ingresados
      const usuario = response.data.find(user => user.email === this.email && user.password === this.password);

      if (usuario) {
        // Autenticación exitosa, redirigir a la página deseada
        this.$router.push('./landing'); // Cambia '/otra-pagina' por la ruta real
      } else {
        // Si no se encuentra un usuario, mostrar un mensaje de error
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
    }
  }
}

};

</script>

 

