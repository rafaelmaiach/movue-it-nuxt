import { shallowMount } from '@vue/test-utils';
import Default from './default.vue';

describe('Layouts', () => {
	it('should match default layout snapshot', () => {
		const wrapper = shallowMount(Default, {
			stubs: {
				Nuxt: true,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
