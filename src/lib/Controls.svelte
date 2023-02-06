
<script >
    import Slider from './Slider.svelte'
    export let getBoard = () => {null}
    export let randomiseBoard = () => {null}
    export let runInterval = () => {null}
    export let setSize
    let isRunning = false
</script>

<div>
    <Slider
    on:change={(e) => {setSize(e.detail.value)}}
    id="basic-slider"
    initialValue={20}
    max={40}
    />
    <button on:click={() => getBoard()}>Generate Board</button>
    <button on:click={() => randomiseBoard()}>Randomise Board</button>
    <button on:click={() => {console.log("triggering runInterval"); runInterval(); isRunning = !isRunning}}>
    {#if isRunning === false}
    Start
    {:else}
    End
    {/if}
</button>
</div>
