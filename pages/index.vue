<template>
	<section class="pomodoro md:mt-16 sm:gap-x-10 md:gap-x-20">
		<Profile class="profile" />
		<CompletedChallenges class="challenges" />
		<Countdown class="countdown" />
		<Button class="button bg-blue hover:bg-blue-dark">
			<span>Start a cycle</span>
		</Button>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';

	import CompletedChallenges from '~/components/atom/CompletedChallenges.vue';
	import Countdown from '~/components/atom/Countdown.vue';
	import Button from '~/components/atom/Button.vue';
	import Profile from '~/components/molecules/Profile.vue';

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
