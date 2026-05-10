/**
 * Svelte action that adds `is-visible` to an element when it scrolls into view.
 * Once revealed, the observer disconnects so the element stays visible.
 */
export function reveal(node: HTMLElement, options: { threshold?: number; rootMargin?: string } = {}) {
	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-visible');
		return { destroy() {} };
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					observer.disconnect();
				}
			}
		},
		{
			threshold: options.threshold ?? 0.15,
			rootMargin: options.rootMargin ?? '0px 0px -10% 0px'
		}
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
