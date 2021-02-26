<template>
	<div class="bg-white rounded-md flex flex-1 w-full mt-8 lg:mt-0 shadow-sm">
		<Challenge v-if="currentChallenge" v-bind="currentChallenge" />
		<StartCycle v-else />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { mapGetters } from 'vuex';

	import StartCycle from '~/components/molecules/StartCycle.vue';
	import Challenge from '~/components/molecules/Challenge.vue';

	export default Vue.extend({
		components: {
			StartCycle,
			Challenge,
		},
		computed: mapGetters('Challenges', ['currentChallenge']),
	});
</script>
