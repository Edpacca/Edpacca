<script lang="ts">
    import { onMount } from "svelte";
    import { timeNoun } from "./weatherTime";
    import { drawTree, drawOrbit, drawCloud } from "./weatherScene";
    import { drawCharacter } from "./DrawCharacter";
    export let time: Date;

    const backgroundStyle = timeNoun(time);
    let canvas: HTMLCanvasElement;

    onMount(() => {
        canvas.width = window.innerWidth - 24;
        canvas.height = window.innerHeight - 24;

        const orbitCentreX = canvas.width / 2;
        const orbitCentreY = canvas.height;
        const orbitRadius = canvas.height - 100;
        const orbitBodyRadius = 100;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            drawOrbit(ctx, time, orbitCentreX, orbitCentreY, 
                orbitRadius, orbitBodyRadius);
            drawTree(ctx, 120, canvas.height, 80, -Math.PI / 2, 12, 15);
            drawTree(ctx, canvas.width - 400, canvas.height, 60, -Math.PI / 2, 12, 15);
            drawCloud(ctx, 90, 100, 20)
            drawCloud(ctx, 720, 240, 20)
            drawCloud(ctx, canvas.width / 2, 100, 20)
            drawCloud(ctx, canvas.width - 100, 80, 20)

            drawCharacter(ctx, canvas.width / 2, canvas.height - 200)
        }
    })
</script>

<!-- <input type="range" bind:value={testTime} min={0} max={24}/> -->
<canvas class={backgroundStyle} bind:this={canvas}>

</canvas>

<svelte:head>
    <style>
        :root {
            --night: rgb(50, 30, 125);
            --dawn-dusk: rgb(255, 150, 150);
            --sunrise-sunset: rgb(255, 150, 40);
            --morning: rgb(160, 160, 160);
            --day: rgb(0, 170, 255);
        }
    </style>
</svelte:head>

<style>
    canvas {
        margin: var(--margin);
        width: 100%;
        height: 100%;
    }

    .black {
        background-color: black;
    }


    .night {
        background: var(--night);
    }

    .dawn {
        background: linear-gradient(
            var(--night),
            var(--dawn-dusk)
        );
    }

    .sunrise {
        background: linear-gradient(
            var(--dawn-dusk)
            var(--sunrise-sunset),
        );
    }

    .morning {
        background: linear-gradient(
            var(--morning),
            var(--day)
        );
    }

    .day {
        background: var(--day);
    }

    .evening {
        background: linear-gradient(
            var(--day),
            var(--dawn-dusk)
        );
    }

    .sunset {
        background: linear-gradient(
            var(--dawn-dusk),
            var(--sunrise-sunset)
        );
    }

    .dusk {
        background: linear-gradient(
            var(--night),
            var(--dawn-dusk)
        );
    }
</style>