import { ComputedRef, Data } from '@nuxtjs/composition-api';

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

export interface State extends Data {
	level: number;
	xp: XP;
	completedChallenges: number;
	currentChallengeIndex: number | null;
	isLevelUpModalOpen: boolean;
	allChallenges: Challenge[];
}

export interface Cookie {
	level: number;
	xp: XP;
	completedChallenges: number;
}

export type	ChallengesLength = ComputedRef<number>;
export type	CurrentXpPercentage = ComputedRef<number>;
export type	CurrentChallenge = ComputedRef<Challenge | null>;

export type SetCurrentChallengeIndex = (p: number | null) => void;
export type SetIsLevelUpModalOpen = (p: boolean) => void;
export type CompleteChallenge = (p: number) => void;
export type SaveCookieData = (p: Cookie) => void;
