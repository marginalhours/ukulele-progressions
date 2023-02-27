<script lang="ts">
		import ChordPanel from './ChordPanel.svelte';
</script>

<svelte:head>
	<title>Ukulele Chord Progression Generator</title>
	<meta name="description" content="Ukulele Chord Progression Generator" />
</svelte:head>

<section>
	<ChordPanel --background-color='#ff6978'/>
	<ChordPanel --background-color='#fffcf9'/>
	<ChordPanel --background-color='#b1ede8'/>
	<ChordPanel --background-color='#6d435a'/>
	<ChordPanel --background-color='#340068'/>
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
