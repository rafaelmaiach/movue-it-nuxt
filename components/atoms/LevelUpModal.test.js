import { mount } from '@vue/test-utils';

import { setupLocalVueStore } from '~/store/helper';

import LevelUpModal from './LevelUpModal.vue';

describe('Components:atoms:LevelUpModal', () => {
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
		it('should match snapshot when modal is opened', () => {
			const config = buildWrapper({ isLevelUpModalOpen: true });
			const wrapper = mount(LevelUpModal, config);

			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should match snapshot when modal is closed', () => {
			const config = buildWrapper({ isLevelUpModalOpen: false });
			const wrapper = mount(LevelUpModal, config);

			expect(wrapper.html()).toMatchSnapshot();
		});
	});

	describe('Behavior', () => {
		it('should close modal when overlay is clicked', async () => {
			const config = buildWrapper({ isLevelUpModalOpen: true });
			const wrapper = mount(LevelUpModal, config);
			const overlay = wrapper.find('.overlay');

			await overlay.trigger('click');

			expect(wrapper.find('.overlay').exists()).toBe(false);
		});

		it('should close modal when close button is clicked', async () => {
			const config = buildWrapper({ isLevelUpModalOpen: true });
			const wrapper = mount(LevelUpModal, config);
			const button = wrapper.find('button');

			await button.trigger('click');

			expect(wrapper.find('.overlay').exists()).toBe(false);
		});
	});
});
