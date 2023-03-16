<script lang="ts">
	import ChordPanel from './ChordPanel.svelte';
	import { Instrument } from '../lib/music/instrument';
	import { progression, type Interval } from '../lib/music/intervals';
	import type { Pitch } from '../lib/music/pitch';

	const ukulele = new Instrument(['G', 'C', 'E', 'A'], 18);

	// console.log(ukulele.getFrets({ tonic: 'G', type: ChordType.MAJOR }));

	let sequence: Interval[] = progression`I iii IV V`;

	console.log(sequence);

	let tonic: Pitch = 'C';
	let chordNames: Pitch[] = [];
	let sequenceFrets: number[][] = [];

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.code == 'Space') {
			// tonic = choose(pitches);
			const semitoneSequence = sequence.map((x) => intervalToSemitones[x]);
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
