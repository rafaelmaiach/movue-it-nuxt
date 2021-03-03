import { ComputedRef } from '@nuxtjs/composition-api';

export const splitValue = (value: number | string, padSize: number = 2) => `${value}`.padStart(padSize, '0').split('');

export const scrollToElement = (selector: string) => {
	const card: HTMLElement | null = document.querySelector(selector);
	const mq = window.matchMedia('(max-width: 639px)');

	if (card && mq.matches) {
		card.scrollIntoView({ block: 'start', behavior: 'smooth' });
	}
};

type Number = number | ComputedRef<number>;

export const getRandomNumber = (min: Number, max: Number) => {
	const nMin = Number(min);
	const nMax = Number(max);
	return Math.floor(Math.random() * (nMax - nMin) + nMin);
};
