import { mount } from '@vue/test-utils';

import { setupLocalVueStore } from '~/store/helper';

import CompletedChallenges from './CompletedChallenges.vue';

describe('Components:atoms:CompletedChallenges', () => {
	const { localVue, configureStore } = setupLocalVueStore();
	let mountConfig;

	beforeEach(() => {
		mountConfig = {
			localVue,
		};
	});

	const buildWrapper = () => {
		const store = configureStore();
		return {
			...mountConfig,
			store,
		};
	};

	describe('Snapshots', () => {
		it('should match snapshot', () => {
			const config = buildWrapper();
			const wrapper = mount(CompletedChallenges, config);

			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
