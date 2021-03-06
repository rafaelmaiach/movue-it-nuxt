import { mount } from '@vue/test-utils';

import { setupLocalVueStore } from '~/store/helper';

import Challenge from './Challenge.vue';

describe('Components:molecules:Challenge', () => {
	const { localVue, configureStore } = setupLocalVueStore();
	let mountConfig;

	beforeEach(() => {
		mountConfig = {
			localVue,
			propsData: {
				type: 'type',
				description: 'description',
				amount: 10,
			},
		};
	});

	const buildWrapper = (countdownState = {}) => {
		const store = configureStore(countdownState, {});
		return {
			...mountConfig,
			store,
		};
	};

	describe('Snapshots', () => {
		it('should match snapshot', () => {
			const config = buildWrapper();
			const wrapper = mount(Challenge, config);

			expect(wrapper.html()).toMatchSnapshot();
		});
	});

	describe('Methods', () => {
		it('should reset the challenge', async () => {
			const config = buildWrapper();
			const wrapper = mount(Challenge, config);
			const button = wrapper.find('.button.failed');

			const resetTime = jest.spyOn(wrapper.vm, 'resetTime');
			const setIsActive = jest.spyOn(wrapper.vm, 'setIsActive');
			const setHasCompleted = jest.spyOn(wrapper.vm, 'setHasCompleted');
			const setCurrentChallengeIndex = jest.spyOn(wrapper.vm, 'setCurrentChallengeIndex');

			await button.trigger('click');

			expect(resetTime).toHaveBeenCalled();
			expect(setIsActive).toHaveBeenCalledWith(false);
			expect(setHasCompleted).toHaveBeenCalledWith(false);
			expect(setCurrentChallengeIndex).toHaveBeenCalledWith(null);
		});

		it('should complete the challenge', async () => {
			const config = buildWrapper();
			const wrapper = mount(Challenge, config);
			const button = wrapper.find('.button.succeeded');

			const cookizSet = jest.fn();
			const resetChallenges = jest.spyOn(wrapper.vm, 'resetChallenges');
			const completeChallenge = jest.spyOn(wrapper.vm, 'completeChallenge');

			wrapper.vm.$cookiz = {
				set: cookizSet,
			};

			await button.trigger('click');

			expect(resetChallenges).toHaveBeenCalled();
			expect(completeChallenge).toHaveBeenCalledWith(10);
			expect(wrapper.vm.$cookiz.set).toHaveBeenLastCalledWith('movueit', {
				level: wrapper.vm.level,
				xp: wrapper.vm.xp,
				completedChallenges: wrapper.vm.completedChallenges,
			});
		});
	});
});
