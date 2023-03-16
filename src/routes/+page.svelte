<script lang="ts">
	import ChordPanel from './ChordPanel.svelte';
	import { Instrument } from '../lib/music/instrument';
	import { progression, type Interval } from '../lib/music/intervals';
	import { pitches, transposePitch, type Pitch } from '../lib/music/pitch';
	import { ChordType, intervalToChord, type Chord } from '../lib/music/chords';
	import { choose } from '../lib/utilities';

	const ukulele = new Instrument(['G', 'C', 'E', 'A'], 18);

	const progressions = [
		progression`I-IV-V`, // the theoretical minimum
		progression`ii-V-I`, // jazzy (?)
		progression`vi-IV-I-V`, // 4 chords
		progression`I-vi-IV-V`, // 1950s do-wop
		progression`I-V-vi-iii-IV-I-IV-V` // hey pachelbel
	];

	let sequence: Interval[] = progressions[1];

	let tonic: Pitch = 'C';
	let chords: Chord[] = sequence.map((interval) => intervalToChord(tonic, interval));
	let sequenceFrets: number[][] = chords.map((chord) => ukulele.getFrets(chord).fretting);

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.code == 'Space') {
			tonic = choose(pitches);
			chords = sequence.map((interval) => intervalToChord(tonic, interval));
			sequenceFrets = chords.map((chord) => ukulele.getFrets(chord).fretting);
		}
	};
</script>

<svelte:head>
	<title>Ukulele Chord Progression Generator</title>
	<meta name="description" content="Ukulele Chord Progression Generator" />
</svelte:head>

<section>
	{#each chords as _, index}
		<ChordPanel interval={sequence[index]} chord={chords[index]} fretted={sequenceFrets[index]} />
	{/each}
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
