<template>
    <div class="mt-3">
        <h3>Listado de autos</h3>
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Modelo
                    </th>
                    <th class="text-left">
                        Placa
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in autos" :key="item.placa">
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
<script setup>
import axios from "axios";
             
const autos = ref([])
const isEdit = ref(false) //no
const editingCars = ref(null) //no

onBeforeMount(() => {
    loadCars()
})
console.log("camilo")
const loadCars = async () => {
    const url = "http://localhost:3000/autos"
    const { data } = await axios.get(url)
    autos.value = data
    console.log("hola mani:", autos.value)
}              


const deleteCar = async (item) => {
    const url = `http://localhost:3000/autos/${item.id}`
    const { data } = await axios.delete(url)
    loadCars()
}

const editCar = async (item) => {
    isEdit.value = true
    editingCars.value = { ...item }
    console.log(editingCars.value);

}

const updateTask = (isUpdated) => {
    console.log(isUpdated);
    isEdit.value=false
    editingCars.value=null
    loadCars()
}

</script>           