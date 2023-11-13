<script lang="ts">
	import type { Chord } from '$lib/music/chords';
	import ChordDiagram from '../ChordDiagram.svelte';

	let string0 = 1;

	function plus0() {
		string0 += 1;
	}
	function sub0() {
		string0 -= 1;
	}

	let string1 = 1;

	function plus1() {
		string1 += 1;
	}
	function sub1() {
		string1 -= 1;
	}

	let string2 = 1;

	function plus2() {
		string2 += 1;
	}
	function sub2() {
		string2 -= 1;
	}

	let string3 = 1;

	function plus3() {
		string3 += 1;
		fretted = [string0, string1, string2, string3];
	}

	function sub3() {
		string3 -= 1;
	}

	let height = 8;

	function grow() {
		height += 1;
	}

	function shrink() {
		height -= 1;
	}

	let fretted = [string0, string1, string2, string3];

	$: wrapperStyle = `width: ${height * 0.8}rem; height: ${height}rem`;
	$: fretted = [string0, string1, string2, string3];
</script>

<svelte:head>
	<title>Ukulele Chord Progression Generator</title>
	<meta name="description" content="Ukulele Chord Progression Generator" />
</svelte:head>

<section>
	<div class="controls">
		<div class="string-control-wrapper">
			<label>Size</label><button on:click={grow}>+</button><button on:click={shrink}>-</button>
		</div>
		<div class="string-control-wrapper">
			<label>String 1</label><button on:click={plus0}>+</button><button on:click={sub0}>-</button>
		</div>
		<div class="string-control-wrapper">
			<label>String 2</label><button on:click={plus1}>+</button><button on:click={sub1}>-</button>
		</div>
		<div class="string-control-wrapper">
			<label>String 3</label><button on:click={plus2}>+</button><button on:click={sub2}>-</button>
		</div>
		<div class="string-control-wrapper">
			<label>String 4</label><button on:click={plus3}>+</button><button on:click={sub3}>-</button>
		</div>
	</div>
	<div style={wrapperStyle}>
		<ChordDiagram {fretted} />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.controls {
	}

	.string-control-wrapper {
		margin: 0.25rem 0.25rem;
	}

	.string-control-wrapper label {
		display: inline-block;
		margin-right: 0.5rem;
	}
</style>
