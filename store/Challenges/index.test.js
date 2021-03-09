import allChallenges from '~/assets/challenges/data';

import { state as originalState } from './index';

describe('Store:Challenges:index', () => {
	describe('State', () => {
		it('should have an initial state', () => {
			expect(originalState()).toMatchObject({
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
		});
	});
});
