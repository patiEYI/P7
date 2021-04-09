<template>
<!-- Les postes d'un user -->
   <section v-if="posts.length !== 0" class="shadow-lg mx-auto userPost">
            <div class="justify-content-start bg-info d-flex  p-2">
               
                  <!-- Corps du post -->
           <div v-for="(post , post_id ) in filterPost.slice().reverse()" v-bind:key="post_id" class="mb-5">
            <hr>
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
                        Publié le: {{ post.date_post }}
                    </h6>
                </div>
            </div><hr><br>
                <!-- Button utilisateur pour suprimer ou modifier un poste  -->
            <div class="d-flex"> 
                <button v-if="userId == post.user_id" @click="deletePost(post)" class="border-danger ml-4 btn text-danger btn-ligth">
                   S  
               </button>
                 <router-link class="ml-5" to="/updatepost">
                    <button class="btn  border-warning text-warning mr-5 px-3 py-2 shadow-lg"
                      v-if="userId == post.user_id || userId == 105"> <i class="fas fa fa-edit"></i>
                    </button>
                </router-link>
            </div>
        
            <!-- Image du post -->
            <div class="my-4" @click="getOnePost(post)">
                <p class="card-text ml-4 "  @click="getOnePost(post)">{{ post.description  }} </p>
                <router-link to="/singlepost"> 
                    <img v-if="post.image_url !== '' && post.image_url !== null &&
                    (post.image_url.split('.')[2] === 'png' || 'jpg') && post.image_url.split('.')[2] !== 'mp4'"
                    class="card-img img-thumbnail post__img mx-auto" :src="post.image_url" alt="Image||video post">
                    <!-- Video -->
                    <div v-if="post.image_url !== '' && post.image_url !== null && post.image_url.split('.')[2] === 'mp4'">
                        <video type="video" aspect="4by3" controls post="" class="post__img">
                            <source :src="post.image_url" type="video/mp4"/>
                        </video>
                    </div>
                </router-link> 
            </div>
            <!-- Fin body post -->

            <!--like-->
            <div class="d-flex mx-3 justify-content-between">
                <div> 
                    {{
                        likes.filter((like) => {
                        return like.post_id == post.post_id;
                        }).length
                    }}
                    <i class="fa fa fa-thumbs-up fa-fw "></i>
                </div>
                <div class="ml-5">
                    {{
                        unlikes.filter((unlike) => {
                        return unlike.post_id == post.post_id;
                        }).length
                    }}
                    <i class="fa fa fa-thumbs-down fa-fw" ></i> 
                </div>
            </div><hr>
            <!-- Fin like --> 
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
        userConnect: {},
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
        this.userConnect = [];
         
         //Tous les postes
        await axios.get("http://localhost:3000/post")
        .then(( response) => ((this.posts = response.data), console.log(this.posts)))
        .catch((error) => console.log(error));

        //Tous les users console.log(users)
        await axios.get("http://localhost:3000/users")
        .then(( response) => ((this.users = response.data),console.log(this.users))) 
        .catch((error) => console.log(error));

        //Un user
        await axios.get(`http://localhost:3000/users/${this.userId}` )
        .then(( response) => ((this.userConnect = response.data), console.log(this.userConnect)))
        .catch((error) => console.log(error));


        // Recupérer tous les commentaires
        await axios.get("http://localhost:3000/comment")
        .then(( response) => ((this.comments = response.data), console.log(this.comments)))
        .catch((error) => console.log(error));

        
        // les likes
        await axios.get("http://localhost:3000/like")
        .then(( response) => ((this.likes = response.data), console.log(this.likes)))
        .catch((error) => console.log(error));

        //les unlikes
        await axios.get("http://localhost:3000/unlike")
        .then((response) => ((this.unlikes = response.data), console.log(this.unlikes)) )
        .catch((error) => console.log(error));

    },  
  methods: {
        // Récupérer un postId
        async getOnePost(post) {
            const postId = post.post_id
            await sessionStorage.removeItem("postId");
            await sessionStorage.setItem("postId", postId);
            this.$router.push("/singlepost");
       
       },

        //Supprimer un poste
       async deletePost(post) {
           alert("Vous êtes sûr le point de supprimer  ce post !")
           await axios.delete(`http://localhost:3000/post/${post.post_id}`)
           .then((response) => {console.log(response.results), this.$router.go("/forum")})
           .catch((error) => console.log(error));
       },

       //Supprimer comment
       async deleteComment(comment) {
          alert("Vous êtes sûr le point de supprimer  ce commentaire !")
          await axios.delete(`http://localhost:3000/comment/${comment.id}`)
          .then((response) => {console.log(response), this.$router.go("/userpost");})
          .catch((error) => console.log(error));
       },

     
    }
}

</script>

<style scoped>
.userPost{
    overflow: hidden;
    min-width:600px; 
    max-width:700px;
}
</style>