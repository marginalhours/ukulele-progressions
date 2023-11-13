import { parseRelativeChord, progression } from '../../lib/music/relativeChord';

describe('parseInterval', () => {
	it('should parse a major chord', () => {
		expect(parseRelativeChord('VII')).toStrictEqual({
			number: 'VII',
			quality: 'major'
		});
	});
	it('should parse a minor chord', () => {
		expect(parseRelativeChord('vii')).toStrictEqual({
			number: 'VII',
			quality: 'minor'
		});
	});
	it('should parse a perfect fifth', () => {
		expect(parseRelativeChord('V')).toEqual({
			number: 'V',
			quality: 'major'
		});
	});
	it('should parse an augmented fourth', () => {
		expect(parseRelativeChord('IVaug')).toEqual({
			number: 'IV',
			quality: 'augmented'
		});
	});
	it('should parse a major third', () => {
		expect(parseRelativeChord('III')).toEqual({
			number: 'III',
			quality: 'major'
		});
	});
	it('should parse a diminished third', () => {
		expect(parseRelativeChord('iiidim')).toEqual({
			number: 'III',
			quality: 'diminished'
		});
	});
});

describe('progression', () => {
	it('should parse a I iii IV V progression', () => {
		expect(progression`I iii IV V`).toStrictEqual([
			parseRelativeChord('I'),
			parseRelativeChord('iii'),
			parseRelativeChord('IV'),
			parseRelativeChord('V')
		]);
	});
	it('should parse a I-iii-IV-V progression', () => {
		expect(progression`I iii IV V`).toStrictEqual([
			parseRelativeChord('I'),
			parseRelativeChord('iii'),
			parseRelativeChord('IV'),
			parseRelativeChord('V')
		]);
	});
});
