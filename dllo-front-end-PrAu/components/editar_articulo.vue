<template>
    <v-dialog :value="value" max-width="600px" @input="$emit('update:value', $event)">
      <v-card>
        <v-card-title>
          Editar Artículo
        </v-card-title>
        <v-card-text>
          <!-- Aquí colocas tus campos de edición -->
          <v-text-field v-model="articulo.nombre" label="Nombre"></v-text-field>
          <v-text-field v-model="articulo.precio" label="Precio"></v-text-field>
          <v-text-field v-model="articulo.descripcion" label="Descripción"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="cerrarModal">Cancelar</v-btn>
          <v-btn color="blue darken-1" @click="guardarCambios">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
  
  <script>
  import { definePageMeta } from '#imports';
  
  export default {
    props: {
      value: Boolean, // Prop para controlar el modal
      articulo: Object,
    },
    
    setup() {
      const cerrarModal = () => {
        // Emitir evento para cerrar el modal
        this.$emit("input", false);
      };
  
      const guardarCambios = () => {
        // Implementar lógica para guardar los cambios en el artículo
        // Puedes emitir un evento para comunicarte con el componente padre si es necesario
      };
  
      return {
        cerrarModal,
        guardarCambios,
      };
    },
  };
  </script>
  

  