/**
 * This file contains types and helpers for working with pitches
 */

import type { Pitch } from './types';

export const pitches: Pitch[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

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

export const getStringPitches = (string: Pitch, frets: number) => {
	return Array.from(Array(frets).keys()).map((semitones) => transposePitch(string, semitones));
};
