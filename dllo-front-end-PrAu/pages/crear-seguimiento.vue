<template>
    <v-sheet class="sheet1">

            <Formulario />

    </v-sheet>
</template>
<style scoped>
.sheet1{
    padding: 10%;
    justify-content: center;
    background-image: url(../src/creacionSeguimientoFondo.jpg);
    background-size: cover; /* Establece el tamaño de fondo en "cover" */
    background-position: center; /* Opcional: centra la imagen de fondo */
}
</style>
<script>
import Formulario from '../components/GuardarSeguimiento.vue';

export default {
components: {
    Formulario,
    }
};

definePageMeta({
layout: "blank",
});
</script>
  