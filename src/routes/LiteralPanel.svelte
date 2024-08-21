<script lang="ts">
	import ChordDiagram from './ChordDiagram.svelte';
	import type { LiteralFretting } from '../lib/music/relativeChord';

	export let literalChord: LiteralFretting;

	const backgroundColor = 'rgba(0, 0, 0, 0.8)';
</script>

<div class="chord-panel-wrapper">
	<div class="chord-and-fretting">
		<div class="chord-panel">
			<ChordDiagram fretted={literalChord.strings} />
		</div>
	</div>
	<div class="chord-topper" style="--background-color: {backgroundColor}" />
	<div class="chord-name">???</div>
	<div class="chord-role">{literalChord.strings.join('')}</div>
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
		border-radius: 0.5em;
		background-color: var(--background-color);
	}

	.chord-and-fretting {
		display: grid;
	}

	.chord-panel-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.chord-panel {
		width: 24vw;
		height: 30vw;
		max-width: 160px;
		max-height: 200px;
		border-radius: 0.5em;
		z-index: -1;
	}

	.chord-name {
		font-size: 2em;
		font-weight: bold;
		opacity: 0.8;
	}

	.chord-role {
		font-size: 0.8em;
		font-weight: bold;
		opacity: 0.5;
	}
</style>
