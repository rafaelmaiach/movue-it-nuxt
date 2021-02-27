import { MutationTree } from 'vuex';

import { State, Getters, RootState, Mutations } from './types';
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
	challengesLength: ({ allChallenges }: State) => allChallenges.length,
	currentXpPercentage: ({ xp }: State) => Number(((xp.current / xp.end) * 100).toFixed(2)),
	currentChallenge: ({ allChallenges, currentChallengeIndex }: State) =>
		(typeof currentChallengeIndex === 'number') ? allChallenges[currentChallengeIndex] : null,
};

export const mutations: MutationTree<RootState> = {
	[Mutations.SET_CURRENT_CHALLENGE_INDEX]: (state: State, index: number) => {
		state.currentChallengeIndex = index;
	},
	[Mutations.SET_IS_LEVEL_UP_MODAL_OPEN]: (state: State, flag: boolean) => {
		state.isLevelUpModalOpen = flag;
	},
	[Mutations.COMPLETE_CHALLENGE]: (state: State, xpAmount: number) => {
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
