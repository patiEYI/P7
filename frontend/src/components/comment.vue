<template>
  <main>
        <div>
            <div>
                <div class="comment">
                    <form @submit.prevent="createComment" enctype="multipart/form-data">
                        <div class="d-flex  align-items-start">
                            <input class="comment__input radius p-2 border" type="textarea" name="message" aria-label="Contenu du message" v-model="comment" placeholder="Ecrivez votre commentaire">
                            <input class="comment__button radius border btn ml-1 px-3 mt-1" type="submit" value="valider"> 
                        </div>  
                    </form>
                     <!-- S'affiche en cas d'erreurs -->
                    <p v-if="errors.length" class="text-warning">
                        <ul>
                            <li v-for="error  in errors" v-bind:key="error" >{{ error }}</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
        <slot/> 
    </main>   
</template>
<script>
import axios from 'axios'
export default {
    name:'comment',
    data() {
      return {
        errors:[], 
        comment: null,
        userId: localStorage.getItem("userId"),
        postId: sessionStorage.getItem("postId"),
      }
    },
    methods: {
       // Envoie comment
        createComment() {
            const regex = /^[\w\s\r]{3,}$/;
            if (!regex.test(this.comment)) {
                this.errors.push("Certains caractères ne sont pas autorisé !")
            }else{ 
                axios.post("http://localhost:3000/comment", {
                    msg_comment: this.comment,
                    post_id: this.postId,
                    user_id : this.userId, 
                })
                    .then((response) =>  console.log(response),
                    this.$router.go("/forum")
                    )
                    .catch((error) => console.log(error)
                );
            }
        },
    }
}

</script>
<style scoped lang="scss">
.comment{
    overflow: hidden;
    min-width:600px;
    max-width:800px;
    &__user-img{
        width:100px;
        height:100px;
    }
    &__img{
         width:40px;
        height:40px;
    }
    &__comment{
        background-color:#D8DFE3;
        width:500px;
    }
    &__comment-img{
        width:40px;
        height:40px;
    }
    &__input{
        width:400px;
    }
}
.radius{
    border-radius: 2rem;
}


</style>