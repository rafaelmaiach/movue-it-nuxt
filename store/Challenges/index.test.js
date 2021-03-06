import { Mutations } from './types';
import allChallenges from './data';
import { state as originalState, getters, mutations } from './index';

describe('Store:Challenges:index', () => {
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

	describe('Getters', () => {
		it('challengesLength', () => {
			const length = getters.challengesLength(state);

			expect(length).toBe(1);
		});

		it('currentXpPercentage', () => {
			const percentage = getters.currentXpPercentage(state);
			state.xp.current = 15;
			const percentageFloat = getters.currentXpPercentage(state);

			expect(percentage).toBe(50);
			expect(percentageFloat).toBe(23.44);
		});

		it('currentChallenge with currentChallengeIndex a number', () => {
			state.currentChallengeIndex = 0;
			const challenge = getters.currentChallenge(state);

			expect(challenge).toMatchObject({
				type: 'body',
				description: 'text',
				amount: 10,
			});
		});

		it('currentChallenge with currentChallengeIndex not a number', () => {
			const challenge = getters.currentChallenge(state);

			expect(challenge).toBe(null);
		});
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
