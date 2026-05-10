<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<Nav />
<main>
	{@render children()}
</main>
<footer class="site-footer">
	<div class="site-footer__inner">
		<p class="site-footer__title">Sculpted in Pixels</p>
		<p class="site-footer__meta">
			DNC100 Final Project · Critical readings on classical dance and AI-generated media
		</p>
		<p class="site-footer__cite">Made by Rohit J G</p>
	</div>
</footer>

<style>
	main {
		min-height: 100vh;
	}

	.site-footer {
		background-color: var(--color-dark-charcoal);
		color: var(--color-beige);
		padding: var(--space-xl) var(--space-md);
		text-align: center;
	}

	.site-footer__inner {
		max-width: var(--max-width-narrow);
		margin: 0 auto;
	}

	.site-footer__title {
		font-family: var(--font-serif);
		font-size: 1.6rem;
		font-style: italic;
		font-weight: 500;
		margin-bottom: 0.5rem;
		color: var(--color-cream);
	}

	.site-footer__meta {
		font-size: 0.92rem;
		opacity: 0.75;
		max-width: 50ch;
		margin: 0 auto var(--space-sm);
	}

	.site-footer__cite {
		font-size: 0.78rem;
		opacity: 0.55;
		letter-spacing: 0.08em;
		margin: 0;
	}
</style>
