<template>
	<div class="bg-white rounded-md flex flex-1 w-full mt-8 lg:mt-0 shadow-sm">
		<Challenge v-if="currentChallenge" v-bind="currentChallenge" />
		<StartCycle v-else />
		<LevelUpModal />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@nuxtjs/composition-api';

	import useChallenges from '~/composables/store/useChallenges';

	import LevelUpModal from '~/components/atom/LevelUpModal.vue';
	import StartCycle from '~/components/molecules/StartCycle.vue';
	import Challenge from '~/components/molecules/Challenge.vue';

	export default defineComponent({
		components: {
			StartCycle,
			Challenge,
			LevelUpModal,
		},
		setup () {
			const { currentChallenge } = useChallenges();

			return {
				currentChallenge,
			};
		},
	});
</script>
