<script lang="ts">
	import ChordDiagram from './ChordDiagram.svelte';
	import { relativeChordToString, type RelativeChord } from '../lib/music/relativeChord';
	import { type Chord, flatAwareChordToString, intervalToChord } from '../lib/music/chords';
	import Chevron from './Chevron.svelte';
	import type { PitchWithFlats } from '../lib/music/types';
	import { getFrettingsForChord } from '../lib/frettings';

	export let tonic: PitchWithFlats;
	export let relativeChord: RelativeChord;

	const resetOffset = (_: Chord) => 0;

	$: availableFrettings = getFrettingsForChord(chord);
	$: frettingOffset = resetOffset(chord);
	$: chord = intervalToChord(tonic, relativeChord);

	const onPreviousFretting = () => {
		frettingOffset = (availableFrettings.length + frettingOffset - 1) % availableFrettings.length;
	};
	const onNextFretting = () => {
		frettingOffset = (availableFrettings.length + frettingOffset + 1) % availableFrettings.length;
	};

	const BACKGROUNDS = {
		I: '#9b5fe0',
		II: '#16a4d8',
		III: '#60dbe8',
		bIII: '#60dbe8',
		IV: '#8bd346',
		V: '#efdf48',
		VI: '#f9a52c',
		bVI: '#f9a52c',
		VII: '#d64e12',
		bVII: '#d64e12',
		VIII: '#9b5fe0'
	};

	$: backgroundColor = BACKGROUNDS[relativeChord?.number];
</script>

<div class="chord-panel-wrapper">
	<div class="chord-and-fretting">
		<div class="fretting-controls">
			<button class="fretting-control" on:click={onPreviousFretting} title="Previous fretting">
				<Chevron class="fretting-control-up" />
			</button>
			<div class={`fretting-control-counter ${frettingOffset > 0 ? 'visible' : ''}`}>
				<span>{frettingOffset + 1}</span>
				<hr />
				<span>{availableFrettings.length}</span>
			</div>
			<button class="fretting-control" on:click={onNextFretting} title="Next fretting">
				<Chevron class="fretting-control-down" />
			</button>
		</div>
		<div class="chord-panel">
			<ChordDiagram fretted={availableFrettings[frettingOffset]} />
		</div>
	</div>
	<div class="chord-topper" style="--background-color: {backgroundColor}" />
	<div class="chord-name">{flatAwareChordToString(chord, relativeChord, tonic)}</div>
	<div class="chord-role">
		{relativeChordToString(relativeChord)}
	</div>
</div>

<style>
	.chord-panel-wrapper {
		position: relative;
		user-select: none;
	}

	.chord-topper {
		width: 90%;
		height: 5px;
		opacity: 0.5;
		border-radius: 0.5em;
		background-color: var(--background-color);
	}

	.chord-and-fretting {
		display: grid;
		grid-template-columns: 16px 1fr;
	}

	.fretting-controls {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		position: relative;
		left: 8px;
		z-index: 1;
	}

	.fretting-control {
		font-size: 32px;
		line-height: 0;

		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		opacity: 0.7;
		transition: opacity 100ms ease-in-out;
		background: none;
		border: none;
	}

	.fretting-control:hover {
		opacity: 1;
	}

	.fretting-control-up {
		transform: rotate(-90deg);
	}

	.fretting-control-down {
		transform: rotate(90deg);
	}

	.fretting-control-counter {
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 100ms ease-in-out;
		font: sans-serif;
		font-style: italic;
	}

	.fretting-control-counter.visible {
		opacity: 1;
	}

	.fretting-control-counter hr {
		width: 90%;
		margin: 0.5em auto;
		border: none;
		height: 1px;
		background-color: #aaa;
	}

	.chord-panel-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.chord-panel {
		width: 24vw;
		height: 30vw;
		max-width: 160px;
		max-height: 200px;
		border-radius: 0.5em;
		z-index: -1;
	}

	.chord-name {
		font-size: 2em;
		font-weight: bold;
		opacity: 0.8;
	}

	.chord-role {
		font-size: 0.8em;
		font-weight: bold;
		opacity: 0.5;
	}
</style>
