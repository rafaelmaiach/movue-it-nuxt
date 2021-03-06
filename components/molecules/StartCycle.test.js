import { mount } from '@vue/test-utils';
import StartCycle from './StartCycle.vue';

describe('Components:molecules:StartCycle', () => {
	it('should match snapshot', () => {
		const wrapper = mount(StartCycle);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
