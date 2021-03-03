import { computed, reactive, toRefs } from '@nuxtjs/composition-api';
import * as T from './types';

const MINUTES = 0.05;

const state: T.State = reactive({
	time: MINUTES * 60,
	isActive: false,
	hasCompleted: false,
});

export default function useCountown () {
	const minutes: T.Minutes = computed(() => Math.floor(state.time / 60));
	const seconds: T.Seconds = computed(() => state.time % 60);

	const setTime: T.SetTime = (newTime) => {
		state.time += newTime;
	};

	const resetTime: T.ResetTime = () => {
		state.time = MINUTES * 60;
	};

	const setIsActive: T.SetIsActive = (isActive) => {
		state.isActive = isActive;
	};

	const setHasCompleted: T.SetHasCompleted = (hasCompleted) => {
		state.hasCompleted = hasCompleted;
	};

	return {
		// state
		...toRefs(state),

		// computed
		minutes,
		seconds,

		// methods
		setTime,
		resetTime,
		setIsActive,
		setHasCompleted,
	};
};
