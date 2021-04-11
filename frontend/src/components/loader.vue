<template>
    <div class="spinner mx-auto">
        <div class="spinner__text">Loading </div>
        <div class="spinner__section spinner__section--1"> </div>
        <div class="spinner__section spinner__section--2"> </div>
        <div class="spinner__section spinner__section--3"> </div>
    </div>
</template>
<script>
export default {
    name:"loader"   
}
</script>
<style scoped lang="scss">

* {
	
	box-sizing: border-box;
}
.spinner {
	position: relative;
	justify-content: center;
	align-items: center;
	width: 100px;
	height: 100px;
	margin-top: 60vh;
	transform: translateY(100%);
	margin: auto;
	display: flex;
	animation: hidden 0ms 1s both;

	&__text {
		font-size: 1rem;
		font-weight: bold;
		animation: loading-opacity 3s ease-in-out infinite;
	}

	&__section {
		border-radius: 50%;
		position: absolute;
		width: 100%;
		height: 100%;
		border: 15px solid transparent;
		animation: display1 0ms 3900ms both;
	}

	&__section--1 {
		border-top: 15px solid #9356DC;
		animation: spin 1s ease infinite;
	}

	&__section--2 {
		border-top: 15px solid #FF79DA;
		animation: spin 2s ease-in infinite;
	}

	&__section--3 {
		border-top: 15px solid #99E2D0;
		animation: spin 1.5s ease-out infinite;
	}
}


@keyframes spin {
	from { transform: rotate(0deg);

	}
	to { transform: rotate(360deg);
		
	}
}
@keyframes loading-opacity {
	0%, 100% {
		opacity:1;
	}

	25%, 75%{
		opacity: .5;
	}
	50% {
		opacity: .1;
	}
}
@keyframes hidden {
	0% {
		z-index: 999999;
	}

	100% {
		
		z-index:-999999;
		position:fixed;
		visibility:hidden;
	}
}

</style>