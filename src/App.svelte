<script>
  import svelteLogo from "./assets/svelte.svg";
  import Counter from "./lib/Counter.svelte";
  import GameBoard from "./lib/GameBoard.svelte";
</script>

<main class="main">
  <GameBoard />
</main>

<style>
  .main {
    display: grid;
    grid-template-rows: 100px calc(100vh - 100px);
    grid-template-columns: 100vw;
    grid-template-areas:
      "controls"
      "board";
  }
</style>
