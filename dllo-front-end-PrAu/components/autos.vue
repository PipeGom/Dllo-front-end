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
                        <!-- <v-btn icon="mdi-pencil" variant="text" @click="editTask(item)">
                        </v-btn>
                        <v-btn icon="mdi-delete-off" variant="text" @click="deleteTask(item)">
                        </v-btn> -->
                    </td>
                </tr>
            </tbody>
        </v-table>
        <tasks-edit-dialog v-if="editingTask != null" :dialog="isEdit" :task="editingTask" @update="updateTask" />
    </div>
</template>
<script setup>
import axios from "axios";
             
const autos = ref([])
// const isEdit = ref(false) //no
// const editingTask = ref(null) //no

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

/*
const deleteTask = async (item) => {
    const url = `http://localhost:3001/tasks/${item.id}`
    const { data } = await axios.delete(url)
    loadTasks()
}

const editTask = async (item) => {
    isEdit.value = true
    editingTask.value = { ...item }
    console.log(editingTask.value);

}

const updateTask = (isUpdated) => {
    console.log(isUpdated);
    isEdit.value=false
    editingTask.value=null
    loadTasks()
}
*/
</script>           