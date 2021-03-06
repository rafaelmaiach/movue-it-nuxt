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
				<span>Cycle completed</span>
			</button>
			<button
				v-else-if="isCountdownActive"
				id="button"
				class="button abandon"
				@click="setCountdownState(false)"
			>
				<span>Abandon cycle</span>
			</button>
			<button
				v-else
				id="button"
				class="button start"
				@click="setCountdownState(true)"
			>
				<span>Start a cycle</span>
			</button>
		</div>
		<Card id="card" class="w-full lg:w-1/2" />
	</section>
</template>

<script lang="ts">
import Vue from 'vue';

import { mapState, mapGetters, mapMutations } from 'vuex';
import { Mutations as ChallengesMT } from '~/store/Challenges/types';
import { Mutations as CountdownMT } from '~/store/Countdown/types';
import {
	scrollToElement,
	getRandomNumber,
	playAudio,
	sendNotification,
} from '~/utils';

import CompletedChallenges from '~/components/atom/CompletedChallenges.vue';
import Countdown from '~/components/molecules/Countdown.vue';
import Profile from '~/components/molecules/Profile.vue';
import Card from '~/components/organisms/Card.vue';

interface Head {
	title: string;
}

export default Vue.extend({
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
	mounted () {
		if ('Notification' in window) {
			Notification.requestPermission();
		}
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

			if (Notification?.permission === 'granted') {
				playAudio('/notification.mp3');
				sendNotification('New Challenge!', {
					body: 'A new challenge has started! Go complete it!',
					icon: '/favicon.png',
				});
			}

			this.$nextTick(() => {
				scrollToElement('#challenge');
			});
		},
	},
});
</script>
