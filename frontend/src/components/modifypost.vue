<template>
<!-- Formulaire pour modifier un poste -->
    <section class="mx-auto shadow-lg">
        <form @submit.prevent="submit" enctype="multipart/form-data" class="mx-auto mt-5 needs-validation ">
            <div class="form-group col">
                <label class="text-primary" for="description"> Description</label>
                <textarea class="form-control" name="description" rows="3" placeholder="Modifie ton post..." v-model.trim="description" required>
                </textarea>
            </div>
            <div class="form-group col">
                <label class="mb-3 text-primary" for="image_url">
                    Ajouter une image: Jpg Jpeg ou Png ou multimedia: Mp4 accepter
                    <br /> Ps: Eviter les videos longues !!
                </label><br>
                <input type="file" ref="image" class="file-input" @change="upload" />
            </div>
            <!-- fin check formulaire -->
            <div class="form-group row d-flex align-item-center justify-content-center">
                <button type="submit" class="bg-light btn btn-outline-primary my-3 col-4 ">
                    Modifier
                </button>
            <!-- Erreurs apres vérification -->
            </div>
            <p v-if="errors.length" class="text-warning">
                <ul>
                   <li v-for="error in errors" v-bind:key="error" >{{ error }}</li>
                </ul>
            </p> 
        </form>
        <Logo class="text-center"/>
        <router-link to="/singlepost"> <Back/></router-link> 
    </section>
</template>
<script>
import Back from './back.vue'
import Logo from './logo.vue'
import axios from "axios"
export default {
  components: { Logo, Back },
    name: "modifypost",
     data() {
        return {
            errors:[],
            image: null,
            description: "",
            image_url: null || "",
            user_id: localStorage.getItem("userId") || null,
            postId: sessionStorage.getItem("postId")  
        }
    },
    methods: {
        //upload image ou video
        upload() {
        this.image = this.$refs.image.files[0];
        console.log(this.image);
        },
        // methode d'envoi formulaire avec une image et ou une video
        submit() {
            //regex 
            const regex = /^[\w]{3,}$/;
            if (!regex.test(this.description)) {
                this.errors.push("Certains caractères ne sont pas autorisé !")
            }else{ 
                const formData = new FormData();
                if (this.image !== null || "") {
                    formData.append("image", this.image, this.image.filename);
                    formData.append("description", this.description);
                    formData.append("user_id", this.user_id);
                } else {
                    formData.append("description", this.description);
                    formData.append("user_id", this.user_id);
                }
                axios.put(`http://localhost:3000/post/${this.postId}`, formData)
                    .then((response) => { console.log(formData), console.log(response);
                       this.$router.push("/forum");
                    })
                    .catch(
                        (error) => (console.log(error)
                    )
               );
            }
        }
    },

}
</script>
<style scoped lang="scss">
section{
    border: solid 1px #01215E;
    overflow: hidden;
    min-width:600px;
    max-width:700px;
}
</style>