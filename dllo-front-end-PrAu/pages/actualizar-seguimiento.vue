<template>
    <v-sheet class="sheet1">
        <ListarSeguimiento/>
    </v-sheet>
</template>
<style scoped>
.sheet1{
    padding: 10%;
    background-image: url(../src/creacionSeguimientoFondo.jpg);
    background-size: cover; /* Establece el tamaño de fondo en "cover" */
    background-position: center; /* Opcional: centra la imagen de fondo */
}
</style>
<script>
import ListarSeguimiento from '../components/ListarSeguimiento.vue';
export default{
    components:{
        ListarSeguimiento
    }
}

definePageMeta({
layout: "blank",
});
</script>