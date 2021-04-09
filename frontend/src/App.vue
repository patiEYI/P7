<template>
  <div id="app">  
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
 
}


.form-control{
  // position:relative;
  border-radius: 1rem; 
    ::placeholder {
    opacity: .60;
  }
      
}

.color {
  background-color: #01215E; 
  border-color: #ECEDF8; 
 
}
:hover {
  border-color:#1f1f2c;  
   
}
.login__btn {
  padding: 1rem 1rem;
  font-size: 1.1rem;
  border-radius: 2rem;
  border-color: #fff;
  color : #fff;
  background-color: #01215E;  
}
.cursor {
  cursor: pointer;
}

ul{
  list-style-type: none;   
}
h1 {
  color: #fff;
  padding-top: 10%;
  font-size: 8rem;
}
.connexion {
  color: #fff;
  padding-bottom: 2rem;
}
.signup__link {
  color:#0E0EEE;
}

.btn_img {
  font-size: 1.1rem;
  border-radius: 0.1rem;
  color : #01215E;
  border: solid 1px #01215E;
  
}
.img-thumbnail{
  transform: scale(1);
  transition: transform 400ms;
  &:hover{
    transform: scale(1.01);  
  }
}
.radius {
border-radius: 2rem;
color:#000;
}
.post{
  overflow: hidden;
  min-width:600px;
  max-width:800px;
  &__user-img{
    width:70px;
    height:70px;
  }
  &__img{
    height:650px;
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
.bg-color{
  background-color:#D8DFE3
}
.size{
  min-width:700px; 
  max-width:1100px;
}
</style>
