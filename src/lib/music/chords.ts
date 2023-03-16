/**
 * This file contains types and helpers for working with chords
 */

import { IntervalQuality, type Interval, intervalNumberInSemitones } from './intervals';
import { transposePitch, type Pitch } from './pitch';

export const intervalToChord = (tonic: Pitch, interval: Interval): Chord => {
	const chordPitch = transposePitch(tonic, intervalNumberInSemitones(interval));

	let chordType: ChordType = ChordType.MAJOR;
	switch (interval.quality) {
		case IntervalQuality.MAJOR:
			chordType = ChordType.MAJOR;
			break;
		case IntervalQuality.MINOR:
			chordType = ChordType.MINOR;
			break;
	}

	return { tonic: chordPitch, type: chordType };
};

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

export const chordToString = ({ tonic, type }: Chord): string => {
	let chordString = tonic;

	switch (type) {
		case ChordType.MINOR:
			chordString += 'm';
	}

	return chordString;
};

// ⁷
