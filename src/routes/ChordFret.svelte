<script lang="ts">
	export let fretIncrement: number;
	export let fretNumber: number;
</script>

<div class="chord-diagram-fret" style="top: calc({fretIncrement * fretNumber}% - 2px);" />

<style>
	.chord-diagram-fret {
		width: 100%;
		box-sizing: border-box;
		border: 2px solid #000;
		display: inline-block;
		position: absolute;
	}
</style>
