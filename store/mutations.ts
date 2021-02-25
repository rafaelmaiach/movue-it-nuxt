import { MutationTree } from 'vuex';
import { RootState, State } from './types';

export default {
	SET_CURRENT_CHALLENGE_INDEX: (state: State, index: number) => {
		state.currentChallengeIndex = index;
	},
	SET_IS_ACTIVE: (state: State, isActive: boolean) => {
		state.isActive = isActive;
	},
	SET_CURRENT_XP: (state: State, newCurrentXp: number) => {
		state.xp = {
			...state.xp,
			current: newCurrentXp,
		};
	},
	LEVEL_UP: (state: State) => {
		state.level += 1;
		state.xp = {
			current: 0,
			start: 0,
			end: Math.pow(state.level * 4, 2),
		};
	},
} as MutationTree<RootState>;
