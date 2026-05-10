<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	interface Reading {
		id: string;
		title: string;
		author: string;
		year: string;
		preview: string; // The short hook
		full: string; // One-paragraph summary
		connection: string; // How it connects to AI argument
		angle: number; // degrees around center
		distance: number; // 0..1 of available radius
	}

	const center = {
		title: 'AI crystallizes the erasure that already happened',
		hint: 'Click any reading'
	};

	const readings: Reading[] = [
		{
			id: 'coorlawala-2004',
			title: 'The Sanskritized Body',
			author: 'Uttara Asha Coorlawala',
			year: '2004',
			preview:
				'Reformers sanitized Sadir into a brahminical Bharatanatyam. AI inherits that exact version as its default for "Indian classical dance."',
			full:
				"Coorlawala traces how Rukmini Devi Arundale and the wider revival movement restructured Sadir into Bharatanatyam by removing hip deflections and torso sensuality, fixing the spine, standardizing technique and costume, and tying authority to Sanskrit textual sources rather than hereditary practitioners. Kalakshetra became the prototype. Brahminical values became the benchmark for aesthetic legitimacy. Sanskritization was both cultural elevation and exclusion.",
			connection:
				'AI image generators trained on internet data inherit this Sanskritized version as their default. They do not generate "Indian classical dance" in the abstract. They generate the post-revival, brahminized symbol that already won the canon war.',
			angle: 200,
			distance: 1
		},
		{
			id: 'chakravorty-2009',
			title: 'Moved to Dance: Remix, Rasa, and a New India',
			author: 'Pallabi Chakravorty',
			year: '2009',
			preview:
				'Rasa lives in embodied guru-shishya transmission. AI can produce the visual, but rasa is structurally impossible without that chain.',
			full:
				"Chakravorty argues that the bhava-rasa structure of feeling that grounded classical Indian dance was carried by embodied practice and the guru-student tradition. Under economic liberalization and Bollywood remix culture, that habitus loosens. The guru is replaced by the DJ. Riyaz gives way to imitating television. The dancing body becomes a floating image styled for consumption rather than a site of rooted cultural emotion.",
			connection:
				'AI can produce the visual signifiers of a dance frame perfectly. It cannot produce rasa, because rasa needs the guru-shishya chain it does not and cannot have. The output is therefore structurally hollow, however convincing the surface looks.',
			angle: 270,
			distance: 1
		},
		{
			id: 'banerji-2022',
			title: 'The Award-Wapsi Controversy',
			author: 'Anurima Banerji',
			year: '2022',
			preview:
				'Classical dance is structured around obedience and deference. The dancers most qualified to critique AI misrepresentation cannot safely speak up.',
			full:
				"Banerji documents the 2015 Award-Wapsi protest, in which writers and artists returned state honors over targeted violence. No classical dancers returned awards. Several joined the counter-protest supporting the government. Banerji argues this silence was not accidental: the form is built on obedience, elite Hindu tradition, and deference to authority, with state-funded festivals and discretionary grants making conformity the path of least resistance.",
			connection:
				'The dancers most equipped to identify AI misrepresentation cannot safely speak up. Their gurus are uncomfortable with controversy. Their festivals are state-funded. Their grants are discretionary. The silence that lets AI inaccuracy circulate is structural, not accidental.',
			angle: 340,
			distance: 1
		},
		{
			id: 'cherian-2009',
			title: 'Institutional Maneuvers, Nationalizing Performance',
			author: 'Anita Cherian',
			year: '2009',
			preview:
				'The classical canon was a political decision, not an aesthetic one. AI enters that contested space with no accountability.',
			full:
				'Reading the Sangeet Natak Akademi reports of 1953 to 1959, Cherian shows that the post-independence state used cultural policy as a centralizing tool. The "classical" label applied to Bharatanatyam, Kathak, Kathakali, and Manipuri was a political decision: these forms were already cleaned up by upper-caste reform and could be folded into a Hindu-coded national imaginary. Folk forms became ethnographic display, never self-determined practice.',
			connection:
				'AI enters this politically charged terrain trained on the canonical (and therefore hegemonic) version. There is no accountability mechanism, no community of practitioners to answer to, and no incentive structure that rewards accuracy over plausibility.',
			angle: 60,
			distance: 1
		},
		{
			id: 'banerji-2016',
			title: 'The Queer Politics of the Raj',
			author: 'Anurima Banerji',
			year: '2016',
			preview:
				'Colonial law manufactured the devadasi as a criminal. AI learned from the version that survived that erasure, not from the women who built it.',
			full:
				'Banerji shows how the Criminal Tribes Act of 1871, the Contagious Diseases Act of 1864, and Section 377 of the Indian Penal Code combined hijras, dancers, devadasis, and same-sex relations into a single category of colonial "queerness." Before the Raj, these practices were locally accommodated. After the laws, they were criminal. The devadasi tradition was not lost. It was made illegal, then written out of its own lineage.',
			connection:
				'Internet-scale documentation of Indian classical dance starts long after this colonial dispossession. AI training data therefore has a devadasi-shaped hole. The dance the model "knows" is the version that survived the criminalization, not the one the devadasis built.',
			angle: 130,
			distance: 1
		}
	];

	let activeId = $state<string | null>(null);
	let hoverId = $state<string | null>(null);

	const VB_W = 1000;
	const VB_H = 720;
	const cx = VB_W / 2;
	const cy = VB_H / 2;
	const radius = 280;

	function nodePos(r: Reading) {
		const rad = (r.angle * Math.PI) / 180;
		const dist = radius * r.distance;
		return {
			x: cx + Math.cos(rad) * dist,
			y: cy + Math.sin(rad) * dist
		};
	}

	function toggle(id: string) {
		activeId = activeId === id ? null : id;
	}

	const active = $derived(readings.find((r) => r.id === activeId) ?? null);
</script>

<section id="constellation" class="constellation section">
	<div class="section__inner">
		<header class="constellation__header" use:reveal>
			<span class="section__eyebrow">Section 06 · The Readings</span>
			<h2 class="constellation__title">A <em>Constellation</em> of Arguments</h2>
			<p class="section__lead">
				Five readings. One claim at the center. The lines between them animate the argument.
				Erasure was already structural. AI just gave it global reach.
			</p>
		</header>

		<div class="constellation__stage" use:reveal>
			<svg
				class="constellation__svg"
				viewBox="0 0 {VB_W} {VB_H}"
				xmlns="http://www.w3.org/2000/svg"
				role="presentation"
			>
				<defs>
					<radialGradient id="centerGlow" cx="0.5" cy="0.5" r="0.5">
						<stop offset="0%" stop-color="rgba(193, 127, 90, 0.35)" />
						<stop offset="100%" stop-color="rgba(193, 127, 90, 0)" />
					</radialGradient>
					<filter id="nodeShadow">
						<feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.18" />
					</filter>
				</defs>

				<!-- Decorative orbital rings -->
				<g fill="none" stroke="var(--color-line)" opacity="0.55">
					<circle cx={cx} cy={cy} r="120" stroke-dasharray="2 6" />
					<circle cx={cx} cy={cy} r="200" stroke-dasharray="2 6" />
					<circle cx={cx} cy={cy} r={radius} stroke-dasharray="2 6" />
				</g>

				<!-- Center glow -->
				<circle cx={cx} cy={cy} r="170" fill="url(#centerGlow)" />

				<!-- Lines from center to each node -->
				{#each readings as r (r.id)}
					{@const p = nodePos(r)}
					<line
						x1={cx}
						y1={cy}
						x2={p.x}
						y2={p.y}
						stroke="var(--color-warm-brown)"
						stroke-width={activeId === r.id || hoverId === r.id ? 1.6 : 1}
						stroke-dasharray="4 6"
						opacity={activeId === r.id || hoverId === r.id ? 0.85 : 0.45}
						class="constellation__line"
						style="animation-delay: {(readings.indexOf(r) * 0.4).toFixed(2)}s"
					/>
				{/each}

				<!-- Connections between adjacent reading nodes (subtle) -->
				{#each readings as r, i (r.id)}
					{@const next = readings[(i + 1) % readings.length]}
					{@const p1 = nodePos(r)}
					{@const p2 = nodePos(next)}
					<path
						d="M {p1.x} {p1.y} Q {cx} {cy} {p2.x} {p2.y}"
						fill="none"
						stroke="var(--color-warm-brown)"
						stroke-width="0.6"
						opacity="0.18"
					/>
				{/each}

				<!-- Center node -->
				<g filter="url(#nodeShadow)">
					<circle cx={cx} cy={cy} r="98" fill="var(--color-dark-charcoal)" />
					<circle
						cx={cx}
						cy={cy}
						r="98"
						fill="none"
						stroke="var(--color-terracotta)"
						stroke-width="1"
					/>
				</g>
				<foreignObject x={cx - 90} y={cy - 70} width="180" height="140">
					<div class="constellation__center">
						<div class="constellation__center-mark">∞</div>
						<div class="constellation__center-text">{center.title}</div>
					</div>
				</foreignObject>

				<!-- Reading nodes: outer g handles positioning + interaction; inner g handles animation only -->
				{#each readings as r, i (r.id)}
					{@const p = nodePos(r)}
					{@const isActive = activeId === r.id}
					{@const isHovered = hoverId === r.id}
					{@const tooltipAbove = p.y > cy}
					<g
						class="constellation__node-anchor"
						class:active={isActive}
						transform="translate({p.x} {p.y})"
						role="button"
						tabindex="0"
						aria-label="Reading: {r.title} by {r.author}"
						onclick={() => toggle(r.id)}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								toggle(r.id);
							}
						}}
						onmouseenter={() => (hoverId = r.id)}
						onmouseleave={() => (hoverId = null)}
						onfocus={() => (hoverId = r.id)}
						onblur={() => (hoverId = null)}
					>
						<!-- Invisible hit-area covering both circle and tooltip; keeps hover stable -->
						<rect
							x="-130"
							y={tooltipAbove ? -170 : -75}
							width="260"
							height="245"
							fill="transparent"
							pointer-events="all"
						/>

						<g
							class="constellation__node-group"
							style="animation-delay: {(i * 0.6).toFixed(2)}s"
						>
							<circle r="58" fill="var(--color-cream)" stroke="var(--color-warm-brown)" stroke-width="1" filter="url(#nodeShadow)" />
							<circle
								r="58"
								fill="none"
								stroke="var(--color-terracotta)"
								stroke-width="2"
								opacity={isActive || isHovered ? 1 : 0}
								style="transition: opacity 0.3s var(--ease-natural);"
							/>
							<foreignObject x="-52" y="-46" width="104" height="92">
								<div class="constellation__node-content">
									<div class="constellation__node-year">{r.year}</div>
									<div class="constellation__node-author">{r.author}</div>
								</div>
							</foreignObject>
						</g>
					</g>
				{/each}

				<!-- Single shared tooltip rendered outside the per-node loop.
				     Avoids stale-content flicker that happens when each node renders its own
				     conditional foreignObject and Svelte momentarily reuses prior data. -->
				{#if hoverId && hoverId !== activeId}
					{@const r = readings.find((x) => x.id === hoverId)}
					{#if r}
						{@const p = nodePos(r)}
						{@const tooltipAbove = p.y > cy}
						<foreignObject
							x={p.x - 130}
							y={tooltipAbove ? p.y - 160 : p.y + 75}
							width="260"
							height="100"
							pointer-events="none"
						>
							<div class="constellation__tooltip">
								<div class="constellation__tooltip-title">{r.title}</div>
								<div class="constellation__tooltip-preview">{r.preview}</div>
							</div>
						</foreignObject>
					{/if}
				{/if}
			</svg>

			<div class="constellation__hint">
				<span>↻</span> Hover for preview · Click to expand
			</div>
		</div>

		{#if active}
			<div class="reading-card" role="region" aria-live="polite">
				<button class="reading-card__close" type="button" onclick={() => (activeId = null)} aria-label="Close reading card">×</button>
				<span class="reading-card__year">{active.year}</span>
				<h3 class="reading-card__title">{active.title}</h3>
				<p class="reading-card__author">{active.author}</p>
				<div class="reading-card__divider"></div>

				<div class="reading-card__grid">
					<div>
						<span class="reading-card__label">Summary</span>
						<p class="reading-card__body">{active.full}</p>
					</div>
					<div>
						<span class="reading-card__label">Connection to the AI argument</span>
						<p class="reading-card__body reading-card__body--accent">{active.connection}</p>
					</div>
				</div>

				<blockquote class="reading-card__pull">"{active.preview}"</blockquote>
			</div>
		{/if}
	</div>
</section>

<style>
	.constellation {
		background-color: var(--color-cream);
		overflow: hidden;
	}

	.constellation__header {
		max-width: 640px;
		margin: 0 auto 0.5rem;
		text-align: center;
	}

	.constellation__title em {
		color: var(--color-warm-brown);
		font-style: italic;
		font-weight: 500;
	}

	.constellation__header .section__lead {
		margin-left: auto;
		margin-right: auto;
		font-size: clamp(0.92rem, 1.2vw, 1.05rem);
	}

	.constellation__stage {
		position: relative;
		max-width: min(900px, 78vh);
		margin: 0 auto 0.5rem;
	}

	.constellation__svg {
		width: 100%;
		height: auto;
		display: block;
	}

	.constellation__line {
		animation: pulse-line 4s ease-in-out infinite;
	}

	.constellation__center {
		width: 180px;
		height: 140px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: var(--color-cream);
		padding: 0 0.5rem;
	}

	.constellation__center-mark {
		font-family: var(--font-serif);
		font-style: italic;
		font-size: 2rem;
		color: var(--color-terracotta);
		line-height: 1;
		margin-bottom: 0.4rem;
	}

	.constellation__center-text {
		font-family: var(--font-serif);
		font-size: 0.92rem;
		font-style: italic;
		font-weight: 500;
		line-height: 1.3;
	}

	.constellation__node-anchor {
		cursor: pointer;
	}

	.constellation__node-anchor:focus {
		outline: none;
	}

	.constellation__node-anchor:focus-visible .constellation__node-group circle:first-of-type {
		stroke: var(--color-terracotta);
		stroke-width: 2;
	}

	.constellation__node-group {
		animation: node-float 6s ease-in-out infinite;
		transform-box: fill-box;
		transform-origin: center;
	}

	.constellation__node-anchor:hover .constellation__node-group,
	.constellation__node-anchor.active .constellation__node-group {
		animation-play-state: paused;
	}

	@keyframes node-float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-6px);
		}
	}

	.constellation__node-content {
		width: 104px;
		height: 92px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 0 0.5rem;
		pointer-events: none;
	}

	.constellation__node-year {
		font-family: var(--font-serif);
		font-style: italic;
		font-size: 1.2rem;
		font-weight: 500;
		color: var(--color-warm-brown);
		line-height: 1;
		margin-bottom: 0.25rem;
	}

	.constellation__node-author {
		font-size: 0.74rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: var(--color-dark-charcoal);
		line-height: 1.2;
	}

	.constellation__tooltip {
		background-color: var(--color-dark-charcoal);
		color: var(--color-cream);
		padding: 0.85rem 1rem;
		border-radius: 6px;
		box-shadow: 0 12px 24px -12px rgba(20, 14, 8, 0.4);
		text-align: left;
		pointer-events: none;
		animation: fade-in-up 0.2s var(--ease-soft);
	}

	.constellation__tooltip-title {
		font-family: var(--font-serif);
		font-size: 0.92rem;
		font-style: italic;
		color: var(--color-terracotta-light);
		margin-bottom: 0.3rem;
	}

	.constellation__tooltip-preview {
		font-size: 0.78rem;
		line-height: 1.4;
		color: var(--color-cream);
		opacity: 0.85;
	}

	.constellation__hint {
		text-align: center;
		font-size: 0.78rem;
		color: var(--color-charcoal-muted);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 500;
	}

	.constellation__hint span {
		color: var(--color-warm-brown);
		font-weight: 600;
	}

	.reading-card {
		max-width: 760px;
		margin: var(--space-md) auto 0;
		padding: var(--space-md) var(--space-md) var(--space-lg);
		background-color: var(--color-beige);
		border: 1px solid var(--color-line);
		border-left: 4px solid var(--color-terracotta);
		border-radius: 6px;
		position: relative;
		animation: fade-in-up 0.4s var(--ease-soft);
	}

	.reading-card__close {
		position: absolute;
		top: 14px;
		right: 18px;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
		color: var(--color-charcoal-muted);
		transition: background-color 0.2s var(--ease-natural), color 0.2s var(--ease-natural);
	}

	.reading-card__close:hover {
		background-color: var(--color-cream);
		color: var(--color-dark-charcoal);
	}

	.reading-card__year {
		font-size: 0.72rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--color-warm-brown);
		margin-bottom: 0.5rem;
		display: inline-block;
	}

	.reading-card__title {
		font-family: var(--font-serif);
		font-size: 1.85rem;
		font-weight: 600;
		line-height: 1.15;
		margin: 0 0 0.3rem;
		color: var(--color-dark-charcoal);
	}

	.reading-card__author {
		font-family: var(--font-serif);
		font-style: italic;
		font-size: 1rem;
		color: var(--color-charcoal-soft);
		margin: 0 0 var(--space-sm);
	}

	.reading-card__divider {
		width: 60px;
		height: 1px;
		background-color: var(--color-warm-brown);
		margin: 0 0 var(--space-sm);
	}

	.reading-card__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-md);
		margin-bottom: var(--space-md);
	}

	@media (max-width: 720px) {
		.reading-card__grid {
			grid-template-columns: 1fr;
			gap: var(--space-sm);
		}
	}

	.reading-card__label {
		display: block;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-warm-brown);
		margin-bottom: 0.6rem;
	}

	.reading-card__body {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--color-charcoal-soft);
		margin: 0;
	}

	.reading-card__body--accent {
		font-family: var(--font-serif);
		font-style: italic;
		color: var(--color-dark-charcoal);
	}

	.reading-card__pull {
		margin: 0;
		padding: var(--space-sm) var(--space-md);
		border-left: 2px solid var(--color-warm-brown);
		font-family: var(--font-serif);
		font-size: 1.15rem;
		font-style: italic;
		line-height: 1.5;
		color: var(--color-dark-charcoal);
	}

	@media (max-width: 600px) {
		.constellation__center-text {
			font-size: 0.78rem;
		}
		.constellation__node-author {
			font-size: 0.65rem;
		}
		.constellation__node-year {
			font-size: 1rem;
		}
	}
</style>
