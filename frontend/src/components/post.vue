<template >
<!-- Récupération d'un poste -->
    <section class=" post mx-auto bg-info mt-5">
        <div v-for="(post , post_id ) in posts" v-bind:key="'B' + post_id" class="bg-info pt-3 " >
            <hr>
            <div class="user text-dark d-flex pl-3 bg-info" >
                <img v-if="users.map((user) => {
                if (user.id === post.user_id) return user.image_url;
                }).join('') !== (null || '')" :src=" users.map((user) => {
                if (user.id === post.user_id) return user.image_url;
                }) .join('')" alt="photo user" 
                class="rounded-circle border border-primary mr-3 post__user-img"> 
                <img v-else src="../assets/icon.png" class="justify-content-left mr-3 border border-primary post__user-img rounded-circle" alt="logo-profil-default"/>
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
                    <h6>Publié le {{ post.date_post }}</h6>    
                </div>
            </div><hr>
            <!--Button pour modifier le poste -->
            <div class="my-4">
                <router-link class="ml-5" to="/updatepost">
                    <button class="btn  border-warning text-warning mr-5 px-2 py-0 shadow-lg"
                      v-if="userId == post.user_id || userId == 105"> <i class="fas fa fa-edit"></i>
                    </button>
                </router-link> 
                <p class="text-dark p-3">{{ post.description  }} </p>
                <img  v-if="post.image_url !== '' && post.image_url !== null && (post.image_url.split('.')[2] === 'png' || 'jpg') &&
                  post.image_url.split('.')[2] !== 'mp4'" class="card-img  img-thumbnail"  :src="post.image_url" alt="Image||video post">
                <div v-if="post.image_url !== '' && post.image_url !== null && post.image_url.split('.')[2] === 'mp4' " class="card-img stopPadMarg">
                    <video type="video" aspect="4by3" controls post="">
                        <source :src="post.image_url" type="video/mp4" />
                    </video>
                </div>       
            </div>
        </div><hr>
        <!-- Fin post -->
        <!--like-->
        <div class="d-flex mx-3 justify-content-between ">
            <div> 
                {{
                    likes.filter((like) => {
                    return like.post_id == postId;
                    }).length
                }}
                <i class="fa fa fa-thumbs-up fa-fw " ></i>
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
        <div @click="getOneComment(comment)" v-show="ok"
            v-for="(comment, id) in comments.slice().reverse().filter((comment) => {
                return comment.post_id == postId;    
            })"
            v-bind:key="id" class=" d-flex flex-row m-4 align-items-start radius p-3 shadow-md post__comment" 
            >
            <img
                v-if="
                users.map((user) => {
                    if (user.id === comment.user_id) return user.image_url;
                    }) .join('') !== (null || '')
                "
                :src=" users.map((user) => {
                    if (user.id === comment.user_id) return user.image_url;
                    })
                    .join('')
                "
                class="mr-3 rounded-circle ml-2 border border-primary post__comment-img" alt="photo-profil-comment"
            />
            <img
                v-else src="../assets/icon.png"
                class=" mr-3 ml-2 d-flex post__comment-img rounded-circle" alt="photo-profil-comments-default"
            />
            <div>
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
                <form action="" @submit.prevent="updateComment(comment)" class="d-flex" v-if="userId == comment.user_id">
                    <input type="text" class="form-control post__commentaire radius" name="commentaire"
                    v-model.trim="commentaire" required placeholder="Modifier votre commentaire..."/>
                    <input class="border border-warning btn-ligth text-warning radius  btn ml-1 px-3" type="submit" value="Modifier"
                    />
                </form>
            </div>
        </div>
        <!--Fin  -->
        <Logo class="text-center mt-5"/>
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
            ok:false,
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
.radius{
    border-radius: 2rem;
}
</style>