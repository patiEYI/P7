<template>
<!-- Profil de l'utilisateur connecter -->
    <div  class="mx-auto mt-5">
      <div>
        <Navbar/><hr><br>
        <div class="mt-5"><loader/></div>
        <User class="mt-5 rounded-lg"/>
      </div>
    </div>
    
</template>
<script>
import Loader from '../components/loader.vue'
import Navbar from '../components/navbar.vue'
import User from '../components/user.vue'
export default {
  name: 'profil',
  components: {Navbar, User, Loader,},
     
}
</script>
<style scoped></style>  