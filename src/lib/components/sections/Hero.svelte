<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	function scrollToNext() {
		const next = document.getElementById('comparator');
		if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<section id="hero" class="hero">
	<!-- Decorative background -->
	<div class="hero__bg" aria-hidden="true">
		<div class="hero__grain"></div>
		<svg class="hero__ornament hero__ornament--tl" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
			<g fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.45">
				<circle cx="100" cy="100" r="90" />
				<circle cx="100" cy="100" r="68" />
				<circle cx="100" cy="100" r="46" />
				<path d="M100 10 L100 190 M10 100 L190 100" />
				<path d="M30 30 L170 170 M170 30 L30 170" stroke-dasharray="2 4" />
			</g>
		</svg>
		<svg class="hero__ornament hero__ornament--br" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
			<g fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.4">
				<path d="M100 20 C140 40, 160 80, 140 120 C120 160, 80 160, 60 120 C40 80, 60 40, 100 20 Z" />
				<path d="M100 40 C130 55, 145 85, 130 115 C115 145, 85 145, 70 115 C55 85, 70 55, 100 40 Z" />
				<circle cx="100" cy="100" r="6" />
			</g>
		</svg>
	</div>

	<div class="hero__inner">
		<div class="hero__eyebrow" use:reveal>
			<span class="hero__eyebrow-line"></span>
			<span>DNC100 Final Project · By Rohit</span>
			<span class="hero__eyebrow-line"></span>
		</div>

		<h1 class="hero__title">
			<span class="hero__title-word reveal" use:reveal>Sculpted</span>
			<span class="hero__title-word hero__title-word--italic reveal reveal--delay-1" use:reveal>in</span>
			<span class="hero__title-word reveal reveal--delay-2" use:reveal>Pixels</span>
		</h1>

		<p class="hero__subtitle reveal reveal--delay-3" use:reveal>
			AI, Bharatanatyam, and the Democracy of Misrepresentation
		</p>

		<div class="hero__divider reveal reveal--delay-3" use:reveal>
			<span class="hero__divider-mark">∞</span>
		</div>

		<p class="hero__thesis reveal reveal--delay-4" use:reveal>
			When AI generates Indian classical dance, it copies the movement.
			<em>It also copies a century of political erasure</em>
			that decided what the movement looks like in the first place.
		</p>

		<button type="button" class="hero__scroll" onclick={scrollToNext} aria-label="Scroll to next section">
			<span class="hero__scroll-text">Begin reading</span>
			<span class="hero__scroll-arrow" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M12 4v16M5 13l7 7 7-7" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</span>
		</button>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: calc(var(--nav-height) + var(--space-sm)) var(--space-md) var(--space-md);
		box-sizing: border-box;
		overflow: hidden;
		background:
			radial-gradient(ellipse at 30% 20%, rgba(193, 127, 90, 0.12), transparent 55%),
			radial-gradient(ellipse at 75% 80%, rgba(139, 105, 20, 0.1), transparent 55%),
			linear-gradient(170deg, var(--color-cream) 0%, var(--color-beige) 100%);
	}

	.hero__bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
		color: var(--color-warm-brown);
	}

	.hero__grain {
		position: absolute;
		inset: 0;
		background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.2 0 0 0 0 0.18 0 0 0 0 0.12 0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
		opacity: 0.45;
		mix-blend-mode: multiply;
	}

	.hero__ornament {
		position: absolute;
		width: 280px;
		height: 280px;
		opacity: 0.6;
	}

	.hero__ornament--tl {
		top: -80px;
		left: -80px;
		animation: float 14s ease-in-out infinite;
	}

	.hero__ornament--br {
		bottom: -80px;
		right: -80px;
		animation: float 18s ease-in-out infinite reverse;
	}

	.hero__inner {
		position: relative;
		max-width: 880px;
		text-align: center;
		z-index: 1;
	}

	.hero__eyebrow {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: 0.74rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--color-warm-brown);
		font-weight: 500;
		margin-bottom: 1rem;
	}

	.hero__eyebrow-line {
		width: 36px;
		height: 1px;
		background-color: var(--color-warm-brown);
		opacity: 0.55;
	}

	.hero__title {
		font-size: clamp(3rem, 9vw, 7rem);
		font-weight: 700;
		line-height: 0.98;
		letter-spacing: -0.035em;
		margin: 0 0 0.85rem;
		color: var(--color-dark-charcoal);
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.25em;
	}

	.hero__title-word {
		display: inline-block;
	}

	.hero__title-word--italic {
		font-style: italic;
		font-weight: 400;
		color: var(--color-warm-brown);
	}

	.hero__subtitle {
		font-family: var(--font-serif);
		font-size: clamp(1.1rem, 2vw, 1.55rem);
		font-style: italic;
		font-weight: 400;
		color: var(--color-charcoal-soft);
		max-width: 32ch;
		margin: 0 auto 0.75rem;
		line-height: 1.4;
	}

	.hero__divider {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		margin: 0.85rem 0;
	}

	.hero__divider::before,
	.hero__divider::after {
		content: '';
		display: block;
		width: 60px;
		height: 1px;
		background-color: var(--color-line-strong);
	}

	.hero__divider-mark {
		font-family: var(--font-serif);
		font-size: 1.6rem;
		font-style: italic;
		color: var(--color-warm-brown);
	}

	.hero__thesis {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 1.5vw, 1.2rem);
		line-height: 1.5;
		color: var(--color-charcoal-soft);
		max-width: 50ch;
		margin: 0 auto 1.25rem;
	}

	.hero__thesis em {
		color: var(--color-terracotta-dark);
		font-style: italic;
		font-weight: 500;
	}

	.hero__scroll {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
		padding: 0.5rem 1rem;
		color: var(--color-charcoal-muted);
		font-size: 0.78rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		font-weight: 500;
		transition: color 0.3s var(--ease-natural);
	}

	.hero__scroll:hover {
		color: var(--color-warm-brown);
	}

	.hero__scroll-arrow {
		display: flex;
		animation: bounce 2.4s ease-in-out infinite;
	}

	@keyframes bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(6px); }
	}

	@media (max-width: 600px) {
		.hero__ornament {
			width: 180px;
			height: 180px;
		}
		.hero__divider::before,
		.hero__divider::after {
			width: 36px;
		}
	}
</style>
