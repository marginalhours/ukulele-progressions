import { IntervalNumber, IntervalQuality, parseInterval } from '../../lib/music/intervals';

describe('parseInterval', () => {
	it('should parse a major chord', () => {
		expect(parseInterval('VII')).toStrictEqual({
			number: IntervalNumber.SEVENTH,
			quality: IntervalQuality.MAJOR
		});
	});
	it('should parse a minor chord', () => {
		expect(parseInterval('vii')).toStrictEqual({
			number: IntervalNumber.SEVENTH,
			quality: IntervalQuality.MINOR
		});
	});
	it('should parse a perfect fifth', () => {
		expect(parseInterval('V')).toEqual({
			number: IntervalNumber.FIFTH,
			quality: IntervalQuality.PERFECT
		});
	});
	it('should parse an augmented fourth', () => {
		expect(parseInterval('IVaug')).toEqual({
			number: IntervalNumber.FOURTH,
			quality: IntervalQuality.AUGMENTED
		});
	});
	it('should parse a major third', () => {
		expect(parseInterval('III')).toEqual({
			number: IntervalNumber.THIRD,
			quality: IntervalQuality.MAJOR
		});
	});
	it('should parse a diminished third', () => {
		expect(parseInterval('iiidim')).toEqual({
			number: IntervalNumber.THIRD,
			quality: IntervalQuality.DIMINISHED
		});
	});
});
