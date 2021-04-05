<template>
<!-- Récupération d'un poste -->
    <div  class="mx-auto p-4">
        <div class="mx-auto">
          <Navbar/><br><br><br>
          <Post/>
        </div>
    </div>
    
</template>
<script>
import Navbar from '../components/navbar.vue'
import Post from '../components/post.vue'
export default {
  name: 'singlepost',
  components: { Post, Navbar },
    
}
</script>
<style scoped lang="scss">
</style>