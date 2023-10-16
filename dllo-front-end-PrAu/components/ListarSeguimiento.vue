<template>
    <p>
        hola
    </p>

    <GuardarSeguimiento/>

    <div v-for="p in auto" key="p.id">
        {{ p.modelo }}
    </div>

</template>
<script>
import GuardarSeguimiento from './GuardarSeguimiento.vue';
import axios from 'axios';
const baseURL="http://localhost:3000/auto";

export default{
    components:{
        GuardarSeguimiento
    },
    data(){
        return{
            auto:[]
        }
    },
    mounted() {
        this.GetApi();
    },
    methods:{
        async GetApi(){
        await axios
        .get(baseURL)
        .then(resp=>{
            this.auto = resp.data})
        .catch(err=>{
            console.log(err);
        });
        }
    }
}
</script>