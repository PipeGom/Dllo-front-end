<template>
    <div>
      <h1 class="Title" style="text-align: center">Gestión de Inventario</h1>
      <v-btn class="boton rounded-pill"  @click="CrearArticulo">Crear articulo</v-btn>
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

      <v-dialog v-model="mostrarModal2" max-width="600px">
        <v-card>
          <v-card-title>Crear Artículo</v-card-title>
          <v-card-text>
            <!-- Formulario para crear un nuevo artículo -->
            <v-text-field v-model="nuevoArticulo.nombre" label="Nombre"></v-text-field>
            <v-text-field v-model="nuevoArticulo.precio" label="Precio"></v-text-field>
            <v-text-field v-model="nuevoArticulo.cantidad" label="Cantidad"></v-text-field>
            <v-text-field v-model="nuevoArticulo.descripcion" label="Descripción"></v-text-field>
            <!-- Agrega más campos según sea necesario -->
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="cerrarModal2">Cancelar</v-btn>
            <v-btn color="blue darken-1" @click="guardarNuevoArticulo">Guardar</v-btn>
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
        mostrarModal: false,
        mostrarModal2: false
      };
    },
    setup() {
    const articulos = ref([]);
    const mostrarModal = ref(false);
    const mostrarModal2 = ref(false);
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

    const nuevoArticulo = ref({
    nombre: '',
    precio: 0,
    cantidad: 0,
    descripcion: '',
    imagen: "default.jpg",
    id: ''
    });

    
//--------------------------------------Crear Articulo---------------------------------------------

    const CrearArticulo = async (articulo) => {
      mostrarModal2.value = true;
    }

    const guardarNuevoArticulo = async () => {
    try {

      mostrarModal2.value = false;

      const result = await Swal.fire({
              title: 'alerta de creación',
              text: '¿Esta seguro de crear este articulo?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Crear',
              confirmButtonColor: '#3085d6',
              cancelButtonText: 'Cancelar',
              cancelButtonColor: '#d33'
            });

      if (result.isConfirmed){

      const response = await axios.post('http://localhost:3000/inventario', nuevoArticulo.value);

      Swal.fire({
            title: 'Creación exitosa',
            text: 'El artículo fue creado correctamente.',
            icon: 'success',
          });

      mostrarModal2.value = false;

      // Limpia los campos del nuevo artículo.
      Object.keys(nuevoArticulo.value).forEach((key) => {
        nuevoArticulo.value[key] = '';
      });
    } else{

        Swal.fire({
              title: 'Creación cancelada',
              text: 'El articulo no fue creado',
              icon: 'error',
            });
          }
    }catch (error) {
      Swal.fire({
            title: 'Error',
            text: 'Error al crear el artículo',
            icon: 'error',
          });
        }
      };

//----------------------------------------Editar Articulo----------------------------------------------

      const EditarArticulo = (articulo) => {
        articuloSeleccionado.value = articulo;
        mostrarModal.value = true;
    };
      
      const guardarCambios = async () => {
        try {

          mostrarModal.value = false;

          const result = await Swal.fire({
              title: 'alerta de actualización',
              text: '¿Esta seguro de actualizar este articulo?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Actualizar',
              confirmButtonColor: '#3085d6',
              cancelButtonText: 'Cancelar',
              cancelButtonColor: '#d33'
            });

          if (result.isConfirmed){

          await axios.put(`http://localhost:3000/inventario/${articuloSeleccionado.value.id}`, articuloSeleccionado.value);

          Swal.fire({
            title: 'Actualización exitosa',
            text: 'El artículo fue actualizado correctamente.',
            icon: 'success',
          });

          mostrarModal.value = false;
        } else{

            Swal.fire({
                  title: 'Eliminación cancelada',
                  text: 'El usuario no fue eliminado',
                  icon: 'error',
                });
            }

        }catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'Error al actualizar el artículo',
            icon: 'error',
          });
        }
      };
  
  //--------------------------------------Eliminar Articulo---------------------------------------------

      const EliminarArticulo = async (articulo) => {
        try {

        const result = await Swal.fire({
              title: 'Alerta de eliminación',
              text: '¿Esta seguro de eliminar este articulo?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Eliminar',
              confirmButtonColor: '#3085d6',
              cancelButtonText: 'Cancelar',
              cancelButtonColor: '#d33'
            });

      if (result.isConfirmed){

        await axios.delete(`http://localhost:3000/inventario/${articulo.id}`, articuloSeleccionado.value);

        const index = articulos.value.findIndex((a) => a.id === articulo.id);
        if (index !== -1) {
          articulos.value.splice(index, 1);
        }

        Swal.fire({
              title: 'Eliminación exitosa',
              text: 'El Articulo fue eliminado correctamente.',
              icon: 'success',
            });

      }else{

        Swal.fire({
              title: 'Eliminación cancelada',
              text: 'El usuario no fue eliminado',
              icon: 'error',
            });
        }

      }catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'No se puede eliminar el articulo seleccionado',
          icon: 'error',
      });
    }
  }

      const cerrarModal = () => {
        mostrarModal.value = false;
      };
    
      const cerrarModal2 = () => {
        mostrarModal2.value = false;
      };

    return {
      articulos,
      EditarArticulo,
      mostrarModal,
      mostrarModal2,
      articuloSeleccionado,
      nuevoArticulo,
      CrearArticulo,
      guardarNuevoArticulo,
      guardarCambios,
      cerrarModal,
      cerrarModal2,
      EliminarArticulo
    }
}}
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
  
