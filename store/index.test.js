import { Mutations } from './Challenges/types';

import { actions } from './index';

describe('Store:index', () => {
	it(`should commit ${Mutations.SAVE_COOKIE_DATA} when nuxtServerInit is run`, () => {
		const store = { commit: jest.fn() };
		const context = {
			app: {
				$cookiz: {
					get: jest.fn(() => 'cookie'),
				},
			},
		};

		actions.nuxtServerInit(store, context);

		expect(context.app.$cookiz.get).toHaveBeenCalledWith('movueit');
		expect(store.commit).toHaveBeenCalledWith(`Challenges/${Mutations.SAVE_COOKIE_DATA}`, 'cookie');
	});

	it(`should not commit ${Mutations.SAVE_COOKIE_DATA} when nuxtServerInit is run`, () => {
		const store = { commit: jest.fn() };
		const context = {
			app: {
				$cookiz: {
					get: jest.fn(() => ''),
				},
			},
		};

		actions.nuxtServerInit(store, context);

		expect(context.app.$cookiz.get).toHaveBeenCalledWith('movueit');
		expect(store.commit).not.toHaveBeenCalled();
	});
});
