import { mount } from '@vue/test-utils';

import CountdownDigits from './CountdownDigits.vue';

describe('Components:atoms:CountdownDigits', () => {
	describe('Snapshots', () => {
		it('should match snapshot', () => {
			const wrapper = mount(CountdownDigits, {
				propsData: {
					digits: 10,
				},
			});

			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
