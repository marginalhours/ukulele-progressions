<script lang="ts">
	export let fretCount: number = 6;
	export let stringCount: number = 4;
	export let onFret: number | null;
	export let onString: number;

	// notes are 25% width of parent, so -12.5 to centralise

	$: shouldRender = onFret !== null && onFret !== 0;
	$: xCoord = (100 / (stringCount - 1)) * onString;
	$: yCoord = (100 / (fretCount - 1)) * (onFret - 1);
</script>

{#if shouldRender}
	<div class="chord-diagram-note" style="top: {yCoord}%; left: {xCoord}%" />
{/if}

<style>
	.chord-diagram-note {
		transform-origin: 50% 50%;
		transform: translate(-1.725rem, 0.375rem);
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		width: 3.45rem;
		height: 3.45rem;
		background-color: #000;
		border-radius: 50%;
	}
</style>
