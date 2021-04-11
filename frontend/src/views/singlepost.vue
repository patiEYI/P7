<template>
<!-- Récupération d'un poste -->
    <div class="mx-auto shadow-lg post">
        <div class="mx-auto p-2">
          <Navbar/><hr><br>
          <div class="load mt-5"><Loader/></div>
          <Post/>
          
        </div>
    </div>
    
</template>
<script>
import Loader from '../components/loader.vue'
import Navbar from '../components/navbar.vue'
import Post from '../components/post.vue'
export default {
  name: 'singlepost',
  components: { Post, Navbar, Loader },
    
}
</script>
<style scoped lang="scss">
.load{
  // line-height: 100px;
  z-index: 30;
}
</style>