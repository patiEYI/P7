<template>
<!-- Modification d'un poste -->
    <div  class="mx-auto p-4 userpost size">
        <div class="p-2">
            <Navbar/><br>
            <Modifypost/>  
        </div>
    </div>
</template>
<script>
import Modifypost from '../components/modifypost.vue'
import Navbar from '../components/navbar.vue'
export default {
  name: 'changeprofil',
  components: { Navbar ,Modifypost },  
}
</script>
<style scoped>
</style>