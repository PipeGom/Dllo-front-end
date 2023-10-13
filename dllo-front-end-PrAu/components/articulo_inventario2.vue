<template>
    <v-card :loading="loading" class="mx-auto my-4" max-width="374">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-img cover height="250" src="../src/Faro-delantero.jpeg"></v-img>
  
      <v-card-item>
        <v-card-title>
          <div class="d-flex justify-between align-center">
            <div>
              Faro delantero
            </div>
            <div>
              <v-btn icon size="small">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn icon size="small">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card-title>
        <v-card-subtitle>
          <span class="me-1">Ref 23124412</span>
        </v-card-subtitle>
      </v-card-item>
  
      <v-card-text>
        <div class="my-2 text-subtitle-1">$ • 230.000</div>
        <div>
          {{ showFullDescription ? fullDescription : shortDescription }}
        </div>
        <v-btn @click="toggleDescription">
          {{ showFullDescription ? 'Leer menos' : 'Leer más' }}
        </v-btn>
      </v-card-text>
  
      <v-divider class="mx-4 my-2"></v-divider>
  
      <v-card-actions>
        <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
          Editar Articulo
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loading: false,
        showFullDescription: false,
        fullDescription: `
          Los faros delanteros halógenos funcionan mediante el calentamiento de un
          filamento de tungsteno dentro de una lámpara. Cuando la corriente
          eléctrica pasa a través del filamento, se calienta y emite luz. Este es un texto de descripción completa.
        `,
        shortDescription: 'Los faros delanteros halógenos funcionan mediante el calentamiento de un filamento de tungsteno dentro de una lámpara.'
      };
    },
    methods: {
      toggleDescription() {
        this.showFullDescription = !this.showFullDescription;
      },
      reserve() {
        // Lógica para reservar el artículo
      }
    }
  };
  </script>
  