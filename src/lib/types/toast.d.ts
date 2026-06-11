export interface ToastOptions {
	duration: number;
	level: 'info' | 'success' | 'error';
	onUndo?: () => void;
}

export interface ToastController {
	error: (message: string, duration?: number) => void;
	success: (message: string, duration?: number) => void;
	info: (message: string, duration?: number) => void;
	undo: (message: string, undoFn: () => void, duration?: number) => void;
	(message: string, options?: Partial<ToastOptions>): void;
}
