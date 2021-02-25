<template>
	<div id="countdown" class="flex justify-center items-center mt-8 md:mt-14">
		<p class="number">
			<span>
				{{ minutes[0] }}
			</span>
			<span>
				{{ minutes[1] }}
			</span>
		</p>
		<span id="colon">:</span>
		<p class="number">
			<span>
				{{ seconds[0] }}
			</span>
			<span>
				{{ seconds[1] }}
			</span>
		</p>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	const MINUTES = 0.1;
	let TIMEOUT_REFERENCE: ReturnType<typeof setTimeout>;

	export default Vue.extend({
		data () {
			return {
				time: MINUTES * 60,
			};
		},
		computed: {
			isActive () {
				return this.$store.state.isActive;
			},
			minutes (): string[] {
				const remainingMinutes = Math.floor(this.time / 60);
				return this.formattedTime(remainingMinutes);
			},
			seconds (): string[] {
				const remainingSeconds = this.time % 60;
				return this.formattedTime(remainingSeconds);
			},
		},
		watch: {
			isActive (newValue: boolean) {
				this.runCountdown(newValue);

				if (!newValue) {
					this.time = MINUTES * 60;
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
		methods: {
			formattedTime (time: number) {
				return `${time}`.padStart(2, '0').split('');
			},
			runCountdown (flag: boolean) {
				if (this.isActive && flag) {
					TIMEOUT_REFERENCE = setTimeout(() => { this.time -= 1; }, 1000);
				} else {
					clearTimeout(TIMEOUT_REFERENCE);
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
