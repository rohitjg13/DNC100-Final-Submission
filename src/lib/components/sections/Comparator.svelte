<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	// position 0 = real fully visible, AI hidden underneath.
	// position 100 = AI overlay fully covers real (AI grows from the LEFT).
	// User drags handle right to reveal more AI; left to peel it back.
	let position = $state<number>(50);
	let dragging = $state<boolean>(false);
	let containerEl: HTMLDivElement;

	type Annotation = {
		threshold: number;
		text: string;
		anchor: 'left' | 'right' | 'center';
		final?: boolean;
	};

	const annotations: Annotation[] = [
		{
			threshold: 25,
			text: 'A mudra used without emotional context. In Bharatanatyam, every hand gesture has a specific narrative meaning. The AI keeps the shape and drops the meaning.',
			anchor: 'right'
		},
		{
			threshold: 50,
			text: 'Costume elements stitched together from different regional traditions. The model cannot tell Bharatanatyam apart from Kathak or Odissi.',
			anchor: 'right'
		},
		{
			threshold: 75,
			text: 'An anatomically impossible position. No trained dancer holds this pose. The model is optimizing for visual appeal, not cultural accuracy.',
			anchor: 'right'
		},
		{
			threshold: 95,
			text: 'AI produces the signifier and discards the signified.',
			anchor: 'center',
			final: true
		}
	];

	function isActive(threshold: number) {
		// Threshold X = "AI is at least X% revealed". AI is on the left, revealed from 0 to position%.
		return position >= threshold;
	}

	function setFromClientX(clientX: number) {
		if (!containerEl) return;
		const rect = containerEl.getBoundingClientRect();
		const x = clientX - rect.left;
		position = Math.min(100, Math.max(0, (x / rect.width) * 100));
	}

	function onPointerDown(e: PointerEvent) {
		dragging = true;
		(e.target as HTMLElement).setPointerCapture?.(e.pointerId);
		// Prevent text selection caret flash and image drag ghost while sliding.
		e.preventDefault();
		// Clear any text selection that may have started before this drag.
		if (typeof window !== 'undefined') {
			window.getSelection?.()?.removeAllRanges();
		}
		document.body.classList.add('is-comparator-dragging');
		setFromClientX(e.clientX);
	}

	function onPointerMove(e: PointerEvent) {
		if (!dragging) return;
		e.preventDefault();
		setFromClientX(e.clientX);
	}

	function onPointerUp(e: PointerEvent) {
		dragging = false;
		(e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
		document.body.classList.remove('is-comparator-dragging');
	}

	function onKeyDown(e: KeyboardEvent) {
		const step = e.shiftKey ? 10 : 2;
		if (e.key === 'ArrowLeft') {
			position = Math.max(0, position - step);
			e.preventDefault();
		} else if (e.key === 'ArrowRight') {
			position = Math.min(100, position + step);
			e.preventDefault();
		} else if (e.key === 'Home') {
			position = 0;
			e.preventDefault();
		} else if (e.key === 'End') {
			position = 100;
			e.preventDefault();
		}
	}
</script>

<section id="comparator" class="comparator section section--alt">
	<div class="section__inner">
		<header class="comparator__header" use:reveal>
			<span class="section__eyebrow">Section 02 · A Visual Test</span>
			<h2 class="comparator__title">
				The <em>real</em> and the <em>simulated</em>
			</h2>
			<p class="section__lead">
				What you're looking at is a real Bharatanatyam photograph. Drag the handle to the right
				to overlay an AI generated "Indian classical dance" image on top of it. The further you
				reveal the AI, the more its borrowed vocabulary and structural inaccuracy come into view.
			</p>
		</header>

		<div class="comparator__stage" use:reveal>
			<div
				class="comparator__viewport"
				bind:this={containerEl}
				role="img"
				aria-label="AI vs real Bharatanatyam comparison. Drag to compare."
			>
				<!-- REAL panel (full width underneath); visible by default. The AI panel covers it from the left as the user drags right. -->
				<div class="panel panel--real">
					<img class="panel__art" src="/slider/real.png" alt="Bharatanatyam dancer mid-performance, photographed live" draggable="false" />

					<div class="panel__corner panel__corner--br">
						<span class="panel__label panel__label--real">Real · Photographed</span>
					</div>
				</div>

				<!-- AI panel covers the real from the left up to the handle's x position.
				     Right inset = (100 - position)%, so AI visible from 0% to position%.
				     Drag handle RIGHT to grow the AI overlay across the real photo. -->
				<div
					class="panel panel--ai"
					style:clip-path="inset(0 {100 - position}% 0 0)"
				>
					<img class="panel__art" src="/slider/ai.png" alt="AI rendering of a dancer labelled Indian classical dance" draggable="false" />

					<div class="panel__corner panel__corner--bl">
						<span class="panel__label panel__label--ai">AI · Generated</span>
					</div>
				</div>

				<!-- Slider handle -->
				<div
					class="comparator__handle"
					class:dragging
					style:left="{position}%"
					role="slider"
					aria-valuemin="0"
					aria-valuemax="100"
					aria-valuenow={Math.round(position)}
					aria-label="Reveal more of the AI-generated image"
					tabindex="0"
					onpointerdown={onPointerDown}
					onpointermove={onPointerMove}
					onpointerup={onPointerUp}
					onpointercancel={onPointerUp}
					onkeydown={onKeyDown}
				>
					<div class="comparator__handle-line"></div>
					<div class="comparator__handle-grip">
						<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
							<path d="M9 6 L 4 12 L 9 18" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M15 6 L 20 12 L 15 18" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</div>
					<div class="comparator__handle-line"></div>
				</div>

				<!-- Threshold markers, placed where the handle reaches each AI-reveal threshold heading right -->
				<div class="comparator__ticks" aria-hidden="true">
					<span class="comparator__tick" class:active={isActive(25)} style:left="25%"></span>
					<span class="comparator__tick" class:active={isActive(50)} style:left="50%"></span>
					<span class="comparator__tick" class:active={isActive(75)} style:left="75%"></span>
					<span class="comparator__tick" class:active={isActive(95)} style:left="95%"></span>
				</div>
			</div>

			<!-- Annotations panel -->
			<div class="comparator__annotations">
				{#each annotations as a, i (i)}
					<div
						class="annotation"
						class:annotation--active={isActive(a.threshold)}
						class:annotation--final={a.final}
					>
						<span class="annotation__threshold">
							{a.final ? 'Fully revealed' : `Past ${a.threshold}% drag`}
						</span>
						<p class="annotation__text">{a.text}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="comparator__caption" use:reveal>
			<span class="comparator__caption-mark">→</span>
			Drag the handle right to reveal the AI version.
		</div>
	</div>
</section>

<style>
	.comparator {
		background-color: var(--color-beige);
	}

	.comparator__header {
		max-width: 700px;
		margin: 0 auto 1.25rem;
		text-align: center;
	}

	.comparator__title em {
		color: var(--color-warm-brown);
		font-style: italic;
		font-weight: 500;
	}

	.comparator__header .section__lead {
		margin: 0.5rem auto 0;
		font-size: clamp(0.95rem, 1.3vw, 1.1rem);
	}

	.comparator__stage {
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
		gap: var(--space-md);
		align-items: stretch;
	}

	@media (max-width: 920px) {
		.comparator__stage {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}

	.comparator__viewport {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 5;
		max-height: min(64vh, 540px);
		justify-self: center;
		border-radius: 6px;
		overflow: hidden;
		background-color: var(--color-dark-charcoal);
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.4) inset,
			0 30px 60px -30px rgba(44, 44, 44, 0.45),
			0 14px 28px -14px rgba(44, 44, 44, 0.3);
		user-select: none;
		cursor: ew-resize;
		touch-action: pan-y;
	}

	.panel {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.panel__art {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		user-select: none;
		-webkit-user-drag: none;
	}

	.panel--ai {
		will-change: clip-path;
	}

	.panel__corner {
		position: absolute;
		bottom: 16px;
		padding: 6px 12px;
		border-radius: 999px;
		background-color: rgba(20, 14, 8, 0.7);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.92);
		font-weight: 500;
	}

	.panel__corner--bl {
		left: 16px;
	}

	.panel__corner--br {
		right: 16px;
	}

	.panel__label--real::before,
	.panel__label--ai::before {
		content: '';
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		margin-right: 8px;
		vertical-align: middle;
	}

	.panel__label--real::before {
		background-color: #f3c870;
	}

	.panel__label--ai::before {
		background-color: #e64a8a;
	}

	.comparator__handle {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 60px;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: ew-resize;
		touch-action: none;
		z-index: 4;
	}

	.comparator__handle:focus-visible {
		outline: none;
	}

	.comparator__handle:focus-visible .comparator__handle-grip {
		box-shadow: 0 0 0 3px var(--color-terracotta);
	}

	.comparator__handle-line {
		flex: 1;
		width: 2px;
		background-color: rgba(253, 250, 244, 0.95);
		box-shadow: 0 0 0 1px rgba(20, 14, 8, 0.25);
	}

	.comparator__handle-grip {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: var(--color-cream);
		color: var(--color-dark-charcoal);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow:
			0 2px 0 rgba(255, 255, 255, 0.6) inset,
			0 12px 28px -8px rgba(20, 14, 8, 0.55),
			0 0 0 1px rgba(20, 14, 8, 0.15);
		transition: transform 0.18s var(--ease-natural);
	}

	.comparator__handle.dragging .comparator__handle-grip {
		transform: scale(1.06);
	}

	.comparator__handle:hover .comparator__handle-grip {
		transform: scale(1.04);
	}

	.comparator__ticks {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 8px;
		height: 6px;
		pointer-events: none;
		z-index: 3;
	}

	.comparator__tick {
		position: absolute;
		top: 0;
		width: 2px;
		height: 6px;
		background-color: rgba(253, 250, 244, 0.45);
		transform: translateX(-50%);
		transition: background-color 0.4s var(--ease-natural), height 0.4s var(--ease-natural), top 0.4s var(--ease-natural);
	}

	.comparator__tick.active {
		background-color: var(--color-terracotta-light);
		height: 12px;
		top: -3px;
	}

	.comparator__annotations {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		position: relative;
		justify-content: center;
	}

	.annotation {
		padding: 0.75rem 0.9rem;
		border: 1px solid var(--color-line);
		border-left: 3px solid var(--color-line-strong);
		border-radius: 4px;
		background-color: var(--color-cream);
		opacity: 0.4;
		transform: translateX(-8px);
		transition:
			opacity 0.6s var(--ease-natural),
			transform 0.6s var(--ease-natural),
			border-color 0.6s var(--ease-natural),
			background-color 0.6s var(--ease-natural);
	}

	.annotation--active {
		opacity: 1;
		transform: translateX(0);
		border-left-color: var(--color-terracotta);
		background-color: var(--color-cream);
	}

	.annotation--final.annotation--active {
		background-color: var(--color-dark-charcoal);
		color: var(--color-cream);
		border-color: var(--color-dark-charcoal);
		border-left-color: var(--color-terracotta-light);
	}

	.annotation__threshold {
		display: block;
		font-size: 0.62rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--color-warm-brown);
		margin-bottom: 0.3rem;
	}

	.annotation--final.annotation--active .annotation__threshold {
		color: var(--color-terracotta-light);
	}

	.annotation__text {
		font-family: var(--font-serif);
		font-size: 0.92rem;
		line-height: 1.45;
		margin: 0;
		color: var(--color-charcoal-soft);
	}

	.annotation--active .annotation__text {
		color: var(--color-dark-charcoal);
	}

	.annotation--final.annotation--active .annotation__text {
		color: var(--color-cream);
		font-style: italic;
		font-size: 1.05rem;
		font-weight: 500;
	}

	.comparator__caption {
		text-align: center;
		margin-top: 1rem;
		font-size: 0.78rem;
		color: var(--color-charcoal-muted);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.comparator__caption-mark {
		font-family: var(--font-serif);
		font-size: 1.1rem;
		color: var(--color-warm-brown);
		margin-right: 0.4rem;
	}
</style>
