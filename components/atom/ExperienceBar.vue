<template>
	<header class="pb-10 flex items-center">
		<p class="xp">
			0 xp
		</p>
		<div class="mx-4 lg:mx-6 flex-1 bg-gray-line h-1 rounded-md">
			<div class="relative w-1/2 bg-green h-1">
				<p class="xp absolute -right-4 w-max top-2">
					400 xp
				</p>
			</div>
		</div>
		<p class="xp">
			600 xp
		</p>
	</header>
</template>

<!-- <script lang="ts">
	// Needs current level { startxp, endxp, currentxp }
</script>-->

<style lang="postcss" scoped>
	.xp {
		@apply text-sm;
	}
</style>
