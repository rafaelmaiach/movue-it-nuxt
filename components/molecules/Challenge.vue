<template>
	<section id="challenge" class="flex flex-col flex-1 justify-center items-center py-6 px-10 md:px-16">
		<header class="w-full pb-6 border-b-2 border-background">
			<h2 class="text-xl text-blue font-semibold text-center">
				{{ `Win ${amount} xp` }}
			</h2>
		</header>
		<main class="flex flex-col flex-1 justify-center items-center mt-6">
			<img :src="`icons/${type}.svg`" alt="Body" :style="{ minHeight: '70px' }">
			<h1 class="font-semibold text-3xl text-title mt-6 mb-2">
				Work out
			</h1>
			<p class="text-center text-base leading-6">
				{{ description }}
			</p>
		</main>
		<footer class="flex w-full gap-x-2">
			<button kind="challenge" class="button failed" @click="resetChallenges">
				Failed
			</button>
			<button kind="challenge" class="button succeeded" @click="challengeSucceeded">
				Completed
			</button>
		</footer>
	</section>
</template>

<script lang="ts">
	import { defineComponent, useContext } from '@nuxtjs/composition-api';

	import useChallenges from '~/composables/store/useChallenges';
	import useCountdown from '~/composables/store/useCountdown';

	export default defineComponent({
		props: {
			type: { type: String, required: true },
			description: { type: String, required: true },
			amount: { type: Number, required: true },
		},
		setup (props) {
			const { app } = useContext();
			const { resetTime, setIsActive, setHasCompleted } = useCountdown();

			const {
				level,
				xp,
				completedChallenges,
				setCurrentChallengeIndex,
				completeChallenge,
			} = useChallenges();

			const resetChallenges = () => {
				resetTime();
				setIsActive(false);
				setHasCompleted(false);
				setCurrentChallengeIndex(null);
			};

			const challengeSucceeded = () => {
				resetChallenges();
				completeChallenge(props.amount);

				app.$cookiz.set('movueit', {
					level: level.value,
					xp: xp.value,
					completedChallenges: completedChallenges.value,
				});
			};

			return {
				resetChallenges,
				challengeSucceeded,
			};
		},
	});
</script>
