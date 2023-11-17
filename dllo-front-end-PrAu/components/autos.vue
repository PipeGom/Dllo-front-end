<template>
    <v-container style="padding: 200 px;">
    <div class="mt-3 carta" >
    
        <v-text-field rounded="lg" 
            v-model="search"
            label="Buscar autos"
            class="pa-4"
            placeholder="Ingrese la placa o el nombre del cliente"
            @input="filtrarAutos"
        ></v-text-field>
        <v-table class= "v-data-table thead th  rounded-lg"  >
            <thead>
                <tr>
                    <th class="text-left" style="background-color: rgba(215, 204, 200, 0.8);; width: 25%;">
                        Cliente
                    </th>
                    <th class="text-left " style="background-color: rgba(215, 204, 200, 0.8);;"   >
                        Modelo
                    </th>
                    <th class="text-left" style="background-color: rgba(215, 204, 200, 0.8);"   >
                        Placa
                    </th>
                    <th class="text-left" style="background-color: rgba(215, 204, 200, 0.8);"   >
                    
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in autosFiltrados" :key="item.placa" style="background-color: rgba(215, 204, 200, 0.8);">

                    <td >{{ item.nombre }}</td>
                    <td>{{ item.modelo }}</td>
                    <td>{{ item.placa }}</td>

                    
                    <td style="background-color: rgba(215, 204, 200, 0.8);">
                        <v-btn icon="mdi-pencil" variant="text" @click="editCar(item)">
                        </v-btn>
                        <v-btn icon="mdi-delete-off" variant="text" @click="deleteCarx(item)">
                        </v-btn> 
                    </td>
                </tr>
            </tbody>
        </v-table>
        <editar-auto v-if="editingCars != null" :dialog="isEdit" :cars="editingCars" @update="updateCars" />
        
    </div>
</v-container>
</template>

<style>
    .imagen-limitada {
        max-width: 300px;
        max-height: 200px;
}
</style>

<script setup>
import axios from "axios";
import { ref, onBeforeMount } from "vue";
import Swal from 'sweetalert2'
import config from '../config/default.json';

const autos = ref([]);
const autosFiltrados = ref([]);
const isEdit = ref(false);
const editingCars = ref(null);
const search = ref('');

onBeforeMount(() => {
    loadCars();
});


const loadCars = async () => {
    const url = `${config.api_host}/cars`
    //const url = "http://localhost:3000/autos";
    
    const { data } = await axios.get(url);
    //console.log(data.info)
    autos.value = data.info;
    filtrarAutos();
};



const editCar = async (item) => {

    isEdit.value = true;
    editingCars.value = { ...item };
};

const updateCars = (isUpdated) => {
    isEdit.value = false;
    editingCars.value = null;
    loadCars();
};

const filtrarAutos = () => {
    // print("este es el search", search.value)
    autosFiltrados.value = autos.value.filter(auto =>
        auto.nombre.toLowerCase().includes(search.value.toLowerCase()) ||
        auto.placa.toLowerCase().includes(search.value.toLowerCase())
    );
};

const deleteCarx = async (item) => {
try {

const result = await Swal.fire({
      title: 'Alerta de eliminación',
      text: '¿Esta seguro de eliminar este vehículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33'
    });

if (result.isConfirmed){
    const url = `${config.api_host}/cars/${item._id}`;
    console.log(url)
    //const url = `http://localhost:3000/autos/${item.id}`;
    const { data } = await axios.delete(url);
    loadCars()
Swal.fire({
      title: 'Eliminación exitosa',
      text: 'El Vehículo fue eliminado correctamente.',
      icon: 'success',
    });

}else{

Swal.fire({
      title: 'Eliminación cancelada',
      text: 'El vehículo no fue eliminado',
      icon: 'error',
    });
}

}catch (error) {
Swal.fire({
  title: 'Error',
  text: 'No se puede eliminar el vehículo seleccionado',
  icon: 'error',
});
}

}


</script>

<style>
.v-data-table thead th {
  background-color: rgba(215, 204, 200, 0.8);;
  color: #333;
  font-weight: bold;
  font-family: 'Arial, sans-serif'; /* Cambia el tipo de fuente */
  font-size: 16px; /* Cambia el tamaño de la fuente */
}

.carta{

border-radius: 10px;
background-color: rgba(215, 204, 200, 0.8);
}
</style>
