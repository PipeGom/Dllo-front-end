<template>
  <h1>registro</h1>
  <v-form @submit="validate">
    <v-text-field v-model="brand" label="Marca" required></v-text-field>
    <v-text-field v-model="model" label="Modelo" required></v-text-field>
    <v-text-field v-model="price" label="Coste de la Reparacion" required @input="validatePrice"></v-text-field>
    <v-text-field v-model="time" label="Tiempo de reparacion" required @input="validatePrice"></v-text-field>
    <v-text-field v-model="comment" label="Comentarios" required></v-text-field>
    <!--<v-select v-model="auto.partes_necesarias">
      <option v-for="p in auto" :key="p.id" :value="p.id">
        {{ p.partes_necesarias.nombre }}
      </option>
    </v-select>-->
    <v-btn type="submit">Guardar</v-btn>
  </v-form>
</template>
<script>
import axios from 'axios';
const baseURL="http://localhost:3000/auto";

export default{
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
      .then(resp=>{
          this.auto = resp.data})
      .catch(err=>{
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
    validatePrice() {
    // Usamos una expresión regular para permitir solo números enteros o decimales con un punto
    this.price = this.price.replace(/[^0-9.]/g, '');
    this.time = this.time.replace(/[^0-9.]/g, '');
  }
  }
}
</script>
