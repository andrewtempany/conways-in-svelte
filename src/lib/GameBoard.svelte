<script>
    import { createBoard, getNextBoard } from "../gameUtils";
    import Slider from "./Slider.svelte";
    // let value = 42;
    // let theme = "default";
    let size = 20;
    let refreshInterval = 1000;
    let matrix = [[]];
    let interval = null;

    const getBoard = () => {
        matrix = createBoard(size);
    };
    const runInterval = () => {
        if (!interval) {
            interval = setInterval(() => {
                matrix = getNextBoard(matrix);
            }, refreshInterval);
        } else {
            clearInterval(interval);
            interval = null;
        }
    };

    const randomiseBoard = () => {
        let newMatrix = matrix.map((row) => {
            return row.map((cell) => {
                return Math.random() < 0.2;
            });
        });
        matrix = newMatrix;
    };

    const onCellClick = (x, y) => {
        let newMatrix = matrix;
        matrix[y][x] = !matrix[y][x];
        matrix = newMatrix;
    };
</script>

<div class="controls">
    <Slider
        on:change={(e) => (size = e.detail.value)}
        id="size-slider"
        initialValue={size}
        max={40}
    />
    <Slider
        on:change={(e) => (refreshInterval = e.detail.value)}
        id="refresh-interval-slider"
        initialValue={refreshInterval}
        max={2000}
    />
    <button on:click={() => getBoard()}>Generate Board</button>
    <button on:click={() => randomiseBoard()}>Randomise Board</button>
    <button on:click={() => runInterval()}>
        {#if interval === null}
            Start
        {:else}
            End
        {/if}
    </button>
</div>
<table class="board">
    <tbody>
        {#each matrix as row, yIndex}
            <tr>
                {#each row as cell, xIndex (xIndex + "-" + yIndex)}
                    {#if cell === true}
                        <td
                            class="cell"
                            id="{xIndex}-{yIndex}"
                            on:mouseup={() => onCellClick(xIndex, yIndex)}
                        >
                            <div class="active" />
                        </td>
                    {:else}
                        <td
                            class="cell"
                            id="{xIndex}-{yIndex}"
                            on:mouseup={() => onCellClick(xIndex, yIndex)}
                        >
                            <div class="inactive" />
                        </td>
                    {/if}
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .controls {
        padding-top: 12px;
        grid-area: controls;
        align-items: center;
        display: flex;
        gap: 6px;
    }
    .board {
        grid-area: board;
    }
    .cell {
        height: 1.5rem;
        width: 1.5rem;
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 3px;
    }
    .cell:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    .active {
        height: 1rem;
        width: 1rem;
        background-color: rgba(0, 255, 0, 1);
        margin: auto;
        border-radius: 0.5rem;
    }
    .inactive {
        height: 0.2rem;
        width: 0.2rem;
        background-color: rgba(0, 255, 0, 0.3);
        margin: auto;
        border-radius: 0.5rem;
    }
    .cell:hover .inactive {
        background-color: rgba(0, 255, 0, 0.8);
    }
    .cell:hover .active {
        background-color: rgb(119, 255, 0);
    }
</style>
