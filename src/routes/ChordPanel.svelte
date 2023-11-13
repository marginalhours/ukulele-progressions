<script lang="ts">
	import ChordDiagram from './ChordDiagram.svelte';
	import { relativeChordToString, type RelativeChord } from '../lib/music/relativeChord';
	import { chordToString, type Chord } from '../lib/music/chords';

	export let relativeChord: RelativeChord;
	export let chord: Chord;
	export let fretted: (number | null)[];

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

<div>
	<div class="chord-panel" style="--background-color: {backgroundColor}">
		<ChordDiagram {fretted} />
	</div>
	<div class="chord-name">{chordToString(chord)}</div>
	<div class="chord-role">{relativeChordToString(relativeChord)}</div>
</div>

<style>
	.chord-panel {
		background-color: var(--background-color);
		display: flex;

		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 8em;
		height: 10em;
		border-radius: 0.5em;
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
