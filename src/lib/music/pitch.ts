/**
 * This file contains types and helpers for working with pitches
 */

import { pitches, type Pitch } from './types';

const pitchToIndex: { [key in Pitch]: number } = {
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

export const transposePitch = (pitch: Pitch, semitones: number): Pitch => {
	const pitchIndex = pitchToIndex[pitch];
	return pitches[(pitchIndex + semitones) % pitches.length];
};

export const semitoneDistance = (from: Pitch, to: Pitch): number => {
	const fromIndex = pitchToIndex[from];
	const toIndex = pitchToIndex[to];
	return (toIndex - fromIndex + pitches.length) % pitches.length;
};
