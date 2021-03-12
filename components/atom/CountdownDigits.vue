<template>
	<p class="w-1/2 flex gap-x-1">
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
import Vue from 'vue';
import { splitValue } from '~/utils';

export default Vue.extend({
	props: {
		digits: { type: Number, required: true },
	},
	computed: {
		splittedDigits (): string[] {
			return splitValue(this.digits);
		},
	},
});
</script>
