<template>
    <div>
        <v-btn color="primary" @click="dialog = true">
            Añadir un vehiculo
        </v-btn>

        <v-dialog v-model="dialog" width="80%" persistent>
            <v-card>
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
                            <v-text-field label="Nombre Completo *" v-model="auto.modelo" required placeholder="Ingrese el Nombre del cliente" />
                            <v-row>
                           <v-col>
                                <v-text-field label="Cédula *" v-model="auto.modelo" required placeholder="Ingrese la cédula del cliente" />
                           </v-col>
                           <v-col>
                                <v-text-field label="Número de contacto *" v-model="auto.modelo" required placeholder="Ingrese el número teléfonico del cliente" />
                            </v-col> 
                            </v-row>
                            <v-text-field label="Correo" v-model="auto.modelo" placeholder="Ingrese el correo del cliente" />
                            <v-text-field label="Dirección" v-model="auto.modelo" placeholder="Ingrese la dirección del cliente" />
                        </v-card>

                        <v-card>
                            <v-card-title>
                                <span class="headline">Información del Vehiculo</span>
                            </v-card-title>
                                <v-text-field label="Modelo" v-model="auto.modelo" required placeholder="Ingrese el modelo del vehiculo" />
                                <v-text-field label="Marca" v-model="auto.placa"  required placeholder="Ingrese la Marca" />
                                <v-text-field label="Placa" v-model="auto.placa"  required placeholder="Ingrese la placa del vehiculo" />
                        </v-card>
                            

                        
                        
                        <v-btn type="submit">Enviar</v-btn>

                    </form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">Cerrar</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import axios from "axios";

// Variables
const auto = ref({})
const dialog = ref(false)


const saveCar = async () => {
    console.log("values de los autos", auto.value)
    const result = await axios.post("http://localhost:3000/autos", auto.value)

    location.reload()
}




</script>