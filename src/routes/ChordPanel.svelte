<script lang="ts">
	import { spring } from 'svelte/motion';
	import ChordDiagram from './ChordDiagram.svelte';
	import { IntervalNumber, Interval } from '../lib/music/intervals';

	export let interval: Interval;
	export let chordName: string = 'Am7';
	export let fretted: (number | null)[];
	export let lowestFret: number = 0;

	const BACKGROUNDS = {
		[IntervalNumber.FIRST]: '#9b5fe0',
		[IntervalNumber.SECOND]: '#16a4d8',
		[IntervalNumber.THIRD]: '#60dbe8',
		[IntervalNumber.FOURTH]: '#8bd346',
		[IntervalNumber.FIFTH]: '#efdf48',
		[IntervalNumber.SIXTH]: '#f9a52c',
		[IntervalNumber.SEVENTH]: '#d64e12',
		[IntervalNumber.OCTAVE]: '#9b5fe0'
	};

	$: backgroundColor = BACKGROUNDS[interval.number];
</script>

<div class="chord-panel" style="--background-color: {backgroundColor}">
	<ChordDiagram {fretted} {lowestFret} />
	<div class="chord-name">{chordName}</div>
	<div class="chord-role">{interval}</div>
</div>

<style>
	.chord-panel {
		height: 100%;
		flex-grow: 1;
		background-color: var(--background-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
