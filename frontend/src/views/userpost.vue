<template>
<!-- L'utilisateur récupère tous ses postes -->
  <section class="mx-auto size mt-5">
    <!-- <div class="py-2 align-items-center d-none d-sm-block d-md-none d-lg-block col-3 bg-color">
    </div> -->
      <div class="mx-autosize">
        <Navbar /><hr><br>
        <div class="mt-5"><loader/></div>
        <Userpost class="mb-5 rounded-lg"/> 
      </div>
    <!-- <div class="py-5 d-none d-sm-block d-md-none d-lg-block  col-3 bg-color">
    </div> -->
  </section>
</template>
<script>
import Loader from '../components/loader.vue'
import Navbar from '../components/navbar.vue'
import Userpost from '../components/userpost.vue'
export default {
 name: 'forum',
	components: { Userpost, Navbar, Loader}, 
}
</script>
<style scoped lang="scss">
section{
  max-width: 700px;
}
</style>