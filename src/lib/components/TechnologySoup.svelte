<script lang="ts">
    import { onMount } from "svelte";
    import { WordSoup } from "$lib/wordSoup";
    import ControlBar from "./ControlBar.svelte";
    import { ZERO_VECTOR, Vector2D } from "../mechanics/vector";
    import FaIcon from "./FaIcon.svelte";

    export let technologies: Record<string, number>;
    let canvas: HTMLCanvasElement;
    let wordSoup: WordSoup;
    let xGravity = 0;
    let yGravity = 0;
    let hasGravity = true;

    let screenWidth: number;
    let isDescriptionOpen = false;

    const reset = () => {
        let fontArea = undefined;
        let minFontSize = undefined;
        if (screenWidth > 600) {
            canvas.height = 1000;
            canvas.width = canvas.height * (16 / 9);
        } else {
            canvas.height = 500;
            canvas.width = canvas.height * (4 / 3);
            fontArea = 500;
            minFontSize = 16;
        }
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        wordSoup = new WordSoup(canvas, ctx, technologies, fontArea, minFontSize);
        wordSoup.animate();
    }

    const syncGravity = () => {
        xGravity = wordSoup.gravity.x * 100;
        yGravity = wordSoup.gravity.y * 100;
    }

    const btns = [
        {
            title: "Reset Positions",
            fnc: () => {
                reset();
                if (hasGravity) {
                    wordSoup.setGravity(new Vector2D(xGravity / 100, yGravity / 100));
                } else {
                    wordSoup.setForces(ZERO_VECTOR, true, 0.1);
                }
            }
        },
        {
            title: "Reset Gravity",
            fnc: () => {
                wordSoup.setForces(new Vector2D(0, 0.2), false);
                syncGravity();
                hasGravity = true;
            }
        },
        {
            title: "?",
            fnc: () => {
                wordSoup.setForces(ZERO_VECTOR, true, 0.1);
                hasGravity = false;
            }
        }
    ]

    onMount(() => {
        reset();
        syncGravity();
        wordSoup.setForces(ZERO_VECTOR, true, 0.1);
        hasGravity = false;
    });

    $: wordSoup?.setGravity(new Vector2D(xGravity / 100, yGravity / 100));
</script>

<svelte:window bind:innerWidth={screenWidth}/>
<div class="main-container">
    {#if hasGravity}
        <div>
            <div class="grav-values-container">
                <div>gravity X: {xGravity / 100}</div>
                <div>gravity y: {yGravity / 100}</div>
            </div>
            <input
                type="range"
                class="horizontal"
                min={-100} max={100}
                bind:value={xGravity}/>
            <input
                type="range"
                class="vertical"
                min={-100} max={100}
                bind:value={yGravity}/>
        </div>
    {/if}
    <canvas bind:this={canvas}/>
</div>
<ControlBar buttons={btns}/>

{#if isDescriptionOpen}
<div>
    <p>I call this the "tech soup" widget. The relative font size of each word represents the number of projects I have worked on that use that language/framework. The data is taken from my github via the API and calculated server-side, with static data added to represent work repos. For example I use python a lot at work, but it doesn't feature heavily in my personal projects (yet!).</p>
    <p>If the blocks get stuck try changing the gravity with the sliders or resetting the positions. Unfortunately the "physics engine" is quite simplistic, but I think it results in some interesting behaviour! <a href="/">Read more about the code behind the TechnologySoup widget here.</a></p>
</div>
<button class="button1" on:click={() => {isDescriptionOpen = false;}}>
    less
    <FaIcon icon={"arrow-up"} />
</button>
{:else}
    <div class="text-button-container">
        <p>I call this the "tech soup" widget...</p>
        <button class="button1" on:click={() => {isDescriptionOpen = true;}}>
            read more
            <FaIcon icon={"arrow-down"} />
        </button>
    </div>
{/if}

<style>
    canvas {
        background-color: none;
        width: 100%;
        pointer-events: none;
        border-radius: var(--border-radius);
        box-shadow: 0 0 10px var(--primary-50);
    }

    .grav-values-container {
        position: absolute;
        top: var(--margin);
        left: var(--margin);
    }

    .main-container {
        width: 100%;
        position: relative;
    }

    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        cursor: pointer;
        outline: none;
        cursor: pointer;
        border-radius: 0px;
        background: none;
    }

    input {
        position: absolute;
    }

    input.vertical{
        transform: rotate(90deg);
        transform-origin: 0;
        width: 8px;
        width: calc(100% * 9 / 16);
        outline: none;
        cursor: pointer;
    }

    input.horizontal {
        width: 100%;
        position: absolute;
        top: -16px;
        left: 16px;
    }

    /* Thumb: webkit */
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 36px;
        width: 36px;
        background-color: var(--light-grey);
        border-radius: 50%;
        border: none;
        transition: .2s ease-in-out;
    }

    /* Thumb: Firefox */
    input[type="range"]::-moz-range-thumb {
        height: 36px;
        width: 36px;
        background-color: var(--light-grey);
        border-radius: 50%;
        border: none;
        transition: .2s ease-in-out;
    }

        /* Thumb: webkit */
        input[type="range"]::-webkit-slider-thumb:hover {
        background-color: var(--highlight);
    }

    /* Thumb: Firefox */
    input[type="range"]::-moz-range-thumb:hover {
        background-color: var(--highlight);
    }

    .text-button-container {
        display: flex;
        gap: 1em;
        align-items: center;
    }

    @media screen and (max-width: 600px) {
        input.vertical{
            width: calc(100% * 3 / 4);
            top: -8px;
        }

        input.horizontal {
            width: 100%;
            position: absolute;
            top: -12px;
            left: 8px;
        }

        input[type="range"]::-webkit-slider-thumb {
            height: 24px;
            width: 24px;
        }

        /* Thumb: Firefox */
        input[type="range"]::-moz-range-thumb {
            height: 24px;
            width: 24px;
        }

        .text-button-container {
            display: block;
        }
    }
</style>