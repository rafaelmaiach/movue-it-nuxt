<template>
	<section id="challenge" class="flex flex-col flex-1 justify-center items-center py-6 px-10 md:px-16">
		<header class="w-full pb-6 border-b-2 border-background">
			<h2 class="text-xl text-blue font-semibold text-center">
				{{ `Win ${challenge.amount} xp` }}
			</h2>
		</header>
		<main class="flex flex-col flex-1 justify-center items-center mt-6">
			<img :src="`icons/${challenge.type}.svg`" alt="Body" :style="{ minHeight: '70px' }">
			<h1 class="font-semibold text-3xl text-title mt-6 mb-2">
				Work out
			</h1>
			<p class="text-center text-base leading-6">
				{{ challenge.description }}
			</p>
		</main>
		<footer class="flex w-full gap-x-2">
			<Button kind="challenge" class="bg-red hover:bg-red-dark h-3 w-1/2">
				Failed
			</Button>
			<Button kind="challenge" class="bg-green hover:bg-green-dark h-3 w-1/2">
				Completed
			</Button>
		</footer>
	</section>
</template>

<script lang="ts">
	import Vue, { PropOptions } from 'vue';
	import { Challenge as ChallengeType } from '~/store/types';

	import Button from '~/components/atom/Button.vue';

	export default Vue.extend({
		components: {
			Button,
		},
		props: {
			challenge: {
				type: Object,
				required: true,
			} as PropOptions<ChallengeType>,
		},
	});
</script>
