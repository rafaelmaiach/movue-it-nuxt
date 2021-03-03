<template>
	<div class="flex items-center">
		<img src="https://github.com/rafaelmaiach.png" class="mr-6 w-20 h-20 rounded-full">
		<div class="flex flex-col w-full">
			<strong class="text-title text-2xl">Maiatto Dev</strong>
			<p class="flex items-center">
				<img src="icons/level.svg" class="mr-2">
				<span class="text-base">Level {{ level }}</span>
			</p>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@nuxtjs/composition-api';

	import useChallenges from '~/composables/store/useChallenges';

	export default defineComponent({
		setup () {
			const { level } = useChallenges();

			return {
				level,
			};
		},
	});
</script>
