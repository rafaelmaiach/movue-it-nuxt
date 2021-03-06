import { shallowMount } from '@vue/test-utils';

import { setupLocalVueStore } from '~/store/helper';

import Profile from './Profile.vue';

describe('Components:molecules:Profile', () => {
	const { localVue, configureStore } = setupLocalVueStore();
	let mountConfig;

	beforeEach(() => {
		mountConfig = {
			localVue,
		};
	});

	const buildWrapper = (challengesState = {}) => {
		const store = configureStore({}, challengesState);
		return {
			...mountConfig,
			store,
		};
	};

	describe('Snapshots', () => {
		it('should match snapshot', () => {
			const config = buildWrapper();
			const wrapper = shallowMount(Profile, config);

			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
