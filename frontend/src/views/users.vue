<template>
<!-- Affichage de tous les utilisateurs -->
  <div  class="mx-auto p-4 size bg-color">
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