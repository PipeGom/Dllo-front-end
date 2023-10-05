<template>


   
    <div class="container">
    <v-card class="carta">
      <img src="../src/logo.jpg" class="imagen"/>
    <v-form class="formulario"  fast-fail @submit.prevent @submit="register" >

        <v-text-field
        v-model="name"
        :counter="15"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

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

    <v-text-field
      type="password"
      v-model="password"
      label="Confirm password"
      :rules="passwordRules"
     
    ></v-text-field>

    <v-btn type="submit" class="boton rounded-pill" >Registarse</v-btn>

  </v-form>
</v-card>
</div>


</template>

<style scoped>

.container{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url("../src/fondo.jpg");
  
}
.carta{
width: 25%; /* Aumenta el ancho del v-card para que se ajuste al contenido */
padding: 50px; /* Agrega espacio alrededor del v-card */
border-radius: 10%;
background-color: rgba(255, 255, 255, 0.8);
}
.formulario{
width: 100%;
}
.boton{
min-width: 40%; /* Asegúrate de que el botón ocupe todo el ancho del formulario */
margin-left: 30%;
margin-top: 30px; /* Agrega espacio superior al botón */
border: 2px solid #230547;
transition: background-color 0.4s;
}
.boton:hover{
background-color: #230547;
color:white;
}
.imagen{
margin-left: 25%;
margin-bottom: 20px;
width: 50%;
height: 40%; 
border-radius: 50%; 
overflow: hidden; /* Recorta lo que salga */ 
}

</style>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

definePageMeta({
layout: "blank",
});

export default {
data() {
  return {
    name: '',
    nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
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
    async register() {
      try {
        // Realiza una solicitud para verificar si el usuario ya existe
        const response = await axios.get('http://localhost:3000/user');
        const usuarioExistente = response.data.find(user => user.email === this.email);

        if (usuarioExistente) {
          // Si el usuario ya existe, muestra un mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Usuario ya registrado',
            text: 'El usuario con este correo electrónico ya está registrado.',
            footer: '<a href="">¿Olvidaste tu contraseña?</a>'
          });
        } else {
          // Si el usuario no existe, puedes registrar al nuevo usuario aquí
          // Puedes hacer una solicitud POST al servidor para agregar el nuevo usuario
          // Por ejemplo:
          await axios.post('http://localhost:3000/user', { email: this.email, password: this.password, nombre: this.name, id:null });
          
          // Después de registrar al usuario, puedes redirigirlo a la página de inicio de sesión o mostrar un mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: '¡Te has registrado con éxito!',
            footer: '<a href="./Login">Iniciar sesión</a>'
          });
        }
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        // Manejar otros errores aquí
      }
    }

}
};
</script>