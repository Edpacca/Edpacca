<script lang="ts">
    import FaIcon from "./FaIcon.svelte";
    import { sineIn } from "svelte/easing";

    export let text: string;
    export let urlRef: string | undefined = undefined;
    export let icon: string | undefined = undefined;
    let isHovered = false;
    const grow = (_node: HTMLElement) => {
        return {
            duration: 100,
            easing: sineIn,
            css: (t: number) => `transform: scaleX(${t}); transform-origin: left`
        }
    }

    const goToProject = () => {
        location.href=`${urlRef}`
    }
</script>

<button class="button1"
    on:click={goToProject}
    on:mouseenter={() => {isHovered = true;}}
    on:mouseleave={() => {isHovered = false;}}>
    <FaIcon icon={"angle-left"}/>
    {#if isHovered}
        <div class="project-name" transition:grow>{text}</div>
    {/if}
    {#if icon}
        <FaIcon icon={icon}/>
    {/if}
</button>
