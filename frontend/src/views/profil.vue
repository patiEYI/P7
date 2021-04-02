<template>
    <section class="mx-auto text-center shadow-lg" id="admin" 
    style="min-width:600px; max-width:700px;" >
       
       <div class="mt-5"> 
            <Navbar />
           <div class="" v-for="(user,id) in User" v-bind:key="id">
                <div class="text-center mx-auto">
                    <img class="card-img img-responsive" height="700px"
                    src="http://images.nike.com/is/image/emea/PDP_HERO/Nike-Roshe-Run-Print-Womens-Shoe-599432_674_A_PREM.jpg" alt="Card image">

                    <!-- userId.image_url -->
                    <div class="user_img ">
                        <img class="rounded-circle  border border-primary" 
                        v-if='user.image_url !== null || ""'
                        :src="user.image_url"
                        width="200px"
                        height="200px"
                        alt="photo-Profil"
                    />
                    <!--  -->
                        <img
                        v-else
                        src="../assets/icon.png"
                        width="200px"
                        height="200px"
                        class=" justify-content-left  rounded-circle border border-primary"
                        alt="photo-Profil-default"
                        />
                    </div>
                </div><hr>
                 
                <!--user-->
                
                    <div class="user mx-auto text-left mt-2 shadow-lg block" 
                    style="width:500px;"
                    >
                        
                        <div class="user text-center m-4 mx-auto " style="width:470px;">
                            
                            <h5> Compte professionnel <router-link to="/formuser" class="col-4">
                            <i class="fas fa fa-edit border border-primary p-1"></i> 
                            <button
                            class="mb-2 btn border-danger btn-ligth text-danger py-0 mt-2 offset-2 shadow-lg" 
                            @click="deleteOneUser()"
                            >s
                            </button>
                            </router-link>
                            </h5>
                            <hr/>
                            <h5 class="card-title col" >Nom : {{ user.lastname }} </h5>
                            <h5 class="card-text col mt-2"> Prenom : {{ user.firstname }} </h5>
                            <h5 class="card-text col"> role :  {{ user.role }} </h5>
                            <hr/> 
                        </div>
                    </div>
                </div>
            </div> <hr>
       
     
         <Logo/>
        <Back/>

    </section>
</template>
<script>
import Logo from '@/components//logo.vue'
import Back from '@/components//back.vue'
import axios from 'axios'
import Navbar from '../components/navbar.vue'
export default {
    name: "profil",
    components: {
         Logo,Back, Navbar,
        
    },
    data () {
        return {
            userId: localStorage.getItem("userId"),
            User : []          
          
        }
        
    },
    

    created() {
        this.User = []; 
        axios.get(`http://localhost:3000/users/${this.userId}`)
         .then(
          (response) => (
          (this.User = response.data), console.log(this.User)
        )
      )
      .catch((error) => console.log(error));
    },
    methods: {
         // Supprimer un user
        async deleteOneUser() {
        alert("Vous êtes sûr le point de supprimer votre compte !")
        await axios.delete(`http://localhost:3000/users/${this.userId}`)
        .then((response) => {
          console.log(response), this.$router.go("/");
          localStorage.clear();
          sessionStorage.clear();
        })
        .catch((error) => console.log(error));
    },
    }
    
}
</script>
<style scoped>
section {
    border: solid 0.5px #01215E;
    overflow: hidden;
    

}

.user_img {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
   
}
.color {
   border-radius: 2rem; 
   font-size: 1.3rem;
   color: white;
}
.user{
    border: solid 1px #3a3d42;
    background-color:#01215E;
    border-radius: 2rem;
    color: #fff;
}

.btn-danger {
    border-radius: 2rem;
    font-size: 1.1rem;
}
.card {
border: none;
border-radius: 2rem;
background-color: #f5f5f5;
margin:0;
}






 
</style>   