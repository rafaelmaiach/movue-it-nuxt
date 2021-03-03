<template>
	<section class="flex flex-col lg:flex-row flex-1 lg:flex-none lg:mt-16 sm:gap-x-10 md:gap-x-20">
		<div class="flex flex-col w-full lg:w-1/2">
			<Profile id="profile" />
			<CompletedChallenges id="challenges" />
			<Countdown id="countdown" @completed="getNewChallenge" />
			<button
				v-if="hasCountdownCompleted"
				id="button"
				disabled
				class="button completed"
			>
				Cycle completed
			</button>
			<button
				v-else-if="isCountdownActive"
				id="button"
				class="button abandon"
				@click="setCountdownState(false)"
			>
				Abandon cycle
			</button>
			<button
				v-else
				id="button"
				class="button start"
				@click="setCountdownState(true)"
			>
				Start a cycle
			</button>
		</div>
		<Card id="card" class="w-full lg:w-1/2" />
	</section>
</template>

<script lang="ts">
	import { defineComponent, nextTick } from '@nuxtjs/composition-api';

	import useCountdown from '~/composables/store/useCountdown';
	import useChallenges from '~/composables/store/useChallenges';

	import { scrollToElement, getRandomNumber } from '~/utils';

	import CompletedChallenges from '~/components/atom/CompletedChallenges.vue';
	import Countdown from '~/components/molecules/Countdown.vue';
	import Profile from '~/components/molecules/Profile.vue';
	import Card from '~/components/organisms/Card.vue';

	interface Head {
		title: string;
	}

	export default defineComponent({
		head (): Head {
			return {
				title: 'Home | move.it',
			};
		},
		components: {
			CompletedChallenges,
			Countdown,
			Profile,
			Card,
		},
		setup () {
			const {
				hasCompleted: hasCountdownCompleted,
				isActive: isCountdownActive,
				setHasCompleted: setCountdownHasCompleted,
				setIsActive: setCountdownIsActive,
				resetTime,
			} = useCountdown();

			const { challengesLength, setCurrentChallengeIndex } = useChallenges();

			const setCountdownState = (flag: boolean) => {
				setCountdownHasCompleted(false);
				setCountdownIsActive(flag);
			};

			const getNewChallenge = () => {
				setCountdownIsActive(false);
				resetTime();

				const index = getRandomNumber(0, challengesLength.value);
				setCountdownHasCompleted(true);
				setCurrentChallengeIndex(index);

				if (Notification.permission === 'granted') {
					new Audio('/notification.mp3').play();
					new Notification('New Challenge!', {
							body: 'A new challenge has started! Go complete it!',
							icon: '/favicon.png',
					});
				}

				nextTick(() => {
					scrollToElement('#challenge');
				});
			};

			if (process.browser && 'Notification' in window) {
				Notification.requestPermission();
			}

			return {
				hasCountdownCompleted,
				isCountdownActive,
				setCountdownState,
				getNewChallenge,
			};
		},
	});
</script>
