<template>
  <v-form @submit.prevent="validate" class="frm1">
    <v-text-field variant="solo-inverted" v-model="brand" label="Marca" required></v-text-field>
    <v-text-field variant="solo-inverted" v-model="model" label="Modelo" required></v-text-field>
    <v-text-field variant="solo-inverted" v-model="price" label="Coste de la Reparacion" required @input="validatePrice"></v-text-field>
    <v-text-field variant="solo-inverted" v-model="time" label="Tiempo de reparacion" required @input="validatePrice"></v-text-field>
    <v-text-field variant="solo-inverted" v-model="comment" label="Comentarios" required></v-text-field>
    <v-btn class="boton" type="submit">Guardar
    </v-btn>
    <v-btn class="boton" to="/seguimiento-principal">Cancelar</v-btn>
  </v-form>
</template>
<style scoped>
.frm1{
  background-color: rgba(255, 255, 255, 0.838);
  padding: 3%;
  border-radius: 20px;
  border-style: solid;
  border-width: 2px;
}

.boton{
min-width: 20%;
width: 20%; 
margin-inline-end: 2%;
margin-top: 1%;
border: 2px solid #230547;
transition: background-color 0.4s;
}
.boton:hover{
background-color: #230547;
color:white;
}

</style>
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
        alert("El Auto ha sido registrado ");
        this.PostApi();
        this.$router.push('/inicio-mecanico')
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
