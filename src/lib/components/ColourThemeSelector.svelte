<script lang="ts">
    import { onMount } from "svelte";
    import { currentColourTheme, getColourTheme, isUsingDarkTheme } from "../../store";
    import { setColourTheme } from "$lib/theme";
    import Tooltip from "./Tooltip.svelte";

    let isMenuOpen = false;
    export let callback: () => void;
    let isHovered = false;
    const themes = [
        "gold",
        "teal",
        "sky",
        "magenta"
    ]

    const toggleMenu = () => { 
        isMenuOpen = !isMenuOpen;
    }

    const setTheme = (theme: string) => {
        setColourTheme(theme);
        isMenuOpen = false;
        callback();
    }

    $: themeType = $isUsingDarkTheme ? "bright" : "dark";
    $: filteredThemes = themes.filter(th => th !== $currentColourTheme);
    $: if (isHovered) {
        isMenuOpen = true;
    }

    onMount(() => {
        $currentColourTheme = getColourTheme();
    });
</script>

<div class="theme-selector">
    <Tooltip text={"choose theme"} bind:isHovered>
        <button 
            style={`background-color: var(--${$currentColourTheme}-${themeType})`}
            on:click={toggleMenu}>
        </button>
    </Tooltip>
    {#if isMenuOpen}
        <ul>
            {#each filteredThemes as theme}
                <li>
                    <button
                        style={`background-color: var(--${theme}-${themeType})`}
                        on:click={() => setTheme(theme)}>
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>


<style>
    .theme-selector {
        display: flex;
        align-items: center;
    }

    button {
        height: 2em;
        width: 2em;
        border-radius: 100%;
        border: none;
        transition: var(--transition-time);
    }

    button:hover {
        opacity: 0.5;
    }

    ul {
		position: relative;
		padding: 0;
		margin: 0;
        margin-left: 0.5em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
	}

    li button {
        opacity: 0.5;
    }

    li button:hover {
        opacity: 1;
    }
</style>