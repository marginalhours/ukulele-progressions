<script lang="ts">
	import ChordFret from './ChordFret.svelte';
	import ChordNote from './ChordNote.svelte';
	import ChordString from './ChordString.svelte';

	export let fretCount: number = 6;
	export let stringCount: number = 4;
	export let lowestFret: number = 0;
	export let fretted: (number | null)[] = [];

	$: stringIncrement = 100 / (stringCount - 1);
	$: fretIncrement = 100 / (fretCount - 1);
</script>

<div class="chord-diagram-wrapper">
	<div class="chord-diagram-fret-panel">
		{#each Array.from(Array(stringCount).keys()) as stringNumber}
			{#if stringNumber != 0 && stringNumber !== stringCount - 1}
				<ChordString {stringNumber} {stringIncrement} />
			{/if}
		{/each}
		{#each Array.from(Array(fretCount).keys()) as fretNumber}
			{#if fretNumber != 0 && fretNumber !== fretCount - 1}
				<ChordFret {fretNumber} {fretIncrement} />
			{/if}
		{/each}
		{#each fretted as stringFret, stringIndex}
			<ChordNote onFret={stringFret} onString={stringIndex} {fretCount} {stringCount} />
		{/each}
	</div>
	{#if lowestFret > 1}
		<span class="chord-diagram-lowest-fret-label">{lowestFret}</span>
	{/if}
</div>

<!-- <svg viewBox="0 0 300 480" width="300" height="480" style="display: block"
	><line x1="10.00%" x2="10.00%" y1="15.00%" y2="90.00%" stroke="black" stroke-width="1%" /><line
		x1="36.67%"
		x2="36.67%"
		y1="15.00%"
		y2="90.00%"
		stroke="black"
		stroke-width="1%"
	/><line x1="63.33%" x2="63.33%" y1="15.00%" y2="90.00%" stroke="black" stroke-width="1%" /><line
		x1="90.00%"
		x2="90.00%"
		y1="15.00%"
		y2="90.00%"
		stroke="black"
		stroke-width="1%"
	/><line x1="10.00%" x2="90.00%" y1="15.00%" y2="15.00%" stroke="black" stroke-width="1%" /><line
		x1="10.00%"
		x2="90.00%"
		y1="30.00%"
		y2="30.00%"
		stroke="black"
		stroke-width="1%"
	/><line x1="10.00%" x2="90.00%" y1="45.00%" y2="45.00%" stroke="black" stroke-width="1%" /><line
		x1="10.00%"
		x2="90.00%"
		y1="60.00%"
		y2="60.00%"
		stroke="black"
		stroke-width="1%"
	/><line x1="10.00%" x2="90.00%" y1="75.00%" y2="75.00%" stroke="black" stroke-width="1%" /><line
		x1="10.00%"
		x2="90.00%"
		y1="90.00%"
		y2="90.00%"
		stroke="black"
		stroke-width="1%"
	/><circle
		cx="10.00%"
		cy="0%"
		r="7%"
		fill="black"
		style="transition: opacity 300ms ease-in-out 0s; opacity: 1; transform: translate(0px, 37.5%);"
	/><circle
		cx="36.67%"
		cy="0%"
		r="7%"
		fill="black"
		style="transition: opacity 300ms ease-in-out 0s; transform: translate(0px, 22.5%); opacity: 1;"
	/><circle
		cx="63.33%"
		cy="0%"
		r="7%"
		fill="black"
		style="transition: opacity 300ms ease-in-out 0s; transform: translate(0px, 52.5%); opacity: 0;"
	/><circle
		cx="90.00%"
		cy="0%"
		r="7%"
		fill="black"
		style="transition: opacity 300ms ease-in-out 0s; transform: translate(0px, 37.5%); opacity: 0;"
	/>
</svg> -->
<style>
	.chord-diagram-wrapper {
		min-width: 15rem;
		min-height: 21rem;
		box-sizing: border-box;
		position: relative;
		margin-bottom: 2rem;
	}

	.chord-diagram-fret-panel {
		width: 15rem;
		height: 21rem;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 0.5rem;
		border: 3px solid #000;
		width: 100%;
		position: relative;
		box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.3);
	}

	.chord-diagram-lowest-fret-label {
		position: absolute;
		left: calc(100% + 2rem);
		top: 0.1rem;
		font-size: 4rem;
		font-weight: bold;
	}
</style>
