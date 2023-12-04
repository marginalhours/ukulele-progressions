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
	it('should parse a 5', () => {
		expect(parseRelativeChord('iv5')).toEqual({
			number: 'IV',
			quality: '5'
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
	it('should parse a minor major 7th', () => {
		expect(parseRelativeChord('ivmaj7')).toEqual({
			number: 'IV',
			quality: 'minor-major-7th'
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
	it('should parse a 6', () => {
		expect(parseRelativeChord('IV6')).toEqual({
			number: 'IV',
			quality: '6'
		});
	});
	it('should parse a minor major 6', () => {
		expect(parseRelativeChord('iv6')).toEqual({
			number: 'IV',
			quality: 'minor-major-6'
		});
	});
	it('should parse a major add9', () => {
		expect(parseRelativeChord('IIadd9')).toEqual({
			number: 'II',
			quality: 'major-add-9'
		});
	});
	it('should parse a minor add9', () => {
		expect(parseRelativeChord('iiadd9')).toEqual({
			number: 'II',
			quality: 'minor-add-9'
		});
	});
	it('should parse a dominant 7th flat 5', () => {
		expect(parseRelativeChord('III7b5')).toEqual({
			number: 'III',
			quality: 'dominant-7th-flat-5'
		});
	});
	it('should parse an augmented fourth', () => {
		expect(parseRelativeChord('IVaug')).toEqual({
			number: 'IV',
			quality: 'augmented'
		});
	});
	it('should parse an augmented', () => {
		expect(parseRelativeChord('IIIaug')).toEqual({
			number: 'III',
			quality: 'augmented'
		});
	});
	it('should parse an augmented 7th', () => {
		expect(parseRelativeChord('Vaug7')).toEqual({
			number: 'V',
			quality: 'augmented-7th'
		});
	});
	it('should parse a minor 7th flat 5', () => {
		expect(parseRelativeChord('iii7b5')).toEqual({
			number: 'III',
			quality: 'minor-7th-flat-5'
		});
	});
	it('should parse a minor 7th sharp 5', () => {
		expect(parseRelativeChord('iii7s5')).toEqual({
			number: 'III',
			quality: 'minor-7th-sharp-5'
		});
	});
	it('should parse a 6 sus 4', () => {
		expect(parseRelativeChord('V6sus4')).toEqual({
			number: 'V',
			quality: '6-suspended-4th'
		});
	});
	it('should parse a 6 sus 2', () => {
		expect(parseRelativeChord('V6sus2')).toEqual({
			number: 'V',
			quality: '6-suspended-2nd'
		});
	});
	it('should parse a 7th sus 4', () => {
		expect(parseRelativeChord('IV7sus4')).toEqual({
			number: 'IV',
			quality: 'dominant-7th-suspended-4th'
		});
	});
	it('should parse a 7th sus 2', () => {
		expect(parseRelativeChord('IV7sus2')).toEqual({
			number: 'IV',
			quality: 'dominant-7th-suspended-2nd'
		});
	});
	it('should parse a major 7th sus 4', () => {
		expect(parseRelativeChord('IVmaj7sus4')).toEqual({
			number: 'IV',
			quality: 'major-7th-suspended-4th'
		});
	});
	it('should parse a major 7th sus 2', () => {
		expect(parseRelativeChord('IVmaj7sus2')).toEqual({
			number: 'IV',
			quality: 'major-7th-suspended-2nd'
		});
	});

	it('should parse a diminished', () => {
		expect(parseRelativeChord('IIIdim')).toEqual({
			number: 'III',
			quality: 'diminished'
		});
	});

	it('should parse a diminished 7th', () => {
		expect(parseRelativeChord('Vdim7')).toEqual({
			number: 'V',
			quality: 'diminished-7th'
		});
	});

	it('should parse a perfect fifth', () => {
		expect(parseRelativeChord('V')).toEqual({
			number: 'V',
			quality: 'major'
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

	// flat numbers
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
	it('should parse a minor flat 6th', () => {
		expect(parseRelativeChord('bvi')).toEqual({
			number: 'bVI',
			quality: 'minor'
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
