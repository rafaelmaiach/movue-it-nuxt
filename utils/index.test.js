import {
	splitValue,
	scrollToElement,
	getRandomNumber,
	playAudio,
	sendNotification,
} from './index';

describe('Utils:index', () => {
	it('should pad the value with leading zeros and split the result', () => {
		const splittedValue = splitValue(1);

		expect(splittedValue).toEqual(['0', '1']);
	});

	it('should pad the value with leading zeros based on second paremeter quantity and split the result', () => {
		const splittedValue = splitValue(1, 4);

		expect(splittedValue).toEqual(['0', '0', '0', '1']);
	});

	it('should not pad with zeros if value has the size >= the pad size', () => {
		const splittedValue = splitValue(10, 2);

		expect(splittedValue).toEqual(['1', '0']);
	});

	it('should call scrollIntoView with correct parameters', () => {
		const scrollIntoView = jest.fn();

		const querySelector = jest.spyOn(document, 'querySelector');
		querySelector.mockImplementationOnce(() => ({	scrollIntoView }));

		window.matchMedia = jest.fn().mockImplementationOnce(() => ({ matches: true }));

		scrollToElement('#id');

		expect(querySelector).toHaveBeenCalledWith('#id');
		expect(matchMedia).toHaveBeenCalledWith('(max-width: 639px)');
		expect(scrollIntoView).toHaveBeenCalledWith({ block: 'start', behavior: 'smooth' });
	});

	it('should not call scrollIntoView if card doesnt exist', () => {
		const scrollIntoView = jest.fn();

		const querySelector = jest.spyOn(document, 'querySelector');
		querySelector.mockImplementationOnce(() => {});

		window.matchMedia = jest.fn().mockImplementationOnce(() => ({ matches: true }));

		scrollToElement('#id');

		expect(querySelector).toHaveBeenCalledWith('#id');
		expect(matchMedia).toHaveBeenCalledWith('(max-width: 639px)');
		expect(scrollIntoView).not.toHaveBeenCalled();
	});

	it('should not call scrollIntoView if media queries doesnt match', () => {
		const scrollIntoView = jest.fn();

		const querySelector = jest.spyOn(document, 'querySelector');
		querySelector.mockImplementationOnce(() => true);

		window.matchMedia = jest.fn().mockImplementationOnce(() => ({ matches: false }));

		scrollToElement('#id');

		expect(querySelector).toHaveBeenCalledWith('#id');
		expect(matchMedia).toHaveBeenCalledWith('(max-width: 639px)');
		expect(scrollIntoView).not.toHaveBeenCalled();
	});

	it('should generate a the max number', () => {
		const random = jest.spyOn(Math, 'random');
		random.mockImplementationOnce(() => 1);

		const result = getRandomNumber(1, 10);
		expect(result).toBe(10);
	});

	it('should generate a the min number', () => {
		const random = jest.spyOn(Math, 'random');
		random.mockImplementationOnce(() => 0);

		const result = getRandomNumber(1, 10);
		expect(result).toBe(1);
	});

	it('should generate a the number between min and max', () => {
		const random = jest.spyOn(Math, 'random');
		random.mockImplementationOnce(() => 0.5);

		const result = getRandomNumber(1, 10);
		expect(result).toBe(5);
	});

	it('should create Audio element and play it', () => {
		const play = jest.fn();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		global.Audio = jest.fn(path => ({
			play,
		}));

		playAudio('path');
		expect(global.Audio).toHaveBeenCalledWith('path');
		expect(play).toHaveBeenCalled();
	});

	it('should create and send a Notification', () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		global.Notification = jest.fn((title, options) => {});

		sendNotification('title', { body: 'body' });
		expect(global.Notification).toHaveBeenCalledWith('title', { body: 'body' });
	});
});
