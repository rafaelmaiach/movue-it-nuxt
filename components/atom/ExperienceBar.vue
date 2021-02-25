<template>
	<header class="pb-10 flex items-center">
		<p class="xp">
			{{ `${xp.start} xp` }}
		</p>
		<div class="mx-4 lg:mx-6 flex-1 bg-gray-line h-1 rounded-md">
			<div class="relative bg-green h-1" :style="{ width: `${barWidth}%` }">
				<p class="xp absolute -right-4 w-max top-2">
					{{ `${xp.current} xp` }}
				</p>
			</div>
		</div>
		<p class="xp">
			{{ `${xp.end} xp` }}
		</p>
	</header>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { XP } from '~/store/types';

	export default Vue.extend({
		computed: {
			xp (): XP {
				return this.$store.state.xp;
			},
			barWidth (): number {
				const { current, end } = this.xp;
				return (current / end) * 100;
			},
		},
	});
</script>

<style lang="postcss" scoped>
	.xp {
		@apply text-sm;
	}
</style>
