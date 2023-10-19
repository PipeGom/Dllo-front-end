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
                <span class="me-1">Ref {{ articulo.id }}</span>
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
                <v-btn color="deep-purple-lighten-2" variant="text" @click="EditarArticulo(articulo)">
                  Editar Articulo
                </v-btn>
                <v-btn color="deep-purple-lighten-2" variant="text" @click="EliminarArticulo(articulo)">
                  Eliminar Articulo
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
  
      <v-dialog v-model="mostrarModal" max-width="600px">
        <v-card>
          <v-card-title>Editar Articulo</v-card-title>
            <v-card-text>
              <!-- Muestra la información del artículo aquí -->
              <v-text-field v-model="articuloSeleccionado.nombre" label="Nombre"></v-text-field>
              <v-text-field v-model="articuloSeleccionado.id" label="Referencia"></v-text-field>
              <v-text-field v-model="articuloSeleccionado.precio" label="Precio"></v-text-field>
              <v-text-field v-model="articuloSeleccionado.cantidad" label="Cantidad"></v-text-field>
              <v-text-field v-model="articuloSeleccionado.descripcion" label="Descripción"></v-text-field>
              <!-- Agrega más campos según sea necesario -->
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="cerrarModal">Cancelar</v-btn>
              <v-btn color="blue darken-1" @click="guardarCambios(articulo)">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </div>
  </template>
  
  <script>
  import { ref, onBeforeMount } from "vue";
  import axios from "axios";
  import Swal from 'sweetalert2'
  
  export default {
    data() {
      return {
        loading: false,
        mostrarModal: false
      };
    },
    setup() {
    const articulos = ref([]);
    const mostrarModal = ref(false);
    const articuloSeleccionado = ref({});

    onBeforeMount(async () => {
      await CargarArticulos(articulos);
    });

    const CargarArticulos = async (articulos) => {
      const url = "http://localhost:3000/inventario";
      try {
        const { data } = await axios.get(url);
        articulos.value = data;
      } catch (error) {
        console.error("Error al cargar los artículos:", error);
      }
    };

      const EditarArticulo = (articulo) => {
        articuloSeleccionado.value = articulo;
        mostrarModal.value = true;
      };
      
      const guardarCambios = async () => {
        try {

          await axios.put(`http://localhost:3000/inventario/${articuloSeleccionado.value.id}`, articuloSeleccionado.value);

          Swal.fire({
            title: 'Actualización exitosa',
            text: 'El artículo fue actualizado correctamente.',
            icon: 'success',
          });

          mostrarModal.value = false;
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'Error al actualizar el artículo',
            icon: 'error',
          });
        }
      };

      const EliminarArticulo = () => {
        mostrarModal.value = false;
      };

      const cerrarModal = () => {
        mostrarModal.value = false;
      };

    return {
      articulos,
      EditarArticulo,
      mostrarModal,
      articuloSeleccionado,
      guardarCambios,
      cerrarModal,
      EliminarArticulo
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
  
