import { mount } from '@vue/test-utils';

import { setupLocalVueStore } from '~/store/helper';

import ExperienceBar from './ExperienceBar.vue';

describe('Components:atoms:ExperienceBar', () => {
	const { localVue, configureStore } = setupLocalVueStore();

	describe('Snapshots', () => {
		it('should match snapshot', () => {
			const wrapper = mount(ExperienceBar, {
				localVue,
				store: configureStore(),
			});

			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
