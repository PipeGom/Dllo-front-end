<template>
    <v-container grid-list-md text-xs-center align-center fluid class="back">
        <v-layout class="lay-1">
            <v-btn prepend-icon="$vuetify" stacked variant="tonal"  class="boton" to="crear-seguimiento" >Crear Seguimiento</v-btn>
            <v-btn prepend-icon="$vuetify" stacked variant="tonal"  class="boton" to="actualizar-seguimiento" >Actualizar Seguimiento</v-btn>
        </v-layout>
    </v-container>
</template>
<style scoped>
.lay-1{
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

.btn-1{
    padding-inline: 10%;
    padding-block: 20%;
    margin: 3%;
}

.boton{
    padding-inline: 10%;
    padding-block: 20%;
    margin: 3%;
    border: 2px solid #230547;
    transition: background-color 0.4s;
    background-color: rgba(255, 255, 255, 0.953);
}
.boton:hover{
    background-color: #230547;
    color:white;
}

.back{
    background-image: url("../src/trackingBack.jpg");
    background-size: cover; /* Establece el tamaño de fondo en "cover" */
    background-position: center; /* Opcional: centra la imagen de fondo */
  
}

</style>
<script>

definePageMeta({
layout: "inicio-mecanico-layout",
});

</script>