<script lang="ts">
	import { createSeparator, melt } from '@melt-ui/svelte';

	const {
		elements: { root: horizontal }
	} = createSeparator({
		orientation: 'horizontal',
		decorative: true
	});
</script>

<div use:melt={$horizontal} class="my-3.5 h-[1px] w-full bg-orange-700" />
