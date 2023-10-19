<template>
    <ActualizarSeguimiento/>
    <!--<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet">
    <v-container grid-list-md text-xs-center align-center fluid class="back">
        <v-layout class="lay-1">
            <v-btn disabled style="font-size: 20px;" stacked variant="tonal"  class="boton" to="crear-seguimiento" >
                <span style="font-size: 50px; padding-bottom: 10%;" class="material-icons">
                add_circle_outline
                </span>
                Crear Seguimiento
            </v-btn>
            <v-btn style="font-size: 20px;" stacked variant="tonal"  class="boton" to="actualizar-seguimiento">
                <span style="font-size: 50px; padding-bottom: 10%;" class="material-icons">
                manage_history
                </span>
                Actualizar Seguimiento</v-btn>
        </v-layout>
    </v-container>-->
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
    border: 2px solid rgba(255, 183, 77);
    transition: background-color 0.4s;
    background-color: rgba(215, 204, 200, 0.8);
}
.boton:hover{
    background-color: rgba(255, 183, 77);
    color:white;
}

.back{
    background-image: url("../src/trackingBack.jpg");
    background-size: cover; /* Establece el tamaño de fondo en "cover" */
    background-position: center; /* Opcional: centra la imagen de fondo */
}

</style>
<script>
import ActualizarSeguimiento from './actualizar-seguimiento.vue';

export default{
    components:{
        ActualizarSeguimiento
    }
}

definePageMeta({
layout: "inicio-mecanico-layout",
});

</script>