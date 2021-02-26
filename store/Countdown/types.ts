export interface State {
	time: number;
	isActive: boolean;
	hasCompleted: boolean;
}

export interface Getters {
	minutes: (state: State) => number;
	seconds: (state: State) => number;
}

export type RootState = ReturnType<() => State>

export enum Mutations {
	SET_TIME = 'SET_TIME',
	RESET_TIME = 'RESET_TIME',
	SET_IS_ACTIVE = 'SET_IS_ACTIVE',
	SET_HAS_COMPLETED = 'SET_HAS_COMPLETED',
}
