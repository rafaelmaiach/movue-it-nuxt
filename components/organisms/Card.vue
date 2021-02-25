<template>
	<div class="bg-white rounded-md flex flex-1 w-full mt-8 md:mt-0 shadow-sm">
		<Challenge v-if="challenge" :challenge="challenge" />
		<StartCycle v-else />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { Challenge as ChallengeType } from '~/store/types';

	import StartCycle from '~/components/molecules/StartCycle.vue';
	import Challenge from '~/components/molecules/Challenge.vue';

	export default Vue.extend({
		components: {
			StartCycle,
			Challenge,
		},
		computed: {
			challenge (): ChallengeType {
				const { allChallenges, currentChallengeIndex } = this.$store.state;
				return allChallenges?.[currentChallengeIndex];
			},
		},
	});
</script>
