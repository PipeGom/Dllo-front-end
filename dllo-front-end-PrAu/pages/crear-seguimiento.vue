<template>
    <div>
      <Formulario />
    </div>
</template>
  
<script>
import Formulario from '../components/GuardarSeguimiento.vue';

export default {
components: {
    Formulario,
    }
};

definePageMeta({
layout: "blank",
});
</script>
  