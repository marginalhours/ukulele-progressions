<script lang="ts">
	import { spring } from 'svelte/motion';
	import ChordDiagram from './ChordDiagram.svelte';
</script>

<div class="chord-panel">
	<ChordDiagram />
	<div class="chord-name">G# minor</div>
	<div class="chord-role">VII</div>
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
	}

	.chord-role {
		font-size: 1em;
		font-weight: bold;
	}
</style>
