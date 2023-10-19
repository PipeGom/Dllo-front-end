<template>
    <div class="mt-3">
        <h3>Listado de autos</h3>
        <v-text-field
            v-model="search"
            label="Buscar autos"
            class="mb-3"
            placeholder="Ingrese la placa o el nombre del cliente"
            @input="filtrarAutos"
        ></v-text-field>
        <v-table class= "v-data-table thead th">
            <thead>
                <tr>
                    <th>
                        
                    </th>
                    <th class="text-left">
                        Cliente
                    </th>
                    <th class="text-left">
                        Modelo
                    </th>
                    <th class="text-left">
                        Placa
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in autosFiltrados" :key="item.placa">
                    <td>
                        <!--<img-expandible></img-expandible>-->
                    
                    </td>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.modelo }}</td>
                    <td>{{ item.placa }}</td>

                    
                    <td>
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

const autos = ref([]);
const autosFiltrados = ref([]);
const isEdit = ref(false);
const editingCars = ref(null);
const search = ref('');

onBeforeMount(() => {
    loadCars();
});

const loadCars = async () => {
    const url = "http://localhost:3000/autos";
    const { data } = await axios.get(url);
    autos.value = data;
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

    const url = `http://localhost:3000/autos/${item.id}`;
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
  background-color: #f5f5f5;
  color: #333;
  font-weight: bold;
  font-family: 'Arial, sans-serif'; /* Cambia el tipo de fuente */
  font-size: 16px; /* Cambia el tamaño de la fuente */
}
</style>
