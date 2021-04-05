
<template>
<!-- Formulaire pour créer un poste -->
    <div  class="shadow-lg mx-auto"  style="min-width:600px;max-width:800px;">
        <div class="p-2"> 
            <!-- vérification du formulaire -->
            <p v-if="errors.length" class="text-warning">
                <ul>
                <li v-for="error 
                in errors" v-bind:key="error" >{{ error }}</li>
                </ul>
            </p> 

            <form
                @submit.prevent="submit"
                enctype="multipart/form-data"
                >
                <div class="form-group ">
                    <label class="text-primary" for="description"></label>
                    <textarea
                    class="form-control"
                    name="description"
                    rows="3"
                    placeholder="Que voulez vous dire?"
                    v-model.trim="description" required
                    ></textarea>
                </div>
            
                <div class="form-group ">
                    <label class="mb-3 text-primary" for="image_url"
                    >Ajouter une image: Jpg Jpeg ou Png ou multimedia: Mp4 accepter
                    <br />
                    Ps: Eviter les videos longues !!
                    </label>
                    <br />
                    <input type="file" ref="image"
                    class="file-input col" @change="upload" />
                </div>
            
                <div
                class="form-group  d-flex align-item-center justify-content-center"
                >
                    <div class="my-3 ">
                    <button
                    type="submit"
                    class="bg-light btn btn-outline-primary"  
                    >
                    Publier
                    </button>
                    </div>
                </div>
            </form>
        </div> 
    </div>
   
</template>

<script>
import axios from "axios"
 
export default {
    name: "formpost",
    data() {
        return {
            errors:[],
            image: null,
            titre: "",
            description: "",
            image_url: null || "",
            user_id: localStorage.getItem("userId") || null,
           
        }

    },
    methods: {
        // pour upload image ou video
        upload() {
        this.image = this.$refs.image.files[0];
        console.log(this.image);
        },

        //Envoie formulaire pour créer un post
        submit() {
            //regex 
            const regex = /^[\w,-]{3,}$/;

            if (regex.test(this.description)) {
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

                axios.post("http://localhost:3000/post",
                    formData
                )
                
                .then((response) => { console.log(response);
                    console.log(formData);
                    this.$router.go("/forum");
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
.container {
    background-color: #e0e7ee ;
    font-size: 1.3rem;
    
}
:hover {
   color: #444;
}
.name_user {
    color: #000;
}

.sub_btn {
    background-color:  #01215E;
    color: #fff; 
}


i {
    color : #01215E;  
}
</style>