import { ComputedRef, Data } from '@nuxtjs/composition-api';

export interface State extends Data {
	time: number;
	isActive: boolean;
	hasCompleted: boolean;
}

export type	Minutes = ComputedRef<number>;
export type	Seconds = ComputedRef<number>;

export type	SetTime = (p: number) => void;
export type	ResetTime = () => void;
export type	SetIsActive = (p: boolean) => void;
export type	SetHasCompleted = (p: boolean) => void;
