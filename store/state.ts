import { State } from './types';
import allChallenges from './challenges';

export default (): State => ({
	level: 1,
	xp: {
		current: 0,
		start: 0,
		end: 16,
	},
	isActive: false,
	completedChallenges: 0,
	currentChallengeIndex: null,
	allChallenges,
});
