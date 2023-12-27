<script lang="ts">
    import { onMount } from "svelte";
    import { runFetch } from "./fetch";
    let canvas: HTMLCanvasElement;
    let alaCanvas: HTMLCanvasElement;
    let koraCanvas: HTMLCanvasElement;
    let ala: HTMLImageElement;
    let kora: HTMLImageElement;

    onMount(() => {
        canvas.width = window.innerWidth - 24;
        canvas.height = window.innerHeight - 24;
        alaCanvas.width = window.innerWidth - 24;
        alaCanvas.height = window.innerHeight - 24;
        koraCanvas.width = window.innerWidth - 24;
        koraCanvas.height = window.innerHeight - 24;


        const ctx = canvas.getContext("2d");
        const alaCtx = alaCanvas.getContext("2d");
        const koraCtx = koraCanvas.getContext("2d");
        if (ctx && alaCtx && koraCtx) runFetch(ctx, alaCanvas, alaCtx, ala, koraCanvas, koraCtx, kora)
    });
</script>

<img src="game/ala/ala_main.webp" alt="ala" bind:this={ala}/>
<img src="game/kora/kora_main.webp" alt="kora" bind:this={kora}/>
<canvas class="ala-canvas" bind:this={alaCanvas}></canvas>
<canvas class="kora-canvas" bind:this={koraCanvas}></canvas>
<canvas class="game-canvas" bind:this={canvas}></canvas>
<div class="instructions">
    <h3>Space: zostawać / chodź</h3>
</div>

<svelte:window on:keydown|preventDefault/>
<style>
    canvas {
        position: fixed;
        top: 64px;
        left: 2.5%;
        width: 95%;
        height: calc(95% - 64px);
    }

    .game-canvas {
        background-color: green;
        background-image: url("/game/map.jpg");
        background-size: cover;
        border: 2px solid black;
    }

    img {
        image-rendering: pixelated;
		image-rendering: -moz-crisp-edges;
		image-rendering: crisp-edges;
        display: none;
    }

    .instructions {
        position: fixed;
        right: 64px;
        top: 64px
    }
</style>