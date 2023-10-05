<template>


   
      <v-card class="carta" title="login" variant="tonal" >
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

 

