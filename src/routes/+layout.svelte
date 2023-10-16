<script>
	import '../app.css';
</script>

<main class="container min-h-screen pt-12 flex flex-col items-center">
	<slot />
</main>

<style lang="postcss">
	:global(body) {
		background-color: theme(colors.earth.950);
		color: theme(colors.gray.100);
	}
</style>