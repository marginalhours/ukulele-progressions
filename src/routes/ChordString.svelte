<script lang="ts">
	export let stringIncrement: number;
	export let stringNumber: number;
</script>

<div class="chord-diagram-string" style="left: calc({stringIncrement * stringNumber}% - 2px);" />

<style>
	.chord-diagram-string {
		height: 100%;
		box-sizing: border-box;
		border: 2px solid #000;
		display: inline-block;
		position: absolute;
	}
</style>
