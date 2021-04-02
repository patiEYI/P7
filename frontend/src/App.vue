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
.sub_btn {
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
.signup_link {
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
</style>
