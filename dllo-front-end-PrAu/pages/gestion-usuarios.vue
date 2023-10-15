<template>

    <div class="container text-center">
        <v-card class="carta">

    <router-link to="./register">
    <v-btn class="boton rounded-pill">Registrar nuevo usuario</v-btn>
    </router-link>

    <router-link to="./modificar-usuario">
      <v-btn class="boton rounded-pill">Modificar usuario existente</v-btn>
    </router-link>
   
    <router-link to="./eliminar-usuario">
    <v-btn class="boton rounded-pill">Eliminar usuario</v-btn>
  </router-link>
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
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

}

.carta{
min-width: 600px;
width: 40%; 
padding: 50px; 
border-radius: 40px;
background-color: rgba(215, 204, 200, 0.8);
}

.boton{
min-width: 500px;
width: 60%;
margin: 10px;
border: 2px solid rgba(255, 183, 77);
transition: background-color 0.4s;
background-color: rgba(215, 204, 200, 0.8);
}
.boton:hover{
background-color: rgba(255, 183, 77);
color:white;
}
</style>
<script>



definePageMeta({
layout: "inicio-admin-layout",
});



</script>