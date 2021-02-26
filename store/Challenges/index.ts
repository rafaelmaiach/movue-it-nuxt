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
	currentXpPercentage: ({ xp }: State) => (xp.current / xp.end) * 100,
	currentChallenge: ({ allChallenges, currentChallengeIndex }: State) =>
		currentChallengeIndex ? allChallenges[currentChallengeIndex] : null,
};

export const mutations: MutationTree<RootState> = {
	[Mutations.SET_CURRENT_CHALLENGE_INDEX]: (state: State, index: number) => {
		state.currentChallengeIndex = index;
	},
	[Mutations.SET_CURRENT_XP]: (state: State, newCurrentXp: number) => {
		state.xp = {
			...state.xp,
			current: newCurrentXp,
		};
	},
	[Mutations.LEVEL_UP]: (state: State, xpAmount: number) => {
		const remainingXp = (state.xp.current + xpAmount) - state.xp.end;
		const experienceToNextLevel = Math.pow((state.level + 1) * 4, 2);

		state.level += 1;
		state.xp = {
			current: remainingXp,
			start: 0,
			end: experienceToNextLevel,
		};
	},
};
