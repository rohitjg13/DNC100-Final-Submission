<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	type Path = 'speak' | 'silent';
	type StepKind = 'choice' | 'consequence' | 'final';

	interface Step {
		kind: StepKind;
		title?: string;
		body?: string;
		consequence?: string;
		final?: string;
	}

	const speakSteps: Step[] = [
		{
			kind: 'choice',
			title: 'You post on Instagram calling out KOYAL\'s cultural inaccuracies.',
			consequence: 'Your guru sees it. They are uncomfortable with the political attention.'
		},
		{
			kind: 'choice',
			title: 'You give an interview to a dance journal.',
			consequence:
				'The Sangeet Natak Akademi removes you from the upcoming national festival roster.'
		},
		{
			kind: 'choice',
			title: 'You write an academic paper.',
			consequence: 'Your funding application is rejected. No reason given.'
		},
		{
			kind: 'final',
			final:
				'Your career is severely damaged. Your critique reaches 200 people. KOYAL has thousands of views. The literacy problem continues.'
		}
	];

	const silentFinal =
		'Your career continues. You perform at national festivals. You receive your grant. KOYAL reaches thousands of views. The literacy problem continues.';

	let path = $state<Path | null>(null);
	let speakStep = $state<number>(0); // 0..3 (3 = final)
	let acted = $state<boolean>(false); // committed to whichever path
	let timeouts: ReturnType<typeof setTimeout>[] = [];

	function choose(p: Path) {
		path = p;
		speakStep = 0;
		acted = true;

		if (p === 'speak') {
			timeouts.push(setTimeout(() => { speakStep = 1; }, 1400));
			timeouts.push(setTimeout(() => { speakStep = 2; }, 2800));
			timeouts.push(setTimeout(() => { speakStep = speakSteps.length - 1; }, 4400));
		}
	}

	function reset() {
		timeouts.forEach(clearTimeout);
		timeouts = [];
		path = null;
		speakStep = 0;
		acted = false;
	}

	const isFinal = $derived(
		path === 'silent' || (path === 'speak' && speakStep === speakSteps.length - 1)
	);

	const finalLine = $derived(
		path === 'silent'
			? silentFinal
			: path === 'speak'
				? speakSteps[speakSteps.length - 1].final ?? ''
				: ''
	);
</script>

<section id="silence" class="silence section section--alt">
	<div class="section__inner">
		<header class="silence__header" use:reveal>
			<span class="section__eyebrow">Section 07 · The Silence</span>
			<h2 class="silence__title">The Silence is <em>Not Accidental</em></h2>
			<p class="section__lead">
				Based on Banerji 2022. Explore why the people most qualified to critique AI
				misrepresentation cannot safely speak up.
			</p>
		</header>

		<div class="silence__stage" use:reveal>
			<!-- Dancer figure: photograph with a silence-bar overlay -->
			<div class="silence__figure">
				<img
					class="silence__figure-img"
					src="/silence/dancer.png"
					alt="Bharatanatyam dancer in a poised, grounded stance"
					draggable="false"
					loading="lazy"
				/>
				<span class="silence__figure-mute" aria-hidden="true"></span>
			</div>

			<div class="silence__prompt">
				<p class="silence__prompt-text">
					You are a trained Bharatanatyam dancer. You have seen KOYAL. You know it is culturally
					inaccurate. <strong>What do you do?</strong>
				</p>

				{#if !acted}
					<div class="silence__choice">
						<button type="button" class="big-btn big-btn--speak" onclick={() => choose('speak')}>
							<span class="big-btn__num">A</span>
							<span class="big-btn__label">Speak Out</span>
							<span class="big-btn__hint">Post, interview, publish</span>
						</button>
						<button type="button" class="big-btn big-btn--silent" onclick={() => choose('silent')}>
							<span class="big-btn__num">B</span>
							<span class="big-btn__label">Stay Silent</span>
							<span class="big-btn__hint">Keep your career intact</span>
						</button>
					</div>
				{/if}
			</div>
		</div>

		{#if path === 'speak' && !isFinal}
			<div class="path-flow" role="region" aria-label="Speak out path progression">
				<div class="path-flow__rail" aria-hidden="true"></div>

				{#each speakSteps as step, i (i)}
					{#if step.kind === 'choice' && i <= speakStep}
						<div class="path-step">
							<div class="path-step__num">Step {i + 1}</div>
							<h4 class="path-step__title">{step.title}</h4>
							<div class="path-step__consequence">
								<span class="path-step__consequence-label">Consequence</span>
								<p>{step.consequence}</p>
							</div>
						</div>
					{/if}
				{/each}

				{#if speakStep < speakSteps.length - 1}
					<div class="path-pending" aria-label="Next consequence loading">
						<span></span><span></span><span></span>
					</div>
				{/if}
			</div>
		{/if}

		{#if isFinal}
			<div class="silence-final" role="region" aria-live="polite">
				<div class="silence-final__path-label">
					{path === 'silent' ? 'You chose to stay silent' : 'You chose to speak out'}
				</div>

				{#if path === 'speak'}
					<div class="silence-final__recap">
						{#each speakSteps.slice(0, -1) as step, i (i)}
							<div class="silence-final__recap-row">
								<span class="silence-final__recap-num">{i + 1}</span>
								<div>
									<p class="silence-final__recap-title">{step.title}</p>
									<p class="silence-final__recap-consequence">{step.consequence}</p>
								</div>
							</div>
						{/each}
					</div>
				{/if}

				<div class="silence-final__outcome">
					<span class="silence-final__outcome-label">Outcome</span>
					<p class="silence-final__outcome-text">{finalLine}</p>
				</div>

				<div class="silence-final__refrain">
					<span class="silence-final__refrain-line"></span>
					<p class="silence-final__refrain-text">The literacy problem continues.</p>
					<span class="silence-final__refrain-line"></span>
				</div>

				<button type="button" class="silence-final__reset" onclick={reset}>
					<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8">
						<path d="M4 4 V 10 H 10" stroke-linecap="round" />
						<path d="M20 14 A 8 8 0 1 1 6 8" stroke-linecap="round" />
					</svg>
					Try the other path
				</button>
			</div>
		{/if}

		<div class="silence__citation" use:reveal>
			<span class="silence__citation-mark">cit.</span>
			Banerji, Anurima. 2022. <em>"The Award-Wapsi Controversy in India and the Politics of
				Dance."</em> South Asian History and Culture.
		</div>
	</div>
</section>

<style>
	.silence {
		background-color: var(--color-beige);
	}

	.silence__header {
		max-width: 760px;
		margin: 0 0 1rem;
	}

	.silence__title em {
		color: var(--color-terracotta-dark);
		font-style: italic;
		font-weight: 500;
	}

	.silence__stage {
		display: grid;
		grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.6fr);
		gap: var(--space-md);
		align-items: center;
		margin-bottom: 1rem;
		padding: 1rem var(--space-md);
		background-color: var(--color-cream);
		border-radius: 8px;
		border: 1px solid var(--color-line);
	}

	@media (max-width: 760px) {
		.silence__stage {
			grid-template-columns: 1fr;
			text-align: center;
			padding: var(--space-md) var(--space-sm);
		}
	}

	.silence__figure {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 220px;
		margin: 0 auto;
		aspect-ratio: 4 / 5;
		border-radius: 6px;
		overflow: hidden;
		background-color: var(--color-beige-dark);
		box-shadow: 0 18px 32px -22px rgba(44, 44, 44, 0.3);
	}

	.silence__figure-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
		filter: grayscale(0.25) contrast(1.02);
	}

	/* The terracotta bar over the dancer's mouth: the silence motif. */
	.silence__figure-mute {
		position: absolute;
		left: 28%;
		right: 28%;
		top: 22%;
		height: 6px;
		border-radius: 999px;
		background-color: var(--color-terracotta);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
	}

	.silence__prompt-text {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 1.5vw, 1.2rem);
		line-height: 1.4;
		color: var(--color-dark-charcoal);
		margin: 0 0 1rem;
	}

	.silence__prompt-text strong {
		display: block;
		margin-top: 0.5rem;
		color: var(--color-warm-brown);
		font-weight: 600;
		font-style: italic;
	}

	.silence__choice {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-sm);
	}

	@media (max-width: 480px) {
		.silence__choice {
			grid-template-columns: 1fr;
		}
	}

	.big-btn {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.3rem;
		padding: 1.1rem 1.2rem;
		border-radius: 6px;
		text-align: left;
		transition: background-color 0.25s var(--ease-natural), color 0.25s var(--ease-natural), transform 0.25s var(--ease-natural), border-color 0.25s var(--ease-natural);
		border: 1px solid var(--color-line-strong);
	}

	.big-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 16px 24px -16px rgba(44, 44, 44, 0.2);
	}

	.big-btn--speak {
		background-color: var(--color-cream);
		color: var(--color-dark-charcoal);
		border-color: var(--color-warm-brown);
	}

	.big-btn--speak:hover {
		background-color: var(--color-warm-brown);
		color: var(--color-cream);
	}

	.big-btn--silent {
		background-color: var(--color-cream);
		color: var(--color-dark-charcoal);
		border-color: var(--color-line-strong);
	}

	.big-btn--silent:hover {
		background-color: var(--color-dark-charcoal);
		color: var(--color-cream);
		border-color: var(--color-dark-charcoal);
	}

	.big-btn__num {
		font-family: var(--font-serif);
		font-size: 0.8rem;
		font-style: italic;
		font-weight: 500;
		opacity: 0.75;
	}

	.big-btn__label {
		font-family: var(--font-serif);
		font-size: 1.4rem;
		font-weight: 600;
	}

	.big-btn__hint {
		font-size: 0.78rem;
		font-weight: 500;
		opacity: 0.75;
	}

	.path-flow {
		position: relative;
		max-width: 720px;
		margin: 0 auto var(--space-md);
		padding-left: var(--space-md);
	}

	.path-flow__rail {
		position: absolute;
		top: 12px;
		bottom: 12px;
		left: 12px;
		width: 2px;
		background:
			linear-gradient(to bottom, var(--color-warm-brown) 0%, var(--color-warm-brown) 60%, var(--color-line) 100%);
		border-radius: 2px;
	}

	.path-step {
		position: relative;
		padding: 1.2rem 1.4rem 1.4rem 1.5rem;
		background-color: var(--color-cream);
		border: 1px solid var(--color-line);
		border-radius: 6px;
		margin-bottom: var(--space-sm);
		margin-left: 1.2rem;
		animation: fade-in-up 0.4s var(--ease-soft);
	}

	.path-step::before {
		content: '';
		position: absolute;
		top: 22px;
		left: -1.85rem;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background-color: var(--color-terracotta);
		border: 3px solid var(--color-beige);
		z-index: 1;
	}

	.path-step__num {
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--color-warm-brown);
		margin-bottom: 0.4rem;
	}

	.path-step__title {
		font-family: var(--font-serif);
		font-size: 1.2rem;
		font-weight: 600;
		line-height: 1.3;
		margin: 0 0 1rem;
		color: var(--color-dark-charcoal);
	}

	.path-step__consequence {
		padding: 0.9rem 1rem;
		background-color: var(--color-beige);
		border-left: 3px solid var(--color-terracotta);
		border-radius: 4px;
		margin-bottom: 1rem;
	}

	.path-step__consequence-label {
		display: block;
		font-size: 0.66rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--color-terracotta-dark);
		margin-bottom: 0.3rem;
	}

	.path-step__consequence p {
		margin: 0;
		font-family: var(--font-serif);
		font-style: italic;
		font-size: 0.95rem;
		line-height: 1.5;
		color: var(--color-charcoal-soft);
	}


	.path-pending {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 0.5rem 0 0.5rem 1.2rem;
		margin-left: 1.2rem;
	}

	.path-pending span {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background-color: var(--color-warm-brown);
		opacity: 0.4;
		animation: path-dot-pulse 1.1s ease-in-out infinite;
	}

	.path-pending span:nth-child(2) { animation-delay: 0.18s; }
	.path-pending span:nth-child(3) { animation-delay: 0.36s; }

	@keyframes path-dot-pulse {
		0%, 100% { opacity: 0.25; transform: scale(0.85); }
		50%       { opacity: 1;    transform: scale(1.15); }
	}

	.silence-final {
		max-width: 760px;
		margin: 0 auto;
		padding: var(--space-md) 0;
		animation: fade-in-up 0.5s var(--ease-soft);
	}

	.silence-final__path-label {
		font-size: 0.78rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--color-warm-brown);
		text-align: center;
		margin-bottom: var(--space-md);
	}

	.silence-final__recap {
		background-color: var(--color-cream);
		border: 1px solid var(--color-line);
		border-radius: 6px;
		padding: var(--space-sm) var(--space-md);
		margin-bottom: var(--space-md);
	}

	.silence-final__recap-row {
		display: grid;
		grid-template-columns: 36px 1fr;
		gap: 1rem;
		padding: 0.8rem 0;
		border-bottom: 1px dashed var(--color-line);
	}

	.silence-final__recap-row:last-child {
		border-bottom: none;
	}

	.silence-final__recap-num {
		font-family: var(--font-serif);
		font-size: 1.6rem;
		font-style: italic;
		font-weight: 500;
		color: var(--color-warm-brown);
		line-height: 1;
	}

	.silence-final__recap-title {
		font-family: var(--font-serif);
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--color-dark-charcoal);
		margin: 0 0 0.25rem;
	}

	.silence-final__recap-consequence {
		font-size: 0.85rem;
		font-style: italic;
		line-height: 1.45;
		color: var(--color-charcoal-soft);
		margin: 0;
	}

	.silence-final__outcome {
		padding: var(--space-sm) var(--space-md);
		background-color: var(--color-dark-charcoal);
		color: var(--color-cream);
		border-radius: 6px;
		margin-bottom: var(--space-lg);
	}

	.silence-final__outcome-label {
		display: block;
		font-size: 0.7rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--color-terracotta-light);
		margin-bottom: 0.5rem;
	}

	.silence-final__outcome-text {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 1.7vw, 1.2rem);
		line-height: 1.55;
		font-style: italic;
		margin: 0;
	}

	.silence-final__refrain {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		margin: var(--space-lg) 0;
	}

	.silence-final__refrain-line {
		flex: 1;
		max-width: 80px;
		height: 1px;
		background-color: var(--color-line-strong);
	}

	.silence-final__refrain-text {
		margin: 0;
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 600;
		font-size: clamp(1.6rem, 3.6vw, 2.4rem);
		text-align: center;
		color: var(--color-terracotta-dark);
		line-height: 1.2;
	}

	.silence-final__reset {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.7rem 1.4rem;
		border-radius: 999px;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		border: 1px solid var(--color-warm-brown);
		color: var(--color-warm-brown);
		transition: background-color 0.2s var(--ease-natural), color 0.2s var(--ease-natural);
		margin: 0 auto;
	}

	.silence-final__reset:hover {
		background-color: var(--color-warm-brown);
		color: var(--color-cream);
	}

	.silence__citation {
		font-size: 0.78rem;
		color: var(--color-charcoal-muted);
		max-width: 60ch;
		padding-left: 1rem;
		border-left: 2px solid var(--color-line);
		margin-top: 1rem;
	}

	.silence__citation em {
		color: var(--color-charcoal-soft);
		font-style: italic;
	}

	.silence__citation-mark {
		font-weight: 600;
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-warm-brown);
		margin-right: 0.5rem;
	}
</style>
