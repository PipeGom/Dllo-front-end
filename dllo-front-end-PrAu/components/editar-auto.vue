<template>
    <div>
        <v-dialog v-model="openDialog" width="80%">
            <v-card>
                <v-card-item>
                    <v-card-title>Edición de auto {{ editingCars.modelo }}</v-card-title>
                </v-card-item>
                <v-card-text>
                    <form action="javascript:void(0)" @submit="saveCarx" >

                        <v-text-field label="Modelo" v-model="editingCars.modelo" required placeholder="Ingrese el modelo del Vehiculo" />

                        <v-text-field label="Placa" v-model="editingCars.placa"
                            placeholder="Ingrese la placa del vehiculo" />


                        <v-btn type="submit">Enviar</v-btn>

                    </form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="openDialog = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
    </div>
</template>
<script setup>

const props = defineProps({
    dialog: {
        type: Boolean,
        required: true
    },
    cars: {
        type: Object,
        required: true
    }
})


const emit = defineEmits(['update'])

onBeforeMount(() => {
    editingCars.value = props.cars
    openDialog.value = props.dialog
})


import axios from "axios";
import Swal from 'sweetalert2'
// Variables
const editingCars= ref({})
const openDialog = ref(false)

const saveCar = async () => {
    const url = `http://localhost:3000/autos/${editingCars.value.id}`
    const result = await axios.put(url, editingCars.value)
    console.log(result);
    openDialog.value = false
    emit('update', true)
}

//----------------------------------------Editar Vehiculo----------------------------------------------


    
      
      const saveCarx = async () => {
        try {

            openDialog.value = false

          const result = await Swal.fire({
              title: 'alerta de actualización',
              text: '¿Esta seguro de actualizar este vehiculo?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Actualizar',
              confirmButtonColor: '#3085d6',
              cancelButtonText: 'Cancelar',
              cancelButtonColor: '#d33'
            });

          if (result.isConfirmed){

        const url = `http://localhost:3000/autos/${editingCars.value.id}`
        const result = await axios.put(url, editingCars.value)
        
        emit('update', true)
          Swal.fire({
            title: 'Actualización exitosa',
            text: 'El vehiculo fue actualizado correctamente.',
            icon: 'success',
          });

          
        } else{

            Swal.fire({
                  title: 'Eliminación cancelada',
                  text: 'El vehiculo no fue eliminado',
                  icon: 'error',
                });
            }

        }catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'Error al actualizar el vehiculo',
            icon: 'error',
          });
        }
      };
    

</script>