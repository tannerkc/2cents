<script>
	import {auth, googleProvider} from "./firebase"
	import {signInWithPopup} from "firebase/auth"
	import {authState} from "rxfire/auth";

	import Dashboard from "./Dashboard.svelte"

	let user;

	const unsubscribe = authState(auth).subscribe(usr => user = usr);

	function login(){
		signInWithPopup(auth, googleProvider);
	}

	function logout(){
		auth.signOut()
	}
</script>

<main>
	{#if user}
		<Dashboard user={user} logout={logout} />
	{:else}
		<div class="auth">
			<button on:click={login}>Log In With Google</button>
		</div>
	{/if}
</main>

<style>
	.auth{
		width: 90vw;
		height: 100vh;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>