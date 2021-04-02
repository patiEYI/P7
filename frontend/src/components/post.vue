<template>
    <section v-if="posts.length !== 0" id="post" 
       class="shadow-lg mx-auto" style="min-width:600px;max-width:800px;"
    >
        <button
            v-if="userId == 76"
            @click="deleteAllPost()" class="border-danger btn 
            m-4 text-danger"
            >Supprimer tous les posts
        </button>
        
        <div v-for="(post , post_id ) in posts.slice().reverse()"
        v-bind:key="post_id" 
    
        >
            <div class="user text-white justify-content-start bg-info d-flex  p-2">
                
                <img v-if="users.map((user) => {
                if (user.id === post.user_id) return user.image_url;
                }).join('') !== (null || '')"
                :src=" users.map((user) => {
                if (user.id === post.user_id) return user.image_url;
                }) .join('')" alt="photo user" 
                 width="100px" height="100px"
                class="rounded-circle mr-3 border border-primary  "  > 
            
                <img
                v-else
                src="../assets/icon.png"
                width="100px" height="100px"
                class="rounded-circle mr-3 border border-primary "
                alt="logo-profil-default"
                />
              
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
            </div><br>
                <!-- Button admin pour suprimer les posts  -->
            <button
            v-if="userId == post.user_id || userId == 76"
            @click="deletePost(post)" class="border-danger ml-4 btn text-danger btn-ligth"
            >S  
            </button>
                <!-- Body du post -->
                <!-- <h6 class="card-title" >{{ post_id.title  }} </h6> -->

            <div class="my-4" @click="getOnePost(post)">
                <p class="card-text ml-4 "  @click="getOnePost(post)">{{ post.description  }} </p>
                <router-link   to="/singlepost/:post_id"> 
                    <img  
                    v-if="post.image_url !== '' &&
                    post.image_url !== null &&
                    (post.image_url.split('.')[2] === 'png' || 'jpg') &&
                    post.image_url.split('.')[2] !== 'mp4'"
                    class="card-img img-thumbnail mx-auto" 
                    :src="post.image_url" alt="Image||video post"
                  
                    height="600px"
                    >
                    <div
                        v-if="post.image_url !== '' &&
                            post.image_url !== null &&
                            post.image_url.split('.')[2] === 'mp4'
                        "
                        class="card-img"
                    >
                        <video type="video" aspect="4by3" controls post="">
                        <source :src="post.image_url" type="video/mp4" />
                        </video>
                    </div>

                </router-link> 
            </div>
            <!-- Fin body post -->

            <!--like-->
            <div class="d-flex ml-3 ">
                <div class=""> 
                    {{
                        likes.filter((like) => {
                        return like.post_id == post.post_id;
                        }).length
                    }}
                    <i class="fa fa fa-thumbs-up fa-fw " >{{  }}</i>
                </div>
                <!--  -->
                <div class="ml-5">
                    {{
                        unlikes.filter((unlike) => {
                        return unlike.post_id == post.post_id;
                        }).length
                    }}
                    <i class="fa fa fa-thumbs-down fa-fw" ></i>
                     
                </div>
               
    
            </div>
            
            <hr>
            <div class="d-flex ">
                <button class="like btn" @click="addLike(post, unlikes.map((unlike) => {
                if ( unlike.user_id == userId &&
                unlike.post_id == post.post_id) return unlike.id
                })
                .join(''),likes.map((like) => {
                if (like.user_id == userId && like.post_id == post.post_id)
                return like.id; }).join(''))
                ">
                <i class="fas fa fa-thumbs-up fa-fw "  aria-label="false"></i>J'aime
                </button>

                <!-- unlike -->
                <button class="like btn" @click="addUnlike(post, likes.map((like) => {
                if ( like.user_id == userId &&
                like.post_id == post.post_id) return like.id
                })
                .join(''),unlikes.map((unlike) => {
                if (unlike.user_id == userId && unlike.post_id == post.post_id)
                return unlike.id; }).join(''))
                ">
                <i class="fas fa fa-thumbs-down fa-fw "  aria-label="false"  v-on:click="counter += 1"></i>J'aime pas
                </button>
                
            </div> <hr>
            <!-- Fin like -->
            
            <!-- Debut commentaire -->
                <div
                v-for="(comment, id) in comments.filter((comment) => {
                    return comment.post_id == post.post_id;
                    
                })"
                v-bind:key="id"
                class=" d-flex flex-row align-items-start ml-3 pt-2 radius mb-2 shadow-md"
                style="background-color:#D8DFE3; width:500px;"
                >
               
                <img
                    v-if="
                    users.map((user) => {
                        if (user.id === comment.user_id) return user.image_url;
                        }) .join('') !== (null || '')
                    "
                    :src="
                    users.map((user) => {
                        if (user.id === comment.user_id) return user.image_url;
                        })
                        .join('')
                    "
                    width="40px"
                    height="40px"
                    class=" mr-3  rounded-circle ml-2"
                    alt="photo-profil-comment"
                />
                <img
                    v-else
                    src="../assets/icon.png"
                    width="40px"
                    height="40px"
                    class=" mr-3 ml-2 d-flex   rounded-circle"
                    alt="photo-profil-comment-default"
                />
                    <div class="  ">
                        <h6 class=" text-dark">
                        {{
                            users.map((user) => {
                                if (user.id === comment.user_id) return user.firstname;
                            })
                            .join("")
                        }}
                        {{
                            users.map((user) => {
                                if (user.id === comment.user_id) return user.lastname;
                            })
                            .join("")
                        }}
                        </h6>
                        <p> {{comment.date_comment }} </p>
                        <p class=" text-left text-secondary  ">
                        {{ comment.msg_comment }}
                        </p>
                    </div>
                    
                    <button
                    v-if="userId == comment.user_id || userId == 76"
                    @click="deleteComment(comment)" 
                    class="border-danger btn-ligth text-danger mt-2 btn ml-5 py-0 "
                    >s
                    </button>
                </div>

                <!-- Formulaire commentaire -->
                <form @submit.prevent="submit(post)" class="mt-1 form-group">
                <label class="text-dark " for="commentaire"></label
                >
                <div
                    v-for="(user,id) in userConnect"
                    v-bind:key="id"
                    class="d-flex  align-items-start">
                    <img
                    v-if='user.image_url !== null || ""'
                    :src="user.image_url"
                    width="40px" height="40px"
                    class=" mx-4 rounded-circle"
                    alt="photo-profil"
                    />
                    <img
                    v-else
                    src="../assets/icon.png"
                    width="40px"
                    height="40px"
                    class=" mx-4 justify-content-left"
                    alt="photo-profil-default"
                    />
                    <input
                    type="text"
                    class="form-control radius"
                    name="commentaire"
                    placeholder="Ecrivez votre commentaire..."
                    v-model.trim="commentaire" required
                    style="width:400px"
                    />
                    <input
                    class="border btn ml-1 px-3 radius"
                    type="submit" value="Valider"
                    />
                </div>
            </form>
            <!-- fin comment-->
        </div>
      
       
    </section>
</template>
<!--script-->
<script>
import axios from 'axios';
export default {
    name: "post",
  components: { },
  data() {
      return {
        commentaire: "",
        posts: [],
        users: [],
        userConnect: [],
        comments: [],
        likes: [],
        unlikes: [],
        userId: localStorage.getItem("userId"),
        counter: 0 
      }
    },
      computed: {
    filterPost() {
      return this.posts.filter((post) => {
      return post.user_id == this.userConnect.id;
      
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

        // les likes
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
       // Envoie comment
        async submit(post) {
            //regex exclut $'=+(){}"_
            const regex = /^[^$'=+(){}"_)](.|\w){5,}$/;
            if (!regex.test(this.commentaire)) {
                this.errors.push("Certains caractères ne sont pas autorisé !")
            }else{ 
                await axios.post("http://localhost:3000/comment", {
                    comment: this.commentaire,
                    post_id: post.post_id,
                    user_id: this.userId
                })
                .then((response) => {
                console.log(response),
                this.$router.go("/forum")})
                .catch((error) => console.log(error));
            }
        },
        
        // Récupérer un postId
        async getOnePost(post) {
            const postId = post.post_id
            await sessionStorage.removeItem("postId");
            await sessionStorage.setItem("postId", postId);
            this.$router.push("/singlepost");
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
<style scoped>
#post{
    overflow: hidden;
}
.radius{
    border-radius: 2rem;
}
</style>