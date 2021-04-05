<template >
<!-- Récupération d'un poste -->
    <section style="min-width:600px; max-width:700px;"
     class="mx-auto shadow-lg mt-5">
        <div v-for="(post , post_id ) in posts"
        v-bind:key="post_id" id="post">
            <div class="user text-white d-flex p-1 bg-info" >
               
                <img v-if="users.map((user) => {
                if (user.id === post.user_id) return user.image_url;
                }).join('') !== (null || '')"
                :src=" users.map((user) => {
                if (user.id === post.user_id) return user.image_url;
                }) .join('')" alt="photo user" 
                class="rounded-circle border border-primary  mr-3"  width="100px" height="100px"> 
            
                <img
                v-else
                src="../assets/icon.png"
                width="100px" height="100px"
                class=" justify-content-left mr-3
                border border-primary 
                rounded-circle"
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
                    <h6>{{ post.date_post }}</h6>    
                </div>
                
            </div>
            
            <!--Button pour modifier le poste -->
            <div class="my-4">
                <router-link class="ml-5" to="/updatepost">
                    <button class=" btn  border-warning text-warning mr-5 px-3 py-2 shadow-lg"
                    v-if="userId == post.user_id || userId == 102"
                    > <i class="fas fa fa-edit"></i></button>
                </router-link> 
                <p class="card-text p-3">{{ post.description  }} </p>

                <img 
                v-if="post.image_url !== '' &&
                post.image_url !== null &&
                (post.image_url.split('.')[2] === 'png' || 'jpg') &&
                post.image_url.split('.')[2] !== 'mp4'"
                class="card-img  img-thumbnail" 
                height="400px"
                :src="post.image_url" alt="Image||video post">
                <div
                    v-if="post.image_url !== '' &&
                        post.image_url !== null &&
                        post.image_url.split('.')[2] === 'mp4'
                    "
                    class="card-img stopPadMarg"
                >
                    <video type="video" aspect="4by3" controls poster="">
                    <source :src="post.image_url" type="video/mp4" />
                    </video>
                </div>
                
                    
            </div>
        </div><hr>
        <!-- Fin post -->

         <!--like-->
            <div class="d-flex ml-3 ">
                <div class=""> 
                    {{
                        likes.filter((like) => {
                        return like.post_id == postId;
                        }).length
                    }}
                    <i class="fa fa fa-thumbs-up fa-fw " >{{  }}</i>
                </div>
              
                <div class="ml-5">
                    {{
                        unlikes.filter((unlike) => {
                        return unlike.post_id == postId;
                        }).length
                    }}
                    <i class="fa fa fa-thumbs-down fa-fw" ></i>
                     
                </div>
            </div>
            <hr>
            <!-- Fin like -->
        
        <!-- comment -->
       
        <div @click="getOneComment(comment)"
            v-for="(comment, id) in comments.slice().reverse().filter((comment) => {
                return comment.post_id == postId;
                
            })"
            v-bind:key="id"
            class=" d-flex flex-row m-4 align-items-start radius p-3 shadow-md"
            style="background-color:#D8DFE3; width:600px;"
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
                class=" mr-3 rounded-circle ml-2 border border-primary"
                alt="photo-profil-comment"
            />
            <img
                v-else
                src="../assets/icon.png"
                width="40px"
                height="40px"
                class=" mr-3 ml-2 d-flex   rounded-circle"
                alt="photo-profil-comments-default"
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
                {{ comment.msg_comment }}</p>

                <!-- Modifier le commentaire -->
                <form action=""
                 @submit.prevent="updateComment(comment)"
                 class="d-flex"
                 v-if="userId == comment.user_id">
                    <input
                    
                    type="text"
                    class="form-control radius"
                    name="commentaire"
                    v-model.trim="commentaire" required
                    placeholder="Modifier votre commentaire..."
                
                    style="width:300px"
                    />
                    <input
                   
                    class="border border-warning btn-ligth text-warning radius  btn ml-1 px-3"
                    type="submit" value="Modifier"
                    />
            
                </form>
    
            </div>
        </div>
        <!--Fin  -->
        <Logo class="text-center"/>
        <router-link to="/forum"><Back/> </router-link> 
    </section>
</template>

<script>
import Logo from '../components/logo.vue'
import Back from '../components/back.vue'
import axios from "axios"
export default {
    name: 'post',
  components: { Logo, Back,  },
   
    data () {
        return {
            errors:[],
            commentaire:"",
            likes:[],
            unlikes:[],
            postId: sessionStorage.getItem("postId"),
            posts: [],
            users: [],
            userConnect: {},
            comments: [],
            userId: localStorage.getItem("userId"),
           

        }
    },
   
    async created() {
        this.posts = [];
        this.users = [];
        this.userConnect = {};

        //Tous les users console.log(users)
        await axios.get("http://localhost:3000/users")
        .then(( response) => ((this.users = response.data),console.log(this.users))) 
        .catch((error) => console.log(error));

        //Un user
        await axios.get(`http://localhost:3000/users/${this.userId}` )
        .then(( response) => ((this.userConnect = response.data), console.log(this.userConnect)))
        .catch((error) => console.log(error));


        //un post
        this.post = [];
        await axios.get(`http://localhost:3000/post/${this.postId}`)
        .then((response) => {
            this.posts = response.data,
            console.log(this.posts) 
            // sessionStorage.removeItem("postId")
        })
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
        //modifier un comment
        async updateComment(comment) {
            //regex exclut '=+(){}"_
            const regex = /^[^'=+(){}"_)](.|\w){3,}$/;
            if (!regex.test(this.commentaire)) {
                this.errors.push("Certains caractères ne sont pas autorisé !")
            }else{ 
                console.log(this.postId, this.userId)
                await axios.put(`http://localhost:3000/comment/${comment.id}`,{
                    comment: this.commentaire,
                    post_id: this.postId,
                    user_id: this.userId
                })
                .then((response) => {console.log(response), this.$router.go("/singlepost");})
                .catch((err) => console.log(err));
            }
        }
     
    }
    
}
</script>
<style scoped lang="scss">
section{
    color: #000;
    overflow: hidden;
} 
.comment {
    background-color: #fff;
    border-radius: 1rem;
    color:#000;
}
.radius{
    border-radius: 2rem;
}
</style>