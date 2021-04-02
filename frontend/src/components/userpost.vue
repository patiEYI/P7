<template>
<!-- Les post d'un user -->
   <section v-if="posts.length !== 0"
       class="shadow-lg mx-auto" style="min-width:600px; max-width:700px;"
    >
        <div
        v-for="(post , post_id ) in filterPost.slice().reverse()"
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
                class="rounded-circle mr-3 bg-primary  "  > 
            
                <img
                v-else
                src="../assets/icon.png"
                width="100px" height="100px"
                class="rounded-circle mr-3"
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
            v-if="userId == post.user_id"
            @click="deletePost(post)" class="border-danger ml-4 btn text-danger btn-ligth py-0"
            >S  
            </button>
                <!-- Body du post -->
                <!-- <h6 class="card-title" >{{ post_id.title  }} </h6> -->

            <div class="my-4" @click="getOnePost(post)">
                <p class="card-text ml-4 ">{{ post.description  }} </p>
                <router-link  to="/singlepost/:post_id"> 
                    <img 
                    v-if="post.image_url !== '' &&
                    post.image_url !== null &&
                    (post.image_url.split('.')[2] === 'png' || 'jpg') &&
                    post.image_url.split('.')[2] !== 'mp4'"
                    class="card-img img-thumbnail " 
                   
                    :src="post.image_url" alt="Image||video post">
                    <div
                        v-if="post.image_url !== '' &&
                            post.image_url !== null &&
                            post.image_url.split('.')[2] === 'mp4'
                        "
                        class="card-img shadow-lg"
                    >
                        <video type="video" aspect="4by3" controls poster="">
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
            <!--  -->
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
                <i class="fas fa fa-thumbs-down fa-fw "  aria-label="false"></i>J'aime pas
                </button>
                
            </div> <hr>
            <!-- Fin like -->
            
            <!-- Debut commentaire -->
                <div
                v-for="(comment, id) in comments.filter((comment) => {
                    return comment.post_id == post.post_id;
                    
                })"
                v-bind:key="id"
                class=" d-flex flex-row  align-items-start mb-2 ml-3 pt-3 radius shadow-md"
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
                    v-if="userId == comment.user_id"
                    @click="deleteComment(comment)" 
                    class="border-danger btn-ligth text-danger btn ml-5 py-0 "
                    >s
                    </button>
                    
                </div><hr>
            <!-- fin envoie comment-->
        </div>

  </section>
  
</template>
<script>

import axios from "axios";

export default {
    name:'userpost',
  components: {
 
  },

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
      console.log(this.userId)
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
        async getOnePost(post) {
            // sessionStorage.setItem("", );
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
          .then((response) => {console.log(response), this.$router.go("/userpost");})
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
        }
    }
}

</script>

<style scoped>
section{
    border: solid 1px #01215E;
    overflow: hidden;
}
</style>