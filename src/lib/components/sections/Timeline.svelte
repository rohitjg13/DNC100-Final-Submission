<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';

	interface Stop {
		id: string;
		number: string;
		date: string;
		title: string;
		shortTitle: string;
		short: string;
		long: string;
		added: string[];
		erased: string[];
		motif: string;
	}

	const stops: Stop[] = [
		{
			id: 'devadasi',
			number: '01',
			date: 'Pre-colonial',
			shortTitle: 'Devadasi Tradition',
			title: 'The Original Custodians',
			short:
				'Devadasis were the sole practitioners of Sadir for centuries. Dance was ritual worship, emotionally alive, community owned.',
			long:
				'For centuries before the British arrived, devadasis were temple-dedicated women. Their dance, called Sadir at the time, was a form of ritual worship inside the social and economic life of South Indian temple towns. They held land. They taught the repertoire to the next generation. In their hands, rasa (the emotional flavor of the form) was inseparable from sensuality, devotion, and the community they belonged to.',
			added: ['Living tradition', 'Rasa transmission', 'Community ownership'],
			erased: ['Nothing yet. This is the baseline.'],
			motif: 'temple'
		},
		{
			id: 'colonial',
			number: '02',
			date: '1857 to 1920s',
			shortTitle: 'Colonial Period',
			title: 'The Criminalization',
			short:
				'British colonial law labeled devadasis as prostitutes. The Anti-Nautch movement banned their performances. Colonial morality destroyed the original patronage system.',
			long:
				'British administrators, trained in Victorian moralism, read the devadasi system through a lens of sexual deviance. The Anti-Nautch movement (active from the 1890s onward) campaigned to ban temple dance. Land reforms stripped devadasis of their endowments. By the early twentieth century, the women who had transmitted the form for generations had been criminalized into silence. The patronage system that sustained the dance collapsed.',
			added: ['Victorian moral framework', 'Colonial reform discourse'],
			erased: [
				'Devadasi livelihoods',
				'Original patronage',
				'Community legitimacy',
				'Inter-generational transmission'
			],
			motif: 'colonial'
		},
		{
			id: 'revival',
			number: '03',
			date: '1930s',
			shortTitle: 'Rukmini Devi Revival',
			title: 'The Sanitization',
			short:
				'Rukmini Devi Arundale founded Kalakshetra in 1936. She stripped the erotic and devotional devadasi elements and reframed the dance as spiritual and brahminical.',
			long:
				"Rukmini Devi Arundale, a brahmin theosophist, founded Kalakshetra in 1936 and renamed the form Bharatanatyam. She replaced devadasi practitioners with brahmin students, stripped repertoire considered too erotic, and re-anchored the dance to Sanskrit textual sources like the Natyashastra. The reform worked as cultural strategy. The dance became respectable for the new middle class. The people who had actually built it, the devadasis, were written out of its lineage in the same gesture.",
			added: [
				'Institutional structure',
				'Middle-class acceptability',
				'Sanskrit textual backing',
				'Standardized syllabus'
			],
			erased: [
				'Devadasi genealogy',
				'Sensuality and shringara',
				'Original community ownership',
				'Regional variation'
			],
			motif: 'revival'
		},
		{
			id: 'sna',
			number: '04',
			date: '1953 to 1959',
			shortTitle: 'SNA Recognition',
			title: 'The Nationalization',
			short:
				'The Sangeet Natak Akademi elevated Bharatanatyam alongside Kathak, Kathakali, and Manipuri into the official classical canon. The category itself became a political tool.',
			long:
				'The newly independent Indian state needed cultural symbols. The Sangeet Natak Akademi (founded 1953) consolidated a list of recognized "classical" dances: Bharatanatyam, Kathak, Kathakali, and Manipuri at first, with Kuchipudi, Odissi, and Sattriya added later. As Cherian shows in her reading of the SNA reports, the label was a political decision, not an aesthetic one. These forms had already been cleaned up by upper-caste reform and could be folded into a Hindu-coded national imaginary. Folk forms, regional variants, and non-brahmin lineages were filed under "folk" or simply not filed at all.',
			added: ['State legitimacy', 'National identity', 'Institutional funding', 'Canonical hierarchy'],
			erased: ['Regional variation', 'Folk forms', 'Non-brahminical practices', 'Plural genealogies'],
			motif: 'state'
		},
		{
			id: 'internet',
			number: '05',
			date: '1990s to 2010s',
			shortTitle: 'Internet Documentation',
			title: 'The Digitization',
			short:
				'Bharatanatyam became the most documented Indian classical form online. YouTube tutorials, academic papers, diaspora websites, almost all of it in English.',
			long:
				'When the internet became the index for Indian classical dance, the most institutionally established form (Bharatanatyam in its post-revival, brahminized version) also became the most documented. English-language tutorials, diaspora archives, university dance programs, YouTube performances. Forms with smaller institutional footprints, like Mohiniyattam, Sattriya, and regional folk traditions, were under-represented online. The internet did not invent the hierarchy. It inherited it and made it louder.',
			added: ['Global reach', 'Diaspora preservation', 'Digital archive', 'Searchability'],
			erased: ['Context', 'Nuance', 'Forms not as heavily documented', 'Embodied transmission'],
			motif: 'digital'
		},
		{
			id: 'ai',
			number: '06',
			date: '2015 to 2022',
			shortTitle: 'AI Training',
			title: 'The Inheritance',
			short:
				'AI image and video models trained on internet data absorbed the post-revival sanitized version of Bharatanatyam as their default template for Indian classical dance.',
			long:
				'Generative models absorbed whatever the internet had documented most. They learned that "Indian classical dance" looks like a brahminized post-revival Bharatanatyam: the version most photographed, most tagged, most uploaded. The models did not learn what was missing. They could not learn what was missing. Their statistical sense of the dance is the statistical sense of the documented internet, which is the documented institutional canon, which is the post-revival sanitized form.',
			added: ['Generative capability', 'Zero-barrier creation', 'Synthetic plausibility'],
			erased: ['Awareness of what was already erased', 'The negative space of the archive'],
			motif: 'ai'
		},
		{
			id: 'koyal',
			number: '07',
			date: '2025',
			shortTitle: 'KOYAL',
			title: 'The Copy of a Copy',
			short:
				"KOYAL generates Indian classical dance without naming a specific form. It draws from Bharatanatyam's visual vocabulary, the most documented form online, and produces aesthetics without rasa, grammar without meaning.",
			long:
				'KOYAL is not malicious. It does not know it is doing anything. It reaches into a latent space shaped by the internet (which was shaped by SNA recognition, which was shaped by Rukmini Devi\'s sanitization, which was made possible by colonial criminalization of the devadasis) and pulls out an image that reads as "Indian classical dance" because it averages the most-documented exemplars. The image circulates. Millions watch. The literacy problem accelerates.',
			added: ['Millions of views', 'Viral reach', 'Frictionless reproduction'],
			erased: [
				'Everything previous erasures already removed',
				'Now amplified at global scale',
				'And without anyone naming the chain'
			],
			motif: 'koyal'
		}
	];

	let activeIndex = $state<number | null>(null);
	let trackEl: HTMLDivElement;
	let scrollProgress = $state<number>(0);

	function open(i: number) {
		activeIndex = activeIndex === i ? null : i;
	}

	function scrollBy(dir: -1 | 1) {
		if (!trackEl) return;
		trackEl.scrollBy({ left: dir * 420, behavior: 'smooth' });
	}

	function onTrackScroll() {
		if (!trackEl) return;
		const max = trackEl.scrollWidth - trackEl.clientWidth;
		scrollProgress = max > 0 ? trackEl.scrollLeft / max : 0;
	}

	onMount(() => {
		onTrackScroll();
	});
</script>

<section id="timeline" class="timeline section">
	<div class="section__inner">
		<header class="timeline__header" use:reveal>
			<span class="section__eyebrow">Section 04 · Genealogy</span>
			<h2 class="timeline__title">What Did <em>AI</em> Learn?</h2>
			<p class="section__lead">
				A horizontal timeline. Seven moments. Each one adds something to what "Indian classical
				dance" means as a cultural object, and each one quietly erases something else. By the time
				AI starts learning from the internet, the negative space of this archive is already
				enormous.
			</p>
		</header>

		<div class="timeline__controls" use:reveal>
			<button
				type="button"
				class="timeline__arrow"
				aria-label="Scroll timeline left"
				onclick={() => scrollBy(-1)}
			>
				<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6">
					<path d="M15 6 L 9 12 L 15 18" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>

			<div class="timeline__progress" aria-hidden="true">
				<div class="timeline__progress-bar" style:width="{scrollProgress * 100}%"></div>
			</div>

			<button
				type="button"
				class="timeline__arrow"
				aria-label="Scroll timeline right"
				onclick={() => scrollBy(1)}
			>
				<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6">
					<path d="M9 6 L 15 12 L 9 18" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		</div>

		<div
			class="timeline__track"
			bind:this={trackEl}
			onscroll={onTrackScroll}
			role="region"
			aria-label="Horizontal genealogy of erasure"
		>
			<div class="timeline__rail" aria-hidden="true">
				<div class="timeline__rail-line"></div>
			</div>

			<ol class="timeline__stops">
				{#each stops as stop, i (stop.id)}
					<li class="stop" class:stop--active={activeIndex === i}>
						<button
							class="stop__node"
							type="button"
							onclick={() => open(i)}
							aria-expanded={activeIndex === i}
							aria-label="{stop.shortTitle}, {stop.date}. Toggle detail."
						>
							<span class="stop__node-ring"></span>
							<span class="stop__node-dot"></span>
						</button>

						<div class="stop__card">
							<div class="stop__card-meta">
								<span class="stop__num">{stop.number}</span>
								<span class="stop__date">{stop.date}</span>
							</div>
							<h3 class="stop__title">{stop.title}</h3>
							<p class="stop__short-title">{stop.shortTitle}</p>
							<p class="stop__short">{stop.short}</p>

							<div class="stop__tags">
								<div class="stop__tag stop__tag--added">
									<span class="stop__tag-label">Added</span>
									<ul>
										{#each stop.added as item}
											<li>{item}</li>
										{/each}
									</ul>
								</div>
								<div class="stop__tag stop__tag--erased">
									<span class="stop__tag-label">Erased</span>
									<ul>
										{#each stop.erased as item}
											<li>{item}</li>
										{/each}
									</ul>
								</div>
							</div>

							<button class="stop__expand" type="button" onclick={() => open(i)}>
								{activeIndex === i ? 'Close' : 'Read more'}
								<span class="stop__expand-arrow" class:rotated={activeIndex === i}>
									<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8">
										<path d="M6 9 L 12 15 L 18 9" stroke-linecap="round" stroke-linejoin="round" />
									</svg>
								</span>
							</button>

							{#if activeIndex === i}
								<div class="stop__expanded">
									<p>{stop.long}</p>
								</div>
							{/if}
						</div>
					</li>
				{/each}
			</ol>
		</div>

		<p class="timeline__hint" use:reveal>
			Click any node to expand. Scroll horizontally with drag, swipe, or the arrows.
		</p>
	</div>
</section>

<style>
	.timeline {
		background-color: var(--color-cream);
		overflow: hidden;
	}

	.timeline__header {
		max-width: 760px;
		margin: 0 0 1rem;
	}

	.timeline__title em {
		color: var(--color-warm-brown);
		font-style: italic;
		font-weight: 500;
	}

	.timeline__controls {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-bottom: 0.75rem;
		max-width: 600px;
	}

	.timeline__arrow {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 1px solid var(--color-line-strong);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-dark-charcoal);
		transition: background-color 0.25s var(--ease-natural), border-color 0.25s var(--ease-natural), color 0.25s var(--ease-natural);
		flex-shrink: 0;
	}

	.timeline__arrow:hover {
		background-color: var(--color-warm-brown);
		border-color: var(--color-warm-brown);
		color: var(--color-cream);
	}

	.timeline__progress {
		flex: 1;
		height: 2px;
		background-color: var(--color-line);
		position: relative;
		border-radius: 2px;
		overflow: hidden;
	}

	.timeline__progress-bar {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		background-color: var(--color-terracotta);
		transition: width 0.18s var(--ease-natural);
	}

	.timeline__track {
		position: relative;
		overflow-x: auto;
		overflow-y: visible;
		/* Left padding gives breathing room at the start; right padding is 0 so the last stop sits flush at end-of-scroll (no empty trailing space). */
		padding: 1rem 0 1rem var(--space-md);
		margin: 0 calc(-1 * var(--space-md));
		scroll-snap-type: x proximity;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.timeline__track::-webkit-scrollbar {
		display: none;
	}

	.timeline__rail {
		position: absolute;
		top: calc(1rem + 30px);
		left: var(--space-md);
		right: var(--space-md);
		pointer-events: none;
	}

	.timeline__rail-line {
		height: 1px;
		background:
			linear-gradient(
				to right,
				transparent 0%,
				var(--color-line-strong) 4%,
				var(--color-line-strong) 96%,
				transparent 100%
			);
	}

	.timeline__stops {
		--stop-w: 320px;
		display: flex;
		gap: var(--space-md);
		padding: 0;
		margin: 0;
		list-style: none;
		/* Explicit width = (stops × stop-width) + (gaps × gap-size).
		   `min-width: max-content` was over-reserving because each card's intrinsic
		   text max-content is wider than the visible 320px, leaving phantom space
		   past the last stop. */
		width: calc(7 * var(--stop-w) + 6 * var(--space-md));
		align-items: flex-start;
		position: relative;
	}

	.stop {
		flex: 0 0 320px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		scroll-snap-align: start;
		position: relative;
	}

	.stop__node {
		position: relative;
		width: 52px;
		height: 52px;
		margin: 0 0 0.85rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		align-self: flex-start;
	}

	.stop__node-ring {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 1px solid var(--color-line-strong);
		background-color: var(--color-cream);
		transition: border-color 0.3s var(--ease-natural), transform 0.3s var(--ease-natural);
	}

	.stop__node-dot {
		position: absolute;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background-color: var(--color-warm-brown);
		transition: background-color 0.3s var(--ease-natural), transform 0.3s var(--ease-natural);
	}

	.stop__node:hover .stop__node-ring,
	.stop--active .stop__node-ring {
		border-color: var(--color-terracotta);
		transform: scale(1.08);
	}

	.stop__node:hover .stop__node-dot,
	.stop--active .stop__node-dot {
		background-color: var(--color-terracotta);
		transform: scale(1.2);
	}

	.stop--active .stop__node-ring {
		box-shadow: 0 0 0 6px rgba(193, 127, 90, 0.18);
	}

	.stop__card {
		background-color: var(--color-cream);
		border: 1px solid var(--color-line);
		border-radius: 6px;
		padding: 1.5rem 1.4rem 1.25rem;
		transition: border-color 0.3s var(--ease-natural), box-shadow 0.3s var(--ease-natural), transform 0.3s var(--ease-natural);
		position: relative;
	}

	.stop--active .stop__card {
		border-color: var(--color-terracotta);
		box-shadow: 0 24px 40px -24px rgba(44, 44, 44, 0.18);
		transform: translateY(-2px);
	}

	.stop__card::before {
		content: '';
		position: absolute;
		top: -8px;
		left: 22px;
		width: 16px;
		height: 16px;
		background-color: var(--color-cream);
		border-top: 1px solid var(--color-line);
		border-left: 1px solid var(--color-line);
		transform: rotate(45deg);
		transition: border-color 0.3s var(--ease-natural);
	}

	.stop--active .stop__card::before {
		border-color: var(--color-terracotta);
	}

	.stop__card-meta {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		margin-bottom: 0.6rem;
	}

	.stop__num {
		font-family: var(--font-serif);
		font-size: 1.6rem;
		font-style: italic;
		font-weight: 500;
		color: var(--color-warm-brown);
		line-height: 1;
	}

	.stop__date {
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--color-charcoal-muted);
	}

	.stop__title {
		font-family: var(--font-serif);
		font-size: 1.4rem;
		font-weight: 600;
		line-height: 1.2;
		margin: 0 0 0.25rem;
		color: var(--color-dark-charcoal);
	}

	.stop__short-title {
		font-family: var(--font-serif);
		font-style: italic;
		font-size: 0.95rem;
		color: var(--color-warm-brown);
		margin: 0 0 0.85rem;
	}

	.stop__short {
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--color-charcoal-soft);
		margin: 0 0 1.1rem;
	}

	.stop__tags {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.stop__tag {
		padding: 0.7rem 0.75rem;
		border-radius: 4px;
		background-color: var(--color-beige);
	}

	.stop__tag--added {
		background-color: rgba(139, 105, 20, 0.08);
		border: 1px solid rgba(139, 105, 20, 0.18);
	}

	.stop__tag--erased {
		background-color: rgba(193, 127, 90, 0.1);
		border: 1px solid rgba(193, 127, 90, 0.22);
	}

	.stop__tag-label {
		font-size: 0.66rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		font-weight: 700;
		display: block;
		margin-bottom: 0.4rem;
	}

	.stop__tag--added .stop__tag-label {
		color: var(--color-warm-brown);
	}

	.stop__tag--erased .stop__tag-label {
		color: var(--color-terracotta-dark);
	}

	.stop__tag ul {
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 0.78rem;
		line-height: 1.4;
		color: var(--color-charcoal-soft);
	}

	.stop__tag li {
		position: relative;
		padding-left: 0.85rem;
		margin-bottom: 0.18rem;
	}

	.stop__tag li::before {
		content: '·';
		position: absolute;
		left: 0;
		font-weight: 700;
	}

	.stop__expand {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-warm-brown);
		padding: 0.4rem 0;
	}

	.stop__expand:hover {
		color: var(--color-terracotta-dark);
	}

	.stop__expand-arrow {
		display: inline-flex;
		transition: transform 0.3s var(--ease-natural);
	}

	.stop__expand-arrow.rotated {
		transform: rotate(180deg);
	}

	.stop__expanded {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px dashed var(--color-line);
		font-size: 0.92rem;
		line-height: 1.6;
		color: var(--color-charcoal-soft);
		animation: fade-in-up 0.4s var(--ease-soft);
	}

	.stop__expanded p {
		margin: 0;
	}

	.timeline__hint {
		text-align: center;
		font-size: 0.82rem;
		color: var(--color-charcoal-muted);
		letter-spacing: 0.08em;
		margin-top: var(--space-sm);
	}

	@media (max-width: 600px) {
		.stop {
			flex-basis: 290px;
		}
		.stop__title {
			font-size: 1.2rem;
		}
	}
</style>
