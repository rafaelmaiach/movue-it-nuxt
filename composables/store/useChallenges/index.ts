import { computed, reactive, toRefs } from '@nuxtjs/composition-api';

import * as T from './types';
import allChallenges from './data';

const state: T.State = reactive({
	level: 1,
	xp: {
		current: 0,
		start: 0,
		end: 64,
	},
	completedChallenges: 0,
	currentChallengeIndex: null,
	isLevelUpModalOpen: false,
	allChallenges,
});

export default function useChallenges () {
	const challengesLength: T.ChallengesLength = computed(() => state.allChallenges.length);
	const currentXpPercentage = computed(() => Number(((state.xp.current / state.xp.end) * 100).toFixed(2)));
	const currentChallenge = computed(() => typeof state.currentChallengeIndex === 'number'
		? state.allChallenges[state.currentChallengeIndex]
		: null,
	);

	const setCurrentChallengeIndex: T.SetCurrentChallengeIndex = (index) => {
		state.currentChallengeIndex = index;
	};

	const setIsLevelUpModalOpen: T.SetIsLevelUpModalOpen = (flag) => {
		state.isLevelUpModalOpen = flag;
	};

	const completeChallenge: T.CompleteChallenge = (xpAmount) => {
		const { current, end } = state.xp;
		const shouldLevelUp = (xpAmount + current) >= end;

		state.completedChallenges += 1;

		if (shouldLevelUp) {
			state.level += 1;

			const remainingXp = (current + xpAmount) - end;
			const experienceToNextLevel = Math.pow((state.level + 1) * 4, 2);

			state.xp = {
				current: remainingXp,
				start: 0,
				end: experienceToNextLevel,
			};

			state.isLevelUpModalOpen = true;
		} else {
			state.xp = {
				...state.xp,
				current: current + xpAmount,
			};
		}
	};

	const saveCookieData: T.SaveCookieData = (cookie) => {
		state.level = cookie.level;
		state.xp = cookie.xp;
		state.completedChallenges = cookie.completedChallenges;
	};

	return {
		// state
		...toRefs(state),

		// getters
		challengesLength,
		currentXpPercentage,
		currentChallenge,

		// methods
		setCurrentChallengeIndex,
		setIsLevelUpModalOpen,
		completeChallenge,
		saveCookieData,
	};
};
