<template>
<!-- Modification d'un poste -->
    <div  class="mx-auto p-4" style=" min-width:700px; max-width:1100px;  ">
   
        <div  mt-5 >
            <Navbar/><br><br><br><br>
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
<style scoped></style>