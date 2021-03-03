<template>
	<div class="min-h-screen max-w-5xl mx-auto flex flex-col px-5 py-8 md:py-10">
		<ExperienceBar />
		<Nuxt />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@nuxtjs/composition-api';

	import ExperienceBar from '~/components/atom/ExperienceBar.vue';

	export default defineComponent({
		name: 'Default',
		components: {
			ExperienceBar,
		},
	});
</script>
