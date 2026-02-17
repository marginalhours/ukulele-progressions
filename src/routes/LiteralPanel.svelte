<script lang="ts">
	import ChordDiagram from './ChordDiagram.svelte';
	import type { LiteralFretting } from '../lib/music/relativeChord';
	import {
		UserChordType,
		relativeChordToString,
		semitonesToInterval,
		type RelativeChord
	} from '../lib/music/relativeChord';
	import { findChordsForFretting } from '../lib/frettings';
	import { semitoneDistance } from '../lib/music/pitch';
	import { unflatten, type PitchWithFlats } from '../lib/music/types';
	import { replaceChordAt } from './progressionStore';

	export let literalChord: LiteralFretting;
	export let tonic: PitchWithFlats;
	export let index: number;

	const backgroundColor = 'rgba(0, 0, 0, 0.8)';

	const buildRelativeMatches = (fretting: (number | null)[], tonic: PitchWithFlats) => {
		const matches = findChordsForFretting(fretting);
		const unique = new Map<string, RelativeChord>();

		for (const chord of matches) {
			const semitones = semitoneDistance(unflatten(tonic), chord.tonic);
			const interval = semitonesToInterval(semitones);
			if (!interval) continue;

			const relative: RelativeChord = {
				type: UserChordType.RELATIVE,
				number: interval,
				quality: chord.quality
			};

			unique.set(relativeChordToString(relative), relative);
		}

		return [...unique.values()];
	};

	$: relativeMatches = buildRelativeMatches(literalChord.strings, tonic);
</script>

<div class="chord-panel-wrapper">
	<div class="chord-and-fretting">
		<div class="chord-panel">
			<ChordDiagram fretted={literalChord.strings} />
		</div>
	</div>
	<div class="chord-topper" style="--background-color: {backgroundColor}" />
	<div class="chord-name">???</div>
	<div class="chord-role">
		{literalChord.strings.map((fret) => (fret == null ? 'x' : fret)).join('')}
	</div>
	{#if relativeMatches.length}
		<div class="literal-suggestions">
			{#each relativeMatches as match}
				<button class="suggestion-pill" on:click={() => replaceChordAt(index, match)}>
					{relativeChordToString(match)}?
				</button>
			{/each}
		</div>
	{/if}
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

	.literal-suggestions {
		margin-top: 0.25em;
		display: flex;
		gap: 0.35em;
		flex-wrap: wrap;
		justify-content: center;
	}

	.suggestion-pill {
		cursor: pointer;
		border: none;
		border-radius: 999px;
		padding: 0.15em 0.5em;
		font-size: 0.75em;
		background-color: rgba(0, 0, 0, 0.1);
		transition: transform 120ms ease-in-out, background-color 120ms ease-in-out;
	}

	.suggestion-pill:hover {
		transform: translateY(-1px);
		background-color: rgba(0, 0, 0, 0.18);
	}
</style>
