<template>
<!-- Affichage de tous les utilisateurs -->
  <div  class="mx-auto p-4 size bg-color">
    <div class="mt-5">
      <Navbar/><br>
      <div class="mt-5"><Loader/></div>
      <Users/>
    </div>
  </div>
</template>
<script>
import Loader from '../components/loader.vue'
import Navbar from '../components/navbar.vue'
import Users from '../components/users'

export default {
  components: { Users,Navbar, Loader,  },
 
}
</script>
<style scoped lang="scss"></style>