<template>
<!-- Récupération de tous les post /page forum -->
  <section id="forum"
  class="d-lg-flex mx-auto" style=" min-width:700px; max-width:1100px;">
  
    <div class="py-2 align-items-center d-none d-sm-block d-md-none d-lg-block col-3"
      style="background-color:#D8DFE3">
    </div>

    <div class="mx-auto">
      <Navbar/><br><br>
      <hr>
      <Formpost /> 
      <Posts/>    
    </div>
   
    <div class="py-5 d-none d-sm-block d-md-none d-lg-block  col-3"
      style="background-color:#D8DFE3" >
    </div>
  </section>
</template>
 
<script>
// @  alias to /src
import Posts from '@/components/posts.vue'
import Formpost from '@/components/formpost.vue'
import Navbar from '../components/navbar.vue'

export default {
 name: 'forum',
	components: {
    Posts, Formpost, Navbar,

	},

}
</script>

<style scoped lang="scss">


</style>