<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import '../app.css';
	import '../utility.css';
</script>

<main>
	<Navbar css={{ mb: 16 }} />
	<ThemeSwitch />
	<slot />
</main>

<style>
	main {
		padding: 1rem;
	}
</style>
