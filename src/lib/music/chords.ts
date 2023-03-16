/**
 * This file contains types and helpers for working with chords
 */

import type { Pitch } from './pitch';

export enum ChordType {
	MAJOR = 'major',
	MINOR = 'minor'
	// MAJOR7th = 'major7th',
	// MINOR7th = 'minor7th'
	// etc
}

export type Chord = {
	tonic: Pitch;
	type: ChordType;
};

export const getChordPitches = (chord: Chord): Set<Pitch> => {
	switch (chord.type) {
		case ChordType.MAJOR:
			return new Set([chord.tonic, transposePitch(chord.tonic, 4), transposePitch(chord.tonic, 7)]);
		case ChordType.MINOR:
			return new Set([chord.tonic, transposePitch(chord.tonic, 3), transposePitch(chord.tonic, 7)]);
	}
};

// ⁷