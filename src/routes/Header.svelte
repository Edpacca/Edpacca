<script>
	import { page } from "$app/stores";

	$: isPostPage = 
		!$page.url.pathname.startsWith("/weather") &&
		!$page.url.pathname.startsWith("/projects") &&
		$page.url.pathname !== "/";
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith("/projects") ? "page" : undefined}>
				<a href="/projects">Projects</a>
			</li>
			<!-- <li aria-current={$page.url.pathname.startsWith("/weather") ? "page" : undefined}>
				<a href="/weather">Weather</a>
			</li> -->
			<li aria-current={$page.url.pathname.startsWith("/fetch") ? "page" : undefined}>
				<a href="/fetch">Merry Christmas Ala</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	nav {
		display: flex;
		justify-content: center;
		margin: auto;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
	}

	li {
		position: relative;
		height: 100%;
        list-style-type: none;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--highlight);
	}

	li[aria-current='page'] a {
		color: var(--highlight);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--primary);
		font-weight: 700;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--highlight);
	}
</style>
