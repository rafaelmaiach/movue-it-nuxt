import { Mutations } from './types';

import mutations from './mutations';

describe('Store:Challenges:mutations', () => {
	let state;

	beforeEach(() => {
		state = {
			level: 1,
			xp: {
				current: 32,
				start: 0,
				end: 64,
			},
			completedChallenges: 0,
			currentChallengeIndex: null,
			isLevelUpModalOpen: false,
			allChallenges: [{
				type: 'body',
				description: 'text',
				amount: 10,
			}],
		};
	});

	describe('Mutations', () => {
		it(Mutations.SET_CURRENT_CHALLENGE_INDEX, () => {
			mutations[Mutations.SET_CURRENT_CHALLENGE_INDEX](state, 1);

			expect(state.currentChallengeIndex).toBe(1);
		});

		it(Mutations.SET_IS_LEVEL_UP_MODAL_OPEN, () => {
			mutations[Mutations.SET_IS_LEVEL_UP_MODAL_OPEN](state, true);

			expect(state.isLevelUpModalOpen).toBe(true);
		});

		it(`${Mutations.COMPLETE_CHALLENGE} and not level up`, () => {
			mutations[Mutations.COMPLETE_CHALLENGE](state, 10);

			expect(state.completedChallenges).toBe(1);
			expect(state.xp.start).toBe(0);
			expect(state.xp.current).toBe(42);
			expect(state.xp.end).toBe(64);
		});

		it(`${Mutations.COMPLETE_CHALLENGE} and level up`, () => {
			mutations[Mutations.COMPLETE_CHALLENGE](state, 42);

			expect(state.completedChallenges).toBe(1);
			expect(state.level).toBe(2);
			expect(state.xp.start).toBe(0);
			expect(state.xp.current).toBe(10);
			expect(state.xp.end).toBe(144);
		});

		it(Mutations.SAVE_COOKIE_DATA, () => {
			mutations[Mutations.SAVE_COOKIE_DATA](state, {
				level: 2,
				xp: {
					current: 20,
					start: 0,
					end: 144,
				},
				completedChallenges: 2,
			});

			expect(state.level).toBe(2);
			expect(state.xp).toMatchObject({
				current: 20,
				start: 0,
				end: 144,
			});
			expect(state.completedChallenges).toBe(2);
		});
	});
});
