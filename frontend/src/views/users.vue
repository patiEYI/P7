<template>
<!-- Affichage de tous les utilisateurs -->
  <div  class="mx-auto p-4" style=" min-width:700px; max-width:1100px; background-color:#D8DFE3; ">
    <div class="mt-5">
      <Navbar/>
      <Users/>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/navbar.vue'
import Users from '../components/users'

export default {
  components: { Users,Navbar,  },
 
}
</script>
<style scoped lang="scss"></style>