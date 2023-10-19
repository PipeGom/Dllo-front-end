<template>
  <div class="sw12-container">
    <v-btn color="primary" @click="dialog = true">
      Añadir un vehiculo
    </v-btn>
    <div class="sw12-container">
      <v-dialog v-model="dialog" width="80%" persistent append-to-body>
        <v-card class="sw12-containerx">
          <v-card-item>
            <v-card-title>Gestión de Vehiculos</v-card-title>
            <v-card-subtitle>Formulario para la gestión de los automoviles del taller.</v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <form action="javascript:void(0)" @submit="saveCar">
              <v-card>
                <v-card-title>
                  <span class="headline">Información del cliente</span>
                </v-card-title>
                <v-text-field label="Nombre Completo *" v-model="auto.nombre" required placeholder="Ingrese el Nombre del cliente" />
                <v-row>
                  <v-col>
                    <v-text-field label="Cédula *" v-model="auto.cedula" required placeholder="Ingrese la cédula del cliente" :rules="cedulaRulesx"/>
                  </v-col>
                  <v-col>
                    <v-text-field label="Número de contacto *" v-model="auto.numero" required placeholder="Ingrese el número teléfonico del cliente" :rules="telefonoRulesx"/>
                  </v-col>
                </v-row>
                <v-text-field label="Correo" v-model="auto.correo" placeholder="Ingrese el correo del cliente" :rules="emailRulesx"/>
                <v-text-field label="Dirección" v-model="auto.direccion" placeholder="Ingrese la dirección del cliente"/>
              </v-card>

              <v-card>
                <v-card-title>
                  <span class="headline">Información del Vehiculo</span>
                </v-card-title>
                <v-text-field label="Modelo *" v-model="auto.modelo" required placeholder="Ingrese el modelo del vehículo" />
                <v-text-field label="Marca *" v-model="auto.marca" required placeholder="Ingrese la Marca del vehículo" />
                <v-text-field label="Placa *" v-model="auto.placa" required placeholder="Ingrese la placa del vehículo" />
              </v-card>

              <v-btn type="submit" :disabled="!formIsValid">Enviar</v-btn>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed } from 'vue';
import Swal from 'sweetalert2'


const cedulaRulesx = [
  value => {
    if (!value) return 'El campo es obligatorio.';
    if (/^\d+$/.test(value)) {
      verificador2.value = true
      return true
    }
    else{
      verificador2.value = false
      return 'Debe ser un número.';
    }
  }
];

const telefonoRulesx = [
  value => {
      if (!value) return 'El campo es obligatorio.';
      if (/^\d+$/.test(value)) {
        verificador3.value = true
        return true
      }
      else{
        verificador3.value = false
        return 'Debe ser un número.';
      }
    }
]

const formIsValid = computed(() => {
  console.log("valdidaciones", verificador1 && verificador2)
  return (verificador2.value && verificador3.value);
});

const emailRulesx = [
  value => {
    if (/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(value)){
      console.log("mandala")
      verificador1.value = true;
      return true
    } 
    else{
      verificador1.value = false;
      return 'Correo no válido.';
    }
  },
];


// Variables
const auto = ref({})
const dialog = ref(false)
const verificador1 = ref(false)
const verificador2 =  ref(false)
const verificador3 = ref(false)


//-----------------------------------GUARDAR VEHICULO --------------------------------------

const saveCar = async () => {
  try {
    dialog.value = false
    console.log("dialogo", dialog.value)
    const result = await Swal.fire({
      title: 'Alerta de creación',
      text: '¿Esta seguro de guardar este auto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33'
    });
  if (result.isConfirmed){
    const response = await axios.post("http://localhost:3000/autos", auto.value)
    Swal.fire({
      title: 'Creación exitosa',
      text: 'El auto fue guardado correctamente.',
      icon: 'success',
    });
    
    cargarDatos()
  } else{
    Swal.fire({
              title: 'Guardado cancelado',
              text: 'El auto no fue guardado',
              icon: 'error',
            });
          }
  }catch (error) {
      Swal.fire({
            title: 'Error',
            text: 'Error al crear el artículo',
            icon: 'error',
          });
        }
  }

  // Por ejemplo, en el componente:
const cargarDatos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/autos'); // Reemplaza con la URL de tus datos
    // Actualiza tus datos en el componente, por ejemplo:
    // this.tusDatos = response.data;
    auto.value = response.data; // En Vue 3 con Composition API
  } catch (error) {
    console.error('Error al cargar los datos', error);
  }
};

  





</script>

<style>

</style>
<style>
.sw12-containerx {
  z-index: X;
}
.sw12-container {
  /* Agrega estilos para el contenedor principal */
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
}

.headline {
  /* Estilos para el título de sección */
  font-size: 20px;
  margin-bottom: 10px;
}

/* Agrega estilos personalizados para otros elementos según tus preferencias */
</style>


