<template>
<!-- Récupération de les postes -->
    <section v-if="posts.length !== 0" class="shadow-lg mx-auto post bg-info">
    <!-- Boutton admin pour supprimer tous les postes -->
        <button
            v-if="userId == 105" @click="deleteAllPost()" class="ml-2 btn text-white btn-ligth button__delete">
            <span class="button__display border shadow-lg p-1">Supprimer tous les postes</span> 
        </button>

        <!-- Corps du post -->
        <div v-for="(post, post_id ) in posts.slice().reverse()" v-bind:key="post_id" class="mb-5">
            <hr>
            <div class=" text-dark justify-content-start bg-info d-flex p-2 ">
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
                <!-- Button admin || utilisateur pour suprimer un poste  -->
            <button v-if="userId == post.user_id || userId == 105" @click="deletePost(post)" class=" ml-2 btn text-white btn-ligth button__delete">
                <span class="button__display border shadow-lg p-1">Supprimer le post</span>  
            </button>

            <!-- Image du post -->
            <router-link to="/singlepost"> 
                <div class="my-2" @click="getOnePost(post)">
                    <p class="text-dark ml-4">{{ post.description  }} </p>
                    
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
            <div class="d-flex mx-3 justify-content-between">
                <button class="like btn" @click="addLike(post, unlikes.map((unlike) => {
                    if ( unlike.user_id == userId && unlike.post_id == post.post_id) return unlike.id
                    }).join(''),likes.map((like) => {
                    if (like.user_id == userId && like.post_id == post.post_id) return like.id; }).join('')) ">
                    <i class="fas fa fa-thumbs-up fa-fw "  aria-label="false"></i>J'aime
                </button>
                <!-- unlike -->
                <button class="like btn" @click="addUnlike(post, likes.map((like) => {
                    if ( like.user_id == userId && like.post_id == post.post_id) return like.id
                    }).join(''),unlikes.map((unlike) => {
                    if (unlike.user_id == userId && unlike.post_id == post.post_id) return unlike.id; }).join(''))">
                    <i class="fas fa fa-thumbs-down fa-fw "  aria-label="false"></i>J'aime pas
                </button>
            </div> <hr>
            <!-- Fin like -->
            <!-- Debut commentaire -->
                <div v-for="(comment, id) in comments.filter((comment) => { return comment.post_id == post.post_id;})"
                v-bind:key="id" class="post__comment d-flex flex-row align-items-start ml-3 pt-2 radius mb-2 shadow-md">
                <!-- Commentaire image -->
                <img v-if="
                    users.map((user) => {
                    if (user.id === comment.user_id) return user.image_url;}).join('') !== (null || '')"
                    :src=" users.map((user) => { if (user.id === comment.user_id) return user.image_url; }).join('')"
                    class=" mr-3 post__comment-img rounded-circle ml-2" alt="photo-profil-comment"
                />
                <img
                    v-else src="../assets/icon.png" class=" mr-3 ml-2 d-flex post__comment-img rounded-circle" alt="photo-profil-comment-default"/>
                    <div>
                        <h6 class=" text-dark">
                        {{
                            users.map((user) => {
                                if (user.id === comment.user_id) return user.firstname;
                            }).join("")
                        }}
                        {{
                            users.map((user) => {
                                if (user.id === comment.user_id) return user.lastname;
                            }).join("")
                        }}
                        </h6>
                        <p> {{comment.date_comment }} </p>
                        <p class=" text-left text-secondary  ">
                             {{ comment.msg_comment }}
                        </p>
                    </div>
                    <!-- Button pour supprimer un commentaire -->
                    <button v-if="userId == comment.user_id || userId == 105" @click="deleteComment(comment)" class="offset-3 pt-0 btn text-dark btn-ligth button__delete">
                       <span class="button__display border border-white p-1">Supprimer</span> 
                    </button>
                </div>
            <div v-for="(user,id) in userConnect" v-bind:key="'A' + id" class="mt-3 d-flex" @click="getOnePost(post)">
                <img v-if='user.image_url !== null || ""' :src="user.image_url" class="post__comment-img mx-4 rounded-circle" alt="photo-profil"/>
                <img v-else src="../assets/icon.png" class="post__comment-img  mx-4 justify-content-left rounded-circle" alt="photo-profil-default"/>
                <Comment /> 
            </div>
            <!-- fin comment-->
        </div>  
    </section>
</template>

<script>
import axios from 'axios';
import Comment from './comment.vue';
export default {
    name: "post",
    components: { Comment },
  data() {
      return {
        posts: [],
        users: [],
        userConnect: [],
        comments: [],
        likes: [],
        unlikes: [],
        userId: localStorage.getItem("userId"),
      }
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

        //Tous les users
        await axios.get("http://localhost:3000/users")
            .then(( response) => ((this.users = response.data),console.log(this.users))) 
            .catch((error) => console.log(error));

        //Un user
        await axios.get(`http://localhost:3000/users/${this.userId}` )
            .then(( response) => ((this.userConnect = response.data), console.log(this.userConnect)))
            .catch((error) => console.log(error));

        //les likes
        await axios.get("http://localhost:3000/like")
            .then(( response) => ((this.likes = response.data), console.log(this.likes)))
            .catch((error) => console.log(error));

        //les unlikes
        await axios.get("http://localhost:3000/unlike")
            .then((response) => ((this.unlikes = response.data), console.log(this.unlikes)) )
            .catch((error) => console.log(error));
        

        // Recupérer tous les commentaires
        await axios.get("http://localhost:3000/comment")
            .then(( response) => ((this.comments = response.data), console.log(this.comments)))
            .catch((error) => console.log(error));
    },

    methods: {
        // Récupérer un postId
        async getOnePost(post) {
            const postId = post.post_id
            await sessionStorage.removeItem("postId");
            await sessionStorage.setItem("postId", postId);
            // this.$router.push("/singlepost");
        },

        //Supprimer un post
        async deletePost(post) {
           alert("Vous êtes sûr le point de supprimer ce post !")
           await axios.delete(`http://localhost:3000/post/${post.post_id}`)
            .then((response) => {console.log(response.results), this.$router.go("/forum")})
            .catch((error) => console.log(error));
       },

       //Supprrimer tous les posts
       async deleteAllPost() {
           await axios.delete(`http://localhost:3000/post`)
            .then((response) => {console.log(response), this.$router.go("/forum")})
            .catch((error) => console.log(error));
       },

       //Supprimer comment
       async deleteComment(comment) {
          alert("Vous êtes sûr le point de supprimer  ce commentaire !")
          await axios.delete(`http://localhost:3000/comment/${comment.id}`)
            .then((response) => {console.log(response), this.$router.go("/forum");})
            .catch((error) => console.log(error));
       },

        // fonction addlike et delete unlike
        addLike(post, unlike, like) {
            console.log(unlike);
            if (like) {
                axios
                .delete(`http://localhost:3000/like/${like}`, {})
                .then((response) => {
                    console.log(response);
                    this.$router.go("/forum");
                })
                .catch((error) => console.log(error));
            } else if (!unlike) {
                    console.log(this.userId);
                axios
                .post(`http://localhost:3000/like`, {
                    post_id: post.post_id,
                    user_id: this.userId,
                })
                .then((response) => { console.log(response);
                 this.$router.go("/forum");
                })
                .catch((error) =>console.log(error) );
            }
        },

        // fonction addunlike et supprimer like
        addUnlike(post, like, unlike) {
            console.log(like);
            if (unlike) {
                axios
                .delete(`http://localhost:3000/unlike/${unlike}`, {})
                .then((response) => {
                    console.log(response);
                    this.$router.go("/forum");
                })
                .catch((error) => console.log(error));

            }else if (!like) {
                axios.post(`http://localhost:3000/unlike`, {
                    post_id: post.post_id,
                    user_id: this.userId,
                })
                .then((response) => {
                    console.log(response);
                    this.$router.go("/forum");
                })
                .catch((error) => console.log(error));
            }
        },
       
    }
    
}
</script>
<style scoped lang="scss">
 
.radius{
    border-radius: 2rem;
}
</style>