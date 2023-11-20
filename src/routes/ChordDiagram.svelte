<script lang="ts">
	/**
	 * This is the single component file for rendering SVG chord diagrams.
	 * It powers a lot of the app.
	 */
	import { fade } from 'svelte/transition';

	interface DiagramStyle {
		// Colors
		background: string;
		boardColor: string;
		lineColor: string;
		dotColor: string;
		// Spacing / sizing
		lineWidth: number;
		marginLeft: number;
		marginRight: number;
		marginTop: number;
		marginBottom: number;
	}

	const defaultDiagramStyle: DiagramStyle = {
		background: '#fff',
		boardColor: '#fff',
		dotColor: '#111',
		lineColor: '#333',
		lineWidth: 3,
		marginLeft: 28,
		marginRight: 28,
		marginTop: 5,
		marginBottom: 5
	};

	export let fretted: (number | null)[] = [];
	export let style: DiagramStyle = defaultDiagramStyle;

	// Layout calculations

	const diagramWidth = 125;
	const diagramHeight = 150;
	const dotRadius = 10;
	const labelFontSize = 24;

	const diagramStyle = { ...style, ...defaultDiagramStyle };
	$: lowestFret = Math.max(...fretted) > 4 ? Math.max(...fretted) - 3 : 1;
	$: relativeFrets = fretted.map((fret) => fret - lowestFret);

	const boardWidth = diagramWidth - (diagramStyle.marginLeft + diagramStyle.marginRight);
	const boardHeight = diagramHeight - (diagramStyle.marginTop + diagramStyle.marginBottom);

	const dotFretIncrement = boardHeight / 5;

	const fretLabelXcoord = diagramWidth - 0.4 * labelFontSize;
	const fretLabelYCoord = diagramStyle.marginTop + 0.5 * dotFretIncrement;

	let dotYCoords: (number | null)[];
	$: dotYCoords = relativeFrets.map((fret) => {
		return diagramStyle.marginTop + (fret + 0.5) * dotFretIncrement;
	});

	// middle strings only
	const stringXcoords = [
		diagramStyle.marginLeft - diagramStyle.lineWidth / 2 + Math.floor((1 / 3) * boardWidth),
		diagramStyle.marginLeft - diagramStyle.lineWidth / 2 + Math.floor((2 / 3) * boardWidth)
	];

	const fretYcoords = [
		diagramStyle.marginTop - diagramStyle.lineWidth / 2 + Math.floor((1 / 5) * boardHeight),
		diagramStyle.marginTop - diagramStyle.lineWidth / 2 + Math.floor((2 / 5) * boardHeight),
		diagramStyle.marginTop - diagramStyle.lineWidth / 2 + Math.floor((3 / 5) * boardHeight),
		diagramStyle.marginTop - diagramStyle.lineWidth / 2 + Math.floor((4 / 5) * boardHeight)
	];

	const dotXcoords = [
		diagramStyle.marginLeft + Math.floor((0 / 3) * boardWidth),
		diagramStyle.marginLeft + Math.floor((1 / 3) * boardWidth),
		diagramStyle.marginLeft + Math.floor((2 / 3) * boardWidth),
		diagramStyle.marginLeft + Math.floor((3 / 3) * boardWidth)
	];
</script>

<svg
	class="chord-diagram"
	viewBox="0 0 {diagramWidth} {diagramHeight}"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Fretboard top line -->
	{#if lowestFret == 0}
		<rect
			x={diagramStyle.marginLeft}
			y={diagramStyle.marginTop - diagramStyle.lineWidth}
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
		x={diagramStyle.marginLeft}
		y={diagramStyle.marginTop}
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
		y={diagramStyle.marginTop}
		width={diagramStyle.lineWidth}
		height={boardHeight}
		fill={diagramStyle.lineColor}
	/>
	<rect
		x={stringXcoords[1]}
		y={diagramStyle.marginTop}
		width={diagramStyle.lineWidth}
		height={boardHeight}
		fill={diagramStyle.lineColor}
	/>

	<!-- Fret lines -->
	<rect
		x={diagramStyle.marginLeft}
		y={fretYcoords[0]}
		width={boardWidth}
		height={diagramStyle.lineWidth}
		fill={diagramStyle.lineColor}
	/>
	<rect
		x={diagramStyle.marginLeft}
		y={fretYcoords[1]}
		width={boardWidth}
		height={diagramStyle.lineWidth}
		fill={diagramStyle.lineColor}
	/>
	<rect
		x={diagramStyle.marginLeft}
		y={fretYcoords[2]}
		width={boardWidth}
		height={diagramStyle.lineWidth}
		fill={diagramStyle.lineColor}
	/>
	<rect
		x={diagramStyle.marginLeft}
		y={fretYcoords[3]}
		width={boardWidth}
		height={diagramStyle.lineWidth}
		fill={diagramStyle.lineColor}
	/>

	<!-- Fretted strings -->
	{#if relativeFrets[0] >= 0}
		<circle
			class="chord-diagram-note"
			transition:fade
			fill={diagramStyle.dotColor}
			cx={dotXcoords[0]}
			cy={dotYCoords[0]}
			r={dotRadius}
		/>
	{/if}
	{#if relativeFrets[1] >= 0}
		<circle
			class="chord-diagram-note"
			transition:fade
			fill={diagramStyle.dotColor}
			cx={dotXcoords[1]}
			cy={dotYCoords[1]}
			r={dotRadius}
		/>
	{/if}
	{#if relativeFrets[2] >= 0}
		<circle
			class="chord-diagram-note"
			transition:fade
			fill={diagramStyle.dotColor}
			cx={dotXcoords[2]}
			cy={dotYCoords[2]}
			r={dotRadius}
		/>
	{/if}
	{#if relativeFrets[3] >= 0}
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
	{#if lowestFret > 1}
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

<style>
	.chord-diagram {
		filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
	}

	.chord-diagram-note {
		transition: cy 300ms ease-in-out;
	}

	.chord-diagram-fret-label {
		font: sans-serif;
	}
</style>
