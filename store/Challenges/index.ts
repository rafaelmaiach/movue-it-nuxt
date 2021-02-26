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
		} else {
			state.xp = {
				...state.xp,
				current: current + xpAmount,
			};
		}
	},
};
