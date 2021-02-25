<template>
	<div class="flex justify-between items-center pb-5 border-b-2 border-gray-line mt-8 md:mt-14 font-medium">
		<p class="text-lg">
			Completed challenges
		</p>
		<p class="text-2xl">
			{{ completedChallenges }}
		</p>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		computed: {
			completedChallenges (): number {
				return this.$store.state.completedChallenges;
			},
		},
	});
</script>
