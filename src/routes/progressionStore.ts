import { writable, derived } from 'svelte/store';
import { chooseWithout } from '../lib/utilities';
import { progression as $, type RelativeChord } from '../lib/music/relativeChord';
import { pitches, type Pitch } from '../lib/music/types';
import { intervalToChord } from '../lib/music/chords';
import { getFrettingForChord, getFrettingsForChord } from '../lib/frettings';

const progressions = [
	$`I-vi-IV-V`, // 1950s do-wop
	$`vi-IV-I-V`, // 4 chords
	$`I-V-vi-iii-IV-I-IV-V`, // hey pachelbel,
	$`I-Isus4-I`,
	$`ii-V-I-vi`,
	$`I-IIIdim-IV-V7`,
	$`III7-vi-iv-I`,
	$`I-III-IV-iv`, // creep
	$`I-VI7-II7-II-I`, // circus cadence
	$`IV-ii-v-I`, // more minor,
	$`v-ii-IV-I`, // ditto but moved around,
	$`I-I5-I-V-II6` // II6 is wrong, it's F#major in G (frex)
];

// G-G5-D-Adim7(no3)-Adim7-Em-A-D-D75 This sounds good

const tonic = writable<Pitch>('C');
const progression = writable<RelativeChord[]>(progressions[11]);
const frettingOffsets = writable<number[]>(progressions[0].map((_) => 0));

const chords = derived(
	[tonic, progression, frettingOffsets],
	([$tonic, $progression, $frettingOffsets]) =>
		$progression.map((interval) => intervalToChord($tonic, interval))
);

const frettings = derived([chords, frettingOffsets], ([$chords, $frettingOffsets]) => {
	return $chords.map((chord, index) => getFrettingForChord(chord, $frettingOffsets[index]));
});

// Mutators

const resetFretIndices = () => {
	// Hacky fret index reset
	progression.update((current) => {
		frettingOffsets.update((_) => current.map((_) => 0));
		return current;
	});
};

const setTonic = (newTonic: Pitch) => {
	tonic.set(newTonic);
	resetFretIndices();
};

const randomizeTonic = () => {
	tonic.update((current) => chooseWithout(pitches, current));
	resetFretIndices();
};

const previousFretting = (chord: Chord, chordIndex: number) => {
	frettingOffsets.update((previous) => {
		const next = [...previous];
		next[chordIndex] = Math.max(previous[chordIndex] - 1, 0);

		return next;
	});
};

const nextFretting = (chord: Chord, chordIndex: number) => {
	frettingOffsets.update((previous) => {
		const availableOffsets = getFrettingsForChord(chord).length;
		const next = [...previous];
		next[chordIndex] = Math.min(previous[chordIndex] + 1, availableOffsets);

		return next;
	});
};

export {
	tonic,
	progression,
	chords,
	frettings,
	setTonic,
	randomizeTonic,
	previousFretting,
	nextFretting
};
