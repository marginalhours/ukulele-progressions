import { writable, derived } from 'svelte/store';
import { chooseWithout } from '../lib/utilities';
import {
	progression as $,
	progressionFromString,
	type RelativeChord
} from '../lib/music/relativeChord';
import { pitches, type Pitch, type PitchWithFlats, pitchesWithFlats } from '../lib/music/types';
import { intervalToChord } from '../lib/music/chords';
import { getFrettingsForChord } from '../lib/frettings';
import { browser } from '$app/environment';

const progressions = [
	$`I-vi-IV-V`, // 1950s do-wop
	$`vi-IV-I-V`, // 4 chords
	$`I-V-vi-IV`, // the other 4 chords
	$`I-V-vi-iii-IV-I-IV-V`, // hey pachelbel,
	$`ii-V-I-vi`,
	$`I-III7-IV-iv`, //
	$`I-IIIdim-IV-V7`,
	$`III7-vi-iv-I`,
	$`i-iv-V7`, // spooky
	$`I-III-IV-iv`, // creep
	$`I-VI7-II7-V-I`, // circus cadence
	$`IV-ii-v-I`, // more minor,
	$`v-ii-IV-I`, // ditto but moved around
	$`i7-IV-bVII-v`,
	$`i-V7-i-bVII-bIII-bVII-i`, // La Follia
	$`i-iv-bVI-V`,
	$`i-V7-v7-IV-bVI-bIII-IV-V7`, // hotel california
	$`I-Imaj7-I7-IV-V6-VI7-ii-V`
];

// G-G5-D-Adim7(no3)-Adim7-Em-A-D-D75 This sounds good

const tonic = writable<PitchWithFlats>('C');
const progressionIndex = writable<number>(0);

/**
 * Update progression based on index... unless there's a location hash,
 * in which case use that.
 */
const progression = derived([progressionIndex], ([$progressionIndex]) => {
	return hasProgressionInUrlHash() ? progressionFromURLHash() : progressions[$progressionIndex];
});

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
	randomizeTonic();
	randomizeProgression();
};

const randomizeTonic = () => {
	tonic.update((current) => chooseWithout(pitchesWithFlats, current));
};

const randomizeProgression = () => {
	resetURLHashProgression();
	progressionIndex.update((current) =>
		chooseWithout(
			progressions.map((_, index) => index),
			current
		)
	);
};

const previousProgression = () => {
	resetURLHashProgression();
	progressionIndex.update((current) => (progressions.length + current - 1) % progressions.length);
};

const nextProgression = () => {
	resetURLHashProgression();
	progressionIndex.update((current) => (progressions.length + current + 1) % progressions.length);
};

// URL hash utilities

const hasProgressionInUrlHash = () => {
	if (!(browser && window.location.hash)) {
		return false;
	}

	try {
		const _ = $`${window.location.hash.substring(1)}`;
	} catch (err) {
		return false;
	}

	return true;
};

const progressionFromURLHash = () => {
	return progressionFromString(window.location.hash.substring(1));
};

const resetURLHashProgression = () => {
	window.location.hash = '';
};

export {
	tonic,
	progression,
	chords,
	frettings,
	setTonic,
	randomizeApp,
	randomizeTonic,
	randomizeProgression,
	previousProgression,
	nextProgression
};
