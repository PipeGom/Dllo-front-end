<template>
    <div>
        <v-text-field
            v-model="search"
            label="Buscar articulo"
            class="mb-3"
            placeholder="Ingrese el nombre o id del articulo"
            @input="filtrarAutos"
        ></v-text-field>
    </div>
</template>