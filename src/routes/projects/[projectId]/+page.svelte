<script lang=ts>
    import { page } from "$app/stores";
    import TechnologySoup from "$lib/components/TechnologySoup.svelte";
    import DnD5eStats from "$lib/components/DnD5eStats.svelte";
    import MiniaturesPage from "$lib/pages/MiniaturesPage.svelte";
    import PostPreview from "$lib/components/PostPreview.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import RunningPage from "$lib/pages/RunningPage.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;


</script>

<h1 class={$page.url.pathname.split("/projects/")[1] === "dnd" ? "dragonhunter" : ""}>{data.project?.name}</h1>
<BackButton text={"projects"} urlRef={"/projects"}/>

<br/>
{#if $page.url.pathname.split("/projects/")[1] === "minipainting"}
    <MiniaturesPage/>
{/if}
{#if $page.url.pathname.split("/projects/")[1] === "dnd"}
    <DnD5eStats/>
{/if}
<div class="description">
    {data.project?.description ?? ""}
</div>

{#if $page.url.pathname.split("/projects/")[1] === "running"}
    <RunningPage/>
{:else if $page.url.pathname.split("/projects/")[1] === "programming"}
    {#if data.ghData}
        <TechnologySoup technologies={data.ghData}/>
    {/if}
{/if}
<section>
    <div class="posts">
        {#each data.posts as post}
            <PostPreview post={post} hasProjectLink={false} hasPostImage={true}/>
        {/each}
    </div>
</section>

<style>

h1 {
    color: var(--color-theme-1);
    text-transform: uppercase;
    font-weight: bold;
}

.description {
    margin-bottom: 2em;
}

section {
    margin-top: 2em;
}
</style>