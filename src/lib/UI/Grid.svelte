<script lang="ts">
	import { parseCss, type CSS } from './utils';

	const baseCss: CSS = {
		display: 'grid'
	};
	export let css: CSS | undefined = undefined;
	export let tag = 'div';

	$: ({ style, classes } = parseCss(baseCss, css));
</script>

<svelte:element this={tag} {style} class={classes}>
	<slot />
</svelte:element>
