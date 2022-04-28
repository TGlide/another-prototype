<script lang="ts">
	import Flex from '$lib/UI/Flex.svelte';
	import Link from '$lib/UI/Link.svelte';
	import { joinCss, type CSS } from '$lib/UI/utils';

	export let css: CSS | undefined = undefined;
</script>

<Flex tag="nav" css={joinCss({ gap: 16 }, css)}>
	<Link href="/">📚 UI Library</Link>
	<Link href="/color-gen">🎨 Generate colors</Link>
</Flex>
