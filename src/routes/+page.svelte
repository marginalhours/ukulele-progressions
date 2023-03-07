<script lang="ts">
	import ChordPanel from './ChordPanel.svelte';
	import { Interval } from './types';

	const intervals = [
		Interval.FIRST,
		Interval.SECOND,
		Interval.THIRD,
		Interval.FOURTH,
		Interval.FIFTH,
		Interval.SIXTH,
		Interval.SEVENTH
	];

	const choose = (array: any[]) => array[Math.floor(Math.random() * array.length)];

	let sequence = [Interval.FIRST, Interval.FIFTH, Interval.SIXTH, Interval.FOURTH];

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.code == 'Space') {
			sequence = [0, 1, 2, 3].map(() => choose(intervals));
		}
	};
</script>

<svelte:head>
	<title>Ukulele Chord Progression Generator</title>
	<meta name="description" content="Ukulele Chord Progression Generator" />
</svelte:head>

<section>
	<ChordPanel interval={sequence[0]} chordName={'G'} fretted={[0, 2, 3, 2]} />
	<ChordPanel interval={sequence[1]} chordName={'D7'} fretted={[2, 2, 2, 3]} />
	<ChordPanel interval={sequence[2]} chordName={'Em'} fretted={[0, 4, 3, 2]} />
	<ChordPanel interval={sequence[3]} chordName={'Cm'} fretted={[0, 0, 0, 3]} />
	<!-- <ChordPanel interval={Interval.SECOND} /> -->
</section>

<svelte:window on:keydown={onKeyDown} />

<style>
	section {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>
