<template>
    <div class="container">
    <v-card class="carta">

      <v-form  ref="form1" fast-fail @submit.prevent @submit="buscarUsuario" >
        <v-text-field
        v-model="nameBuscar"

        
        label="Matricula"
        required
        
        
      ></v-text-field>
      <v-card-text class="textos">Automovil: {{car.marca}} {{ car.modelo }}</v-card-text>
      <v-card-text class="textos">Comentario: {{car.descripcion}}</v-card-text>

      <v-btn type="submit" class="boton" >Buscar</v-btn>
      </v-form>
      </v-card>
      </div>


<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
rel="stylesheet">
<v-row justify="center">
    <v-col>
      <v-dialog
        transition="dialog-bottom-transition"
        width="70%"
      >
        <template v-slot:activator="{ props }">
          <v-col>
          <v-btn
          elevation="8"
          block rounded="lg"
          class="editButton"
          color="primary"
          v-bind="props"
          >
          <span style="margin-right: 5%;"  class="material-icons">
          published_with_changes
          </span>
          Agregar Seguimiento</v-btn>
        </v-col>
        <v-col>
      </v-col>
      <v-col>
      </v-col>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar
              color="rgba(255, 183, 77)"
              title="Actualizando Auto"
            ></v-toolbar>
              <v-form @submit.prevent="PostApi" class="frm1">
                <v-card-text disabled hidden variant="solo-inverted" v-model="id_auto" label="ID del auto" required>{{ car.id }}</v-card-text>
                <v-text-field disabled variant="solo-inverted">El id del auto es: {{ car.id }}</v-text-field>
                <v-text-field variant="solo-inverted" v-model="price" label="Coste de la reparacion" required></v-text-field>
                <v-text-field variant="solo-inverted" v-model="time" label="Tiempo estimado" required></v-text-field>
            <v-card-actions class="justify-end">
              <v-btn 
               class="boton" type="submit">Guardar</v-btn>
              <v-btn class="boton" variant="text" @click="isActive.value = false">Cancelar</v-btn>
            </v-card-actions>
          </v-form>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>

</template>
<style scoped>
.frm1{
  padding: 2%;
}
.mainCard{
  padding: 5px;
  margin-block: 2%;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.896);
  
}
.boton{
min-width: 20%;
width: 20%; 
margin-inline-end: 2%;
margin-top: 1%;
border: 2px solid rgba(255, 183, 77);
transition: background-color 0.4s;
background-color: rgba(215, 204, 200, 0.8);
}
.boton:hover{
background-color: rgba(255, 183, 77);
color:white;
}
.editButton{
  margin-bottom: 1%;
}
.textos{
  background-color: #e1e0e0;
  border-radius: 12px;
  margin-block: 1%;
}
.banner{
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.896);
  font-size: x-large;
  font-style: italic;
  text-align: center;
}

.carta{
  padding: 2%;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.734);
}
</style>
<script>
import Swal from 'sweetalert2'
import axios from 'axios';
const baseURL="http://localhost:3000/seguimiento";
import articulo_inventario from './articulo_inventario.vue';
  
/*onBeforeMount(() => {
    loadCars();
});

const loadCars = async () => {
    const url = "http://localhost:3000/autos";
    const { data } = await axios.get(url);
    autos.value = data;
    filtrarAutos();
};*/

export default{
  name:"App",
  data(){
    return{
      dialog: false,
      seguimiento:[],
      car:[],
      id:0,
      
      price:null,
      time:null,
    }
  },
  mounted() {
    this.GetApi();
  },
  methods:{
      async GetApi(){
      await axios
      .get(baseURL)
      .then((resp)=>{
          this.seguimiento = resp.data})
      .catch((err)=>{
          console.log(err);
      });
      },
      async PostApi(){
      await axios
      .post(baseURL,{
        precio_reparacion:parseInt(this.price),
        horas_reparacion:parseInt(this.time),
        id_auto: parseInt(this.car.id)
      })
      .then(resp=>{
          console.log(resp);
          this.GetApi();
          alert("El seguimiento ha sido registrado ");
      })
      .catch(err=>{
          console.log(err);
      });
    },
    async DeleteApi(id){
      await axios
      .delete(baseURL+'/'+id)
      .then((resp)=>{
          console.log(resp);
          this.GetApi();
      })
      .catch(err=>{
          console.log(err);
      });
    },
    async UpdateApi(id,precio_reparacion, horas_reparacion){
      await axios
      .put(baseURL+'/'+id,{
        precio_reparacion:precio_reparacion,
        horas_reparacion:horas_reparacion
      })
      .then((resp)=>{
          console.log(resp);
          this.GetApi();
      })
      .catch(err=>{
          console.log(err);
      });
    },
    validate(){
      if (!this.brand || !this.model || !this.price || !this.time || !this.comment) {
        // Muestra un mensaje de error o toma la acción adecuada cuando falten campos obligatorios
        // Por ejemplo:
        alert("Por favor, complete todos los campos obligatorios.");
      } else {
        // Si todas las validaciones pasan, continúa con el proceso de envío
        // Llama a la lógica de envío de la API aquí
        // Por ejemplo:
        this.PostApi();
      }
    },
    validateUpdate(id,marca,modelo,precio_reparacion, horas_reparacion, comentario){
      if (!marca || !modelo || !precio_reparacion || !horas_reparacion || !comentario) {
        // Muestra un mensaje de error o toma la acción adecuada cuando falten campos obligatorios
        // Por ejemplo:
        console.log(marca)
        alert("Por favor, complete todos los campos obligatorios.");
      } else {
        // Si todas las validaciones pasan, continúa con el proceso de envío
        // Llama a la lógica de envío de la API aquí
        // Por ejemplo:
        this.UpdateApi(id,marca,modelo,precio_reparacion, horas_reparacion, comentario);
        alert("Se realizaron los cambios con exito");
      }
    },
    validatePrice() {
    // Usamos una expresión regular para permitir solo números enteros o decimales con un punto
    this.price = this.price.replace(/[^0-9.]/g, '');
    this.time = this.time.replace(/[^0-9.]/g, '');
  },
  async buscarUsuario(){
    const validacion1 = await this.validateBuscar()
console.log(validacion1)

      if(validacion1){
            try{
            const responseBuscar = await axios.get('http://localhost:3000/autos');
            const autoJSON = responseBuscar.data.find(autos => autos.placa === this.nameBuscar);

            
            
              this.car = autoJSON
              this.id = parseInt(autoJSON.id)
              this.brand = autoJSON.marca
              this.model = autoJSON.modelo 
              this.comment = autoJSON.comentario
              console.log(this.car)
            if (autoJSON) {  
              Swal.fire({
                icon: 'success',
                title: 'Auto encontrado',
                text: '',
                footer: ''
              });
            } else{
              
              Swal.fire({
                icon: 'error',
                title: 'El Auto no existe',
                text: '',
                footer: ''
              });
            } } catch(error){
                  Swal.fire({
                    icon: 'error',
                    title: 'El usuario no existe',
                    text: '',
                    footer: ''
                  });
              console.error('Error al autenticar:', error);
            }  
          }else{
            Swal.fire({
                    icon: 'error',
                    title: 'Es necesario ingresar el nombre del usuario',
                    text: '',
                    footer: ''
                  });
          } 

},
async validateBuscar () {
    const { valid } = await this.$refs.form1.validate()
    console.log('Validation result for nameBuscar:', valid);
    return valid;
  },
  }
}
  </script>