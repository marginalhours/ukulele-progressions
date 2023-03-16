<script lang="ts">
	import ChordPanel from './ChordPanel.svelte';
	import { ChordType, Interval, type PitchString } from './types';
	import type { Chord } from './types';
	import { Instrument, pitches, transposePitch } from './music';
	import { choose } from './utilities';

	const ukulele = new Instrument(['G', 'C', 'E', 'A'], 18);

	// console.log(ukulele.getFrets({ tonic: 'G', type: ChordType.MAJOR }));

	const semitoneSequence = [0, 8, 5, 7];

	let sequence = [Interval.FIRST, Interval.FIFTH, Interval.SIXTH, Interval.FOURTH];
	let tonic: PitchString = 'C';
	let chordNames: PitchString[] = [];
	let sequenceFrets: number[][] = [];

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.code == 'Space') {
			// sequence = [0, 1, 2, 3].map(() => choose(intervals));
			// tonic = choose(pitches);
			chordNames = semitoneSequence.map((semitones) => transposePitch(tonic, semitones));
			sequenceFrets = chordNames.map(
				(chordName) => ukulele.getFrets({ tonic: chordName, type: ChordType.MAJOR }).fretting
			);
			console.log(sequenceFrets);
		}
	};
</script>

<svelte:head>
	<title>Ukulele Chord Progression Generator</title>
	<meta name="description" content="Ukulele Chord Progression Generator" />
</svelte:head>

<section>
	<ChordPanel interval={sequence[0]} chordName={chordNames[0]} fretted={sequenceFrets[0]} />
	<ChordPanel interval={sequence[1]} chordName={chordNames[1]} fretted={sequenceFrets[1]} />
	<ChordPanel interval={sequence[2]} chordName={chordNames[2]} fretted={sequenceFrets[2]} />
	<ChordPanel interval={sequence[3]} chordName={chordNames[3]} fretted={sequenceFrets[3]} />
</section>

<svelte:window on:keydown={onKeyDown} />

<style>
	section {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>
