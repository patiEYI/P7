<template>
<!-- Récupération de tous les post /page forum -->
  <section id="forum" class="d-lg-flex size mx-auto">
    <div class="py-2 align-items-center d-none d-sm-block d-md-none d-lg-block col-3 bg-color">
    </div>
    <div class="shadow-lg">
      <Navbar/><br><br><hr>
      <Formpost/>
         <!-- loader -->
      <div class="mt-5"><Loader/></div>
      <div class="p-2 bg-info shadow-lg">
        <Posts/>     
      </div>  
    </div>
    <div class="py-5 d-none d-sm-block d-md-none d-lg-block  col-3 bg-color">
    </div>
  </section>
</template>
 
<script>
// @  alias to /src
import Posts from '@/components/posts.vue'
import Formpost from '@/components/formpost.vue'
import Navbar from '../components/navbar.vue'
import Loader from '../components/loader.vue'

export default {
 name: 'forum',
	components: {
    Posts, Formpost, Navbar,Loader,

	},

}
</script>
<style scoped lang="scss">
</style>