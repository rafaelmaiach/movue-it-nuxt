import getters from './getters';

describe('Store:Challenges:getters', () => {
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
});
