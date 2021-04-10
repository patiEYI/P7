<template>
<!-- Récupération de tous les utilisateurs -->
  <section class="mx-auto mt-5 p-2 user">
    <div class="mx-sm-auto">
      <!-- Les collegues-->
      <div class="d-flex">
        <form class="mx-auto form-inline py-5 my-2 col-6">
          <input v-model="searchKey" id="search" class="form-control mr-sm-2" type="search" placeholder="Search firstname.." aria-label="Search"/>
        </form>
        <!-- Boutton Admin pour supprimer tous les collègues -->
        <button v-if="userId == 105"
          class="ml-2 btn text-white btn-ligth button__delete"  @click="deleteUser()" >
          <span class="button__display border shadow-lg p-1">Supprimer tous les utilisateurs</span>
        </button> 

      </div>
     
      <!-- Utilisateurs -->
      <div class="d-lg-flex row justify-content-around text-center justify-content-sm-between    justify-content-md-around">
        <div v-for="(user,id) in filteredList" v-bind:key="id" class="user__div animation p-2 shadow-lg mb-5">  
          <div>
            <button v-if="userId == user.id || userId == 105" class="btn text-white btn-ligth button__delete" 
              @click="deleteOneUser(user)">
              <span class="button__display border shadow-lg p-1">Supprimer</span>
            </button> 

            <div class="cursor mt-3">
              <img v-if="user.image_url !== null || ''"
              :src="user.image_url" width="100px" height="100px"
              class=" rounded-circle " alt="photo-collegue" 
              />
  
              <img
              v-else 
              src="http://images.nike.com/is/image/emea/PDP_HERO/Nike-Roshe-Run-Print-Womens-Shoe-599432_674_A_PREM.jpg"
              width="100px"
              class=" justify-content-left border border-primary rounded-circle rounded-circle"
              height="100px"
              alt="photo-collegue-default"
              />
                  
            </div>
            <div class="mx-auto text-center ">
              <hr/>
              <h6 class="card-title ">Nom : {{ user.lastname }} </h6> 
              <h6 class="card-text  mt-2"> Prenom : {{ user.firstname  }} </h6>
              <h6 class="card-text col"> Poste occupé : {{ user.role }} </h6>
              <hr/> 
            </div>
          </div>
        </div> 
      </div> 
    </div>
  </section>
</template>²

<script>
import axios from 'axios';
// import Post from './post.vue';



export default {
  name:"users",
  components: {},
  data() {
    return {
       users: [],
      searchKey: "",
      userId: localStorage.getItem("userId"),
    };
  },
  
  async created() {
  this.users = [];

    await axios.get("http://localhost:3000/users")
      .then(
        (response) => ((this.users = response.data), console.log(this.users))
      )
      .catch((error) => console.log(error));
  },
  

  computed: {
    filteredList() {
      return this.users.filter((user) => {
        if (user !== null) {
            return (user.lastname || '').includes(this.searchKey); 
        }   
      });
    },
  },
 
  methods: {
     // Supprimer un user
     async deleteOneUser(user) {
        alert("Vous êtes sûr le point de supprimer ce utilisateur !")
      await axios.delete(`http://localhost:3000/users/${user.id}`)
        .then((response) => {
          console.log(response), this.$router.go("/users");
        })
        .catch((error) => console.log(error));
    },
    
     // Supprimer tous les user
    async deleteUser() {
      alert("Vous êtes sûr le point de supprimer  tous les utilisateurs !")
      await axios.delete(`http://localhost:3000/users/`)
        .then((response) => {
          console.log(response), this.$router.go("/users");
        })
        .catch((error) => console.log(error));
    },
   
  },
};
</script>

<style scoped lang="scss">
.color {
  border-radius: 2rem; 
  font-size: 1.3rem;
  color: white;
}

.user{
  border: solid 1px #e0e2e6;
  background-color:#01215E;
  border-radius: 2rem;
  color: #fff;
  &__div{
    width:270px;

  }
    
}
.animation{
  transform: scale(1);
  transition: transform 400ms;
  &:hover{
    transform: scale(1.03);  
  }
}


</style>