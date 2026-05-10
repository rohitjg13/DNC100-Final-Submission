<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	type CardType = 'real' | 'ai';

	interface Card {
		id: string;
		label: string; // R1, R2, R3, A1, A2, A3
		type: CardType;
		caption: string;
		inaccuracies?: string[];
	}

	const baseCards: Card[] = [
		{
			id: 'r1',
			label: 'R1',
			type: 'real',
			caption:
				'Bharatanatyam dancer in araimandi (half-sit) with araimandi handpose. Photographed at a recital.'
		},
		{
			id: 'r2',
			label: 'R2',
			type: 'real',
			caption:
				'Dancer mid-jathi with pataka mudra extended. Sambalpur sari with pleats. Photograph from a Kalakshetra production.'
		},
		{
			id: 'r3',
			label: 'R3',
			type: 'real',
			caption:
				'Abhinaya close-up: rasa shringara held in the eyes, hand resting at the chin. Photographed in performance.'
		},
		{
			id: 'a1',
			label: 'A1',
			type: 'ai',
			caption:
				'Generated portrait labelled "Indian classical dancer" by a popular text-to-image model.',
			inaccuracies: [
				'The hand position resembles a mudra but does not correspond to any of the asamyukta hastas in the Abhinaya Darpana.',
				'Jewelry layering is visually maximalist: Mughal-style jhumar plus temple necklace plus chandelier earrings. It reads as a composite of "Indian woman" tropes.'
			]
		},
		{
			id: 'a2',
			label: 'A2',
			type: 'ai',
			caption: 'Generated motion still labelled "Bharatanatyam pose."',
			inaccuracies: [
				'The hip is rotated against the torso in a configuration the trained body does not produce.',
				'The bent leg shows the wrong foot articulation: in araimandi the heel is grounded, here it floats.',
				'The eyes show no rasa. Abhinaya has been replaced with a generic "beauty" gaze.'
			]
		},
		{
			id: 'a3',
			label: 'A3',
			type: 'ai',
			caption:
				'Generated image labelled "traditional Indian classical dance," one of three in the same prompt.',
			inaccuracies: [
				'Costume colors and embroidery patterns are non-traditional. Over-saturated, generated from "Indian aesthetic" averages.',
				'The image performs cultural recognizability without cultural specificity. That is the AI literacy problem in one frame.'
			]
		}
	];

	function shuffle<T>(arr: T[]): T[] {
		const a = [...arr];
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	let cards = $state<Card[]>(shuffle(baseCards));
	let answers = $state<Record<string, CardType | null>>({});
	let submitted = $state<boolean>(false);

	for (const card of baseCards) {
		answers[card.id] = null;
	}

	const allAnswered = $derived(cards.every((c) => answers[c.id] !== null));
	const score = $derived(cards.filter((c) => answers[c.id] === c.type).length);

	function select(cardId: string, type: CardType) {
		if (submitted) return;
		answers[cardId] = type;
	}

	function submit() {
		if (!allAnswered) return;
		submitted = true;
		document.getElementById('literacy-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function reset() {
		cards = shuffle(baseCards);
		for (const card of baseCards) {
			answers[card.id] = null;
		}
		submitted = false;
	}

	function isCorrect(card: Card) {
		return answers[card.id] === card.type;
	}
</script>

<section id="literacy" class="literacy section section--alt">
	<div class="section__inner">
		<header class="literacy__header" use:reveal>
			<span class="section__eyebrow">Section 05 · The Literacy Test</span>
			<h2 class="literacy__title">Can You Tell the <em>Difference?</em></h2>
			<p class="section__lead">
				Three real Bharatanatyam photographs. Three AI generated images of "Indian classical dance."
				Choose for each. Submit when ready.
			</p>
		</header>

		<div class="literacy__grid" use:reveal>
			{#each cards as card (card.id)}
				<div
					class="card"
					class:card--real={card.type === 'real'}
					class:card--ai={card.type === 'ai'}
					class:card--submitted={submitted}
					class:card--correct={submitted && isCorrect(card)}
					class:card--wrong={submitted && !isCorrect(card)}
				>
					<div class="card__art">
						<img
							class="card__img"
							src={`/literacy/${card.id}.png`}
							alt={card.type === 'real' ? 'Bharatanatyam dancer in performance' : 'AI rendering of an Indian classical dancer'}
							draggable="false"
							loading="lazy"
						/>
						{#if submitted}
							<div class="card__overlay">
								<span class="card__truth" class:card__truth--ai={card.type === 'ai'}>
									{card.type === 'ai' ? 'AI generated' : 'Real photograph'}
								</span>
							</div>
						{/if}
					</div>

					<div class="card__body">
						{#if !submitted}
							<div class="card__choice" role="radiogroup" aria-label="Identify image {card.id.toUpperCase()}">
								<button
									type="button"
									class="choice"
									class:choice--selected={answers[card.id] === 'real'}
									onclick={() => select(card.id, 'real')}
									aria-checked={answers[card.id] === 'real'}
									role="radio"
								>
									Real
								</button>
								<button
									type="button"
									class="choice"
									class:choice--selected={answers[card.id] === 'ai'}
									onclick={() => select(card.id, 'ai')}
									aria-checked={answers[card.id] === 'ai'}
									role="radio"
								>
									AI Generated
								</button>
							</div>
						{:else}
							<div class="card__verdict">
								<span class="card__verdict-icon">
									{isCorrect(card) ? '✓' : '✗'}
								</span>
								<span>
									You said
									<strong>{answers[card.id] === 'ai' ? 'AI Generated' : 'Real'}</strong>.
									{isCorrect(card) ? 'Correct.' : 'Incorrect.'}
								</span>
							</div>

							{#if card.inaccuracies}
								<div class="card__inaccuracies">
									<span class="card__inaccuracies-label">What's wrong with this image</span>
									<ul>
										{#each card.inaccuracies as item}
											<li>{item}</li>
										{/each}
									</ul>
								</div>
							{/if}
						{/if}
					</div>
				</div>
			{/each}
		</div>

		{#if !submitted}
			<div class="literacy__submit-row">
				<button
					type="button"
					class="literacy__submit"
					disabled={!allAnswered}
					onclick={submit}
				>
					{allAnswered ? 'Reveal answers' : 'Choose for all six cards'}
				</button>
			</div>
		{:else}
			<div id="literacy-results" class="results">
				<div class="results__score-wrap">
					<span class="results__score-label">Your score</span>
					<span class="results__score">{score}<span class="results__score-of">/6</span></span>
				</div>

				<div class="results__bar" role="progressbar" aria-valuemin="0" aria-valuemax="6" aria-valuenow={score}>
					{#each [0, 1, 2, 3, 4, 5] as i}
						<span class="results__bar-cell" class:results__bar-cell--filled={i < score}></span>
					{/each}
				</div>

				<blockquote class="results__quote">
					Most people cannot tell the difference. <em>That is the literacy problem.</em> When AI
					content reaches millions of viewers who can't spot the inaccuracies, the AI image
					quietly becomes the reference. The tradition it simulates does not.
				</blockquote>

				<button type="button" class="results__reset" onclick={reset}>
					<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8">
						<path d="M4 4 V 10 H 10" stroke-linecap="round" />
						<path d="M20 14 A 8 8 0 1 1 6 8" stroke-linecap="round" />
					</svg>
					Take the test again
				</button>
			</div>
		{/if}
	</div>
</section>

<style>
	.literacy {
		background-color: var(--color-beige);
	}

	.literacy__header {
		max-width: 760px;
		margin: 0 0 1rem;
	}

	.literacy__title em {
		color: var(--color-warm-brown);
		font-style: italic;
		font-weight: 500;
	}

	.literacy__grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.85rem;
		margin-bottom: 0.85rem;
	}

	@media (max-width: 720px) {
		.literacy__grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.card {
		background-color: var(--color-cream);
		border-radius: 6px;
		overflow: hidden;
		border: 1px solid var(--color-line);
		display: flex;
		flex-direction: column;
		transition: border-color 0.4s var(--ease-natural), box-shadow 0.4s var(--ease-natural), transform 0.4s var(--ease-natural);
	}

	.card:hover {
		transform: translateY(-2px);
		box-shadow: 0 24px 40px -28px rgba(44, 44, 44, 0.2);
	}

	.card--correct {
		border-color: rgba(98, 138, 76, 0.6);
		box-shadow: 0 0 0 2px rgba(98, 138, 76, 0.18);
	}

	.card--wrong {
		border-color: rgba(193, 127, 90, 0.65);
		box-shadow: 0 0 0 2px rgba(193, 127, 90, 0.2);
	}

	.card__art {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 5;
		background-color: var(--color-dark-charcoal);
		overflow: hidden;
	}

	.card__img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		user-select: none;
		-webkit-user-drag: none;
		display: block;
	}

	.card__overlay {
		position: absolute;
		left: 12px;
		bottom: 12px;
		right: 12px;
		display: flex;
		justify-content: flex-end;
	}

	.card__truth {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		padding: 0.3rem 0.7rem;
		background-color: rgba(247, 209, 144, 0.92);
		color: var(--color-dark-charcoal);
		border-radius: 999px;
	}

	.card__truth--ai {
		background-color: rgba(255, 200, 220, 0.92);
		color: #5a1845;
	}

	.card__body {
		padding: 0.65rem 0.65rem 0.7rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
	}

	.card__choice {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.3rem;
	}

	.choice {
		padding: 0.5rem 0.3rem;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		border-radius: 4px;
		background-color: var(--color-beige);
		color: var(--color-charcoal-soft);
		border: 1px solid var(--color-line);
		transition: background-color 0.2s var(--ease-natural), color 0.2s var(--ease-natural), border-color 0.2s var(--ease-natural);
	}

	.choice:hover {
		background-color: var(--color-beige-dark);
		color: var(--color-dark-charcoal);
	}

	.choice--selected {
		background-color: var(--color-dark-charcoal);
		color: var(--color-cream);
		border-color: var(--color-dark-charcoal);
	}

	.card__verdict {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		color: var(--color-charcoal-soft);
	}

	.card__verdict strong {
		color: var(--color-dark-charcoal);
	}

	.card__verdict-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		font-size: 0.75rem;
		font-weight: 700;
	}

	.card--correct .card__verdict-icon {
		background-color: rgba(98, 138, 76, 0.2);
		color: rgb(70, 100, 50);
	}

	.card--wrong .card__verdict-icon {
		background-color: rgba(193, 127, 90, 0.22);
		color: var(--color-terracotta-dark);
	}

	.card__inaccuracies {
		padding: 0.85rem 0.85rem;
		background-color: var(--color-beige);
		border-radius: 4px;
		border-left: 3px solid var(--color-terracotta);
	}

	.card__inaccuracies-label {
		display: block;
		font-size: 0.66rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-terracotta-dark);
		margin-bottom: 0.45rem;
	}

	.card__inaccuracies ul {
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 0.8rem;
		line-height: 1.5;
		color: var(--color-charcoal-soft);
	}

	.card__inaccuracies li {
		position: relative;
		padding-left: 0.95rem;
		margin-bottom: 0.4rem;
	}

	.card__inaccuracies li::before {
		content: '·';
		position: absolute;
		left: 0;
		font-weight: 700;
		color: var(--color-terracotta);
	}

	.literacy__submit-row {
		text-align: center;
	}

	.literacy__submit {
		padding: 0.7rem 1.6rem;
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		background-color: var(--color-dark-charcoal);
		color: var(--color-cream);
		border-radius: 999px;
		transition: background-color 0.25s var(--ease-natural), opacity 0.25s var(--ease-natural), transform 0.25s var(--ease-natural);
	}

	.literacy__submit:hover:not(:disabled) {
		background-color: var(--color-warm-brown);
		transform: translateY(-1px);
	}

	.literacy__submit:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.results {
		text-align: center;
		max-width: 700px;
		margin: 0 auto;
		padding: var(--space-lg) var(--space-md);
		border-top: 1px dashed var(--color-line-strong);
		border-bottom: 1px dashed var(--color-line-strong);
	}

	.results__score-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 1rem;
	}

	.results__score-label {
		font-size: 0.78rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--color-warm-brown);
		margin-bottom: 0.5rem;
	}

	.results__score {
		font-family: var(--font-serif);
		font-size: 5rem;
		font-weight: 700;
		line-height: 1;
		color: var(--color-dark-charcoal);
	}

	.results__score-of {
		font-size: 2rem;
		font-style: italic;
		font-weight: 400;
		color: var(--color-warm-brown);
		margin-left: 0.2rem;
	}

	.results__bar {
		display: flex;
		justify-content: center;
		gap: 0.4rem;
		margin: 0 auto var(--space-md);
		max-width: 320px;
	}

	.results__bar-cell {
		flex: 1;
		height: 10px;
		border-radius: 2px;
		background-color: var(--color-line);
		transition: background-color 0.3s var(--ease-natural);
	}

	.results__bar-cell--filled {
		background-color: var(--color-warm-brown);
	}

	.results__quote {
		margin: 0 auto var(--space-md);
		font-family: var(--font-serif);
		font-size: clamp(1.1rem, 1.8vw, 1.35rem);
		line-height: 1.5;
		font-style: italic;
		color: var(--color-charcoal-soft);
		max-width: 50ch;
		quotes: '“' '”';
	}

	.results__quote em {
		color: var(--color-terracotta-dark);
		font-weight: 500;
	}

	.results__reset {
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
	}

	.results__reset:hover {
		background-color: var(--color-warm-brown);
		color: var(--color-cream);
	}
</style>
