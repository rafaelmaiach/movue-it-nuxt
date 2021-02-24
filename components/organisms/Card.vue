<template>
	<div class="bg-white rounded-md flex flex-1 w-full mt-8 md:mt-0 shadow-sm p-10 md:p-16">
		<StartCycle />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	import StartCycle from '~/components/molecules/StartCycle.vue';

	export default Vue.extend({
		components: {
			StartCycle,
		},
	});
</script>
