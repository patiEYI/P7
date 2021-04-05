<template>
<!-- Modification du profil de l'utilisateur  -->
    <div  class="mx-auto p-4" style=" min-width:700px; max-width:1100px;  ">
   
        <div  mt-5 >
            <Navbar/><br><br><br><br>
            <Formuser/>
        </div>
    
    </div>
    
</template>
<script>
import Formuser from '../components/formuser.vue'
import Navbar from '../components/navbar.vue'
export default {
  name: 'changeprofil',
  components: { Formuser, Navbar },  
}
</script>
<style scoped lang="scss"></style>