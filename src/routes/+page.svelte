<script lang="ts">
	import ChordPanel from './ChordPanel.svelte';
	import { progression, type RelativeChord } from '../lib/music/relativeChord';
	import { pitches, type Pitch } from '../lib/music/types';
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

	let sequence: RelativeChord[] = progressions[4];

	const displayPitches = [
		'C',
		'D',
		'E',
		'F',
		'G',
		'A',
		'B',
		'C#',
		'D#',
		'F#',
		'G#',
		'A#',
		'Db',
		'Eb',
		'Gb',
		'Ab',
		'Bb'
	] as const;

	let tonic: Pitch = 'C';
	let chords: Chord[] = sequence.map((interval) => intervalToChord(tonic, interval));
	// TODO: store for chords and fretting indices
	let sequenceFrets: number[][] = chords.map(getFrettingForChord);

	const setTonic = (newTonic: Pitch) => {
		tonic = newTonic;
		chords = sequence.map((interval) => intervalToChord(tonic, interval));
		sequenceFrets = chords.map(getFrettingForChord);
	};

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

<main>
	<section class="tonic-section">
		{#each displayPitches as pitch}
			<span on:click={() => setTonic(pitch)} class={pitch === tonic ? 'selected-pitch' : ''}
				>{pitch}</span
			>
		{/each}
	</section>
	<section class="fretting-section">
		{#each chords as _, index}
			<ChordPanel
				relativeChord={sequence[index]}
				chord={chords[index]}
				fretted={sequenceFrets[index]}
				onPreviousFretting={console.log}
				onNextFretting={console.log}
			/>
		{/each}
	</section>
</main>

<svelte:window on:keydown={onKeyDown} />

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.fretting-section {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.tonic-section span {
		display: inline-block;
		text-align: center;
		width: 32px;
		cursor: pointer;
	}

	.selected-pitch {
		border-bottom: 2px solid #f00;
	}
</style>
