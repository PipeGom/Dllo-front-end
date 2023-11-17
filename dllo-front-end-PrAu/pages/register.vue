<template>


   
  <div class="container">
  <v-card class="carta">
    <img src="../src/logo.jpg" class="imagen"/>
  <v-form class="formulario" ref="form"  fast-fail @submit.prevent @submit="register" >

    <v-text-field
      v-model="id"
      :counter="15"
      label="Identificacion"
      required
    ></v-text-field>

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


 <v-btn type="submit" class="boton rounded-pill" >Registrar</v-btn>
 

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
background-color: rgba(215, 204, 200, 0.8);
}
.formulario{
width: 100%;
}
.boton{
min-width: 40%; 
margin-left: 20%; 
border: 2px solid  rgba(255, 183, 77);
transition: background-color 0.4s;
}
.boton:hover{
background-color:  rgba(255, 183, 77);
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
import config from "../config/default.json"
let nextUserId =2; // contador

definePageMeta({
layout: "inicio-admin-layout",
});

export default {
data() {
return {
  id:'',
  name: '',
  nameRules: [
      v => !!v || 'El nombre es requerido.',
      v => (v && v.length <= 10) || 'El nombre debe tener menos de 20 caracteres.',
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
  async validate () {
      const { valid } = await this.$refs.form.validate()
      return valid;
    },

  async register() {

    const validacion = await this.validate()   // se debe esperar la peticion
    //console.log('El formulario es',validacion)

    
    if(validacion){
    
            try {

              const url= `${config.api_host}/users/register`
              
              // usuario que ingresaron en los campos
              const user = {
                "id":this.id,
                "name": this.name,
                "password": this.password,
                "email": this.email,
                "credential" :this.credential
              }
              console.log('entre')

              const{data:dataUser} = await axios.post(url,user)


              Swal.fire({
                  icon: 'Success',
                  title: 'Registro exitoso',
                  text: '',
                  footer: ''
                });
             
            } catch (error) {
              console.error('Error al registrar usuario:', error);
              Swal.fire({
                        icon: 'error',
                        title: 'Registro fallido',
                        text: 'Ha ocurrido un error',
                        footer: ''
                      });
            }
    }else{
            Swal.fire({
                        icon: 'error',
                        title: 'Registro fallido',
                        text: 'La información ingresada es inválida.',
                        footer: ''
                      });
    }
  }
}
};
</script>