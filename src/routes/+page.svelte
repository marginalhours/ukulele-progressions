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
		nextFretting,
		previousProgression,
		nextProgression
	} from './progressionStore';
	import { relativeChordToString } from '$lib/music/relativeChord';
	import Chevron from './Chevron.svelte';

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.code == 'Space') {
			randomizeTonic();
			e.preventDefault();
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
				{tonic}
				chord={$chords[index]}
				relativeChord={$progression[index]}
				fretted={$frettings[index]}
				onPreviousFretting={() => previousFretting($chords[index], index)}
				onNextFretting={() => nextFretting($chords[index], index)}
			/>
		{/each}
	</section>
	<section class="progression-section">
		<h2 class="progression-title">Progression</h2>
		<div class="progression-section-chords">
			<div on:click={previousProgression} class="progression-control progression-control-previous">
				<Chevron />
			</div>
			{$progression.map((p) => relativeChordToString(p)).join(' - ')}
			<div on:click={nextProgression} class="progression-control progression-control-next">
				<Chevron />
			</div>
		</div>
	</section>
	<section class="tonic-section">
		<h2 class="tonic-title">Key</h2>
		<div class="tonic-section-tonics">
			{#each displayPitches as pitch}
				<span
					on:click={() => setTonic(pitch)}
					class={pitch === $tonic ? 'selected-tonic tonic-button' : 'tonic-button'}>{pitch}</span
				>
			{/each}
		</div>
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
		flex-wrap: wrap;
	}

	.progression-section {
		margin-top: 5vh;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.progression-title {
		font-weight: bold;
		text-transform: lowercase;
		margin: 0 auto;
		margin-bottom: 1em;
	}

	.progression-control {
		cursor: pointer;
		margin: 0 1em;
		opacity: 0.7;
		transition: opacity 100ms ease-in-out;
	}

	.progression-control:hover {
		cursor: pointer;
		opacity: 1;
	}

	.progression-control-previous {
		transform: scaleX(-1);
	}

	.progression-section-chords {
		display: flex;
	}

	.tonic-section {
		margin-top: 2em;
		display: flex;
		justify-content: center;
		flex-direction: column;
		user-select: none;
	}

	.tonic-title {
		font-weight: bold;
		text-transform: lowercase;
		margin: 0 auto;
		margin-bottom: 1em;
	}

	.tonic-button {
		display: inline-block;
		text-align: center;
		width: 32px;
		cursor: pointer;
		font-weight: bold;
		border-top: 1px solid #aaa;
		border-bottom: 1px solid #aaa;
		padding: 0.5em 0.5em;
		border-collapse: collapse;
		border-right: 1px solid #aaa;
	}

	.tonic-section-tonics {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}

	.tonic-button:first-child {
		border-top: 1px solid #aaa;
		border-bottom: 1px solid #aaa;
		border-left: 1px solid #aaa;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}

	.tonic-button:last-child {
		border-top: 1px solid #aaa;
		border-bottom: 1px solid #aaa;
		border-right: 1px solid #aaa;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.tonic-button:hover {
		background-color: #ccc;
	}

	.selected-tonic,
	.selected-tonic:hover {
		background-color: #aaa;
	}
</style>
