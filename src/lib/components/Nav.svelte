<script lang="ts">
	import { onMount } from 'svelte';
	import { SECTIONS } from '$lib/sections';

	let scrollY = $state<number>(0);
	let scrolled = $state<boolean>(false);
	let mobileOpen = $state<boolean>(false);

	const NAV_OFFSET = 100;

	// Derive the active section id from scrollY. Reading scrollY inside the derived
	// establishes the reactive dependency, so any scroll triggers a re-evaluation.
	const activeId = $derived.by<string>(() => {
		// Reference scrollY to register dependency.
		void scrollY;
		const fallback = SECTIONS[0]?.id ?? 'hero';
		if (typeof document === 'undefined') return fallback;

		let result = fallback;
		for (const section of SECTIONS) {
			const el = document.getElementById(section.id);
			if (!el) continue;
			const top = el.getBoundingClientRect().top;
			if (top <= NAV_OFFSET) {
				result = section.id;
			}
		}
		return result;
	});

	onMount(() => {
		const sync = () => {
			scrollY = window.scrollY;
			scrolled = window.scrollY > 40;
		};
		sync();
		// Run again after a frame so layout (images, fonts) has settled.
		requestAnimationFrame(sync);
		window.addEventListener('scroll', sync, { passive: true });
		window.addEventListener('resize', sync, { passive: true });

		return () => {
			window.removeEventListener('scroll', sync);
			window.removeEventListener('resize', sync);
		};
	});

	function go(id: string, e: MouseEvent) {
		e.preventDefault();
		mobileOpen = false;
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<nav class="nav" class:nav--scrolled={scrolled} aria-label="Primary">
	<div class="nav__inner">
		<a href="#hero" class="nav__brand" onclick={(e) => go('hero', e)}>
			<span class="nav__brand-mark">∞</span>
			<span class="nav__brand-text">Sculpted in Pixels</span>
		</a>

		<button
			type="button"
			class="nav__toggle"
			aria-expanded={mobileOpen}
			aria-label="Toggle navigation"
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<span class="nav__toggle-bar" class:open={mobileOpen}></span>
			<span class="nav__toggle-bar" class:open={mobileOpen}></span>
			<span class="nav__toggle-bar" class:open={mobileOpen}></span>
		</button>

		<ul class="nav__list" class:nav__list--open={mobileOpen}>
			{#each SECTIONS as section (section.id)}
				<li>
					<a
						href={`#${section.id}`}
						class="nav__link"
						class:nav__link--active={activeId === section.id}
						onclick={(e) => go(section.id, e)}
					>
						<span class="nav__num">{section.number}</span>
						<span class="nav__label">{section.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: var(--nav-height);
		z-index: 100;
		background-color: rgba(253, 250, 244, 0.6);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid transparent;
		transition:
			background-color 0.4s var(--ease-natural),
			border-color 0.4s var(--ease-natural),
			box-shadow 0.4s var(--ease-natural);
	}

	.nav--scrolled {
		background-color: rgba(253, 250, 244, 0.92);
		border-bottom: 1px solid var(--color-line);
		box-shadow: 0 1px 24px -16px rgba(44, 44, 44, 0.18);
	}

	.nav__inner {
		max-width: 1320px;
		height: 100%;
		margin: 0 auto;
		padding: 0 var(--space-md);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
	}

	.nav__brand {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		color: var(--color-dark-charcoal);
		font-family: var(--font-serif);
		font-weight: 600;
		font-size: 1.15rem;
		letter-spacing: -0.01em;
	}

	.nav__brand:hover {
		color: var(--color-warm-brown);
	}

	.nav__brand-mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border: 1px solid var(--color-warm-brown);
		border-radius: 50%;
		font-size: 0.95rem;
		color: var(--color-warm-brown);
		font-style: italic;
	}

	.nav__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 0.15rem;
		align-items: center;
		flex-wrap: nowrap;
	}

	.nav__link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.5rem 0.7rem;
		border-radius: 999px;
		font-family: var(--font-sans);
		font-size: 0.78rem;
		color: var(--color-charcoal-soft);
		font-weight: 500;
		white-space: nowrap;
		transition: color 0.25s var(--ease-natural), background-color 0.25s var(--ease-natural);
		position: relative;
	}

	.nav__num {
		font-family: var(--font-serif);
		font-size: 0.68rem;
		font-style: italic;
		color: var(--color-warm-brown);
		opacity: 0.85;
	}

	.nav__link:hover {
		color: var(--color-dark-charcoal);
		background-color: rgba(139, 105, 20, 0.08);
	}

	.nav__link--active {
		color: var(--color-dark-charcoal);
		background-color: rgba(139, 105, 20, 0.12);
	}

	.nav__link--active .nav__num {
		opacity: 1;
	}

	.nav__toggle {
		display: none;
		flex-direction: column;
		gap: 4px;
		width: 36px;
		height: 36px;
		padding: 8px;
		border-radius: 6px;
	}

	.nav__toggle-bar {
		display: block;
		width: 100%;
		height: 2px;
		background-color: var(--color-dark-charcoal);
		transition: transform 0.3s var(--ease-natural), opacity 0.3s var(--ease-natural);
		transform-origin: center;
	}

	.nav__toggle-bar.open:nth-child(1) {
		transform: translateY(6px) rotate(45deg);
	}
	.nav__toggle-bar.open:nth-child(2) {
		opacity: 0;
	}
	.nav__toggle-bar.open:nth-child(3) {
		transform: translateY(-6px) rotate(-45deg);
	}

	/* On narrow screens (<880px) collapse to numbers only.
	   On a typical MacBook 13" / 14" (>=1024px) the full short labels stay visible. */
	@media (max-width: 880px) {
		.nav__label {
			display: none;
		}
		.nav__link {
			padding: 0.5rem 0.55rem;
		}
		.nav__num {
			font-size: 0.85rem;
		}
	}

	/* On medium-narrow widths (880–1100px) shrink the brand text so all 8 labels fit. */
	@media (max-width: 1100px) {
		.nav__brand-text {
			display: none;
		}
		.nav__link {
			padding: 0.45rem 0.55rem;
			font-size: 0.74rem;
		}
	}

	@media (max-width: 720px) {
		.nav__toggle {
			display: flex;
		}
		.nav__brand-text {
			font-size: 1.05rem;
		}
		.nav__list {
			position: fixed;
			top: var(--nav-height);
			left: 0;
			right: 0;
			background-color: var(--color-cream);
			border-bottom: 1px solid var(--color-line);
			padding: var(--space-sm) var(--space-md);
			flex-direction: column;
			align-items: stretch;
			gap: 0.25rem;
			max-height: 0;
			overflow: hidden;
			transition: max-height 0.35s var(--ease-natural), padding 0.35s var(--ease-natural);
			padding-top: 0;
			padding-bottom: 0;
			box-shadow: 0 8px 24px -16px rgba(44, 44, 44, 0.25);
		}

		.nav__list--open {
			max-height: 70vh;
			padding-top: var(--space-sm);
			padding-bottom: var(--space-sm);
		}

		.nav__link {
			padding: 0.85rem 1rem;
			border-radius: 8px;
			font-size: 0.95rem;
		}
		.nav__label {
			display: inline;
		}
		.nav__num {
			font-size: 0.78rem;
			min-width: 24px;
		}
	}
</style>
