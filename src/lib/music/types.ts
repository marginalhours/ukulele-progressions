export const intervals = [
	'I',
	'II',
	'bIII',
	'III',
	'IV',
	'V',
	'bVI',
	'VI',
	'bVII',
	'VII',
	'VIII'
] as const;
export type Interval = (typeof intervals)[number];

export const letterNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;
export type LetterNote = (typeof letterNotes)[number];

export const pitches = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;
export type Pitch = (typeof pitches)[number];

export const pitchesWithFlats = [...pitches, 'Bb', 'Ab', 'Gb', 'Eb', 'Db'] as const;
export type PitchWithFlats = (typeof pitchesWithFlats)[number];

export const isFlat = (pitch: PitchWithFlats): boolean => {
	return pitch[1] === 'b';
};

export const isSharp = (pitch: PitchWithFlats): boolean => {
	return pitch[1] === '#';
};

export const unflatten = (pitch: PitchWithFlats): Pitch => {
	if (!isFlat(pitch)) {
		return pitch as Pitch;
	}

	switch (pitch) {
		case 'Db':
			return 'C#';
		case 'Eb':
			return 'D#';
		case 'Gb':
			return 'F#';
		case 'Ab':
			return 'G#';
		case 'Bb':
			return 'A#';
	}

	return pitch;
};

export const unsharpen = (pitch: Pitch): PitchWithFlats => {
	if (!isSharp(pitch)) {
		return pitch as Pitch;
	}

	switch (pitch) {
		case 'C#':
			return 'Db';
		case 'D#':
			return 'Eb';
		case 'F#':
			return 'Gb';
		case 'G#':
			return 'Ab';
		case 'A#':
			return 'Bb';
	}

	return pitch;
};

export const displayPitches = [
	'C',
	'D',
	'E',
	'F',
	'G',
	'A',
	'B',
	'C#',
	'D#',
	'F#',
	'G#',
	'A#',
	'Db',
	'Eb',
	'Gb',
	'Ab',
	'Bb'
] as const;

export const qualities = [
	'major',
	'minor',
	'dominant-7th',
	'major-7th',
	'minor-7th',
	'suspended-4th',
	'suspended-2nd',
	'augmented',
	'diminished',
	'augmented-7th',
	'diminished-7th',
	'6',
	'5'
];

export type Quality = (typeof qualities)[number];
