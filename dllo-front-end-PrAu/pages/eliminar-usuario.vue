<template>


   
    <div class="container">
    <v-card class="carta">
      <img src="../src/logo.jpg" class="imagen"/>

      <v-form  ref="form1" @submit.prevent @submit="buscarUsuario" >
        <v-text-field
        v-model="nameBuscar"
        :counter="20"
        :rules="nameRules1"
        label="Nombre"
        required
      ></v-text-field>

      <v-btn type="submit" class="boton rounded-pill" >Buscar</v-btn>
      </v-form>
    <v-form class="formulario"  fast-fail @submit.prevent @submit="EliminarUsuario" >

        <v-text-field
        v-model="name"
        :counter="20"
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
      
       
      v-model="password"
      label="Contraseña"
      :rules="passwordRules"
     
    ></v-text-field>

    <v-text-field
       
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


   <v-btn type="submit" class="boton rounded-pill" >Eliminar</v-btn>
   
 
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
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
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

.swal2-confirm {
  background-color: green !important;
  border-color: green !important;
  color: white !important;
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
    user:[],
    id:'',
    nameBuscar:'',
    name: '',
    nameRules: [
        v => !!v || 'El campo es obligatorio.',
        v => (v && v.length <= 20) || 'El nombre debe tener menos de 20 caracteres',
      ],
      nameRules1: [
        v => !!v || 'El campo es obligatorio.',
        v => (v && v.length <= 20) || 'El nombre debe tener menos de 20 caracteres',
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
    ]
    ,
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

  async validateBuscar () {
    const { valid } = await this.$refs.form1.validate()
    //console.log('Validation result for nameBuscar:', valid);
    return valid;
  },

  async buscarUsuario(){

    const validacion1 = await this.validateBuscar()


    if(validacion1){
            try{
            const responseBuscar = await axios.get('http://localhost:3000/user');
            const usuarioExistente = responseBuscar.data.find(user => user.nombre === this.nameBuscar);
            
              this.user = usuarioExistente
              this.id = usuarioExistente.id
              this.name = usuarioExistente.nombre
              this.credential = usuarioExistente.credential 
              this.email = usuarioExistente.email
              this.password = usuarioExistente.password
              this.passwordConfirm = usuarioExistente.password
            
            if (usuarioExistente) {  
              Swal.fire({
                icon: 'success',
                title: 'Usuario encontrado',
                text: '',
                footer: ''
              });
            } else{
              
              Swal.fire({
                icon: 'error',
                title: 'El usuario no existe',
                text: '',
                footer: ''
              });
            } } catch(error){
                  Swal.fire({
                    icon: 'error',
                    title: 'El usuario no existe',
                    text: '',
                    footer: ''
                  });
              console.error('Error al autenticar:', error);
            }   
          }else{
                Swal.fire({
                        icon: 'error',
                        title: 'Es necesario ingresar el nombre del usuario',
                        text: '',
                        footer: ''
                      });
              } 
  },
    async EliminarUsuario() {
    
      const validacion1 = await this.validateBuscar()

      if(validacion1){
  
            try {
                if (this.user) {

                  const deletedUser = {
                    nombre: this.name,
                    email: this.email,
                    password: this.password,
                    credential: this.credential
                  };
                  

                  const result = await Swal.fire({
                          title: 'Alerta de eliminación',
                          text: '¿Esta seguro de eliminar este usuario?',
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonText: 'Eliminar',
                          confirmButtonColor: '#3085d6',
                          cancelButtonText: 'Cancelar',
                          cancelButtonColor: '#d33'
                        });

                  if (result.isConfirmed){

                    await axios.delete(`http://localhost:3000/user/${this.id}`, deletedUser);
                    
                    Swal.fire({
                          title: 'Eliminación exitosa',
                          text: 'El usuario fue eliminado correctamente.',
                          icon: 'success',
                        });

                        this.limpiarCampos();

                  }else{

                    Swal.fire({
                          title: 'Eliminación cancelada',
                          text: 'El usuario no fue eliminado',
                          icon: 'error',
                        });
                  }
                }
                      
                }catch (error) {

                  Swal.fire({
                          title: 'Usuario inválido',
                          text: 'No ha ingresado un usuario válido para eliminar.',
                          icon: 'error',
                        });
                    

                console.error('Error al eliminar el usuario:', error);
              }
            }else{
              Swal.fire({
                        icon: 'error',
                        title: 'Es necesario ingresar el nombre del usuario a eliminar.',
                        text: '',
                        footer: ''
                      });
            }
},
limpiarCampos(){
        this.nameBuscar=''
         this.name= ''
         this.email=''
         this.password=''
         this.passwordConfirm=''
         this.credential=''
}
}};
</script>