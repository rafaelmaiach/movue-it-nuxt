import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import * as Challenges from '~/store/Challenges';
import ChallengesGetters from '~/store/Challenges/getters';
import ChallengesMutations from '~/store/Challenges/mutations';

import * as Countdown from '~/store/Countdown';

export const setupLocalVueStore = () => {
	const localVue = createLocalVue();
	localVue.use(Vuex);

	const setupModule = () => ({
		modules: {
			Countdown: {
				namespaced: true,
				state: Countdown.state(),
				getters: Countdown.getters,
				mutations: Countdown.mutations,
			},
			Challenges: {
				namespaced: true,
				state: {
					...Challenges.state(),
					allChallenges: [{
						type: 'type',
						description: 'description',
						amount: 10,
					}],
				},
				getters: ChallengesGetters,
				mutations: ChallengesMutations,
			},
		},
	});

	const configureStore = (countdownState = {}, challengesState = {}) => {
		const storeConfig = setupModule();
		storeConfig.modules.Countdown.state = {
			...storeConfig.modules.Countdown.state,
			...countdownState,
		};

		storeConfig.modules.Challenges.state = {
			...storeConfig.modules.Challenges.state,
			...challengesState,
		};

		const store = new Vuex.Store(storeConfig);
		return store;
	};

	return {
		localVue,
		configureStore,
	};
};
