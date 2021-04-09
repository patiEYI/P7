<template>
<!-- Récupération d'un poste -->
    <div  class="mx-auto shadow-lg">
        <div class="mx-auto p-2 size">
          <Navbar/><br><br>
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
<style scoped lang="scss"></style>