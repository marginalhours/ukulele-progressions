<script lang="ts">
	import { spring } from 'svelte/motion';
	import ChordDiagram from './ChordDiagram.svelte';
	import { Interval } from './types';

	export let interval: Interval;

	const BACKGROUNDS = {
		[Interval.FIRST]: '#9b5fe0',
		[Interval.SECOND]: '#16a4d8',
		[Interval.THIRD]: '#60dbe8',
		[Interval.FOURTH]: '#8bd346',
		[Interval.FIFTH]: '#efdf48',
		[Interval.SIXTH]: '#f9a52c',
		[Interval.SEVENTH]: '#d64e12'
	};

	$: backgroundColor = BACKGROUNDS[interval];
</script>

<div class="chord-panel" style="--background-color: {backgroundColor}">
	<ChordDiagram />
	<div class="chord-name">G# minor</div>
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
