<template>
    <div>   
        
   
  <v-card  style="background: rgba(238, 10, 10, 0.8);
  transition: background 0.4s; ">
    <v-layout  >
      <v-navigation-drawer
      color="#E53935"
        expand-on-hover
        rail style.hover="background: rgba(0, 0, 0, 1);"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            :title="`Bienvenido ${usuario.nombre}!`"
            :subtitle="`${usuario.email}`"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Gestionar usuarios" to="gestion-usuarios" ></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Gestionar Inventario" ></v-list-item>
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