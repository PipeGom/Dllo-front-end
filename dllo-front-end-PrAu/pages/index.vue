<template>


   
      <div class="container">
      <v-card class="carta">
        <img src="../src/logo.jpg" class="imagen"/>
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

definePageMeta({
  layout: "blank",
});

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
    
      const response = await axios.get('http://localhost:3000/user'); 

   
      const usuario = response.data.find(user => user.email === this.email && user.password === this.password);

      if (usuario) {
        
        this.$router.push('./landing'); 
        
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
    }
  }
}

};

</script>

 

