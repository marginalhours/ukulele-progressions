export const intervals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'] as const;
export type Interval = (typeof intervals)[number];

export const pitches = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;
export type Pitch = (typeof pitches)[number];

export const pitchesWithFlats = [...pitches, 'Bb', 'Ab', 'Gb', 'Eb', 'Db'] as const;
export type PitchWithFlats = (typeof pitchesWithFlats)[number];

export const qualities = [
	'major',
	'minor',
	'dominant-7th',
	'major-7th',
	'minor-7th',
	'suspended-4th',
	'suspended-2nd',
	'augmented',
	'diminished'
];

export type Quality = (typeof qualities)[number];
