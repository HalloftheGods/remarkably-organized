/**
 * Utility for tracking Google Analytics (GA4) events and page views.
 * Assumes `window.gtag` is available globally (initialized in app.html).
 */

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
	if (typeof window !== 'undefined' && 'gtag' in window) {
		(window as any).gtag('event', eventName, params);
	}
};

export const trackPageView = (url: string) => {
	if (typeof window !== 'undefined' && 'gtag' in window) {
		(window as any).gtag('config', 'G-X05Y7GYB0V', {
			page_path: url,
		});
	}
};
