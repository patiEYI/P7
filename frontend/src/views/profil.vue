<template>
<!-- Profil de l'utilisateur connecter -->
    <div  class="mx-auto mt-5">
      <div>
        <Navbar/><hr>
        <User class="mt-5 rounded-lg"/>
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