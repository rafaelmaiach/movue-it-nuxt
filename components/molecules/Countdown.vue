<template>
	<div class="flex justify-center items-center mt-8 lg:mt-14 text-9xl text-title font-rajdhani">
		<CountdownDigits :digits="minutes" />
		<span class="bg-background px-2">:</span>
		<CountdownDigits :digits="seconds" />
	</div>
</template>

<script lang="ts">
	import { defineComponent, watchEffect } from '@nuxtjs/composition-api';

	import useCountdown from '~/composables/store/useCountdown';

	import CountdownDigits from '~/components/atom/CountdownDigits.vue';

	let TIMEOUT_REFERENCE: ReturnType<typeof setTimeout>;

	export default defineComponent({
		components: { CountdownDigits },
		emits: ['completed'],
		setup (_, { emit }) {
			const {
				time,
				isActive,
				minutes,
				seconds,
				setTime,
			} = useCountdown();

			const runCountdown = (flag: boolean) => {
				if (isActive.value && flag) {
					TIMEOUT_REFERENCE = setTimeout(() => {
						setTime(-1);
					}, 1000);
				} else {
					clearTimeout(TIMEOUT_REFERENCE);
				}
			};

			watchEffect(() => {
				if (time.value > 0) {
					runCountdown(true);
				} else if (time.value === 0) {
					emit('completed');
				}
			});

			return {
				runCountdown,
				minutes,
				seconds,
			};
		},
	});
</script>
