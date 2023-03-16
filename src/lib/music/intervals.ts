/**
 * This file contains types and helpers for working with intervals
 */

import { isLowerCase } from '../utilities';

export enum IntervalNumber {
	FIRST = 'I',
	SECOND = 'II',
	THIRD = 'III',
	FOURTH = 'IV',
	FIFTH = 'V',
	SIXTH = 'VI',
	SEVENTH = 'VII',
	OCTAVE = 'VIII'
}

const PERFECTS = [
	IntervalNumber.FIRST,
	IntervalNumber.FOURTH,
	IntervalNumber.FIFTH,
	IntervalNumber.OCTAVE
];

export enum IntervalQuality {
	PERFECT = 'perfect',
	MAJOR = 'major',
	MINOR = 'minor',
	AUGMENTED = 'augmented',
	DIMINISHED = 'diminished'
}

export type Interval = {
	number: IntervalNumber;
	quality: IntervalQuality;
};

const intervalNumberToSemitones: { [key in IntervalNumber]: number } = {
	[IntervalNumber.FIRST]: 0,
	[IntervalNumber.SECOND]: 2,
	[IntervalNumber.THIRD]: 4,
	[IntervalNumber.FOURTH]: 5,
	[IntervalNumber.FIFTH]: 7,
	[IntervalNumber.SIXTH]: 9,
	[IntervalNumber.SEVENTH]: 11,
	[IntervalNumber.OCTAVE]: 12
};

/** Just the semitones required to reach a different letter number */
export const intervalNumberInSemitones = ({ number }: Interval): number => {
	return intervalNumberToSemitones[number];
};

export const qualityModifierInSemitones = ({ number, quality }: Interval) => {
	if (quality === IntervalQuality.MINOR) {
		return -1;
	}
	if (quality === IntervalQuality.DIMINISHED) {
		return PERFECTS.includes(number) ? -1 : -2;
	}
	if (quality === IntervalQuality.AUGMENTED) {
		return PERFECTS.includes(number) ? 1 : 2;
	}

	return 0;
};

export const toSemitonesFromTonic = (interval: Interval): number => {
	return intervalNumberToSemitones[interval.number] + qualityModifierInSemitones(interval);
};

export const qualityMap: { [key in IntervalQuality]: string } = {
	[IntervalQuality.AUGMENTED]: 'aug',
	[IntervalQuality.DIMINISHED]: 'dim',
	[IntervalQuality.MAJOR]: '',
	[IntervalQuality.MINOR]: '',
	[IntervalQuality.PERFECT]: ''
};

/** Gives guitar-style chord notation */
export const intervalToString = (interval: Interval): string => {
	const number =
		interval.quality === IntervalQuality.MINOR ? interval.number.toLowerCase() : interval.number;
	const quality = qualityMap[interval.quality];

	return `${number}${quality}`;
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
export const parseInterval = (intervalString: string): Interval | null => {
	// This regex needs a leading b for flats (boo) and possibly for 7ths and 6ths or slash chords
	// lads by the time we're talking bV7 are we really talking 'intervals' at all any more; is that not just a chord
	const matches = intervalString.match(/(^[VI]+|^[vi]+)(aug|dim){0,1}/);

	if (matches === null) {
		return null;
	}

	const number: IntervalNumber = matches[1].toUpperCase() as IntervalNumber;

	let quality: IntervalQuality = PERFECTS.includes(number)
		? IntervalQuality.PERFECT
		: IntervalQuality.MAJOR;

	if (isLowerCase(matches[1])) {
		quality = IntervalQuality.MINOR;
	}

	if (matches[2] === 'aug') {
		quality = IntervalQuality.AUGMENTED;
	} else if (matches[2] === 'dim') {
		quality = IntervalQuality.DIMINISHED;
	}

	return { number, quality };
};

/*
 * Fancy tagged template literal for writing progressions like progression`I iii IV V`
 */
export const progression = (strings: TemplateStringsArray, ...values: any): Interval[] => {
	return strings[0].split(/[\s-]/).map(parseInterval) as Interval[];
};
