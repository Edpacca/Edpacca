<script lang="ts">
    export let posts: Post[];
    import PostPreview from "./PostPreview.svelte";
</script>

<div class="posts">
	{#each posts as post}
		<PostPreview post={post} hasPostImage={false}/>
	{/each}
</div>

<style>
	.posts {
		margin-top: 1em;
		gap: 0.5em;
		display: flex;
		flex-direction: column;
	}
</style>