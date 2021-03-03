<template>
	<header class="pb-10 flex items-center">
		<p class="text-sm">
			{{ `${xp.start} xp` }}
		</p>
		<div class="mx-4 lg:mx-6 flex-1 bg-gray-line h-1 rounded-md">
			<div class="relative bg-green h-1" :style="{ width: `${currentXpPercentage}%` }">
				<p class="text-sm absolute -right-4 w-max top-2">
					{{ `${xp.current} xp (${currentXpPercentage}%)` }}
				</p>
			</div>
		</div>
		<p class="text-sm">
			{{ `${xp.end} xp` }}
		</p>
	</header>
</template>

<script lang="ts">
	import { defineComponent } from '@nuxtjs/composition-api';
	import useChallenges from '~/composables/store/useChallenges';

	export default defineComponent({
		setup () {
			const { xp, currentXpPercentage } = useChallenges();

			return {
				xp,
				currentXpPercentage,
			};
		},
	});
</script>
