<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import Box from '$lib/UI/Box.svelte';
	import '../app.css';
</script>

<Box tag="main" p={16}>
	<Navbar mb={16} />
	<ThemeSwitch />
	<slot />
</Box>
