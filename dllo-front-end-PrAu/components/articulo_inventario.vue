<template>
  <div>
    <h1 class="Title" style="text-align: center">Gestión de Inventario</h1>
    <div>
      <v-row>
        <v-col
          v-for="articulo in articulos" :key="articulo.Ref" cols="12" sm="6" md="4" lg="3">
          <v-card :loading="loading" class="mx-auto my-4" style="height: 570px">
            <template v-slot:loader="{ isActive }">
              <v-progress-linear
                :active="isActive"
                color="deep-purple"
                height="4"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-img class="responsive-image" max-height="280" :src="articulo.imagen"></v-img>
            <v-card-item>
              <v-card-title id="Titulo">{{ articulo.nombre }}</v-card-title>
            </v-card-item>
            <v-card-subtitle>
              <span class="me-1">Ref {{ articulo.Ref }}</span>
            </v-card-subtitle>
            <v-card-text>
              <div>
                {{ articulo.descripcion }}
              </div>
            </v-card-text>
            <v-divider class="mx-4 mb-1"></v-divider>
            <v-card-title>
              <v-row align="center">
                <v-col cols="auto"> Disponible: {{ articulo.cantidad }} </v-col>
                <v-col cols="auto">
                  <v-btn icon size="small">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn icon size="small">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-actions>
              <v-btn color="deep-purple-lighten-2" variant="text" @click="EditarArticulo">
                Editar Articulo
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="mostrarModal" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="deep-purple-lighten-2" variant="text" v-on="on">
          Editar Articulo
        </v-btn>
      </template>
      <v-card>
        <!-- Contenido del modal -->
        <v-card-title>Editar Articulo</v-card-title>
        <!-- Agrega aquí los campos y elementos para editar el artículo -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      mostrarModal: false
    };
  },
  setup() {
  const articulos = ref([]);
  onBeforeMount(async () => {
    await CargarArticulos(articulos);
  });

  const CargarArticulos = async (articulos) => {
    const url = "http://localhost:3000/inventario";
    try {
      const { data } = await axios.get(url);
      articulos.value = data;
      console.log("articulos:", articulos.value);
    } catch (error) {
      console.error("Error al cargar los artículos:", error);
    }
  }

  const EditarArticulo = () => {
    mostrarModal = true;
    console.log("funciona")
  }

  return {
    articulos,
    EditarArticulo,
    mostrarModal
  }
}
}
</script>

<style>
#Titulo {
  padding-right: 2.5cm;
}
#tituloo {
  padding-bottom: 0.1px;
}
#tituloo2 {
  padding-top: 0.1px;
}
</style>