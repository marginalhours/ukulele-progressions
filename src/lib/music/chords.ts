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
	let chordString = tonic;

	switch (quality) {
		case 'minor':
			chordString += 'm';
	}

	return chordString;
};

// ⁷
