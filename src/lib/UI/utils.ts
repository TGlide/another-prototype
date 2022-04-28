import {
	isColor,
	isFontFamily,
	isPalette,
	theme,
	type Color,
	type FontFamily,
	type Palette
} from './theme';

type ColorProp = Color | Palette;

export type CSS = {
	// Margin
	m?: string | number;
	mt?: string | number;
	mr?: string | number;
	mb?: string | number;
	ml?: string | number;
	mx?: string | number;
	my?: string | number;
	// Padding
	p?: string | number;
	pt?: string | number;
	pr?: string | number;
	pb?: string | number;
	pl?: string | number;
	px?: string | number;
	py?: string | number;
	// Width and height
	w?: string | number;
	minW?: string | number;
	maxW?: string | number;
	h?: string | number;
	minH?: string | number;
	maxH?: string | number;
	size?: string | number;
	// Border
	radius?: string | number;
	borderSize?: string | number;
	borderColor?: ColorProp;
	borderStyle?: string;
	// Colors
	bgColor?: ColorProp;
	color?: ColorProp;
	// Flex & Grid
	gap?: string | number;
	flexDirection?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
	justifyContent?: string;
	alignItems?: string;
	templateColumns?: string;
	templateRows?: string;
	placeItems?: string;
	// Typography
	fontSize?: string | number;
	fontFamily?: FontFamily;
	fontWeight?:
		| 100
		| 200
		| 300
		| 400
		| 500
		| 600
		| 700
		| 800
		| 900
		| '100'
		| '200'
		| '300'
		| '400'
		| '500'
		| '600'
		| '700'
		| '800'
		| '900';
	lineHeight?: string | number;
	letterSpacing?: string | number;
	textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
	textDecoration?: 'none' | 'underline' | 'line-through';
	// Misc.
	opacity?: number;
	display?: string;
	textAlign?: string;
};

export const pxToRem = (px: number) => {
	return `${px / 16}rem`;
};

export const parseValue = (
	value: string | number | undefined,
	cssVar: string | string[]
): string | undefined => {
	if (value === undefined) {
		return undefined;
	}

	if (typeof cssVar === 'string') {
		return `--${cssVar}: ${value};`;
	}

	return cssVar.map((v) => `--${v}: ${value}`).join(';');
};

export const parseSpace = (
	value: string | number | undefined,
	cssVar: string | string[]
): string | undefined => {
	if (value === undefined) {
		return undefined;
	}

	let parsedValue = value;

	if (typeof value === 'number') {
		parsedValue = pxToRem(value);
	}

	if (typeof cssVar === 'string') {
		return `--${cssVar}: ${parsedValue}`;
	}

	return cssVar.map((v) => `--${v}: ${parsedValue}`).join(';');
};

export const parseColor = (
	value: ColorProp | string | undefined,
	cssVar: string | string[]
): string | undefined => {
	if (!value) return undefined;

	let parsedValue = value;
	if (isColor(value)) {
		parsedValue = theme.colors[value];
	}

	if (isPalette(value)) {
		parsedValue = theme.palette[value];
	}

	if (typeof cssVar === 'string') {
		return `--${cssVar}: ${parsedValue}`;
	}

	return cssVar.map((v) => `--${v}: ${parsedValue}`).join(';');
};

const parseFontFamily = (
	value: FontFamily | string | undefined,
	cssVar: string | string[]
): string | undefined => {
	if (!value) return undefined;

	let parsedValue = value;
	if (isFontFamily(value)) {
		parsedValue = theme.fontFamilies[value];
	}

	if (typeof cssVar === 'string') {
		return `--${cssVar}: ${parsedValue}`;
	}

	return cssVar.map((v) => `--${v}: ${parsedValue}`).join(';');
};

export const joinCss = (...css: Array<CSS | undefined>): CSS => {
	return css.reduce((acc, curr) => {
		if (!curr) return acc;

		return {
			...acc,
			...curr
		};
	}, {}) as CSS;
};

export const parseCss = (...cssArgs: Array<CSS | undefined>) => {
	const css = joinCss(...cssArgs);

	const style = [
		// Margin
		parseSpace(css.m, 'm'),
		parseSpace(css.mt, 'mt'),
		parseSpace(css.mr, 'mr'),
		parseSpace(css.mb, 'mb'),
		parseSpace(css.ml, 'ml'),
		parseSpace(css.mx, ['ml', 'mr']),
		parseSpace(css.my, ['mt', 'mb']),
		// Padding
		parseSpace(css.p, 'p'),
		parseSpace(css.pt, 'pt'),
		parseSpace(css.pr, 'pr'),
		parseSpace(css.pb, 'pb'),
		parseSpace(css.pl, 'pl'),
		parseSpace(css.px, ['pl', 'pr']),
		parseSpace(css.py, ['mp', 'pb']),
		// Width and height
		parseSpace(css.w, 'w'),
		parseSpace(css.minW, 'min-w'),
		parseSpace(css.maxW, 'max-w'),
		parseSpace(css.h, 'h'),
		parseSpace(css.minH, 'min-h'),
		parseSpace(css.maxH, 'max-h'),
		parseSpace(css.size, ['w', 'h']),
		// Border
		parseSpace(css.radius, 'radius'),
		parseColor(css.borderColor, 'border-color'),
		parseSpace(css.borderSize, 'border-size'),
		parseValue(css.borderStyle, 'border-style'),
		// Colors
		parseColor(css.bgColor, 'bg-color'),
		parseColor(css.color, 'color'),
		// Flex
		parseSpace(css.gap, 'gap'),
		parseValue(css.flexDirection, 'flex-direction'),
		parseValue(css.justifyContent, 'justify-content'),
		parseValue(css.alignItems, 'align-items'),
		parseValue(css.templateColumns, 'template-columns'),
		parseValue(css.templateRows, 'template-rows'),
		parseValue(css.placeItems, 'place-items'),
		// Typography
		parseValue(css.textTransform, 'text-transform'),
		parseValue(css.fontWeight, 'font-weight'),
		parseValue(css.textDecoration, 'text-decoration'),
		parseSpace(css.fontSize, 'font-size'),
		parseSpace(css.lineHeight, 'line-height'),
		parseSpace(css.letterSpacing, 'letter-spacing'),
		parseFontFamily(css.fontFamily, 'font-family'),
		parseValue(css.textAlign, 'text-align'),
		// Misc.
		parseValue(css.opacity, 'opacity'),
		parseValue(css.display, 'display')
	]
		.filter(Boolean)
		.join(';');

	const classes = Object.keys(css).join(' ');

	return { style, classes };
};

export const joinClasses = (...classes: string[]): string => {
	return classes.join(' ');
};
