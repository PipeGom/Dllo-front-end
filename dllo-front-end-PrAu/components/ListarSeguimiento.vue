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
        fetch("http://localhost:3000/auto")
        .then((res) => res.json())
        .then((res) => this.auto = res)
    }
}
</script>