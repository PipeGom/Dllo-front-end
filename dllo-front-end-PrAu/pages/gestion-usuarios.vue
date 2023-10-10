<template>

    <div class="container">
        <v-card class="carta">

    <router-link to="./register">
    <v-btn class="boton rounded-pill">Registrar nuevo usuario</v-btn>
    </router-link>

    <v-btn class="boton rounded-pill">Modificar usuario existente</v-btn>
    <v-btn class="boton rounded-pill">Eliminar usuario</v-btn>
</v-card>
</div>

</template>
<style>

.container{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url("../src/fondo.jpg");
  
}

.carta{
min-width: 600px;
width: 40%; 
padding: 50px; 
border-radius: 10%;
background-color: rgba(255, 255, 255, 0.8);
}

.boton{
min-width: 500px;
width: 60%;
margin: 10px;
border: 2px solid #230547;
transition: background-color 0.4s;
}
.boton:hover{
background-color: #230547;
color:white;
}
</style>
<script>



definePageMeta({
layout: "inicio-admin-layout",
});



</script>