<template>
	<section class="pomodoro md:mt-16">
		<Profile class="profile" />
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';

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
			grid-template-columns: 1fr 1fr;
			grid-template-areas:
				"profile card"
				"challenges card"
				"countdown card"
				"button card"
		}
	}
</style>
