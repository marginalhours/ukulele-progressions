/**
 * This file contains types and helpers for working with chords
 */

import { type RelativeChord, relativeChordInSemitones } from './relativeChord';
import { transposePitch } from './pitch';
import type { Pitch, Quality } from './types';

export const intervalToChord = (tonic: Pitch, interval: RelativeChord): Chord => {
	const chordPitch = transposePitch(tonic, relativeChordInSemitones(interval));

	return { tonic: chordPitch, quality: interval.quality };
};

export type Chord = {
	tonic: Pitch;
	quality: Quality;
};

export const chordToString = ({ tonic, quality }: Chord): string => {
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
			return `${tonic}min7`;
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

// ⁷
