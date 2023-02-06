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
    grid-template-rows: 200px calc(100vh - 200px);
    grid-template-columns: 100vw;
    grid-template-areas:
      "controls"
      "board";
  }
</style>
