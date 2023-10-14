<template>
    <div>   
        
        <v-layout class="rounded rounded-md">
    <v-app-bar :title="`Bienvenido ${usuario.nombre}!`">
        
    </v-app-bar>
    <v-navigation-drawer>
      <v-list>
        <!-- Navegacion -->
       <v-list-item  to="landing"><v-icon icon="mdi-home" /> Inicio </v-list-item> 
       <v-list-item title="Gestionar Revisiones" ></v-list-item> 
       <v-list-item  to="seguimiento-principal"><v-icon icon="mdi-home" /> Seguimiento </v-list-item> 
       <v-list-item ></v-list-item> 
      </v-list>
    </v-navigation-drawer>
    <v-main class="align-center justify-center">
      <!-- slot: Carga el contenido de la página (pages/..) -->
      <slot />
    </v-main>
  </v-layout>
    </div>

</template>
<script>

import { useUserStore } from '../stores/user';

export default {
  computed: {
    usuario() {
      const userStore = useUserStore();
      
      return userStore.getUser;
    },
  },
  
};

</script>