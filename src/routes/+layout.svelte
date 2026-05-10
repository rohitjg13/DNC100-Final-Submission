<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<div class="mobile-block" aria-hidden="true">
	<p class="mobile-block__label">DNC100 Final Assignment</p>
	<p class="mobile-block__message">Please use a desktop or laptop to view this.</p>
</div>

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
	.mobile-block {
		display: none;
		position: fixed;
		inset: 0;
		z-index: 9999;
		background-color: var(--color-cream);
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
		gap: 1rem;
	}

	.mobile-block__label {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-warm-brown);
		margin: 0;
	}

	.mobile-block__message {
		font-family: var(--font-serif);
		font-size: clamp(1.4rem, 6vw, 2rem);
		font-weight: 600;
		line-height: 1.25;
		color: var(--color-dark-charcoal);
		max-width: 20ch;
		margin: 0;
	}

	@media (max-width: 768px) {
		.mobile-block {
			display: flex;
		}
	}

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
