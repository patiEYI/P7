<template>
<!-- L'utilisateur récupère tous ses postes -->
  <section id="forum" class="d-lg-flex mx-auto size">
    <div class="py-2 align-items-center d-none d-sm-block d-md-none d-lg-block col-3 bg-color">
    </div>
      <div class="mx-auto mt-5">
        <Navbar class="mb-5"/><br><br><br>
        <Userpost/> 
      </div>
     
    <div class="py-5 d-none d-sm-block d-md-none d-lg-block  col-3 bg-color">
    </div>
  </section>
</template>
<script>
import Navbar from '../components/navbar.vue'
import Userpost from '../components/userpost.vue'
export default {
 name: 'forum',
	components: { Userpost, Navbar}, 
}
</script>
<style scoped lang="scss">
</style>