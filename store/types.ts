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

export type Challenges = Challenge[];

export interface State {
	level: number;
	xp: XP;
	isActive: boolean;
	completedChallenges: number;
	currentChallengeIndex: number | null;
	allChallenges: Challenges;
}

export type RootState = ReturnType<() => State>
