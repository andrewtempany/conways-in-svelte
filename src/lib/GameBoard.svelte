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
            console.log(interval);
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

<div class="header">
    <div class="typewriter">
        <h1 >Conway's Game of Life</h1>
    </div>
    <div class="controls">
        <div class="sliders">
            <label class="slider-label" for="board-size">
                <span class="slider-label-text">Board Size</span>
                <Slider
                    on:change={(e) => (size = e.detail.value)}
                    id="size-slider"
                    initialValue={size}
                    max={40}
                />
            </label>
            <label class="slider-label" for="refresh-rate">
                <span class="slider-label-text">Refresh Rate</span>
                <Slider
                    on:change={(e) => (refreshInterval = e.detail.value)}
                    id="refresh-interval-slider"
                    initialValue={refreshInterval}
                    max={2000}
                />
            </label>
        </div>
        <div class="buttons">
            <button on:click={() => getBoard()}>Generate Board</button>
            <button on:click={() => randomiseBoard()}>Randomise Board</button>
            <button
                class={interval === null ? "" : "end-button"}
                on:click={() => runInterval()}
            >
                {#if interval === null}
                    Start
                {:else}
                    End
                {/if}
            </button>
        </div>
    </div>
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
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap');
    .header {
        padding-top: 12px;
        grid-area: controls;
        align-items:flex-start;
    }
    .title {
        text-align: left;
        padding: 0px 6px 0px 6px;
        font-family: 'IBM Plex Mono', monospace;;
    }
    .controls {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        align-items: center;

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
    .slider-label {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .slider-label-text {
        margin-left: 10px;
    }
    .buttons {
        display: flex;
        gap: 8px;
    }
    button {
        background-color: rgb(119, 255, 0);
        color: black;
    }
    .end-button {
        color: rgb(119, 255, 0);
        background-color: white;
    }
    .sliders {
        display: flex;
        gap: 8px;
    }
    .typewriter {
        width: fit-content;
    }
    .typewriter h1 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .05em solid rgb(119, 255, 0); /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  /*letter-spacing: .02em; /* Adjust as needed */
  animation: 
    typing 2.5s steps(18, end),
    blink-caret .75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: rgb(119, 255, 0); }
}
</style>
