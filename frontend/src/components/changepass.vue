<template>
<!-- Modification du mot de passe -->
   <section class=" color col-lg-6 col-md-6 mx-auto text-center shadow-lg border border-primary rounded-lg mt-5">
      <h1 class="h1 display-5 text-center "> Groupomania </h1> 
       <div class="white">
            <form @submit="changePass" class="needs-validation " action='' method="">
                <p v-if="errors.length" class="text-warning">
                    <ul>
                         <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                    </ul>
                </p>
                <p class="text-white">Veuillez remplir ce formulaire pour changer de mot de passe. </p> 
                 <!--email-->
                <div class="form-group col">
                    <label for="email" class="text-white">Saisissez votre email</label>
                    <input v-model="email" class="form-control color pl-5 p-4"  name="email" type="email" placeholder="Email" required/>
                    <i class="fa fa fa-user fa-fw " aria-hidden="true"></i>
                </div>
                <!--Password-->
                <div class="form-group  col">
                    <label for="pass" class="text-white">Saisissez votre nouveau mot de passe</label>
                    <input class="form-control color pl-5 p-4" name="pass" v-model="pass" type="password" placeholder="new password" required/>
                    <i class="fa fa fa-lock fa-fw " aria-hidden="true"></i>
                </div>
                <div class="form-group  col">
                    <label for="password" class="text-white">Saisissez de nouveau votre nouveau mot de passe</label>
                    <input class="form-control color pl-5 p-4" name="password" v-model="password" type="password" placeholder="new password" required/>
                    <i class="fa fa fa-lock fa-fw " aria-hidden="true"></i>
                </div>
                <button class="login__btn col-lg-4 col-7 white color m-5 " type="submit" > Valider  
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
   name: 'changepass', 
    data () {
       return { 
        errors:[],
        users: Array,
        email: null,
        pass: null,
        password: null,
        token: localStorage.getItem("token") || null,
        }
    },
    
   //envoie de la requete login
    methods:{
        validEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        } ,
        changePass: function (e) {
        //Regex password un maj, un chiffre, un caractère spécial, min:8, max:15
        const regexP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,})$/;
        this.errors = [];
         if(this.pass !== this.password) {
            this.errors.push('Mot de passe non identique !');
            alert("Mot de passe non identique !")
        }
        else if (!regexP.test(this.password)){
            this.errors.push("Mot de passe incorrect !");
            }

        if (!this.email) {
            this.errors.push('Email required!');
        } else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
        }else if (this.errors.length === 0) {
            axios.put('http://localhost:3000/updatePassword', {
                email: this.email,
                password: this.password })
                .catch((error) => { 
                    this.errors = []; 
                    if (error) {
                        this.errors.push(error);
                    }
                })
                .then((response) => {
                    alert("Votre mot de passe à été bien modifier !")
                    this.errors = [];
                    if (!this.errors.length){ 
                        console.log(response)
                        this.$router.push("/")
                    }
                })
                .catch((error) => (console.log(error)))
                e.preventDefault();
            
            }
        },  
    }    
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
    position: absolute; left: 2rem; top: 2.8rem;
    font-size: 1.4rem;
    color: #fff;
}

</style>