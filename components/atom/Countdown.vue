<template>
	<div id="countdown" class="flex justify-center items-center mt-8 md:mt-14">
		<p class="number">
			<span>
				{{ countdownMinutes[0] }}
			</span>
			<span>
				{{ countdownMinutes[1] }}
			</span>
		</p>
		<span id="colon">:</span>
		<p class="number">
			<span>
				{{ countdownSeconds[0] }}
			</span>
			<span>
				{{ countdownSeconds[1] }}
			</span>
		</p>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { mapState, mapGetters, mapMutations } from 'vuex';
	import { Mutations } from '~/store/Countdown/types';
	import { splitValue } from '~/utils';

	let TIMEOUT_REFERENCE: ReturnType<typeof setTimeout>;

	export default Vue.extend({
		computed: {
			...mapState('Countdown', ['time', 'isActive']),
			...mapGetters('Countdown', ['minutes', 'seconds']),
			countdownMinutes (): string[] {
				return splitValue(this.minutes);
			},
			countdownSeconds (): string[] {
				return splitValue(this.seconds);
			},
		},
		methods: {
			...mapMutations('Countdown', {
				setTime: Mutations.SET_TIME,
				resetTime: Mutations.RESET_TIME,
			}),
			runCountdown (flag: boolean) {
				if (this.isActive && flag) {
					TIMEOUT_REFERENCE = setTimeout(() => {
						this.setTime(this.time - 1);
					}, 1000);
				} else {
					clearTimeout(TIMEOUT_REFERENCE);
				}
			},
		},
		watch: {
			isActive (newValue: boolean) {
				this.runCountdown(newValue);

				if (!newValue) {
					this.resetTime();
				}
			},
			time (newValue: number) {
				if (newValue > 0) {
					this.runCountdown(true);
				} else if (newValue === 0) {
					this.$emit('completed');
				}
			},
		},
	});
</script>

<style lang="postcss" scoped>
	#countdown {
		@apply text-7xl md:text-9xl text-title;

		font-family: Rajdhani;
	}

	.number {
		@apply flex gap-x-1;
	}

	.number span {
		@apply bg-white rounded-md flex items-center justify-center py-3;
		width: 60px;
	}

	#colon {
		@apply bg-background px-2;
	}

	@media (min-width: 768px) {
		.number span {
			width: 70px;
		}
	}

	@media (min-width: 1024px) {
		.number span {
			width: 85px;
		}
	}

	@media (min-width: 1280px) {
		.number span {
			width: 100px;
		}
	}
</style>
