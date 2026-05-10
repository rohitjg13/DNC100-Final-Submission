export interface SectionLink {
	id: string;
	label: string;
	number: string;
}

export const SECTIONS: SectionLink[] = [
	{ id: 'hero', label: 'Intro', number: '01' },
	{ id: 'comparator', label: 'AI vs Real', number: '02' },
	{ id: 'medium', label: 'Medium', number: '03' },
	{ id: 'timeline', label: 'Learned', number: '04' },
	{ id: 'literacy', label: 'Literacy', number: '05' },
	{ id: 'constellation', label: 'Readings', number: '06' },
	{ id: 'silence', label: 'Silence', number: '07' },
	{ id: 'conclusion', label: 'Conclusion', number: '08' }
];
