import { shallowMount } from '@vue/test-utils';
import { Mutations } from '~/store/Countdown/types';

import { setupLocalVueStore } from '~/store/helper';

import Countdown from './Countdown.vue';
import CountdownDigits from '~/components/atoms/CountdownDigits.vue';

describe('Components:molecules:Countdown', () => {
	const { localVue, configureStore } = setupLocalVueStore();
	let mountConfig;

	beforeEach(() => {
		jest.useFakeTimers();

		mountConfig = {
			localVue,
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
		it('should match snapshot and pass correct props', () => {
			const config = buildWrapper();
			const wrapper = shallowMount(Countdown, config);

			const minutes = wrapper.findAllComponents(CountdownDigits).at(0);
			const seconds = wrapper.findAllComponents(CountdownDigits).at(1);

			expect(wrapper.html()).toMatchSnapshot();
			expect(minutes.props()).toMatchObject({ digits: 25 });
			expect(seconds.props()).toMatchObject({ digits: 0 });
		});
	});

	describe('Watchers', () => {
		it('should run countdown and not reset time', async () => {
			const config = buildWrapper();
			const wrapper = shallowMount(Countdown, config);

			await config.store.commit(`Countdown/${Mutations.SET_IS_ACTIVE}`, true);

			jest.advanceTimersByTime(1000);

			expect(wrapper.vm.minutes).toBe(24);
			expect(wrapper.vm.seconds).toBe(59);
		});

		it('should run countdown, reset time and clear timeout', async () => {
			const config = buildWrapper();
			const wrapper = shallowMount(Countdown, config);

			await config.store.commit(`Countdown/${Mutations.SET_IS_ACTIVE}`, true);

			jest.advanceTimersByTime(1000);

			expect(wrapper.vm.minutes).toBe(24);
			expect(wrapper.vm.seconds).toBe(59);

			await config.store.commit(`Countdown/${Mutations.SET_IS_ACTIVE}`, false);

			expect(wrapper.vm.minutes).toBe(25);
			expect(wrapper.vm.seconds).toBe(0);
			expect(clearTimeout).toHaveBeenCalled();
		});

		it('should run countdown and not reset time', async () => {
			const config = buildWrapper({ isActive: true });
			const wrapper = shallowMount(Countdown, config);

			await config.store.commit(`Countdown/${Mutations.SET_TIME}`, 24 * 60);

			jest.advanceTimersByTime(1000);

			expect(wrapper.vm.minutes).toBe(23);
			expect(wrapper.vm.seconds).toBe(59);
		});

		it('should not run countdown and emit completed event for time = 0', async () => {
			const config = buildWrapper({ isActive: true });
			const wrapper = shallowMount(Countdown, config);
			const runCountdown = jest.spyOn(wrapper.vm, 'runCountdown');

			await config.store.commit(`Countdown/${Mutations.SET_TIME}`, 0);

			expect(runCountdown).not.toHaveBeenCalled();
			expect(wrapper.emitted().completed).toBeTruthy();
		});

		it('should not run countdown and emit completed event for time < 0', async () => {
			const config = buildWrapper({ isActive: true });
			const wrapper = shallowMount(Countdown, config);
			const runCountdown = jest.spyOn(wrapper.vm, 'runCountdown');

			await config.store.commit(`Countdown/${Mutations.SET_TIME}`, -1);

			expect(runCountdown).not.toHaveBeenCalled();
			expect(wrapper.emitted().completed).toBeTruthy();
		});
	});
});
