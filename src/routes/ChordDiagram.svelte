<script lang="ts">
	export let fretCount = 6;
	export let stringCount = 4;

	$: stringIncrement = 100 / (stringCount - 1);
	$: fretIncrement = 100 / (fretCount - 1);
</script>

<div class="chord-diagram-wrapper">
	<div class="chord-diagram-fret-panel">
		{#each Array.from(Array(stringCount).keys()) as stringNumber}
			<div class="string" style="left: {stringIncrement * stringNumber}%;" />
		{/each}
		{#each Array.from(Array(fretCount).keys()) as fretNumber}
			<div class="fret" style="top: {fretIncrement * fretNumber}%;" />
		{/each}
	</div>
</div>

<svg viewBox="0 0 300 480" width="300" height="480" style="display: block"
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
</svg>

<style>
	.chord-diagram-wrapper {
		width: 15rem;
		height: 21rem;
		padding: 0.25rem;
	}

	.chord-diagram-fret-panel {
		background-color: #fff;
		border-radius: 0.25rem;
		/* border: 3px solid #000; */
		width: 100%;
		height: 21rem;
		box-sizing: border-box;
		position: relative;
	}

	.string {
		height: 100%;
		border: 2px solid #000;
		display: inline-block;
		position: absolute;
	}

	.fret {
		width: 100%;
		border: 2px solid #000;
		display: inline-block;
		position: absolute;
	}
</style>
