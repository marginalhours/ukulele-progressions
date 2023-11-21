<script lang="ts">
	import ChordDiagram from './ChordDiagram.svelte';
	import { relativeChordToString, type RelativeChord } from '../lib/music/relativeChord';
	import { chordToString, type Chord } from '../lib/music/chords';
	import Chevron from './Chevron.svelte';
	import type { PitchWithFlats } from '../lib/music/types';

	export let tonic: PitchWithFlats;
	export let relativeChord: RelativeChord;
	export let chord: Chord;
	export let fretted: (number | null)[];
	export let onPreviousFretting: () => void;
	export let onNextFretting: () => void;

	const BACKGROUNDS = {
		I: '#9b5fe0',
		II: '#16a4d8',
		III: '#60dbe8',
		IV: '#8bd346',
		V: '#efdf48',
		VI: '#f9a52c',
		VII: '#d64e12',
		VIII: '#9b5fe0'
	};

	$: backgroundColor = BACKGROUNDS[relativeChord.number];
</script>

<div class="chord-panel-wrapper">
	<div class="chord-and-fretting">
		<div class="fretting-controls">
			<div class="fretting-control" on:click={onPreviousFretting}>
				<Chevron class="fretting-control-up" />
			</div>
			<div class="fretting-control" on:click={onNextFretting}>
				<Chevron class="fretting-control-down" />
			</div>
		</div>
		<div class="chord-panel">
			<ChordDiagram {fretted} />
		</div>
	</div>
	<div class="chord-topper" style="--background-color: {backgroundColor}" />
	<div class="chord-name">{chordToString(chord)}</div>
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
		background-color: var(--background-color);
	}

	.chord-and-fretting {
		display: grid;
		grid-template-columns: 16px 1fr;
	}

	.fretting-controls {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
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

	.chord-panel-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.chord-panel {
		width: 8em;
		height: 10em;
		border-radius: 0.5em;
		z-index: -1;
	}

	.chord-name {
		font-size: 2em;
		font-weight: bold;
		opacity: 0.8;
	}

	.chord-role {
		font-size: 1em;
		font-weight: bold;
		opacity: 0.8;
	}
</style>
