/**
 * This file contains types and helpers for working with intervals
 */

import { isLowerCase } from '../utilities';
import type { Interval, Quality } from './types';

export type RelativeChord = {
	number: Interval;
	quality: Quality;
};

const intervalNumberToSemitones: { [key in Interval]: number } = {
	I: 0,
	II: 2,
	III: 4,
	IV: 5,
	V: 7,
	VI: 9,
	VII: 11,
	VIII: 12
};

/** Just the semitones required to reach a different letter number */
export const relativeChordInSemitones = ({ number }: RelativeChord): number => {
	return intervalNumberToSemitones[number];
};

/** Gives guitar-style chord notation */
export const relativeChordToString = (interval: RelativeChord): string => {
	const { number, quality } = interval;

	switch (quality) {
		case 'major':
			return number;
		case 'minor':
			return number.toLowerCase();
		case 'suspended-4th':
			return `${interval}sus4`;
		case 'suspended-2nd':
			return `${interval}sus2`;
		default:
			return number;
	}
};

// 1458: perfect
// 2367: major
//
// major+1: augmented
// major-1: minor
// minor+1: major
// minor-1: diminished
//
// perfect+1:augmented
// perfect-1:diminished

/*
 * Turn a guitar-style interval (vii, Vdim etc) into an Interval object
 */
export const parseRelativeChord = (intervalString: string): RelativeChord | null => {
	// This regex needs a leading b for flats (boo) and possibly for 7ths and 6ths or slash chords
	// lads by the time we're talking bV7 are we really talking 'intervals' at all any more; is that not just a chord
	const matches = intervalString.match(/(^[VI]+|^[vi]+)(aug|dim){0,1}/);

	if (matches === null) {
		return null;
	}

	const number = matches[1].toUpperCase() as Interval;

	let quality: Quality = isLowerCase(matches[1]) ? 'minor' : 'major';

	if (matches[2] === 'aug') {
		quality = 'augmented';
	} else if (matches[2] === 'dim') {
		quality = 'diminished';
	}

	return { number, quality };
};

/*
 * Fancy tagged template literal for writing progressions like progression`I iii IV V`
 */
export const progression = (strings: TemplateStringsArray, ...values: any): RelativeChord[] => {
	return strings[0].split(/[\s-]/).map(parseRelativeChord) as RelativeChord[];
};
