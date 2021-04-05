<template>
<!-- Récupération d'un utilisateur -->
    <section class="mx-auto text-center shadow-lg" id="admin" 
    style="min-width:600px; max-width:700px;" >
       
       <div class="mt-5"> 
           <div  v-for="(user,id) in User" v-bind:key="id">
                <div class="text-center mx-auto">
                    <div class="user_img ">
                        <!--Button pour supprimer le compte -->
                        <img class="rounded-circle  border border-primary mt-4" 
                        v-if='user.image_url !== null || ""'
                        :src="user.image_url"
                        width="200px"
                        height="200px"
                        alt="photo-Profil"
                        />
                        <img
                        v-else
                        src="../assets/icon.png"
                        width="200px"
                        height="200px"
                        class=" justify-content-left  rounded-circle border border-primary mt-4"
                        alt="photo-Profil-default"
                        />
                    </div>
                </div>
                <!--Profil-->
                <div class="user mx-auto text-left mb-3 shadow-lg " 
                style="width:350px;"
                >
                    <div class="user m-4 mx-auto p-3" >
                        <h3 class="card-title col" >{{ user.lastname }} {{ user.firstname }} 
                            <router-link to="/changeprofil" >
                            <i class="fas fa fa-edit p-1 "></i>
                            </router-link>
                        </h3>
                        <h5 class="card-text col ">{{ user.role }} </h5>
                        <button
                        class="mb-2 btn border-danger btn-ligth text-danger py-0 mx-auto shadow-lg" 
                        @click="deleteOneUser()"
                        >supprimer le compte
                        </button>   
                    </div>
                </div>
            </div>
        </div> 
        <Logo class="mt-5"/>
        <Back/>
    </section>
</template>
<script>
import Logo from '@/components//logo.vue'
import Back from '@/components//back.vue'

import axios from 'axios'
export default {
    name: "user",
    components: { Logo,Back},
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
<style scoped lang="scss">
section {
    border: solid 0.5px #01215E;
    overflow: hidden;
    background-image:linear-gradient(to bottom, rgba(241, 241, 159, 0.5), rgba(214, 214, 250, 0.5)),
    url("http://images.nike.com/is/image/emea/PDP_HERO/Nike-Roshe-Run-Print-Womens-Shoe-599432_674_A_PREM.jpg");
    background-size: contain; 
    font-family:sans-serif;
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
.fa-edit{
    font-size: 2rem;
}
h3{
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
</style> 