<template>
<!-- Changer de mot de passe -->
    <div  class="mx-auto ">
        <div>
          <Changepass/>
        </div>
    </div>
    
</template>
<script>
import Changepass from '@/components/changepass.vue'
export default {
  name: 'password',
  components: { Changepass},  
   
}
</script>
<style scoped>

</style>