import { Interval, type Chord, type PitchString, ChordType } from './types';

export const pitches: PitchString[] = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B'
];

const pitchToIndex: { [key: string]: number } = {
	C: 0,
	'C#': 1,
	D: 2,
	'D#': 3,
	E: 4,
	F: 5,
	'F#': 6,
	G: 7,
	'G#': 8,
	A: 9,
	'A#': 10,
	B: 11
};

export const transposePitch = (pitch: PitchString, semitones: number): PitchString => {
	const pitchIndex = pitchToIndex[pitch];
	return pitches[(pitchIndex + semitones) % pitches.length];
};

const getChordPitches = (chord: Chord): Set<PitchString> => {
	switch (chord.type) {
		case ChordType.MAJOR:
			return new Set([chord.tonic, transposePitch(chord.tonic, 4), transposePitch(chord.tonic, 7)]);
		case ChordType.MINOR:
			return new Set([chord.tonic, transposePitch(chord.tonic, 3), transposePitch(chord.tonic, 7)]);
	}
};

const getStringPitches = (string: PitchString, frets: number) => {
	return Array.from(Array(frets).keys()).map((semitones) => transposePitch(string, semitones));
};

const findMatchingFretNumbers = (
	pitches: PitchString[],
	chordPitches: Set<PitchString>
): number[] => {
	return pitches.reduce((matchingFrets, pitch, index) => {
		return chordPitches.has(pitch) ? [...matchingFrets, index] : matchingFrets;
	}, [] as number[]);
};

interface FrettingEvaluation {
	fretting: number[];
	openStrings: number;
	maximumGap: number;
	fretSum: number;
}

const scoreFretting = (frets: number[]): FrettingEvaluation => {
	const openStrings = frets.filter((fretPosition) => fretPosition === 0).length;

	const fretsWithoutOpens = frets.filter((f) => f !== 0);

	const maximumGap = Math.max(...fretsWithoutOpens) - Math.min(...fretsWithoutOpens);

	const fretSum = fretsWithoutOpens.reduce((acc, val) => acc + val, 0);

	return {
		fretting: frets,
		openStrings,
		maximumGap,
		fretSum
	};
};

const filterFrettings = (fretting: FrettingEvaluation): boolean => {
	if (fretting.maximumGap > 4) {
		return false;
	}

	return true;
};

const compareFrettings = (frettingA: FrettingEvaluation, frettingB: FrettingEvaluation) => {
	return frettingA.fretSum - frettingB.fretSum;
};

/**
 * Given sets of per-string frets, generate all actual candidate frettings
 */
const generateFrettings = (frets: number[][]): number[][] => {
	// For a single string, set of chords is set of frets
	if (frets.length === 1) {
		return frets[0].map((fretPosition) => [fretPosition]);
	}

	const remainingStrings = generateFrettings(frets.slice(1));

	return frets[0]
		.map((fretPosition) => {
			return remainingStrings.map((otherFretPositions) => [fretPosition, ...otherFretPositions]);
		})
		.flat();
};

export class Instrument {
	pitches: PitchString[];
	frets: number;

	constructor(pitches: PitchString[], frets: number) {
		this.pitches = pitches;
		this.frets = frets;
	}

	/**
	 * Gets all possible frettings of a given chord
	 * @param chord
	 */
	getFrets(chord: Chord) {
		const chordPitches = getChordPitches(chord);
		const stringPitches = this.pitches.map((pitch) => getStringPitches(pitch, this.frets));
		const acceptableFrets = stringPitches.map((pitches) =>
			findMatchingFretNumbers(pitches, chordPitches)
		);

		// now can combine - heuristics are something like:
		// - lower frets is good
		// - lower inter-fret distance is good
		// - bars! can never have "behind bar" eg 7776 but can have "in front" eg 7789
		// - after that it's just combining them I guess?
		const frets = generateFrettings(acceptableFrets)
			.map(scoreFretting)
			.filter(filterFrettings)
			.sort(compareFrettings);

		return frets[0];
	}
}

// API needs to:
// Create inversions
// Work out simplest fretting of a chord
