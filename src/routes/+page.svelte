<script lang="ts">
	import ChordPanel from './ChordPanel.svelte';
	import { progression, type RelativeChord } from '../lib/music/relativeChord';
	import { pitches, type Pitch } from '../lib/music/pitch';
	import { intervalToChord, type Chord } from '../lib/music/chords';
	import { choose } from '../lib/utilities';
	import { getFrettingForChord } from '$lib/frettings';

	const progressions = [
		progression`I-IV-V`, // the theoretical minimum
		progression`ii-V-I`, // jazzy (?)
		progression`vi-IV-I-V`, // 4 chords
		progression`I-vi-IV-V`, // 1950s do-wop
		progression`I-V-vi-iii-IV-I-IV-V` // hey pachelbel
	];

	let sequence: RelativeChord[] = progressions[3];

	let tonic: Pitch = 'C';
	let chords: Chord[] = sequence.map((interval) => intervalToChord(tonic, interval));
	let sequenceFrets: number[][] = chords.map(getFrettingForChord);

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.code == 'Space') {
			tonic = choose(pitches);
			chords = sequence.map((interval) => intervalToChord(tonic, interval));
			sequenceFrets = chords.map(getFrettingForChord);
		}
	};
</script>

<svelte:head>
	<title>Ukulele Chord Progression Generator</title>
	<meta name="description" content="Ukulele Chord Progression Generator" />
</svelte:head>

<section>
	{#each chords as _, index}
		<ChordPanel
			relativeChord={sequence[index]}
			chord={chords[index]}
			fretted={sequenceFrets[index]}
		/>
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
