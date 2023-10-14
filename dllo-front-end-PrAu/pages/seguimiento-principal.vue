<template>
    <v-container grid-list-md text-xs-center align-center fluid>
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
}
.boton:hover{
    background-color: #230547;
    color:white;
}

</style>
<script>

definePageMeta({
layout: "inicio-mecanico-layout",
});

</script>