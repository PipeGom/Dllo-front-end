<template>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
rel="stylesheet">
<v-card class="banner">Listado de Automoviles</v-card>
<v-row class="mainCard" v-for="car in auto" :key="car.id">
  <v-col cols="12" >
    <v-card-text class="textos">Automovil: {{car.marca}} {{ car.modelo }}</v-card-text>
    <v-card-text class="textos">Precio de reparacion: {{car.precio_reparacion}}</v-card-text>
    <v-card-text class="textos">Horas en taller {{car.horas_reparacion}}</v-card-text>
    <v-card-text class="textos">Precio de reparacion: {{car.precio_reparacion}}</v-card-text>
    <v-card-text class="textos">Comentario: {{car.comentario}}</v-card-text>
  </v-col>
<v-row justify="center">
    <v-col>
      <v-dialog
        transition="dialog-bottom-transition"
        width="70%"
      >
        <template v-slot:activator="{ props }">
          <v-col>
          <v-btn
          variant="tonal"
          elevation="8"
          block rounded="lg"
          class="editButton"
          color="primary"
          v-bind="props"
          >
          <span style="margin-right: 5%;"  class="material-icons">
          published_with_changes
          </span>
          Actualizar Seguimiento</v-btn>
        </v-col>
        <v-col>
          <v-btn
          style="margin-bottom: 1%;"
          elevation="8"
          variant="tonal"
          class="deleteButton"
          block rounded="lg" 
          v-on:click="DeleteApi(car.id)"  
          color="error">
          <span style="margin-right: 5%;" class="material-icons">
          remove_circle_outline
          </span>
          Eliminar Auto
        </v-btn>
      </v-col>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar
              color="primary"
              title="Actualizando Auto"
            ></v-toolbar>
              <v-form @submit.prevent="validateUpdate(car.id,car.marca,car.modelo,car.precio_reparacion,car.horas_reparacion,car.comentario)" class="frm1">
                <v-text-field variant="solo-inverted" v-model="car.marca" label="" required></v-text-field>
                <v-text-field variant="solo-inverted" v-model="car.modelo" label="" required></v-text-field>
                <v-text-field variant="solo-inverted" v-model="car.precio_reparacion" label="" required @input="validatePrice"></v-text-field>
                <v-text-field variant="solo-inverted" v-model="car.horas_reparacion" label="" required @input="validatePrice"></v-text-field>
                <v-text-field variant="solo-inverted" v-model="car.comentario" label="" required></v-text-field>
            <v-card-actions class="justify-end">
              <v-btn class="boton" type="submit">Guardar</v-btn>
              <v-btn class="boton" variant="text" @click="isActive.value = false">Cancelar</v-btn>
            </v-card-actions>
          </v-form>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</v-row>
</template>
<style scoped>
  .frm1{
    padding: 2%;
  }
  .mainCard{
    padding: 5px;
    margin-block: 2%;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.896);
    
  }
  .boton{
  min-width: 20%;
  width: 20%; 
  margin-inline-start: 2%;
  margin-top: 1%;
  border: 2px solid #230547;
  transition: background-color 0.4s;
  }
  .boton:hover{
  background-color: #230547;
  color:white;
  }
  .editButton{
    margin-bottom: 1%;
  }
  .textos{
    background-color: #e1e0e0;
    border-radius: 12px;
    margin-block: 1%;
  }
  .banner{
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.896);
    font-size: x-large;
    font-style: italic;
    text-align: center;
  }
</style>
<script>
import axios from 'axios';
const baseURL="http://localhost:3000/auto";
  
  export default{
    name:"App",
    data(){
      return{
        auto:[],
        id:0,
        model:"",
        brand:"",
        price:null,
        time:null,
        comment:""
      }
    },
    mounted() {
      this.GetApi();
    },
    methods:{
        async GetApi(){
        await axios
        .get(baseURL)
        .then((resp)=>{
            this.auto = resp.data})
        .catch((err)=>{
            console.log(err);
        });
        },
        async PostApi(){
        await axios
        .post(baseURL,{
          modelo:this.model,
          marca:this.brand,
          precio_reparacion:parseInt(this.price),
          horas_reparacion:parseInt(this.time),
          comentario:this.comment})
        .then(resp=>{
            console.log(resp);
            this.GetApi();
        })
        .catch(err=>{
            console.log(err);
        });
      },
      async DeleteApi(id){
        await axios
        .delete(baseURL+'/'+id)
        .then((resp)=>{
            console.log(resp);
            this.GetApi();
        })
        .catch(err=>{
            console.log(err);
        });
      },
      async UpdateApi(id,marca,modelo,precio_reparacion, horas_reparacion, comentario){
        await axios
        .put(baseURL+'/'+id,{
          modelo:modelo,
          marca:marca,
          precio_reparacion:precio_reparacion,
          horas_reparacion:horas_reparacion,
          comentario:comentario})
        .then((resp)=>{
            console.log(resp);
            this.GetApi();
        })
        .catch(err=>{
            console.log(err);
        });
      },
      validate(){
        if (!this.brand || !this.model || !this.price || !this.time || !this.comment) {
          // Muestra un mensaje de error o toma la acción adecuada cuando falten campos obligatorios
          // Por ejemplo:
          alert("Por favor, complete todos los campos obligatorios.");
        } else {
          // Si todas las validaciones pasan, continúa con el proceso de envío
          // Llama a la lógica de envío de la API aquí
          // Por ejemplo:
          this.PostApi();
        }
      },
      validateUpdate(id,marca,modelo,precio_reparacion, horas_reparacion, comentario){
        if (!marca || !modelo || !precio_reparacion || !horas_reparacion || !comentario) {
          // Muestra un mensaje de error o toma la acción adecuada cuando falten campos obligatorios
          // Por ejemplo:
          console.log(marca)
          alert("Por favor, complete todos los campos obligatorios.");
        } else {
          // Si todas las validaciones pasan, continúa con el proceso de envío
          // Llama a la lógica de envío de la API aquí
          // Por ejemplo:
          this.UpdateApi(id,marca,modelo,precio_reparacion, horas_reparacion, comentario);
          alert("Se realizaron los cambios con exito");
        }
      },
      validatePrice() {
      // Usamos una expresión regular para permitir solo números enteros o decimales con un punto
      this.price = this.price.replace(/[^0-9.]/g, '');
      this.time = this.time.replace(/[^0-9.]/g, '');
    }
    }
  }
  </script>