import { MutationTree } from 'vuex';
import { State, Getters, RootState, Mutations } from './types';

const MINUTES = 0.1;

export const state = ():State => ({
	time: MINUTES * 60,
	isActive: false,
	hasCompleted: false,
});

export const getters:Getters = {
	minutes: (state: State) => Math.floor(state.time / 60),
	seconds: (state: State) => state.time % 60,
};

export const mutations:MutationTree<RootState> = {
	[Mutations.SET_TIME] (state: State, newTime: number) {
		state.time = newTime;
	},
	[Mutations.RESET_TIME] (state: State) {
		state.time = MINUTES * 60;
	},
	[Mutations.SET_IS_ACTIVE]: (state: State, isActive: boolean) => {
		state.isActive = isActive;
	},
	[Mutations.SET_HAS_COMPLETED]: (state: State, hasCompleted: boolean) => {
		state.hasCompleted = hasCompleted;
	},
};
