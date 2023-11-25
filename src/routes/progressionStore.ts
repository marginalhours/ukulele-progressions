import { writable, derived } from 'svelte/store';
import { chooseWithout } from '../lib/utilities';
import { progression as $, type RelativeChord } from '../lib/music/relativeChord';
import { pitches, type Pitch, type PitchWithFlats, pitchesWithFlats } from '../lib/music/types';
import { intervalToChord } from '../lib/music/chords';
import { getFrettingForChord, getFrettingsForChord } from '../lib/frettings';

const progressions = [
	$`I-vi-IV-V`, // 1950s do-wop
	$`vi-IV-I-V`, // 4 chords
	$`I-V-vi-iii-IV-I-IV-V`, // hey pachelbel,
	$`ii-V-I-vi`,
	$`I-IIIdim-IV-V7`,
	$`III7-vi-iv-I`,
	$`I-III-IV-iv`, // creep
	$`I-VI7-II7-V-I`, // circus cadence
	$`IV-ii-v-I`, // more minor,
	$`v-ii-IV-I`, // ditto but moved around,
	$`i7-IV-bVII-v`,
	$`i-V7-i-bVII-bIII-bVII-i`, // La Follia
	$`i-iv-bVI-V`
];

// G-G5-D-Adim7(no3)-Adim7-Em-A-D-D75 This sounds good

const tonic = writable<PitchWithFlats>('C');
const progressionIndex = writable<number>(0);

const progression = derived(
	[progressionIndex],
	([$progressionIndex]) => progressions[$progressionIndex]
);

const chords = derived([tonic, progression], ([$tonic, $progression]) =>
	$progression.map((interval) => intervalToChord($tonic, interval))
);

const frettings = derived([chords], ([$chords]) => {
	return $chords.map(getFrettingsForChord);
});

// Mutators

const setTonic = (newTonic: Pitch) => {
	tonic.set(newTonic);
};

const randomizeApp = () => {
	tonic.update((current) => chooseWithout(pitchesWithFlats, current));
	progressionIndex.update((current) =>
		chooseWithout(
			progressions.map((_, index) => index),
			current
		)
	);
};

const previousProgression = () => {
	progressionIndex.update((current) => (progressions.length + current - 1) % progressions.length);
};

const nextProgression = () => {
	progressionIndex.update((current) => (progressions.length + current + 1) % progressions.length);
};

export {
	tonic,
	progression,
	chords,
	frettings,
	setTonic,
	randomizeApp,
	previousProgression,
	nextProgression
};
