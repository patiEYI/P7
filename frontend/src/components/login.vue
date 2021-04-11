<template>
<!-- Connexion de l'utilisateur -->
   <section class="login color col-lg-4 col-md-6 mx-auto text-center shadow-lg border border-primary rounded-lg mt-5">
      <h1 class="h1 display-5 text-center "> Groupomania </h1>  
       <div class="white">
            <form @submit="checklogin" class="login__form " action='' method="">
                 <p v-if="errors.length" class="text-warning">
                    <ul>
                       <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                    </ul>
                </p>
                 <!--email-->
                <div class="form-group col login__email">
                    <label for="email"></label>
                    <input class="form-control color pl-5 p-4" name="email" type="email" 
                    v-model.trim="email" placeholder="Email" required />
                    <i class="fa fa fa-user fa-fw " aria-hidden="true"></i>
                </div>
                <!--Password-->
                <div class="form-group  col login__password">
                    <label for="password"></label>
                    <input class="form-control color pl-5 p-4" name="password"
                    v-model.trim="password" type="password" placeholder="password" required/>
                    <i class="fa fa fa-lock fa-fw " aria-hidden="true"></i>
                </div>
                <router-link to="/password"><p class="text-white"> Mot de passe oublier ?</p> </router-link>
                <button  class="login__btn col-lg-4 col-7 text-white color m-5 " type="submit"> 
                    Connexion  
                </button>
            </form>
        </div>
        <ul> 
           <li class="connexion mt-5"> Nouvelle Connexion ? <router-link to="/signup" class="signup__link text-center"> S'inscrire</router-link> </li>
        </ul>
    </section>
</template>

<script>
import axios from "axios"
export default {
   name: 'login', 
    data () {
       return { 
        errors: [],
        email: null,
        password: null,
        token: localStorage.getItem("token") || null,
        }
    }, 
   //envoie de la requete login
    methods:{
        validEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        },

        checklogin: function () {
        this.errors = [];
        if (!this.validEmail(this.email)) {
            this.errors.push('Valid email required.');
        }else { 
            axios.post('http://localhost:3000/login', {
                email: this.email,
                password: this.password   })
                .catch((error) => {  
                    this.errors = [];
                    if (error) {
                        console.log(error);
                        this.errors.push(error);
                    }
                    alert(error)
                })
                .then((response) => {
                    localStorage.clear();
                    const token = (this.token = response.data.token);
                    const userId = response.data.userId;
                    localStorage.setItem("token", token),
                    localStorage.setItem("userId", userId),
                    console.log(response)
                    this.$router.push("/forum")
                    
                })
                .catch((error) => (console.log(error))
            );}
        }  
    },    
}
</script>

<style scoped lang="scss">
.form__login {
  padding-bottom: 20%;
  padding-top: 10%;
}
input{
    border-radius: 2rem;
    background-color: #01215E; 

}
i {
    position: absolute; left: 2rem; top: 2.3rem;
    font-size: 1.4rem;
    color: #fff;
}
</style>