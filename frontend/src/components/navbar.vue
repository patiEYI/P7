<template >
  <div  class="">
    <nav class="navbar fixed-top  navbar-light  justify-content-around  bg-info navbar-light ">
      <router-link class="navbar-brand text-white forum " to="/forum"  aria-current="page" > 
      <i class="fa fa-home" aria-hidden="true"></i></router-link>
      <router-link class="navbar-brand text-white" to="/users" ><i class="fa fa-users " aria-hidden="true"></i></router-link>
      <router-link class=" navbar-brand text-white"  to="/profil/:userId"><i class="fa fa fa-user fa-fw " ></i><slot></slot></router-link>
      <router-link class="navbar-brand text-white" to="/users" ><i class="fa fa-bell" aria-hidden="true"></i></router-link>
      <router-link class="navbar-brand text-white" to="/userpost" ><i class="fas fa fa-edit"></i> </router-link>
      <router-link class="navbar-brand text-white" to="/"><i class="fa fa-sign-out" aria-hidden="true"></i></router-link>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
       
      </div>
    </nav>
    
  </div>
 
</template>

<script>
export default {
   name: 'navbar'
}
</script>

<style scoped>
i {
  font-size: 2rem;
}
.forum{
  font-size: 2rem;
}



</style>