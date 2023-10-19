<template>
    <div color="rgba(255, 255, 255, 0.9)">   
        
   
        <v-card >
          <v-layout  >
            <v-navigation-drawer
              color="#D7CCC8"
              expand-on-hover
              rail              
            >
              <v-list  >
                <v-list-item
                  prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
                  :title="`Bienvenido ${usuario.nombre}!`"
                  :subtitle="`${usuario.email}`"
                ></v-list-item>
              </v-list>
      
              <v-divider ></v-divider>
      
              <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-star" title="Seguimiento" to="seguimiento-principal" ></v-list-item>
                <v-list-item prepend-icon="mdi-logout" title="Cerrar sesión" to="Login" ></v-list-item>
              </v-list>
            </v-navigation-drawer>
      
            <v-main class="align-center justify-center"> <slot /></v-main>
          </v-layout>
        </v-card>
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