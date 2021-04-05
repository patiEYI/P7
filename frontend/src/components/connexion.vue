<template>
<!-- Connexion de l'utilisateur -->
   <section class=" color col-lg-6 col-md-6 mx-auto text-center shadow-lg border border-primary rounded-lg mt-5">
      <h1 class="h1 display-5 text-center "> Groupomania </h1>  
       <div class="white">
            <form @submit="checklogin" class="needs-validation "
                action=''
                method="post"
                >
                 <p v-if="errors.length" class="text-warning">
                    <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                    </ul>
                </p>
                 <!--email-->
                <div class="form-group col">
                    <label for="email"></label>
                    <input class="form-control color pl-5 p-4" 
                    name="email" type="email" 
                    v-model="email" placeholder="Email" required/>
                    <i class="fa fa fa-user fa-fw " aria-hidden="true"></i>
                </div>
                <!--Password-->
                <div class="form-group  col">
                    <label for="password"></label>
                    <input class="form-control color pl-5 p-4" name="password"
                    v-model="password" type="password" placeholder="password" required/>
                    <i class="fa fa fa-lock fa-fw " aria-hidden="true"></i>
                </div>
                <router-link to="/password"><p class="text-white"> Mot de passe oublier ?</p> </router-link> 
                <button  class="sub_btn col-lg-4 col-7 white color m-5 " type="submit" 
                > Connexion  
                </button>
            </form>
        </div>
        <ul> 
            <li class="connexion mt-5"> Nouvelle Connexion ? <router-link to="/signup" class="signup_link text-center"> S'inscrire</router-link> </li>
        </ul>
    </section>
</template>

<script>
import axios from "axios"
export default {
   name: 'connexion', 
    data () {
       return { 
        errors:[],
        users: Array,
        email: null,
        password: null,
        token: localStorage.getItem("token") || null,
        }
    },
    
   //envoie de la requete login
    methods:{
        checklogin: function (e) {
        
        // Regex password un maj, un chiffre, un caractère spécial, min:8, max:15
        const regexP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,})$/;
        
        this.errors = [];
        if (!this.email) {
            this.errors.push('Email required!');
        } else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
        }else if (!regexP.test(this.password)){
        this.errors.push("Mot de passe incorrect !");
        }else if (this.errors.length === 0) { 
            //login post
            axios.post('http://localhost:3000/login', {
                email: this.email,
                password: this.password   })
                .catch((error) => {  
                    this.errors = [];
                    if (error) {
                        this.errors.push(error);
                    }
                })
                .then((response) => {
                    if (!this.errors.length){ 
                        const token = (this.token = response.data.token);
                        const userId = response.data.userId;
                        localStorage.setItem("token", token),
                        localStorage.setItem("userId", userId),
                        console.log(response)
                        this.$router.push("/forum")
                    }
                    console.log(response)
                })
                .catch((error) => (console.log(error)));
                e.preventDefault();
           }
        },
        validEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        },
        
    },    
}
</script>

<style scoped lang="scss">
form {
  padding-bottom: 20%;
  padding-top: 10%;
  input{
    border-radius: 2rem;
    background-color: #01215E; 

  }
}
i {
    position: absolute; left: 2rem; top: 2.3rem;
    font-size: 1.4rem;
    color: #fff;
}


</style>