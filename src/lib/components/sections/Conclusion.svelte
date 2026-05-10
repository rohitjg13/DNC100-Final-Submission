<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	const bibliography = [
		{
			author: 'Banerji, Anurima.',
			year: '2016.',
			title: '"The Queer Politics of the Raj."',
			source: 'Modern Asian Studies 50 (1): 81–99.'
		},
		{
			author: 'Banerji, Anurima.',
			year: '2022.',
			title: '"The Award-Wapsi Controversy in India and the Politics of Dance."',
			source: 'South Asian History and Culture.'
		},
		{
			author: 'Chakravorty, Pallabi.',
			year: '2009.',
			title: '"Moved to Dance: Remix, Rasa, and a New India."',
			source: 'Visual Anthropology 22: 211–228.'
		},
		{
			author: 'Cherian, Anita.',
			year: '2009.',
			title:
				'"Institutional Maneuvers, Nationalizing Performance, Delineating Genre: Reading the Sangeet Natak Akademi Reports 1953–1959."',
			source: 'Third Frame: Literature, Culture and Society 2 (3): 32–60.'
		},
		{
			author: 'Coorlawala, Uttara Asha.',
			year: '2004.',
			title: '"The Sanskritized Body."',
			source: 'Dance Research Journal 36 (2): 50–63.'
		}
	];
</script>

<section id="conclusion" class="conclusion section">
	<div class="section__inner section__inner--narrow">
		<header class="conclusion__header" use:reveal>
			<span class="section__eyebrow">Section 08 · Conclusion</span>
		</header>

		<blockquote class="conclusion__quote" use:reveal>
			<span class="conclusion__quote-mark conclusion__quote-mark--open">"</span>
			<p class="conclusion__quote-text">
				AI does not erase tradition.<br />It crystallizes an erasure that <em>already happened.</em>
			</p>
			<span class="conclusion__quote-mark conclusion__quote-mark--close">"</span>
		</blockquote>

		<div class="conclusion__divider" use:reveal>
			<span class="conclusion__divider-mark">∞</span>
		</div>

		<div class="conclusion__body" use:reveal>
			<p>
				This project started with a concession. Sculptures represented Sadir, the form later
				renamed Bharatanatyam, for centuries. So did paintings, photographs, film. Every era
				found a new medium to capture what dance looks like without being the dance itself. The
				Chola bronze sculptor was not wrong to carve. The photographer was not wrong to shoot.
				AI is not wrong to generate.
			</p>
			<p>
				But each of those earlier makers was in the room. The sculptor knew the tradition. The
				photographer documented a living body. The person who typed "Indian classical dance"
				into an AI generator in 2025 was not. And the bronze sat in one temple. KOYAL has thousands of views and no disclaimer. The medium is not the problem. What the medium
				inherited is. The dance AI learned from was already cleaned up. Colonial law
				criminalized the devadasis. Brahminical reform sanitized what remained. The Sangeet
				Natak Akademi folded a handful of cleansed forms, with Bharatanatyam at the front, into
				the official classical canon. The internet documented that canon in English at scale. AI
				did not make those choices. It just copied them. To the entire world. Without knowing it
				had.
			</p>

			<div class="conclusion__directives">
				<p class="conclusion__directives-label">Three things this project is arguing:</p>
				<ul class="conclusion__directive-list">
					<li>Trace the full chain. Colonial law stripped devadasis of legitimacy, brahminical reform sanitized what was left, the Sangeet Natak Akademi turned that cleaned-up version into the official canon, the internet documented it at scale, and AI learned from that.</li>
					<li>Stop calling AI-generated dance videos "Indian classical dance" without explaining what they are actually based on and what they leave out.</li>
					<li>When writing about Bharatanatyam or any related form, include the devadasis. They built it. They were written out of their own lineage, and that erasure is what AI is now reproducing at scale.</li>
				</ul>
			</div>

			<p class="conclusion__body-final">
				If AI is just the newest medium in a long line of representation, then the question was
				never whether the copy is good. The question is whose original was excluded so the copy
				could be made.
			</p>
		</div>

		<section class="bibliography" use:reveal>
			<h3 class="bibliography__title">Bibliography</h3>
			<p class="bibliography__lead">Five readings ground this project's argument.</p>
			<ol class="bibliography__list">
				{#each bibliography as entry, i (i)}
					<li class="bibliography__item">
						<span class="bibliography__num">{String(i + 1).padStart(2, '0')}</span>
						<div class="bibliography__entry">
							<span class="bibliography__author">{entry.author}</span>
							{#if entry.year}<span class="bibliography__year"> {entry.year}</span>{/if}
							<span class="bibliography__entry-title"> {entry.title}</span>
							{#if entry.source}<span class="bibliography__source"> {entry.source}</span>{/if}
						</div>
					</li>
				{/each}
			</ol>
		</section>

		<div class="conclusion__sign-off" use:reveal>
			<p>DNC100 Final Project · Critical readings on Indian classical dance and AI-generated media.</p>
		
		</div>
	</div>
</section>

<style>
	.conclusion {
		background:
			radial-gradient(ellipse at 50% 0%, rgba(193, 127, 90, 0.08), transparent 60%),
			linear-gradient(180deg, var(--color-cream) 0%, var(--color-beige) 100%);
		text-align: center;
	}

	.conclusion__header {
		margin-bottom: 0.75rem;
	}

	.conclusion__quote {
		margin: 0 0 0.75rem;
		padding: 0;
		position: relative;
	}

	.conclusion__quote-mark {
		position: absolute;
		font-family: var(--font-serif);
		font-size: 8rem;
		font-style: italic;
		line-height: 0.6;
		color: var(--color-warm-brown);
		opacity: 0.45;
	}

	.conclusion__quote-mark--open {
		top: -10px;
		left: -10px;
	}

	.conclusion__quote-mark--close {
		bottom: -40px;
		right: 0;
	}

	.conclusion__quote-text {
		font-family: var(--font-serif);
		font-size: clamp(1.5rem, 3.6vw, 2.8rem);
		font-weight: 400;
		line-height: 1.2;
		letter-spacing: -0.02em;
		color: var(--color-dark-charcoal);
		margin: 0;
	}

	.conclusion__quote-text em {
		color: var(--color-terracotta-dark);
		font-style: italic;
		font-weight: 500;
	}

	.conclusion__divider {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		margin: 1rem 0;
	}

	.conclusion__divider::before,
	.conclusion__divider::after {
		content: '';
		display: block;
		width: 80px;
		height: 1px;
		background-color: var(--color-line-strong);
	}

	.conclusion__divider-mark {
		font-family: var(--font-serif);
		font-style: italic;
		font-size: 1.6rem;
		color: var(--color-warm-brown);
	}

	.conclusion__body {
		text-align: left;
		max-width: 64ch;
		margin: 0 auto 1rem;
		font-size: 0.92rem;
		line-height: 1.6;
		color: var(--color-charcoal-soft);
	}

	.conclusion__body p {
		margin: 0 0 0.5rem;
	}


	.conclusion__directives {
		margin: 1.25rem 0;
		padding: 1rem 1.1rem;
		background-color: rgba(139, 105, 20, 0.06);
		border-left: 3px solid var(--color-warm-brown);
		border-radius: 0 4px 4px 0;
		text-align: left;
	}

	.conclusion__directives-label {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-warm-brown);
		margin: 0 0 0.6rem;
	}

	.conclusion__directive-list {
		margin: 0;
		padding: 0 0 0 1.1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.conclusion__directive-list li {
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--color-charcoal-soft);
	}

	.conclusion__body-final {
		font-family: var(--font-serif);
		font-style: italic;
		color: var(--color-dark-charcoal);
		font-size: 1rem;
		padding-top: 0.25rem;
		margin-top: 0.25rem;
	}

	.bibliography {
		text-align: left;
		max-width: 80ch;
		margin: 0 auto 1rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--color-line-strong);
	}

	.bibliography__title {
		font-family: var(--font-serif);
		font-size: 1.3rem;
		font-weight: 600;
		margin: 0 0 0.2rem;
		color: var(--color-dark-charcoal);
	}

	.bibliography__lead {
		font-style: italic;
		color: var(--color-charcoal-muted);
		font-size: 0.85rem;
		margin: 0 0 0.6rem;
	}

	.bibliography__list {
		list-style: none;
		padding: 0;
		margin: 0;
		counter-reset: bib;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0 1.5rem;
	}

	@media (max-width: 720px) {
		.bibliography__list {
			grid-template-columns: 1fr;
		}
	}

	.bibliography__item {
		display: grid;
		grid-template-columns: 28px 1fr;
		gap: 0.5rem;
		padding: 0.55rem 0;
		border-bottom: 1px dashed var(--color-line);
		font-size: 0.78rem;
		line-height: 1.4;
	}

	.bibliography__item:last-child {
		border-bottom: none;
	}

	.bibliography__num {
		font-family: var(--font-serif);
		font-style: italic;
		font-size: 1rem;
		color: var(--color-warm-brown);
		font-weight: 500;
		line-height: 1.2;
	}

	.bibliography__author {
		font-weight: 600;
		color: var(--color-dark-charcoal);
	}

	.bibliography__year {
		color: var(--color-charcoal-muted);
	}

	.bibliography__entry-title {
		color: var(--color-charcoal-soft);
		font-style: italic;
	}

	.bibliography__source {
		color: var(--color-charcoal-muted);
	}

	.conclusion__sign-off {
		text-align: center;
		font-size: 0.78rem;
		color: var(--color-charcoal-muted);
		font-style: italic;
		max-width: 50ch;
		margin: 0 auto;
	}


</style>
