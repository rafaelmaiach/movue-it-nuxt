<template>
	<p class="number w-1/2 flex gap-x-1">
		<span
			v-for="(digit, index) in splittedDigits"
			:key="index"
			class="w-1/2 bg-white rounded-md flex items-center justify-center py-3"
		>
			{{ digit }}
		</span>
	</p>
</template>

<script lang="ts">
	import { defineComponent, computed } from '@nuxtjs/composition-api';

	import { splitValue } from '~/utils';

	export default defineComponent({
		props: {
			digits: {
				type: Number,
				required: true,
			},
		},
		setup (props) {
			const splittedDigits = computed(() => splitValue(props.digits));

			return {
				splittedDigits,
			};
		},
	});
</script>
