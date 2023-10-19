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
        <v-table>
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
                        <v-btn icon="mdi-delete-off" variant="text" @click="deleteCar(item)">
                        </v-btn> 
                    </td>
                </tr>
            </tbody>
        </v-table>
        <editar-auto v-if="editingCars != null" :dialog="isEdit" :cars="editingCars" @update="updateTask" />
        
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

const deleteCar = async (item) => {
    const url = `http://localhost:3000/autos/${item.id}`;
    const { data } = await axios.delete(url);
    loadCars();
};

const editCar = async (item) => {
    isEdit.value = true;
    editingCars.value = { ...item };
};

const updateTask = (isUpdated) => {
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













</script>

