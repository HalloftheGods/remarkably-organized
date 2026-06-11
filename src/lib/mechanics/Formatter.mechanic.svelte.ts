import { getContext, setContext } from 'svelte';
import type { PlannerSettings } from '$lib/state/planner-settings.svelte';

const FORMATTER_MECHANIC_KEY = Symbol('FORMATTER_MECHANIC');

export function setFormatterMechanic(settings: PlannerSettings) {
	const mechanic = new FormatterMechanic(settings);
	setContext(FORMATTER_MECHANIC_KEY, mechanic);
	return mechanic;
}

export function getFormatterMechanic() {
	return getContext<FormatterMechanic>(FORMATTER_MECHANIC_KEY);
}

type StringFormatOptions =
	| {
			type: 'date';
			dateStyle?: Intl.DateTimeFormatOptions['dateStyle'];
			timeStyle?: Intl.DateTimeFormatOptions['timeStyle'];
			dayPeriod?: Intl.DateTimeFormatOptions['dayPeriod'];
			second?: Intl.DateTimeFormatOptions['second'];
			minute?: Intl.DateTimeFormatOptions['minute'];
			hour?: Intl.DateTimeFormatOptions['hour'];
			day?: Intl.DateTimeFormatOptions['day'];
			weekday?: Intl.DateTimeFormatOptions['weekday'];
			month?: Intl.DateTimeFormatOptions['month'];
			year?: Intl.DateTimeFormatOptions['year'];
	  }
	| {
			type: 'relative-date';
			style?: Intl.RelativeTimeFormatOptions['style'];
			numeric?: Intl.RelativeTimeFormatOptions['numeric'];
			now?: () => number;
	  }
	| {
			type: 'currency';
			currency?: Intl.NumberFormatOptions['currency'];
			html?: boolean;
	  }
	| {
			type: 'storage';
	  }
	| {
			type: 'ordinal';
			html?: boolean;
	  };

export class FormatterMechanic {
	settings: PlannerSettings;

	constructor(settings: PlannerSettings) {
		this.settings = settings;
	}

	get monthEmojis() {
		if (this.settings.emojis.disable) return ['', '', '', '', '', '', '', '', '', '', '', ''];
		return [
			'🎉', '💝', '🍀', '🥚', '🌸', '☀️',
			'🧨', '⛺', '🍎', '🎃', '🦃', '⛄',
		];
	}

	get quarterEmojis() {
		if (this.settings.emojis.disable) return ['', '', '', ''];
		return ['❄️', '🌷', '☀️', '🍂'];
	}

	getMoonEmoji(name: string): string | null {
		const MOON_PHASES: Record<string, string> = {
			'new moon': '🌑',
			'waxing crescent': '🌒',
			'first quarter': '🌓',
			'waxing gibbous': '🌔',
			'full moon': '🌕',
			'waning gibbous': '🌖',
			'last quarter': '🌗',
			'third quarter': '🌗',
			'waning crescent': '🌘',
		};
		const MOON_NAME_REGEX = /new moon|waxing crescent|first quarter|waxing gibbous|full moon|waning gibbous|last quarter|third quarter|waning crescent/i;
		const match = name.toLowerCase().match(MOON_NAME_REGEX);
		if (!match) return null;
		
		const emoji = MOON_PHASES[match[0]];
		return this.settings.emojis.disable ? `${emoji}\uFE0E` : emoji;
	}

	getYearEmoji(year: number) {
		const animals = ['🐵', '🐓', '🐶', '🐷', '🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐏'];
		return animals[year % 12];
	}

	getSearchParamString(url: URL, paramChanges: Record<string, string | number | undefined> = {}): string {
		const searchParams = new URLSearchParams(url.searchParams);
		Object.entries(paramChanges).forEach(([key, value]) => {
			if (value === undefined) {
				searchParams.delete(key);
			} else {
				searchParams.set(key, value.toString());
			}
		});
		const search = searchParams.toString();
		return search ? `?${search}` : '';
	}

	formatToString(val: string | number | undefined | null | Date, options?: StringFormatOptions): string {
		if (options?.type === 'relative-date') {
			const second = 1000;
			const minute = 60 * 1000;
			const hour = minute * 60;
			const day = hour * 24;
			const month = day * 30;
			const year = day * 365;
			const intl = new Intl.RelativeTimeFormat(undefined, {
				numeric: 'auto',
				style: 'narrow',
				...options,
			});
			const time = val instanceof Date ? val.getTime() : +(val || '0');
			const relativeTime = (options?.now || Date.now)() - time;
			const elapsed = Math.abs(relativeTime);
			const sign = Math.sign(-relativeTime);
			if (elapsed < minute) {
				return intl.format(sign * Math.round(elapsed / second), 'second');
			} else if (elapsed < hour) {
				return intl.format(sign * Math.round(elapsed / minute), 'minute');
			} else if (elapsed < day) {
				return intl.format(sign * Math.round(elapsed / hour), 'hour');
			} else if (elapsed < month) {
				return intl.format(sign * Math.round(elapsed / day), 'day');
			} else if (elapsed < year) {
				return intl.format(sign * Math.round(elapsed / month), 'month');
			} else {
				return intl.format(sign * Math.round(elapsed / year), 'year');
			}
		}

		if (options?.type === 'date' || (!options && val instanceof Date)) {
			if (!val) return '';
			if (Object.keys(options || {}).length > 1) {
				return new Intl.DateTimeFormat(undefined, options).format(typeof val === 'string' ? new Date(val) : val);
			}
			const isSameDay = new Date(val).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
			if (isSameDay) {
				return new Intl.DateTimeFormat(undefined, { timeStyle: 'short' }).format(typeof val === 'string' ? new Date(val) : val);
			}
			const isSameYear = new Date(val).getFullYear() === new Date().getFullYear();
			if (isSameYear) {
				return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(typeof val === 'string' ? new Date(val) : val);
			}
			return new Intl.DateTimeFormat(undefined, { dateStyle: 'short' }).format(typeof val === 'string' ? new Date(val) : val);
		}

		if (val instanceof Date) return val.toString();

		if (options?.type === 'storage') {
			const kilobyte = 1000;
			const megabyte = kilobyte * 1000;
			const gigabyte = megabyte * 1000;
			const terabyte = gigabyte * 1000;
			const storage = +(val || 0);
			if (storage < megabyte) return new Intl.NumberFormat(undefined, { style: 'unit', unit: 'kilobyte', unitDisplay: 'short', maximumFractionDigits: 0 }).format(storage / kilobyte);
			if (storage < megabyte * 10) return new Intl.NumberFormat(undefined, { style: 'unit', unit: 'megabyte', unitDisplay: 'short', maximumFractionDigits: 1 }).format(storage / megabyte);
			if (storage < gigabyte) return new Intl.NumberFormat(undefined, { style: 'unit', unit: 'megabyte', unitDisplay: 'short', maximumFractionDigits: 0 }).format(storage / megabyte);
			if (storage < gigabyte * 10) return new Intl.NumberFormat(undefined, { style: 'unit', unit: 'gigabyte', unitDisplay: 'short', maximumFractionDigits: 1 }).format(storage / gigabyte);
			if (storage < terabyte) return new Intl.NumberFormat(undefined, { style: 'unit', unit: 'gigabyte', unitDisplay: 'short', maximumFractionDigits: 0 }).format(storage / gigabyte);
			return new Intl.NumberFormat(undefined, { style: 'unit', unit: 'terabyte', unitDisplay: 'short', maximumFractionDigits: 2 }).format(storage / terabyte);
		}

		if (options?.type === 'currency') {
			const amount = +(val || 0);
			const currencyFormatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', ...options });
			if (!options?.html) return currencyFormatter.format(amount);
			const parts = currencyFormatter.formatToParts(amount);
			const hasEmptyFraction = parts.find((part) => part.type === 'fraction' && !+part.value);
			return parts.map((part) => {
				if (part.type === 'currency') return `<span class="symbol">${part.value}</span>`;
				if (part.type === 'fraction' || part.type === 'decimal') {
					if (hasEmptyFraction) return '';
					return `<span class="${part.type}">${part.value}</span>`;
				}
				return part.value;
			}).join('');
		}

		if (options?.type === 'ordinal') {
			const enOrdinalRules = new Intl.PluralRules('en-US', { type: 'ordinal' });
			const suffixes = new Map([['one', 'st'], ['two', 'nd'], ['few', 'rd'], ['other', 'th']]);
			const number = +(val || 0);
			const rule = enOrdinalRules.select(number);
			const suffix = suffixes.get(rule);
			if (!options?.html) return `${number}${suffix}`;
			return `<span class="value">${number}</span><span class="ordinal">${suffix}</span>`;
		}

		if (!val) return '';
		return val.toString();
	}

	stripEmojis(str: string): string {
		if (!str) return '';
		return str.replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}\p{Emoji_Modifier_Base}]/gu, '').replace(/\s+/g, ' ').trim();
	}
}
