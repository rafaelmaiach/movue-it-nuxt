import { onGlobalSetup } from '@nuxtjs/composition-api';
import useChallenges from '~/composables/store/useChallenges';

export default ({ app }: any) => {
	onGlobalSetup(() => {
		const cookie = app.$cookiz.get('movueit');

		if (cookie) {
			const { saveCookieData } = useChallenges();

			saveCookieData(cookie);
		}
	});
};
