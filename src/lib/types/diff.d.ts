export interface ObjectDiffOptions {
	enableDeepDiff?: boolean;
	enableDeepArrayDiff?: boolean;
}

export type DeepPartial<T> = T extends { [key: string]: any }
	? { [P in keyof T]?: DeepPartial<T[P]> }
	: T;

export interface ObjectDiff<T = never> {
	prev: T | undefined;
	next: T | undefined;
	diff: DeepPartial<T> | undefined;
	merge: (edits: DeepPartial<T>) => ObjectDiff<T>;
	set: (edits: ObjectDiffSetState<T>) => ObjectDiff<T>;
}

export type ObjectDiffSetState<T> = Partial<Omit<ObjectDiff<T>, 'merge' | 'set'>>;
