import { Style } from '#build/components';
<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
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
        <v-row align="center">
            <v-col cols="auto">
                <v-card-title id="Titulo">Faro delantero</v-card-title>
            </v-col>
            <v-col cols="auto">
                <v-card-title class="my-4 text-subtitle-1">$130.000</v-card-title>
            </v-col>            
        </v-row>      
    </v-card-item>
    <v-card-subtitle>
        <span class="me-1">Ref 23124412</span>
    </v-card-subtitle>

    <v-card-text>
      <div>
        Los faros delanteros halógenos funcionan mediante el calentamiento de un
        filamento de tungsteno dentro de una lámpara. Cuando la corriente
        eléctrica pasa a través del filamento, se calienta y emite luz.
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>
      <v-row align="center">      
        <v-col cols="auto">
          Disponible: 3
        </v-col>
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
      <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
        Editar Articulo
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

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
