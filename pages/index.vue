<template>
	<section class="pomodoro md:mt-16 sm:gap-x-10 md:gap-x-20">
		<Profile class="profile" />
		<CompletedChallenges class="challenges" />
		<Countdown class="countdown" @completed="getNewChallenge" />
		<Button
			v-if="hasCountdownCompleted"
			disabled
			class="button bg-white text-text border-b-2 border-green cursor-not-allowed h-20 w-full"
		>
			<span>Cycle completed</span>
		</Button>
		<Button
			v-else-if="isCountdownActive"
			class="button bg-white text-text hover:bg-red hover:text-white h-20 w-full"
			@click.native="setCountdownState(false)"
		>
			<span>Abandon cycle</span>
		</Button>
		<Button
			v-else
			class="button bg-blue hover:bg-blue-dark h-20 w-full"
			@click.native="setCountdownState(true)"
		>
			<span>Start a cycle</span>
		</Button>
		<Card class="card" />
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { mapState, mapGetters, mapMutations } from 'vuex';
	import { Mutations as ChallengesMT } from '~/store/Challenges/types';
	import { Mutations as CountdownMT } from '~/store/Countdown/types';
	import { scrollToElement, getRandomNumber } from '~/utils';

	import CompletedChallenges from '~/components/atom/CompletedChallenges.vue';
	import Countdown from '~/components/atom/Countdown.vue';
	import Button from '~/components/atom/Button.vue';
	import Profile from '~/components/molecules/Profile.vue';
	import Card from '~/components/organisms/Card.vue';

	interface Head {
		title: string;
	}

	export default Vue.extend({
		head ():Head {
			return {
				title: 'Home | move.it',
			};
		},
		components: {
			CompletedChallenges,
			Countdown,
			Button,
			Profile,
			Card,
		},
		computed: {
			...mapState('Countdown', {
				hasCountdownCompleted: 'hasCompleted',
				isCountdownActive: 'isActive',
			}),
			...mapGetters('Challenges', ['challengesLength']),
		},
		methods: {
			...mapMutations({
				setCountdownHasCompleted: `Countdown/${CountdownMT.SET_HAS_COMPLETED}`,
				setCountdownIsActive: `Countdown/${CountdownMT.SET_IS_ACTIVE}`,
				setCurrentChallengeIndex: `Challenges/${ChallengesMT.SET_CURRENT_CHALLENGE_INDEX}`,
			}),
			setCountdownState (flag: boolean) {
				this.setCountdownHasCompleted(false);
				this.setCountdownIsActive(flag);
			},
			getNewChallenge () {
				const index = getRandomNumber(0, this.challengesLength);
				this.setCountdownHasCompleted(true);
				this.setCurrentChallengeIndex(index);

				this.$nextTick(() => {
					scrollToElement('#challenge');
				});
			},
		},
	});
</script>

<style lang="postcss" scoped>
	.pomodoro {
		@apply grid;

		grid-template-areas:
			"profile"
			"challenges"
			"countdown"
			"button"
			"card"
	}

	.profile { grid-area: profile }
	.challenges { grid-area: challenges }
	.countdown { grid-area: countdown }
	.button { grid-area: button }
	.card { grid-area: card }

	@media (min-width: 640px) {
		.pomodoro {
			@apply grid-cols-2;

			grid-template-areas:
				"profile card"
				"challenges card"
				"countdown card"
				"button card"
		}
	}
</style>
