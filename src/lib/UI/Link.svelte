<script lang="ts" context="module">
	export type LinkProps = {
		css?: CSS;
		href: string;
		target?: string;
		rel?: string;
	};
</script>

<script lang="ts">
	import { parseCss, type CSS } from './utils';
	interface $$Props extends LinkProps {}

	export let css: $$Props['css'] = undefined;
	export let href: $$Props['href'];

	$: ({ style, classes } = parseCss(css));
</script>

<a {style} class={classes} {href} {...$$restProps}>
	<slot />
</a>

<style>
	a {
		transition: opacity 0.25s ease;
	}

	a:hover {
		opacity: 0.75;
	}
</style>
