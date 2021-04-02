<template>
  <section id="forum"
    class="d-lg-flex mx-auto" style=" min-width:700px; max-width:1100px;"
  >
  
   <!-- div1 -->
    <div class="py-2 align-items-center d-none d-sm-block d-md-none d-lg-block col-3"
    style="background-color:#D8DFE3"
    >
    </div>

     <div class="mx-auto mt-5">
        <!-- corps/> -->
        <Navbar class="mb-5"/><br><br><br>
        <Userpost/>
         
        </div>
     
    <div class="py-5 d-none d-sm-block d-md-none d-lg-block  col-3"
    style="background-color:#D8DFE3"
    >
    </div>
  </section>
</template>
 
<script>
import Navbar from '../components/navbar.vue'
import Userpost from '../components/userpost.vue'
export default {
 name: 'forum',
	components: {
Userpost,
Navbar
	}, 
 
}
</script>

<style scoped lang="scss">


</style>