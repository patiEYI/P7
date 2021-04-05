<template>
<!-- Formulaire pour modifier le profil -->
    <div style="min-width:600px; max-width:700px;background-color:#D8DFE3;" class="mx-auto shadow-lg pt-3">
        <form 
        @submit.prevent="submit"
        enctype="multipart/form-data"
        class="needs-validation ">
            <div class="form-group col">
                <label for="lastname">Nom</label>
                <input class="form-control  pl-5 p-4 shadow-md" 
                name="lastname" type="text" placeholder="Lastname"
                v-model.trim="lastname" required
                />
            </div>
            <div class="form-group col">
                <label for="firstname">Prenom</label>
                <input class="form-control  pl-5 p-4 shadow-md"
                name="firstname" type="text" placeholder="firstname"
                v-model.trim="firstname" required
                />
            </div>
            <div class="form-group col">
                <label for="role">Poste</label>
                <input class="form-control  pl-5 p-4 shadow-md"
                name="role" type="text" placeholder="role"
                v-model.trim="role" required
                />
            </div>
        
            <div class="form-group ml-2">
                <label class="mb-3  text-primary" for="image_url"
                >Ajouter une image/image default
                </label>
                <br />
                <input type="file"
                ref="image" class="file-input" @change="upload" />
            </div>
            <!-- @click modification d'un utilisateur-->
        <div class="form-group text-left ml-2">
                <button class="  bg-light btn btn-outline-primary mb-5 px-3 shadow-lg"
                type="submit">
                Modifier 
                </button>
            </div>
            <p v-if="errors.length" class="text-warning">
                <ul>
                <li v-for="error 
                in errors" v-bind:key="error" >{{ error }}</li>
                </ul>
            </p>
            
        </form>
        <Logo class="text-center"/>
        <router-link to="/profil/:userId"> <Back class="ml-0"/></router-link>  
    </div>   
</template>
<script>
import Back from './back.vue'
import Logo from './logo.vue'

import axios from 'axios'
export default {
    name: 'formuser',
    components: {Back, Logo },
    data (){
        return {
            userId: localStorage.getItem("userId"),
            errors:[],
            lastname: null,
            firstname: null,
            role: null,
            image:null || "",
            image_url: null
        }
    },

    methods: {
        // pour upload image 
        upload() {
        this.image = this.$refs.image.files[0];
        console.log(this.image);
        },

        submit() {
            //regex 
           const regex = /^[A-Z][A-Za-z(éèêà)-]+$/
            this.errors = [];
            
            if (!regex.test(this.lastname) || 
            !regex.test(this.firstname) || 
            !regex.test(this.role)) {
                this.errors.push('Format incorrect, certains caractères ne sont pas autorisé !');
            }else {  

                const formData = new FormData();
                if (this.image !== null || "") {
                    formData.append("image", this.image, this.image.filename);
                    formData.append("lastname", this.lastname);
                    formData.append("firstname", this.firstname);
                    formData.append("role", this.role);
                } else {
                    formData.append("lastname", this.lastname);
                    formData.append("firstname", this.firstname);
                    formData.append("role", this.role);
                }
            
                axios.put(`http://localhost:3000/users/${this.userId}`, 
                formData )
                .then((response) => {
                    console.log(formData);
                    console.log(response);
                    this.$router.push("/profil/:userId");
                })
            
                .catch((error) => console.log(error));
            }

        }
    }

}

</script>
<style scoped>
 ::placeholder {
    opacity: 0.4;
 }
 .add_img {
    color: #444;
 }
.color {
   border-radius: 2rem;
   color: #fff;
}

</style>