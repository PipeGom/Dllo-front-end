<template>
    <h1>
        <v-container class="d-flex justify-center align-center">
            <h3> Gestión de Autos</h3>
        </v-container>
        <añadir-auto></añadir-auto> 
        
        <autos></autos>
    </h1>
</template>

<script>
definePageMeta({
layout: "inicio-admin-layout",
});
</script>