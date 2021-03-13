import { Mutations, MutationsInterface } from './types';

export default {
	[Mutations.SET_CURRENT_CHALLENGE_INDEX] (state, index) {
		state.currentChallengeIndex = index;
	},
	[Mutations.SET_IS_LEVEL_UP_MODAL_OPEN] (state, flag) {
		state.isLevelUpModalOpen = flag;
	},
	[Mutations.COMPLETE_CHALLENGE] (state, xpAmount) {
		const { current, end } = state.xp;
		const currentTotalXP = current + xpAmount;
		const shouldLevelUp = currentTotalXP >= end;

		state.completedChallenges += 1;

		if (shouldLevelUp) {
			state.level += 1;

			const remainingXp = currentTotalXP - end;
			const experienceToNextLevel = Math.pow((state.level + 1) * 4, 2);

			state.xp = {
				current: remainingXp,
				start: 0,
				end: experienceToNextLevel,
			};

			state.isLevelUpModalOpen = true;
			return;
		}

		state.xp = {
			...state.xp,
			current: currentTotalXP,
		};
	},
	[Mutations.SAVE_COOKIE_DATA] (state, cookie) {
		state.level = cookie.level;
		state.xp = cookie.xp;
		state.completedChallenges = cookie.completedChallenges;
	},
} as MutationsInterface;
