<template >
<!-- Barre de navigation -->
  <div class="navigation" >
    <nav class="navbar fixed-top justify-content-around  bg-info navbar-light ">
      <router-link class="navbar-brand text-dark forum " to="/forum"  aria-current="page" > 
        <i class="fa fa-home" aria-hidden="true"></i>
      </router-link>
      <router-link class="navbar-brand text-dark" to="/users" >
        <i class="fa fa-users " aria-hidden="true"></i></router-link>
      <router-link class=" navbar-brand text-dark"  to="/profil/:userId">
        <i class="fa fa fa-user fa-fw " ></i></router-link>
      <router-link class="navbar-brand text-dark" to="/userpost" >
        <i class="fas fa fa-edit"></i> </router-link>
      <router-link  @click="signOut" class="navbar-brand text-dark" to="/">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02"></div>
    </nav>
  </div> 
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      postId: localStorage.getItem("postId") 
    };
  },
  methods: {
    signOut() {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      sessionStorage.removeItem("postId");
    }
  }
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