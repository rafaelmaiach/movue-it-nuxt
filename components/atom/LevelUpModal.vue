<template>
	<transition name="slide-fade">
		<div
			v-if="isLevelUpModalOpen"
			class="overlay flex justify-center items-center bg-gray-line fixed inset-0"
			@click="setIsLevelUpModalOpen(false)"
		>
			<div
				class="bg-white w-full max-w-md p-10 rounded-md shadow-lg text-center relative"
				@click.stop
			>
				<header class="text-9xl font-semibold text-blue bg-contain">
					{{ level }}
				</header>

				<strong class="text-2xl text-text mt-1">
					Congratulations!
				</strong>
				<p>
					You reached a new level!
				</p>

				<button
					type="button"
					class="absolute right-2 top-2 bg-transparent border-0"
					@click="setIsLevelUpModalOpen(false)"
				>
					<img src="/icons/close.svg" alt="Close Modal">
				</button>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
	import { defineComponent } from '@nuxtjs/composition-api';
import useChallenges from '~/composables/store/useChallenges';

	export default defineComponent({
		setup () {
			const { level, isLevelUpModalOpen, setIsLevelUpModalOpen } = useChallenges();

			return {
				level,
				isLevelUpModalOpen,
				setIsLevelUpModalOpen,
			};
		},
	});
</script>

<style scoped>
	.overlay {
		background-color: rgba(242, 243, 245, 0.8);
	}

	header {
		background: url('/icons/levelup.svg') no-repeat center;
	}

	button {
		font-size: 0px;
	}
</style>
