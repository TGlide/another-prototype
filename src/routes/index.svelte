<script context="module" lang="ts">
	import NewBox from '$lib/UI/Box.svelte';
	import Flex from '$lib/UI/Flex.svelte';
	import Grid from '$lib/UI/Grid.svelte';
	import Text from '$lib/UI/Text.svelte';
	import { theme } from '$lib/UI/theme';
	import { objectKeys } from '$lib/utils/object';

	export const prerender = true;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<NewBox tag="section">
	<Text tag="h3" css={{ fontSize: 32, mt: 16 }}>Palette</Text>

	<Grid css={{ gap: 32, templateColumns: 'repeat(10, 1fr)', mt: 16 }}>
		{#each objectKeys(theme.palette) as key}
			<Flex css={{ mt: 8, flexDirection: 'column', gap: 6 }}>
				<NewBox css={{ bgColor: key, size: 64, radius: 6 }} />
				<span>{key}</span>
			</Flex>
		{/each}
	</Grid>

	<NewBox css={{ mt: 32 }}>
		<Text tag="h3" css={{ fontSize: 32 }}>Colors</Text>
	</NewBox>

	<Grid css={{ gap: 32, templateColumns: 'repeat(10, 1fr)', mt: 16 }}>
		{#each objectKeys(theme.colors) as key}
			<Flex css={{ mt: 8, flexDirection: 'column', gap: 6 }}>
				<NewBox css={{ bgColor: key, size: 64, radius: 6 }} />
				<span>{key}</span>
			</Flex>
		{/each}
	</Grid>
</NewBox>
