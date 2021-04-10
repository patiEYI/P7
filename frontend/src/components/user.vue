<template>
<!-- Récupération d'un utilisateur -->
    <section class="mx-auto text-center shadow-lg profil" >
       <div class="mt-5"> 
           <div  v-for="(user,id) in User" v-bind:key="id">
                <div class="text-center mx-auto">
                    <div class="profil__img pb-4">
                        <img v-if='user.image_url !== null || ""' :src="user.image_url" alt="photo-Profil" class="rounded-circle profil__img border border-primary mt-4" />
                        <img  v-else src="../assets/icon.png" alt="photo-Profil-default" class="profil__img justify-content-left rounded-circle border border-primary mt-4"/>
                    </div>
                </div>
                <div class="profil__info mx-auto text-left mb-3 shadow-lg ">
                    <p class="text-center mt-4 ">
                        Informations du compte
                        <router-link to="/changeprofil" >
                            <i class="fas fa fa-edit p-1 "></i>
                        </router-link> 
                    </p> 
                    <h4 class="text-center col" >
                        {{ user.lastname }} {{ user.firstname }} 
                    </h4>
                    <h6 class="text-center col ">{{ user.role }} </h6>
                    <button class="text-white py-0 btn offset-2 btn-ligth button__delete" @click="deleteOneUser()">
                        <span class="button__display border shadow-lg px-1">Supprimer le compte</span>
                    </button>   
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
    components: { Logo,Back },
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
.profil {
    min-width:600px; max-width:700px;
    border: solid 0.5px #01215E;
    overflow: hidden;
    background-image:linear-gradient(to bottom, rgba(241, 241, 159, 0.5), rgba(214, 214, 250, 0.5)),
    url("http://images.nike.com/is/image/emea/PDP_HERO/Nike-Roshe-Run-Print-Womens-Shoe-599432_674_A_PREM.jpg");
    background-size: contain; 
    font-family:sans-serif;
    &__img {
        width :200px;
        height:200px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
    &__info {
        width:350px;
        border: solid 1px #3a3d42;
        background-color:#01215E;
        border-radius: 2rem;
        color: #fff;
        text-align: center;
    }
    &__btn {
    border-radius: 2rem;
    font-size: 1.1rem;
}
    .fa-edit{
        font-size: 1.5rem;
    }
}
</style> 