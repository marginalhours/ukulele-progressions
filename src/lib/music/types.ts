export const intervals = ['I', 'II', 'III', 'IV', 'V', 'bVI', 'VI', 'bVII', 'VII', 'VIII'] as const;
export type Interval = (typeof intervals)[number];

export const letterNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;
export type LetterNote = (typeof letterNotes)[number];

export const pitches = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;
export type Pitch = (typeof pitches)[number];

export const pitchesWithFlats = [...pitches, 'Bb', 'Ab', 'Gb', 'Eb', 'Db'] as const;
export type PitchWithFlats = (typeof pitchesWithFlats)[number];

export const unflatten = (pitch: PitchWithFlats): Pitch => {
	if (pitch.indexOf('b') === -1) {
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
	'6',
	'suspended-4th',
	'suspended-2nd',
	'augmented',
	'diminished'
];

export type Quality = (typeof qualities)[number];
