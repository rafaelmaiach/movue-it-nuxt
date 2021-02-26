export interface XP {
	current: number;
	start: number;
	end: number;
}

export interface Challenge {
	type: string;
	description: string;
	amount: number;
}

export interface State {
	level: number;
	xp: XP;
	completedChallenges: number;
	currentChallengeIndex: number | null;
	allChallenges: Challenge[];
}

export interface Getters {
	challengesLength: (state: State) => number,
	currentXpPercentage: (state: State) => number,
	currentChallenge: (state: State) => Challenge | null,
}

export type RootState = ReturnType<() => State>

export enum Mutations {
	SET_CURRENT_CHALLENGE_INDEX = 'SET_CURRENT_CHALLENGE_INDEX',
	COMPLETE_CHALLENGE = 'COMPLETE_CHALLENGE',
}
