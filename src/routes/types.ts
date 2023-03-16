export enum Interval {
	FIRST = 'I',
	SECOND = 'II',
	THIRD = 'III',
	FOURTH = 'IV',
	FIFTH = 'V',
	SIXTH = 'VI',
	SEVENTH = 'VII'
}

export enum ChordType {
	MAJOR = 'major',
	MINOR = 'minor'
	// MAJOR7th = 'major7th',
	// MINOR7th = 'minor7th'
	// etc
}

export type Chord = {
	tonic: PitchString;
	type: ChordType;
};

export type PitchString =
	| 'C'
	| 'C#'
	| 'D'
	| 'D#'
	| 'E'
	| 'F'
	| 'F#'
	| 'G'
	| 'G#'
	| 'A'
	| 'A#'
	| 'B';

export type PitchStringWithFlats = PitchString | 'Bb' | 'Ab' | 'Gb' | 'Eb' | 'Db';
