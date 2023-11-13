export type Interval = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII';

export type Pitch = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export type PitchWithFlats = Pitch | 'Bb' | 'Ab' | 'Gb' | 'Eb' | 'Db';

export type Quality =
	| 'major'
	| 'minor'
	| 'dominant-7th'
	| 'major-7th'
	| 'minor-7th'
	| 'suspended-4th'
	| 'suspended-2nd'
	| 'augmented'
	| 'diminished';
