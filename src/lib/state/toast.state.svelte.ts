const MAX_CHARS = 200;

import type { ToastOptions, ToastController } from '$lib/types';
type Bread = { message: string; start: number; id: string } & ToastOptions;

export const toastState = new (class ToastState {
	list = $state([] as Bread[]);
})();

function dismissToast(id: string) {
	toastState.list = toastState.list.filter((t) => t.id !== id);
}

function showToast(message: string, options?: Partial<ToastOptions>) {
	if (!message?.length) return;
	if (options?.level === 'error') console.error(message);
	const id = `${Date.now()}-${Math.random()}}`;
	const defaultDuration =
		options?.level === 'error' ? 12000 : 4000 + Math.min(MAX_CHARS, message.length) * 50;
	const duration = options?.duration || defaultDuration;
	toastState.list = [
		...toastState.list.slice(-4),
		{
			message:
				message.length > MAX_CHARS ? `${message.slice(0, MAX_CHARS - 3)}...` : message,
			id,
			start: Date.now(),
			duration,
			level: 'info',
			...options,
		},
	];
	setTimeout(() => dismissToast(id), duration);
}



export const toast: ToastController = Object.assign(showToast, {
	error: (message: string, duration?: number) => {
		showToast(message, { level: 'error', duration });
	},
	success: (message: string, duration?: number) => {
		showToast(message, { level: 'success', duration });
	},
	info: (message: string, duration?: number) => {
		showToast(message, { level: 'info', duration });
	},
	undo: (message: string, undoFn: () => void, duration?: number) => {
		showToast(message, { level: 'info', duration: duration || 6000, onUndo: undoFn });
	},
});

export { dismissToast };
