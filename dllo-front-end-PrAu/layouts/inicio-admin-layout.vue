<template>
    <div color="rgba(255, 255, 255, 0.9)">   
        
   
  <v-card >
    <v-layout v-if="!loading" >
      <v-navigation-drawer
        color="#D7CCC8"
        expand-on-hover
        rail 
        
      >
        <v-list  >
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            :title="`Bienvenido !`"
            :subtitle="``"
          ></v-list-item>
        </v-list>

        <v-divider ></v-divider>

        <v-list density="compact" nav>
          
          <v-list-item prepend-icon="mdi-account-multiple" title="Gestionar usuarios" to="gestion-usuarios" ></v-list-item>
          <v-list-item prepend-icon="mdi-file" title="Gestión de inventario" to="gestion-inventario" ></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Gestionar Autos" to="autos-crud" ></v-list-item>
          <v-list-item prepend-icon="mdi-logout" title="Cerrar sesión" to="/" ></v-list-item>
          
        </v-list>
      </v-navigation-drawer>

      <v-main class="align-center justify-center"> <slot /></v-main>
    </v-layout>
  </v-card>
    </div>
</template>

<script setup>
import axios from 'axios'
import config from '../config/default.json'

// con v-if en el layout no permitimos que se salten el login
onBeforeMount(()=>{
  
  console.log(localStorage)
  const token = localStorage.getItem('token')
  if(token){
    loading.value = false
    const url = `${config.api_host}/verify`
    axios.post(url,{token}).then(()=>{

    }).catch(()=>{
      useRouter().push('/')
    })
  }else{
    useRouter().push('/')
  }
  console.log(token)
})
const loading = ref(true);

</script>