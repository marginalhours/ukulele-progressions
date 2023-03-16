import { getChordPitches, type Chord } from './chords';
import { getStringPitches, type Pitch } from './pitch';

const findMatchingFretNumbers = (pitches: Pitch[], chordPitches: Set<Pitch>): number[] => {
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
	// TODO: Don't work just with frets - needs to take into account instrument pitches
	// For things like scoring number of distinct pitches etc
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

	// Otherwise, it's every position on the first string x all valid positions on other strings, recursively
	const remainingStrings = generateFrettings(frets.slice(1));

	return frets[0]
		.map((fretPosition) => {
			return remainingStrings.map((otherFretPositions) => [fretPosition, ...otherFretPositions]);
		})
		.flat();
};

export class Instrument {
	pitches: Pitch[];
	frets: number;

	constructor(pitches: Pitch[], frets: number) {
		this.pitches = pitches;
		this.frets = frets;
	}

	/**
	 * Gets best possible fretting of a given chord
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
		// - *variety of notes* is good, don't want 2 same pitch if avoidable (this currently does Em wrong for instance)
		// - bars! can never have "behind bar" eg 7776 but can have "in front" eg 7789
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
