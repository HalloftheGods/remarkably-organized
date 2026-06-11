export interface IntersectAttributes {
	'on:intersect'?: (event: CustomEvent<IntersectDetail>) => void;
	'on:intersectchange'?: (event: CustomEvent<IntersectDetail>) => void;
	'on:intersectonce'?: (event: CustomEvent<IntersectDetail>) => void;
}

export interface IntersectParameters extends IntersectionObserverInit {
	enabled?: boolean;
}

export interface IntersectDetail extends Readonly<IntersectionObserverEntry> {
	direction: 'up' | 'down';
}
