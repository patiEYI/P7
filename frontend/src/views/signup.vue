<template>
<!-- S'incrire -->
    <div  class="mx-auto p-4">
        <div  mt-5 >
          <Signup/>
        </div>
    </div>
    
</template>
<script>
import Signup from '../components/signup.vue'
export default {
  name: 'signup',
  components: { Signup },  
}
</script>
<style scoped></style>