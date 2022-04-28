<script lang="ts">
	import { parseCss, type CSS } from './utils';

	export let css: CSS | undefined = undefined;
	export let tag = 'div';

	$: ({ style, classes } = parseCss(css));
</script>

<svelte:element this={tag} {style} class={classes}>
	<slot />
</svelte:element>
