<template>
<!-- Les postes d'un user -->
   <section  class="loader shadow-lg mx-auto userPost size">
        <div class="justify-content-start bg-info p-2">
            <!-- Corps du post -->
            <p v-if="filterPost.length === 0" class="text-center">Vous n'avez aucun poste. Cliquer ici pour Publier
                <router-link to="/forum" class="text-white">Forum</router-link>
            </p>
            <div v-for="(post , post_id ) in filterPost.slice().reverse()" v-bind:key="post_id" class="mb-5"><hr>
                <div class="text-dark justify-content-start bg-info d-flex p-2 ">
                    <img v-if="users.map((user) => {
                    if (user.id === post.user_id) return user.image_url;
                    }).join('') !== (null || '')"
                    :src=" users.map((user) => {
                    if (user.id === post.user_id) return user.image_url;
                    }) .join('')" alt="photo user" class="rounded-circle mr-3 border border-primary post__user-img"  > 
                
                    <img v-else src="../assets/icon.png" class="rounded-circle mr-3 border border-primary post__user-img" alt="logo-profil-default"/>
                    <div class="justify-content-center my-auto">
                        <h5>
                            {{ users.map((user) => {
                                if (user.id === post.user_id) return user.lastname;
                            }).join("")
                            }}
                            {{ users.map((user) => {
                                if (user.id === post.user_id) return user.firstname;
                            }).join("")
                            }}
                            {{ users.map((user) => {
                                if (user.id === post.user_id) return user.id;
                            }).join("")
                            }}
                        </h5>
                        <h6 >
                            Publié le {{ post.date_post }}
                        </h6>
                    </div>
                </div><hr>
                <!-- Button utilisateur pour suprimer ou modifier un poste  -->
                <div> 
                    <button v-if="userId == post.user_id" @click="deletePost(post)" class="ml-2 btn text-white btn-ligth button__delete">
                        <span class="button__display shadow-lg p-1">Supprimer le post</span>  
                    </button>
                </div>
        
                <!-- Image du post -->
                <router-link to="/singlepost"> 
                    <div class="my-4"  @click="getOnePost(post)">
                        <p class="card-text text-dark ml-4 ">{{ post.description  }} </p>
                        <img v-if="post.image_url !== '' && post.image_url !== null &&
                        (post.image_url.split('.')[2] === 'png' || 'jpg') && post.image_url.split('.')[2] !== 'mp4'"
                        class="card-img img-thumbnail post__img mx-auto" :src="post.image_url" alt="Image||video post">
                        <!-- Video -->
                        <div v-if="post.image_url !== '' && post.image_url !== null && post.image_url.split('.')[2] === 'mp4'">
                            <video type="video" aspect="4by3" controls post="" class="post__img">
                                <source :src="post.image_url" type="video/mp4"/>
                            </video>
                        </div>
                    </div>
                </router-link> 
                <!-- Fin body post -->
        </div><hr>       
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
    name:'userpost',
    data() {
      return {
        posts: [],
        users: [],
        comments: [],
        likes: [],
        unlikes: [],
        userId: localStorage.getItem("userId"), 
      }
      
    },
    computed: {
        filterPost() {
            return this.posts.filter((post) => {
            return post.user_id == this.userId;
        
        });
    },
  },
     // les routes
    async created() {
        this.posts = [];
        this.users = [];

        //Tous les postes
        await axios.get("http://localhost:3000/post")
        .then(( response) => ((this.posts = response.data), console.log(this.posts)))
        .catch((error) => console.log(error));

        //Tous les users console.log(users)
        await axios.get("http://localhost:3000/users")
        .then(( response) => ((this.users = response.data),console.log(this.users))) 
        .catch((error) => console.log(error));

    }, 
    methods: {
        // Récupérer un postId
         async getOnePost(post) {
            const postId = post.post_id
            await sessionStorage.removeItem("postId");
            await sessionStorage.setItem("postId", postId);     
       },

        //Supprimer un poste
       async deletePost(post) {
           alert("Vous êtes sûr le point de supprimer  ce post !")
           await axios.delete(`http://localhost:3000/post/${post.post_id}`)
           .then((response) => {console.log(response.results), this.$router.go("/forum")})
           .catch((error) => console.log(error));
       },
     
    }
}
</script>
<style scoped></style>