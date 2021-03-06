
import { State, Getters, Mutations, MutationsInterface } from './types';
import allChallenges from './data';

export const state = (): State => ({
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

export const getters: Getters = {
	challengesLength: ({ allChallenges }) => allChallenges.length,
	currentXpPercentage: ({ xp }) => Number(((xp.current / xp.end) * 100).toFixed(2)),
	currentChallenge: ({ allChallenges, currentChallengeIndex }) =>
		(typeof currentChallengeIndex === 'number') ? allChallenges[currentChallengeIndex] : null,
};

export const mutations: MutationsInterface = {
	[Mutations.SET_CURRENT_CHALLENGE_INDEX] (state, index) {
		state.currentChallengeIndex = index;
	},
	[Mutations.SET_IS_LEVEL_UP_MODAL_OPEN] (state, flag) {
		state.isLevelUpModalOpen = flag;
	},
	[Mutations.COMPLETE_CHALLENGE] (state, xpAmount) {
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
	},
	[Mutations.SAVE_COOKIE_DATA] (state, cookie) {
		state.level = cookie.level;
		state.xp = cookie.xp;
		state.completedChallenges = cookie.completedChallenges;
	},
};
