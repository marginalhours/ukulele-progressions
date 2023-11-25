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
	it('should parse a dominant 7th', () => {
		expect(parseRelativeChord('IV7')).toEqual({
			number: 'IV',
			quality: 'dominant-7th'
		});
	});
	it('should parse a major 7th', () => {
		expect(parseRelativeChord('IVmaj7')).toEqual({
			number: 'IV',
			quality: 'major-7th'
		});
	});
	it('should parse a minor 7th', () => {
		expect(parseRelativeChord('iv7')).toEqual({
			number: 'IV',
			quality: 'minor-7th'
		});
	});
	it('should parse a 6', () => {
		expect(parseRelativeChord('iv6')).toEqual({
			number: 'IV',
			quality: '6'
		});
	});
	it('should parse a 5', () => {
		expect(parseRelativeChord('iv5')).toEqual({
			number: 'IV',
			quality: '5'
		});
	});
	it('should parse a sus4', () => {
		expect(parseRelativeChord('Isus4')).toEqual({
			number: 'I',
			quality: 'suspended-4th'
		});
	});
	it('should parse a sus2', () => {
		expect(parseRelativeChord('VIsus2')).toEqual({
			number: 'VI',
			quality: 'suspended-2nd'
		});
	});
	it('should parse an augmented', () => {
		expect(parseRelativeChord('IIIaug')).toEqual({
			number: 'III',
			quality: 'augmented'
		});
	});
	it('should parse a diminished', () => {
		expect(parseRelativeChord('IIIdim')).toEqual({
			number: 'III',
			quality: 'diminished'
		});
	});
	it('should parse an augmented 7th', () => {
		expect(parseRelativeChord('Vaug7')).toEqual({
			number: 'V',
			quality: 'augmented-7th'
		});
	});
	it('should parse a diminished 7th', () => {
		expect(parseRelativeChord('Vdim7')).toEqual({
			number: 'V',
			quality: 'diminished-7th'
		});
	});
	it('should parse a flat 3rd', () => {
		expect(parseRelativeChord('bIII')).toEqual({
			number: 'bIII',
			quality: 'major'
		});
	});
	it('should parse a flat 3rd', () => {
		expect(parseRelativeChord('bIII')).toEqual({
			number: 'bIII',
			quality: 'major'
		});
	});
	it('should parse a flat 6th', () => {
		expect(parseRelativeChord('bVI')).toEqual({
			number: 'bVI',
			quality: 'major'
		});
	});
	it('should parse a flat 7th', () => {
		expect(parseRelativeChord('bVII')).toEqual({
			number: 'bVII',
			quality: 'major'
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
