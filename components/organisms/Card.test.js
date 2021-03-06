import { shallowMount } from '@vue/test-utils';

import { setupLocalVueStore } from '~/store/helper';

import Card from './Card.vue';
import Challenge from '~/components/molecules/Challenge.vue';

describe('Components:organisms:Card', () => {
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
		it('should render start cycle button and modal', () => {
			const config = buildWrapper();
			const wrapper = shallowMount(Card, config);

			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should render start cycle and modal when there is no challenge for an index', () => {
			const config = buildWrapper({ currentChallengeIndex: 1 });
			const wrapper = shallowMount(Card, config);

			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should render challenge and modal and pass the correct props to challenge', () => {
			const config = buildWrapper({ currentChallengeIndex: 0 });
			const wrapper = shallowMount(Card, config);
			const challenge = wrapper.findComponent(Challenge);

			expect(wrapper.html()).toMatchSnapshot();
			// This props are defined on store/helper.js
			expect(challenge.props()).toMatchObject({
				type: 'type',
				description: 'description',
				amount: 10,
			});
		});
	});
});
