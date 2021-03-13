jest.mock('~/utils', () => ({
	scrollToElement: jest.fn(),
	getRandomNumber: jest.fn(),
	playAudio: jest.fn(),
	sendNotification: jest.fn(),
}));

import { mount } from '@vue/test-utils';
import VueMeta from 'vue-meta';

import { setupLocalVueStore } from '~/store/helper';
import {
	scrollToElement,
	getRandomNumber,
	playAudio,
	sendNotification,
} from '~/utils';

import Countdown from '~/components/molecules/Countdown.vue';
import Index from './index.vue';

describe('Pages:index', () => {
	const { localVue, configureStore } = setupLocalVueStore();
	localVue.use(VueMeta, { keyName: 'head' });
	let mountConfig;

	beforeEach(() => {
		scrollToElement.mockClear();
		getRandomNumber.mockClear();
		playAudio.mockClear();
		sendNotification.mockClear();
		global.Notification = {
			requestPermission: jest.fn(),
			permission: 'default',
		};

		mountConfig = {
			localVue,
			stubs: {
				Profile: true,
				CompletedChallenges: true,
				Countdown: true,
				Card: true,
			},
		};
	});

	const buildWrapper = (countdownState = {}, challengesState = {}) => {
		const store = configureStore(countdownState, challengesState);
		return {
			...mountConfig,
			store,
		};
	};

	describe('Snapshots', () => {
		it('should render all child components and start a cycle button', () => {
			const config = buildWrapper();
			const wrapper = mount(Index, config);
			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should render all child components and abandon cycle button', () => {
			const config = buildWrapper({ isActive: true });
			const wrapper = mount(Index, config);
			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should render all child components and cycle completed button', () => {
			const config = buildWrapper({ hasCompleted: true });
			const wrapper = mount(Index, config);
			expect(wrapper.html()).toMatchSnapshot();
		});
	});

	describe('Meta info', () => {
		it('should have a meta title', () => {
			const config = buildWrapper();
			const wrapper = mount(Index, config);

			expect(wrapper.vm.$metaInfo.title).toBe('Home | movue.it');
		});
	});

	describe('Mounted', () => {
		it('should request Notification permissions when mounted', () => {
			global.Notification = {
				requestPermission: jest.fn(),
			};

			const config = buildWrapper();
			mount(Index, config);

			expect(global.Notification.requestPermission).toHaveBeenCalled();
		});

		it('should not request permissions if Notification doesnt exist', () => {
			delete global.Notification;

			const config = buildWrapper();
			mount(Index, config);

			expect(global.Notification).toBe(undefined);
		});
	});

	describe('Buttons clicks', () => {
		it('should start a cycle when start a cycle button is clicked', async () => {
			const config = buildWrapper();
			const wrapper = mount(Index, config);

			const button = wrapper.find('button');
			await button.trigger('click');

			const newButton = wrapper.find('button');
			expect(newButton.text()).toBe('Abandon cycle');
		});

		it('should abandon cycle when abandon cycle button is clicked', async () => {
			const config = buildWrapper({ isActive: true });
			const wrapper = mount(Index, config);

			const button = wrapper.find('button');
			await button.trigger('click');

			const newButton = wrapper.find('button');
			expect(newButton.text()).toBe('Start a cycle');
		});
	});

	describe('Emitted events', () => {
		it('should run getNewChallenge and play audio and send notification', async () => {
			global.Notification = {
				requestPermission: jest.fn(),
				permission: 'granted',
			};

			getRandomNumber.mockImplementationOnce(() => 1);

			const config = buildWrapper();
			const wrapper = mount(Index, config);

			const setCurrentChallengeIndex = jest.spyOn(wrapper.vm, 'setCurrentChallengeIndex');

			const countdown = wrapper.findComponent(Countdown);
			await countdown.vm.$emit('completed');

			const button = wrapper.find('button');

			expect(button.text()).toBe('Cycle completed');
			expect(setCurrentChallengeIndex).toHaveBeenCalledWith(1);
			expect(playAudio).toHaveBeenCalledWith('/notification.mp3');
			expect(sendNotification).toHaveBeenCalledWith('New Challenge!', {
				body: 'A new challenge has started! Go complete it!',
				icon: '/favicon.png',
			});
			expect(scrollToElement).toHaveBeenCalledWith('#challenge');
		});

		it('should run getNewChallenge but doesnt play audio and doesnt send notification', async () => {
			getRandomNumber.mockImplementationOnce(() => 1);

			const config = buildWrapper();
			const wrapper = mount(Index, config);

			const setCurrentChallengeIndex = jest.spyOn(wrapper.vm, 'setCurrentChallengeIndex');

			const countdown = wrapper.findComponent(Countdown);
			await countdown.vm.$emit('completed');

			const button = wrapper.find('button');

			expect(button.text()).toBe('Cycle completed');
			expect(setCurrentChallengeIndex).toHaveBeenCalledWith(1);
			expect(playAudio).not.toHaveBeenCalled();
			expect(sendNotification).not.toHaveBeenCalled();
			expect(scrollToElement).toHaveBeenCalledWith('#challenge');
		});
	});
});
