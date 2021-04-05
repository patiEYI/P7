<template class="container ">
<!-- Navigation(retour en arrière) -->
    <div class="row">
        <div class="col-2 text-left p-5">
           <i class="fas fa fa-chevron-left p-3 rounded-circle"></i>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'back'
}
</script>
<style scoped lang="scss">
.text-left {
    background-color: #01215E; 
    border-radius: 0 20rem 0 0;

}
i{
    font-size: 1.3rem;
    position: absolute; left: 2rem; top: 2rem;
    background-color: #fff;  
    
}
</style>