<template>
    <div class = "container">

        <v-container class="d-flex justify-center align-center" >
            <h3> Gestión de Autos</h3>
        </v-container>
        <añadir-auto></añadir-auto> 
        <autos></autos>
    </div>
</template>

<script>
definePageMeta({
layout: "inicio-admin-layout",
});
</script>

<style>
.container{
  
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url("../src/autos-s.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

}

</style>
