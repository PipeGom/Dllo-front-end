<template>
  <h1>registro</h1>
  <v-form @submit="sendForm">
    <v-text-field v-model="auto.marca" label="Marca" required></v-text-field>
    <v-text-field v-model="auto.modelo" label="Modelo" required></v-text-field>
    <v-text-field v-model="auto.precio_reparacion" label="Coste de la Reparacion" required></v-text-field>
    <v-text-field v-model="auto.horas_reparacion" label="Tiempo de reparacion" required></v-text-field>
    <v-text-field v-model="auto.comentario" label="Comentarios" required></v-text-field>
    <v-select v-model="auto.partes_necesarias">
      <option v-for="p in auto" :key="p.id" :value="p.id">
        {{ p.partes_necesarias.nombre }}
      </option>
    </v-select>
    <v-btn type="submit">Guardar</v-btn>
  </v-form>
</template>
<script>
export default{
  data(){
    return{
      piezas:[],
      auto:{
        name:"",
        id:"",
        partes_necesarias:[{
          nombre:"",
          cantidad:""
        }]
      }
    }
  },
  methods:{
    sendForm(evento){
      evento.preventDefault();
      console.log("Envio")
    },
    mounted() {
        fetch("http://localhost:3000/auto")
        .then((res) => res.json())
        .then((res) => this.auto = res)
    }
  }
}
</script>
