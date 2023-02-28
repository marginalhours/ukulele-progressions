<script lang="ts">
	import ChordPanel from './ChordPanel.svelte';
	import { Interval } from './types';
</script>

<svelte:head>
	<title>Ukulele Chord Progression Generator</title>
	<meta name="description" content="Ukulele Chord Progression Generator" />
</svelte:head>

<section>
	<ChordPanel interval={Interval.FIRST} />
	<ChordPanel interval={Interval.FIFTH} />
	<ChordPanel interval={Interval.SIXTH} />
	<ChordPanel interval={Interval.FOURTH} />
	<!-- <ChordPanel interval={Interval.SECOND} /> -->
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>
