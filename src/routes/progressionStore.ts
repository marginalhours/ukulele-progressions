import { writable } from 'svelte/store';
import { chooseWithout } from '../lib/utilities';
import { progressionFromString, type UserChord } from '../lib/music/relativeChord';
import { type Pitch, type PitchWithFlats, pitchesWithFlats } from '../lib/music/types';
import { browser } from '$app/environment';

const progressions = [
	`I-vi-IV-V`, // 1950s do-wop
	`I-III7-IV-iv`, //
	`vi-IV-I-V`, // 4 chords
	`I-V-vi-IV`, // the other 4 chords
	`I-V-vi-iii-IV-I-IV-V`, // hey pachelbel,
	`ii-V-I-vi`,
	`I-IIIdim-IV-V7`,
	`III7-vi-iv-I`,
	`i-iv-V7`, // spooky
	`I-III-IV-iv`, // creep
	`I-VI7-II7-V-I`, // circus cadence
	`IV-ii-v-I`, // more minor,
	`v-ii-IV-I`, // ditto but moved around
	`i7-IV-bVII-v`,
	`i-V7-i-bVII-bIII-bVII-i`, // La Follia
	`i-iv-bVI-V`,
	`i-V7-v7-IV-bVI-bIII-IV-V7`, // hotel california
	`I-Imaj7-I7-IV-V6-VI7-ii-V`,
	`I-iii-IIIdim-IV-iv-I-ii-V`,
	`I-I5-I-V-IIdim7-bVIdim-vi-II-V-V7` //dunno but it's interesting
];

// URL hash utilities

const trySetProgressionFromURL = () => {
	if (hasProgressionInUrlHash()) {
		progression.set(progressionFromURLHash());
	} else {
		window.location.hash = chooseWithout(progressions, '');
	}
};

const hasProgressionInUrlHash = () => {
	if (!(browser && window.location.hash)) {
		return false;
	}

	try {
		const _ = progressionFromString(window.location.hash.substring(1));
	} catch (err) {
		return false;
	}

	return true;
};

const progressionFromURLHash = () => {
	return progressionFromString(window.location.hash.substring(1));
};

const tonic = writable<PitchWithFlats>('C');

// In fact this is mostly backed by the URL which is nice because hackable
const progression = writable<UserChord[]>(
	hasProgressionInUrlHash() ? progressionFromURLHash() : progressionFromString(progressions[0])
);

// Mutators

const setTonic = (newTonic: Pitch) => {
	tonic.set(newTonic);
};

const randomizeTonic = () => {
	tonic.update((current) => chooseWithout(pitchesWithFlats, current));
};

const randomizeProgression = () => {
	window.location.hash = chooseWithout(progressions, window.location.hash);
};

const randomizeApp = () => {
	randomizeTonic();
	randomizeProgression();
};

export {
	tonic,
	progression,
	setTonic,
	randomizeTonic,
	randomizeProgression,
	trySetProgressionFromURL,
	randomizeApp
};
