<script lang="ts">
	import ChordPanel from './ChordPanel.svelte';
	import { displayPitches } from '../lib/music/types';
	import {
		tonic,
		progression,
		chords,
		randomizeApp,
		randomizeTonic,
		randomizeProgression,
		setTonic,
		previousProgression,
		nextProgression
	} from './progressionStore';
	import { relativeChordToString } from '$lib/music/relativeChord';
	import Chevron from './Chevron.svelte';

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.code == 'Space') {
			randomizeApp();
			e.preventDefault();
		}
	};
</script>

<svelte:head>
	<title>Ukulele Chord Progressions Toy</title>
	<meta name="description" content="Ukulele Chord Progressions Toy" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@marginalhours" />
	<meta name="twitter:creator" content="@marginalhours" />
	<meta name="twitter:title" content="Ukulele Chord Progressions Toy" />
	<meta name="twitter:description" content="Find your next favourite progression" />
	<meta name="twitter:image" content="" />

	<meta property="og:url" content="https:/marginalhours.net/ukulele-progressions" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="Ukulele Chord Progressions Toy" />
	<meta property="og:description" content="Find your next favourite progression" />
	<meta property="og:image" content="" />
</svelte:head>

<main>
	<section class="title-section">
		<h1>Ukulele Chord Progressions</h1>
	</section>
	<section class="fretting-section">
		{#each $chords as _, index}
			<ChordPanel tonic={$tonic} chord={$chords[index]} relativeChord={$progression[index]} />
		{/each}
	</section>
	<section class="progression-section">
		<h2 class="progression-title">
			progression
			<button class="randomize-button" on:click={randomizeProgression}>randomize</button>
		</h2>
		<div class="progression-section-chords">
			<button
				on:click={previousProgression}
				class="progression-control progression-control-previous"
				title="Previous progression"
			>
				<Chevron />
			</button>
			{$progression.map((p) => relativeChordToString(p)).join(' - ')}
			<button
				on:click={nextProgression}
				class="progression-control progression-control-next"
				title="Next progression"
			>
				<Chevron />
			</button>
		</div>
	</section>
	<section class="tonic-section">
		<h2 class="tonic-title">
			key
			<button class="randomize-button" on:click={randomizeTonic}>randomize</button>
		</h2>
		<div class="tonic-section-tonics">
			{#each displayPitches as pitch}
				<button
					title={`Change key to ${pitch}`}
					on:click={() => setTonic(pitch)}
					class={pitch === $tonic ? 'selected-tonic tonic-button' : 'tonic-button'}
				>
					{pitch}
				</button>
			{/each}
		</div>
	</section>
	<section class="control-section">
		<button class="random-button" on:click={randomizeApp}>Try another one</button>
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
		padding: 0 1em;
	}

	.title-section {
		margin: 2em auto;
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
		margin: 0 auto;
		margin-bottom: 1em;
		position: relative;
	}

	.progression-control {
		cursor: pointer;
		margin: 0 1em;
		opacity: 0.7;
		transition: opacity 100ms ease-in-out;
		border: none;
		background: none;
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
		margin: 0 auto;
		margin-bottom: 1em;
		position: relative;
	}

	.tonic-button {
		display: inline-block;
		text-align: center;
		width: 32px;
		height: 32px;
		line-height: 32px;
		cursor: pointer;
		font-weight: 500;
		border-radius: 50%;
		border: none;
		background-color: #ddd;
		margin: 0.25em 0.25em;
	}

	.tonic-section-tonics {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}
	.tonic-button:hover {
		background-color: #aaa;
	}

	.selected-tonic,
	.selected-tonic:hover {
		background-color: rgba(155, 95, 224, 0.5);
	}

	.control-section {
		margin: 4em 0;
	}

	.randomize-button {
		font-size: x-small;
		cursor: pointer;
		outline: none;
		border: none;
		border-radius: 5em;
		padding: 0.5em 1em;
		background-color: rgba(155, 95, 224, 0.5);
		position: absolute;
		top: -80%;
	}

	.randomize-button:hover {
		transform: translateY(-1px);
	}

	.randomize-button:active {
		transform: translateY(2px);
	}

	.random-button {
		cursor: pointer;
		outline: none;
		border: none;
		border-radius: 5em;
		padding: 0.5em 1.5em;
		background-color: rgba(155, 95, 224, 0.5);
	}

	.random-button:hover {
		transform: translateY(-1px);
	}

	.random-button:active {
		transform: translateY(2px);
	}
</style>
