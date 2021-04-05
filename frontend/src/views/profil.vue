<template>
<!-- Profil de l'utilisateur connecter -->
    <div  class="mx-auto">
        <div>
           <Navbar/><br><br><br>
           <User/>
        </div>
    </div>
    
</template>
<script>
import Navbar from '../components/navbar.vue'
import User from '../components/user.vue'
export default {
  name: 'profil',
  components: {Navbar, User,},
     
}
</script>
<style scoped></style>  