<script lang="ts">
	import Separator from '$lib/components/separator.svelte';
	import { createLabel, melt } from '@melt-ui/svelte';

	const {
		elements: { root }
	} = createLabel();
</script>

<h2 class="mb-12">Welcome my entry for the Threlte Warp 2023</h2>

<section class="w-96 min-h-96 bg-earth-400/20 rounded-3xl p-4 flex flex-col gap-4">
	<p class="mb-4">Please edit your character to join the game.</p>
	<Separator />
	<form method="POST" action="?/enterGame">
        <!-- TODO: place username-input into separate component if there is enough time -->
		<div class="flex flex-col items-start justify-center text-2xl">
			<label
				use:melt={$root}
				for="user"
				class="mb-0.5 font-medium text-orange-400"
				data-melt-part="root"
			>
				<span>Username</span>
			</label>
			<input
				type="text"
				name="user"
				class="h-10 w-[240px] rounded-md px-3 py-2 text-orange-100 bg-orange-700/50 focus-within:outline-orange-400"
				placeholder="<Enter Name>"
			/>
		</div>
        <!-- TODO: place color-picker into separate component if there is enough time -->
		<div class="flex flex-col items-start justify-center text-2xl">
			<label
				use:melt={$root}
				for="color"
				class="mb-0.5 font-medium text-orange-400"
				data-melt-part="root"
			>
				<span>Color</span>
			</label>
			<input
				type="color"
				name="color"
				class="h-10 rounded-full text-orange-100 bg-orange-700/50 focus-within:outline-orange-400"
				placeholder="<Choose color>"
			/>
		</div>
        <button
			type="submit"
			class="py-3 px-6 rounded-lg text-white bg-gradient-to-r from-0% from-orange-700/50 via-orange-500/50 via-100% to-orange-700/25"
		>
			Enter the game
		</button>
	</form>
</section>

<style>
	input[type='color'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 100px;
		height: 100px;
		background-color: transparent;
		border: none;
		cursor: pointer;
	}
	input[type='color']::-webkit-color-swatch {
		border-radius: 15px;
		border: none;
	}
	input[type='color']::-moz-color-swatch {
		border-radius: 15px;
		border: none;
	}
</style>
