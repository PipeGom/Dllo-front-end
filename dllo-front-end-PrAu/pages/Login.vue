<template>


   
    <div class="container">
    <v-card class="carta">
      <img src="../src/logo.jpg" class="imagen"/>
    <v-form class="formulario" ref="form" fast-fail @submit.prevent @submit="login" >
    
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
background-color: rgba(255, 255, 255, 0.8);
}
.formulario{
width: 100%;
}
.boton{
min-width: 40%;
width: 40%; 
margin-left: 30%;
margin-top: 30px;
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

<script >
import axios from 'axios';
import Swal from 'sweetalert2'
import { useUserStore } from '../stores/user';

definePageMeta({
layout: "blank",
});

export default {

data() {
  return {
    email: '',
    password: '',
    showPassword: false,
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
  async validate () {
        const { valid } = await this.$refs.form.validate()
        
        return valid;
      },

async login() {

  const validacion1 = await this.validate()

  if(validacion1){

            try {
            
              const response = await axios.get('http://localhost:3000/user'); 

              const usuario = response.data.find(user => user.email === this.email && user.password === this.password);

              /*Se usa pinia para almacenar el estado global del usuario*/
              /*Guardamos el usuario autenticado*/

              
              const userStore = useUserStore();  
              
              //console.log(userStore.getUser)

              //console.log(userStore)

              console.log(usuario.credential);
              switch (true) {

                    
                    case usuario.credential === "mecanico":
                      userStore.setUser(usuario);     // Debe setearse aca de lo contrario siempre carga por defecto el mismo
                      console.log('entre al mecanico')
                      this.$router.push('./inicio-mecanico');
                      break;

                    case usuario.credential === "admin": 
                      userStore.setUser(usuario);  // Se debe volver hacer aqui
                      console.log('entre al Admin')
                      this.$router.push('./inicio-admin');
                      break;
                  }
            } catch (error) {
              if (error.response && error.response.status === 404) { 
                console.log('Entre')
                  Swal.fire({
                  icon: 'error',
                  title: 'Credenciales incorrectas',
                  text: 'Las credenciales ingresadas no se encuentran registradas.',
                  footer: '¿Tienes problemas con tu inicio de sesión? Comunícate con el área administrativa.'
                })
            } else { 
              Swal.fire({
                  icon: 'error',
                  title: 'Credenciales incorrectas',
                  text: 'Las credenciales ingresadas no se encuentran registradas.',
                  footer: '¿Tienes problemas con tu inicio de sesión? Comunícate con el área administrativa.'
                })

              console.error('Error al autenticar:', error);
            }
            }
          }else{
                Swal.fire({
                        icon: 'error',
                        title: 'Campos incompletos',
                        text: 'Por favor, asegúrate de completar todos los campos correctamente',
                        footer: ''
                      });
              } 

},
  MostrarContraseña() {
      this.showPassword = !this.showPassword;
    },
}
};
</script>