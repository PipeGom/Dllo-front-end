<template>


   
    <div class="container">
    <v-card class="carta">
      <img src="../src/logo.jpg" class="imagen"/>
    <v-form class="formulario"  fast-fail @submit.prevent @submit="register" >

        <v-text-field
        v-model="name"
        :counter="15"
        :rules="nameRules"
        label="Nombre"
        required
      ></v-text-field>

    <v-text-field 
      type="email"
      v-model="email"
      label="Correo"
      :rules="emailRules"
    ></v-text-field>

    <v-text-field
      type="password"
      v-model="password"
      label="Contraseña"
      :rules="passwordRules"
     
    ></v-text-field>

    <v-text-field
      type="password"
      v-model="passwordConfirm"
      label="Confimar contraseña"
      :rules="passwordConfirmRules"
     
    ></v-text-field>

      <v-select
    clearable
    label="Credenciales"
    :items="['admin', 'mecanico']"
    v-model="credential"
    :rules="credentialRules"
  ></v-select>


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
width: 25%; 
padding: 50px; 
border-radius: 10%;
background-color: rgba(255, 255, 255, 0.8);
}
.formulario{
width: 100%;
}
.boton{
min-width: 40%; 
margin-left: 20%; 
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
overflow: hidden; 
}

</style>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

definePageMeta({
layout: "inicio-admin-layout",
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
    ],  passwordConfirm: '',
    passwordConfirmRules:[
    value => {
        if (value == this.password) return true;
        return 'Las contraseñas no coinciden.';
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
    ],
    credential: '',
    credentialRules : [
    value => {
        if (value) return true;
        return 'El campo es obligatorio.';
      }
    ]
  };
},
methods: {
    async register() {
      try {
        
        const response = await axios.get('http://localhost:3000/user');
        const usuarioExistente = response.data.find(user => user.email === this.email);

        if (usuarioExistente) {
      
          Swal.fire({
            icon: 'error',
            title: 'Usuario ya registrado',
            text: 'El usuario con este correo electrónico ya está registrado.',
            footer: '<a href="./Login.vue">¿Olvidaste tu contraseña?</a>'
          });
        } else {
         
          await axios.post('http://localhost:3000/user', { email: this.email, password: this.password, nombre: this.name, id:null, credential: this.credential});
          
        
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: '¡Te has registrado con éxito!',
            footer: '<a href="./Login">Iniciar sesión</a>'
          });
        }
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        
      }
    }

}
};
</script>