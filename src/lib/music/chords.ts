/**
 * This file contains types and helpers for working with chords
 */

import { type RelativeChord, relativeChordInSemitones } from './relativeChord';
import { transposePitch } from './pitch';
import {
	unflatten,
	type Pitch,
	type PitchWithFlats,
	type Quality,
	unsharpen,
	isFlat
} from './types';

export type Chord = {
	tonic: Pitch;
	quality: Quality;
};

export type ChordWithFlat = {
	tonic: PitchWithFlats;
	quality: Quality;
};

export const intervalToChord = (tonic: PitchWithFlats, interval: RelativeChord): Chord => {
	const chordPitch = transposePitch(unflatten(tonic), relativeChordInSemitones(interval));

	return { tonic: chordPitch, quality: interval.quality };
};

export const chordToString = ({ tonic, quality }: ChordWithFlat): string => {
	switch (quality) {
		case 'major':
			return tonic;
		case 'minor':
			return `${tonic}m`;
		case 'suspended-2nd':
			return `${tonic}sus2`;
		case 'suspended-4th':
			return `${tonic}sus4`;
		case 'dominant-7th':
			return `${tonic}7`;
		case 'major-7th':
			return `${tonic}maj7`;
		case 'minor-7th':
			return `${tonic}m7`;
		case '6':
			return `${tonic}6`;
		case '5':
			return `${tonic}5`;
		case 'diminished':
			return `${tonic}dim`;
		case 'augmented':
			return `${tonic}aug`;
		default:
			return tonic;
	}
};

export const flatAwareChordToString = (
	chord: Chord,
	relativeChord: RelativeChord,
	tonic: Pitch
) => {
	let newTonic = chord.tonic as PitchWithFlats;

	if (isFlat(tonic) || relativeChord.number[0] === 'b') {
		newTonic = unsharpen(chord.tonic);
	}

	return chordToString({ tonic: newTonic, quality: chord.quality });
};

// ⁷
