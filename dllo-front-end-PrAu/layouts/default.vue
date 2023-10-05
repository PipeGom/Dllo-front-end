<template>
    <v-card>
      <v-tabs style="background-color: black; color: azure;">
        <nuxt-link style="color: aliceblue;" v-for="item in items" :key="item.tab" :to="item.route">
          <v-tab>{{ item.tab }}</v-tab>
        </nuxt-link>
        <!--<div style="align-self: flex-end;">
          <img src="https://th.bing.com/th/id/R.2ec569bffe9defbe2930ed8aa8135388?rik=vcx0LtGUqhxpZQ&pid=ImgRaw&r=0" height="30px" width="70px">
        </div>-->
      </v-tabs>
      <router-view></router-view>
    </v-card>
  </template>
  
  <script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        tab: null,
        items: [
          { tab: "Inicio", route: "/" },
          { tab: "Ingreso", route: "/Login" },
        ],
      };
    },
  };
  </script>