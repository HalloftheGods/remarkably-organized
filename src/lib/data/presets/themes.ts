import { THEMES } from '../themes/index';

export const findThemeById = (id: string) => {
	const matchTheme = (theme: any) => theme.id === id;
	const theme = THEMES.find(matchTheme);
	const hasConfig = theme !== undefined && theme.config !== undefined;
	if (hasConfig) {
		return {
			...theme.config,
			design: {
				...theme.config.design,
				themeId: id,
			},
		};
	}
	return {};
};

export const classicTheme = findThemeById('classic-e-ink');
export const pastelTheme = findThemeById('pastel-dreams');
export const hackerTheme = findThemeById('neon-hacker');
export const godTheme = findThemeById('hall-of-the-gods');
export const nerdTheme = findThemeById('midnight-nerd');
export const mujiTheme = findThemeById('minimalist-muji');
export const forestTheme = findThemeById('nordic-forest');
export const cyberpunkTheme = findThemeById('cyberpunk-city');
export const paperProTheme = findThemeById('paper-pro-accents');
export const vaporwaveTheme = findThemeById('vaporwave-aesthetics');
export const webworkTheme = findThemeById('worldwide-webwork');
