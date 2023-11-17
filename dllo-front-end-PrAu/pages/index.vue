<template>
    <div class="container">
    <v-card class="carta">
      <img src="../src/logo.jpg" class="imagen"/>
    <v-form class="formulario" ref="form" fast-fail  @submit.prevent @submit="login" >    
    <v-text-field 
      type="email"
      v-model="email"
      label="Correo"
      :rules="emailRules"
    ></v-text-field>
    <v-text-field
      :type="showPassword ? 'text' : 'password'"
      v-model="password"
      label="Contraseña"
      :rules="passwordRules"
    ></v-text-field>
    <v-checkbox @click="MostrarContraseña" label="Mostrar contraseña"></v-checkbox>
    <v-btn type="submit" class="boton rounded-pill" >Ingresar</v-btn>
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
  background-size: cover; /* Establece el tamaño de fondo en "cover" */
  background-position: center; /* Opcional: centra la imagen de fondo */
}
.carta{
min-width: 600px;
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
width: 40%; 
margin-left: 30%;
margin-top: 30px;
border: 2px solid rgba(255, 183, 77);
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
<script setup>

import Swal from 'sweetalert2'
import axios from 'axios';
import config from '../config/default.json';

definePageMeta({layout:"blank"});

// definir variables del estado:
const email= ref('Felipe22@udem.ude.co') // se usa para que no se borre es como un usestate
const  password= ref('felipe2343')
const showPassword= ref(true)
const passwordRules=ref([
        value => {
          if (value) return true;
          return 'El campo es obligatorio.'
        },
      ]) 
const emailRules = ref([
        value => {
          if (value) return true;
          return 'El campo es obligatorio.';
        },
        value => {
          if (/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(value)) return true;
          return 'Correo no válido.';
        }
      ])
      
    
const login = async () => { 
  

  try {
    console.log(config.api_host)


    const url = `${config.api_host}/login`
   // se captura el data de una promesa que se va a enviar por un post a esa url
  const {data} = await axios.post(url,{email: email.value,password:password.value})
  // sabemos que la estructura del res del api es ok,message,info
  if(data?.ok==true){
   // redireccionar al home, guardar el token  
   console.log(data?.info);
   console.log(data)
   const token = data?.info?.token
   localStorage.setItem('token',token)
   

   useRouter().push('./inicio-admin')

  }else{
    Swal.fire({
      title:'Error!',
      text:data?.message,
      icon:'error'
    })
  }
  } catch (error) {
    Swal.fire({
      title:'Error!',
      text:'Ha ocurrido un error al conectarse',
      icon:'error'
    })
  }
   
  }


// 
// 
// import { useUserStore } from '../stores/user';
// import config from '../config/default.json'

// const email = ref('h@gmail.com')
// const password = ref('123')
// const showPassword = ref(false)
// export default {
// data() {
//   return {  
// 
// },
// methods: {
//   async validate () {
//         const { valid } = await this.$refs.form.validate()
//         return valid;
//       },
// async login() {
//   const validacion1 = await this.validate()
//   if(validacion1){
//     try {
//     console.log(config.api_host);

//     const url = `${config.api_host}/login`
//     const { data } = await axios.post(url, { email: email.value, password: password.value })
//     if (data?.ok == true) {
//       // Redireccionar al home, guardar el token
//       console.log(data?.info);
//       //const token = data?.info?.token
//       //localStorage.setItem('token', token)
//       useRoute().push('./inicio-admin')
//       // useRoute(')
//     }
//     else {
//       Swal.fire({
//         title: 'Error!',
//         text: data?.message,
//         icon: 'error'
//       })
//     }
//   } catch (error) {
//     console.error(error);
//     Swal.fire({
//       title: 'Error!',
//       text: 'Ha ocurrido un error al conectarse.',
//       icon: 'error'
//     })
//   }
  
//           }else{
//                 Swal.fire({
//                         icon: 'error',
//                         title: 'Campos incompletos',
//                         text: 'Por favor, asegúrate de completar todos los campos correctamente',
//                         footer: ''
//                       });
//               } 
// },
//   MostrarContraseña() {
//       this.showPassword = !this.showPassword;
//     },
// }
// };  
</script>