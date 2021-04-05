<template>
<!-- S'incrire -->
    <div  class="mx-auto p-4">
   
        <div  mt-5 >
          <Inscription/>
        </div>
    
    </div>
    
</template>
<script>
import Inscription from '../components/inscription.vue'
export default {
  name: 'signup',
  components: { Inscription },  
}
</script>
<style scoped></style>