<script lang="ts">
	import ChordPanel from './ChordPanel.svelte';
	import { displayPitches } from '../lib/music/types';
	import {
		tonic,
		progression,
		chords,
		frettings,
		randomizeTonic,
		setTonic,
		previousFretting,
		nextFretting
	} from './progressionStore';

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.code == 'Space') {
			randomizeTonic();
		}
	};
</script>

<svelte:head>
	<title>Ukulele Chord Progression Generator</title>
	<meta name="description" content="Ukulele Chord Progression Generator" />
</svelte:head>

<main>
	<section class="fretting-section">
		{#each $chords as _, index}
			<ChordPanel
				chord={$chords[index]}
				relativeChord={$progression[index]}
				fretted={$frettings[index]}
				onPreviousFretting={() => previousFretting($chords[index], index)}
				onNextFretting={() => nextFretting($chords[index], index)}
			/>
		{/each}
	</section>
	<section class="progression-section" />
	<section class="tonic-section">
		{#each displayPitches as pitch}
			<span on:click={() => setTonic(pitch)} class={pitch === $tonic ? 'selected-pitch' : ''}
				>{pitch}</span
			>
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
	}

	.progression-section {
	}

	.tonic-section {
		margin-top: 5em;
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
