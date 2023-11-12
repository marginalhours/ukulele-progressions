<script lang="ts">
	import { fade } from 'svelte/transition';

	interface DiagramStyle {
		// Colors
		background: string;
		boardColor: string;
		lineColor: string;
		dotColor: string;
		// Spacing / sizing
		lineWidth: number;
		verticalMargin: number;
		horizontalMargin: number;
	}

	const defaultDiagramStyle: DiagramStyle = {
		background: '#fff',
		boardColor: '#fff',
		dotColor: '#111',
		lineColor: '#333',
		lineWidth: 3,
		verticalMargin: 25,
		horizontalMargin: 25
	};

	export let stravaganza: number;
	export let fretted: (number | null)[] = [];
	export let style: DiagramStyle = defaultDiagramStyle;

	// Layout calculations

	const diagramWidth = 120;
	const diagramHeight = 180;
	const dotRadius = 10;
	const labelFontSize = 24;

	const diagramStyle = { ...style, ...defaultDiagramStyle };
	$: lowestFret = Math.max(Math.max(...fretted) - 4, 0);
	$: relativeFrets = fretted.map((fret) => fret - lowestFret);

	const boardWidth = diagramWidth - 2 * diagramStyle.horizontalMargin;
	const boardHeight = diagramHeight - 2 * diagramStyle.verticalMargin;

	const dotFretIncrement = boardHeight / 5;

	const fretLabelXcoord = diagramStyle.horizontalMargin + boardWidth + 0.5 * labelFontSize;
	const fretLabelYCoord = diagramStyle.verticalMargin + 0.5 * dotFretIncrement;

	let dotYCoords: (number | null)[];
	$: dotYCoords = relativeFrets.map((fret) => {
		return diagramStyle.verticalMargin + (fret - 0.5) * dotFretIncrement;
	});

	// middle strings only
	const stringXcoords = [
		diagramStyle.horizontalMargin - diagramStyle.lineWidth / 2 + Math.floor((1 / 3) * boardWidth),
		diagramStyle.horizontalMargin - diagramStyle.lineWidth / 2 + Math.floor((2 / 3) * boardWidth)
	];

	const fretYcoords = [
		diagramStyle.verticalMargin - diagramStyle.lineWidth / 2 + Math.floor((1 / 5) * boardHeight),
		diagramStyle.verticalMargin - diagramStyle.lineWidth / 2 + Math.floor((2 / 5) * boardHeight),
		diagramStyle.verticalMargin - diagramStyle.lineWidth / 2 + Math.floor((3 / 5) * boardHeight),
		diagramStyle.verticalMargin - diagramStyle.lineWidth / 2 + Math.floor((4 / 5) * boardHeight)
	];

	const dotXcoords = [
		diagramStyle.horizontalMargin + Math.floor((0 / 3) * boardWidth),
		diagramStyle.horizontalMargin + Math.floor((1 / 3) * boardWidth),
		diagramStyle.horizontalMargin + Math.floor((2 / 3) * boardWidth),
		diagramStyle.horizontalMargin + Math.floor((3 / 3) * boardWidth)
	];
</script>

<div class="chord-diagram-wrapper">
	<svg
		class="chord-diagram"
		viewBox="0 0 {diagramWidth} {diagramHeight}"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- Fretboard top line -->
		{#if lowestFret == 0}
			<rect
				x={diagramStyle.horizontalMargin}
				y={diagramStyle.verticalMargin - diagramStyle.lineWidth}
				width={boardWidth}
				height={diagramStyle.lineWidth * 2}
				stroke={diagramStyle.lineColor}
				fill={diagramStyle.lineColor}
				stroke-width={diagramStyle.lineWidth}
				rx={diagramStyle.lineWidth}
				ry={diagramStyle.lineWidth}
				stroke-linejoin="round"
			/>
		{/if}

		<!-- Board -->
		<rect
			x={diagramStyle.horizontalMargin}
			y={diagramStyle.verticalMargin}
			width={boardWidth}
			height={boardHeight}
			stroke={diagramStyle.lineColor}
			fill={diagramStyle.boardColor}
			stroke-width={diagramStyle.lineWidth}
			rx={diagramStyle.lineWidth}
			ry={diagramStyle.lineWidth}
			stroke-linejoin="round"
		/>

		<!-- Middle strings -->
		<rect
			x={stringXcoords[0]}
			y={diagramStyle.verticalMargin}
			width={diagramStyle.lineWidth}
			height={boardHeight}
			fill={diagramStyle.lineColor}
		/>
		<rect
			x={stringXcoords[1]}
			y={diagramStyle.verticalMargin}
			width={diagramStyle.lineWidth}
			height={boardHeight}
			fill={diagramStyle.lineColor}
		/>

		<!-- Fret lines -->
		<rect
			x={diagramStyle.horizontalMargin}
			y={fretYcoords[0]}
			width={boardWidth}
			height={diagramStyle.lineWidth}
			fill={diagramStyle.lineColor}
		/>
		<rect
			x={diagramStyle.horizontalMargin}
			y={fretYcoords[1]}
			width={boardWidth}
			height={diagramStyle.lineWidth}
			fill={diagramStyle.lineColor}
		/>
		<rect
			x={diagramStyle.horizontalMargin}
			y={fretYcoords[2]}
			width={boardWidth}
			height={diagramStyle.lineWidth}
			fill={diagramStyle.lineColor}
		/>
		<rect
			x={diagramStyle.horizontalMargin}
			y={fretYcoords[3]}
			width={boardWidth}
			height={diagramStyle.lineWidth}
			fill={diagramStyle.lineColor}
		/>

		<!-- Fretted strings -->
		{#if relativeFrets[0] > 0}
			<circle
				class="chord-diagram-note"
				transition:fade
				fill={diagramStyle.dotColor}
				cx={dotXcoords[0]}
				cy={dotYCoords[0]}
				r={dotRadius}
			/>
		{/if}
		{#if relativeFrets[1] > 0}
			<circle
				class="chord-diagram-note"
				transition:fade
				fill={diagramStyle.dotColor}
				cx={dotXcoords[1]}
				cy={dotYCoords[1]}
				r={dotRadius}
			/>
		{/if}
		{#if relativeFrets[2] > 0}
			<circle
				class="chord-diagram-note"
				transition:fade
				fill={diagramStyle.dotColor}
				cx={dotXcoords[2]}
				cy={dotYCoords[2]}
				r={dotRadius}
			/>
		{/if}
		{#if relativeFrets[3] > 0}
			<circle
				class="chord-diagram-note"
				transition:fade
				fill={diagramStyle.dotColor}
				cx={dotXcoords[3]}
				cy={dotYCoords[3]}
				r={dotRadius}
			/>
		{/if}

		<!-- First fret label -->
		{#if lowestFret > 0}
			<text
				x={fretLabelXcoord}
				y={fretLabelYCoord}
				class="chord-diagram-fret-label"
				font-size={labelFontSize}
				dominant-baseline="central"
				text-anchor="middle"
				>{lowestFret}
			</text>
		{/if}
	</svg>
</div>

<style>
	.chord-diagram {
		width: 80%;
		height: 100%;
		filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
	}

	.chord-diagram-wrapper {
		box-sizing: border-box;
		position: relative;
		margin-bottom: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.chord-diagram-note {
		transition: cy 300ms ease-in-out;
	}

	.chord-diagram-fret-label {
		font: sans-serif;
	}
</style>
