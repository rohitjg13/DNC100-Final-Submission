<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let revealed = $state<boolean>(false);
	let templeCount = $state<number>(0);
	let viewsCount = $state<number>(0);

	function showReveal() {
		if (revealed) return;
		revealed = true;
		// Start counters after the fade-in finishes
		setTimeout(startCounters, 350);
	}

	function startCounters() {
		const t0 = performance.now();
		const stepTemple = (t: number) => {
			const progress = Math.min(1, (t - t0) / 2500); // slow: 2.5s
			templeCount = progress;
			if (progress < 1) requestAnimationFrame(stepTemple);
			else templeCount = 1;
		};
		requestAnimationFrame(stepTemple);

		const v0 = performance.now();
		const stepViews = (t: number) => {
			const progress = Math.min(1, (t - v0) / 1400); // fast: 1.4s
			// Ease-out so the big number settles cleanly at the end
			const eased = 1 - Math.pow(1 - progress, 3);
			viewsCount = Math.floor(eased * 2_000_000);
			if (progress < 1) requestAnimationFrame(stepViews);
			else viewsCount = 2_000_000;
		};
		requestAnimationFrame(stepViews);
	}

	function scrollToTimeline() {
		document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function formatViews(n: number): string {
		return Math.floor(n).toLocaleString('en-US');
	}
</script>

<section id="medium" class="medium section">
	<div class="section__inner">
		<header class="medium__header" use:reveal>
			<span class="section__eyebrow">Section 03 · Bridge</span>
			<h2 class="medium__title">A New Medium, Not a New Problem</h2>
			<p class="section__lead">
				Every era found a way to represent dance without being dance.
			</p>
		</header>

		<div class="medium__cards">
			<article class="medium-card medium-card--stone reveal" use:reveal>
				<div class="medium-card__art medium-card__art--stone">
					<img
						class="medium-card__img"
						src="/medium/sculpture.png"
						alt="Stone carving from Thillai Nataraja Temple, Chidambaram, Tamil Nadu — Chola-period granite sculpture depicting a dance posture"
						draggable="false"
						loading="lazy"
					/>
				</div>
				<div class="medium-card__body">
					<span class="medium-card__era">12th–13th century</span>
					<h3 class="medium-card__heading">The Stone Carving</h3>
					<p class="medium-card__text">
						Carvings at temples like Thillai Nataraja in Chidambaram represented Sadir, the form
						later renamed Bharatanatyam, for centuries. The sculptor knew what they were carving.
						They lived inside the tradition. This granite carving sat in one temple for a
						thousand years.
					</p>
					<span class="medium-card__tag medium-card__tag--stone">Embedded knowledge</span>
				</div>
			</article>

			<article class="medium-card medium-card--sepia reveal reveal--delay-1" use:reveal>
				<div class="medium-card__art medium-card__art--sepia">
					<img
						class="medium-card__img medium-card__img--sepia"
						src="/medium/art.png"
						alt="Artwork depicting a Bharatanatyam dancer"
						draggable="false"
						loading="lazy"
					/>
				</div>
				<div class="medium-card__body">
					<span class="medium-card__era">Mid 20th century</span>
					<h3 class="medium-card__heading">The Photograph</h3>
					<p class="medium-card__text">
						Photography froze real performances into images. The photographer was in the room.
						Something was lost (rasa doesn't survive in celluloid), but the source was real.
					</p>
					<span class="medium-card__tag medium-card__tag--sepia">Documented reality</span>
				</div>
			</article>

			<article class="medium-card medium-card--digital reveal reveal--delay-2" use:reveal>
				<div class="medium-card__art medium-card__art--digital">
					<img
						class="medium-card__img medium-card__img--digital"
						src="/medium/prompt.png"
						alt="AI generated rendering of an Indian classical dancer"
						draggable="false"
						loading="lazy"
					/>
				</div>
				<div class="medium-card__body">
					<span class="medium-card__era">2025</span>
					<h3 class="medium-card__heading">The Prompt</h3>
					<p class="medium-card__text">
						Someone typed "Indian classical dance" and walked away. No cultural knowledge. No
						tradition. No accountability. Millions of views and no disclaimer.
					</p>
					<span class="medium-card__tag medium-card__tag--digital">Zero context</span>
				</div>
			</article>
		</div>

		<div class="medium__action">
			{#if !revealed}
				<button type="button" class="medium__reveal-btn" onclick={showReveal} use:reveal>
					<span>So what actually makes AI different?</span>
					<span class="medium__reveal-arrow" aria-hidden="true">↓</span>
				</button>
			{:else}
				<div class="medium__statement" role="region" aria-live="polite">
					<p>
						Not the medium. The sculptor knew what they were carving. The photographer was in the
						room. The person running the AI prompt was not. And the bronze sat in one temple for a
						thousand years. KOYAL has two million views and no disclaimer. That is not a new
						medium. That is a different problem wearing the same costume.
					</p>

					<div class="medium__stats">
						<div class="medium-stat medium-stat--temple">
							<div class="medium-stat__value">{Math.round(templeCount)}</div>
							<div class="medium-stat__label">temple</div>
							<div class="medium-stat__hint">Chola Bronze, 1,000+ years in one place</div>
						</div>
						<div class="medium-stat__divider" aria-hidden="true"></div>
						<div class="medium-stat medium-stat--views">
							<div class="medium-stat__value">{formatViews(viewsCount)}</div>
							<div class="medium-stat__label">views</div>
							<div class="medium-stat__hint">KOYAL, in a few weeks</div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<button type="button" class="medium__next" onclick={scrollToTimeline}>
			<span>Now, what did AI actually inherit?</span>
			<span class="medium__next-arrow" aria-hidden="true">↓</span>
		</button>
	</div>
</section>

<style>
	.medium {
		background-color: var(--color-cream);
	}

	.medium__header {
		max-width: 720px;
		margin: 0 0 1rem;
	}

	.medium__title {
		font-family: var(--font-serif);
		font-size: clamp(1.8rem, 3.4vw, 2.6rem);
		font-weight: 600;
		line-height: 1.15;
		margin: 0 0 0.4rem;
		color: var(--color-dark-charcoal);
	}

	.medium__cards {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-md);
		margin-bottom: 1.25rem;
	}

	@media (max-width: 900px) {
		.medium__cards {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}

	.medium-card {
		display: flex;
		flex-direction: column;
		background-color: var(--color-cream);
		border: 1px solid var(--color-line);
		border-radius: 6px;
		overflow: hidden;
		transition: transform 0.4s var(--ease-natural), box-shadow 0.4s var(--ease-natural), border-color 0.4s var(--ease-natural);
	}

	.medium-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 24px 40px -28px rgba(44, 44, 44, 0.25);
	}

	.medium-card--stone:hover {
		border-color: var(--color-warm-brown);
	}
	.medium-card--sepia:hover {
		border-color: rgba(110, 75, 35, 0.55);
	}
	.medium-card--digital:hover {
		border-color: rgba(80, 130, 180, 0.6);
	}

	.medium-card__art {
		position: relative;
		width: 100%;
		aspect-ratio: 5 / 6;
		overflow: hidden;
		background-color: var(--color-beige-dark);
	}

	.medium-card__img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
		object-position: center;
		user-select: none;
		-webkit-user-drag: none;
	}

	.medium-card__img--sepia {
		filter: sepia(0.55) contrast(1.05) saturate(0.9);
	}

	.medium-card__img--digital {
		filter: contrast(1.05) saturate(1.05);
	}

	.medium-card__body {
		padding: 0.85rem 1rem 1.05rem;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	.medium-card__era {
		font-size: 0.65rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--color-warm-brown);
	}

	.medium-card__heading {
		font-family: var(--font-serif);
		font-size: 1.25rem;
		font-weight: 600;
		line-height: 1.2;
		margin: 0;
		color: var(--color-dark-charcoal);
	}

	.medium-card__text {
		font-size: 0.85rem;
		line-height: 1.5;
		color: var(--color-charcoal-soft);
		margin: 0;
	}

	.medium-card__tag {
		display: inline-block;
		align-self: flex-start;
		margin-top: 0.2rem;
		padding: 0.3rem 0.7rem;
		font-size: 0.6rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		font-weight: 700;
		border-radius: 999px;
	}

	.medium-card__tag--stone {
		background-color: rgba(139, 105, 20, 0.12);
		color: var(--color-warm-brown);
		border: 1px solid rgba(139, 105, 20, 0.25);
	}

	.medium-card__tag--sepia {
		background-color: rgba(110, 75, 35, 0.12);
		color: #6e4b23;
		border: 1px solid rgba(110, 75, 35, 0.25);
	}

	.medium-card__tag--digital {
		background-color: rgba(80, 130, 180, 0.14);
		color: #2f5a85;
		border: 1px solid rgba(80, 130, 180, 0.3);
	}

	.medium__action {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.medium__reveal-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.85rem 1.6rem;
		font-family: var(--font-serif);
		font-style: italic;
		font-size: 1.1rem;
		font-weight: 500;
		color: var(--color-dark-charcoal);
		background-color: transparent;
		border: 1.5px solid var(--color-warm-brown);
		border-radius: 999px;
		transition: background-color 0.3s var(--ease-natural), color 0.3s var(--ease-natural), transform 0.3s var(--ease-natural);
	}

	.medium__reveal-btn:hover {
		background-color: var(--color-warm-brown);
		color: var(--color-cream);
		transform: translateY(-1px);
	}

	.medium__reveal-arrow {
		display: inline-flex;
		font-style: normal;
		font-size: 1rem;
		transition: transform 0.3s var(--ease-natural);
	}

	.medium__reveal-btn:hover .medium__reveal-arrow {
		transform: translateY(2px);
	}

	.medium__statement {
		max-width: 920px;
		margin: 0 auto;
		text-align: center;
		animation: fade-in-up 0.6s var(--ease-soft);
	}

	.medium__statement p {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 1.5vw, 1.2rem);
		line-height: 1.55;
		color: var(--color-dark-charcoal);
		margin: 0 0 1rem;
	}

	.medium__stats {
		display: flex;
		justify-content: center;
		align-items: stretch;
		gap: 1.5rem;
		padding: 1rem 0;
		flex-wrap: wrap;
	}

	.medium-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
		min-width: 180px;
	}

	.medium-stat__value {
		font-family: var(--font-serif);
		font-size: clamp(2.4rem, 5.5vw, 3.6rem);
		font-weight: 700;
		line-height: 1;
		color: var(--color-dark-charcoal);
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
	}

	.medium-stat--views .medium-stat__value {
		color: var(--color-terracotta-dark);
	}

	.medium-stat__label {
		font-size: 0.78rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--color-charcoal-muted);
	}

	.medium-stat__hint {
		font-size: 0.75rem;
		font-style: italic;
		color: var(--color-charcoal-muted);
		max-width: 26ch;
		text-align: center;
		margin-top: 0.2rem;
	}

	.medium-stat__divider {
		width: 1px;
		background-color: var(--color-line);
		align-self: stretch;
	}

	@media (max-width: 600px) {
		.medium-stat__divider {
			display: none;
		}
		.medium__stats {
			gap: 1rem;
		}
	}

	.medium__next {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin: 1rem auto 0;
		padding: 0.55rem 1.1rem;
		align-self: center;
		font-size: 0.78rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--color-charcoal-muted);
		background: none;
		border: none;
		transition: color 0.25s var(--ease-natural);
	}

	.medium__next:hover {
		color: var(--color-warm-brown);
	}

	.medium__next-arrow {
		display: inline-flex;
		font-size: 0.9rem;
		transition: transform 0.3s var(--ease-natural);
	}

	.medium__next:hover .medium__next-arrow {
		transform: translateY(2px);
	}
</style>
