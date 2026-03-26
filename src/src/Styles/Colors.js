const primaryColor = {
    green50: '#F2F5EB',
    green100: '#D8E2C4',
    green300: '#BDCF9D',
    green400: '#B0C689',
    green600: '#96b361',
    green800: '#789347', /* Color principal de la marca */
    green900: '#546732',
};
const infoColor = {
    greenLight50: '#f6fbed',
    greenLight100: '#edf8da',
    greenLight300: '#caea91',
    greenLight400: '#c1e67f',
    greenLight600: '#a7db48',
    greenLight800: '#87bd25', /* color principal para el infoColor */
    greenLight900: '#7aab21',
};
const successColor = [
    '#7ab33d', /* color principal para el success */
    '#acd481',
    '#8bc34f',
    '#bddd9a',
    '#699a35',
    '#cde5b4',
    '#eef6e6',
];
const dangerColor = {
    red50: '#fde7e1',
    red100: '#fccfc2',
    red300: '#f57049', /* color principal para el danger */
    red400: '#f3582b',
    red500: '#f1410d',
    red600: '#d2390c',
    red700: '#b4310a',
};
const warningColor = {
    orange50: '#fff5e6',
    orange100: '#ffe5bf',
    orange300: '#ffb74d',
    orange400: '#ffa21a',
    orange500: '#ff9800', /* color principal para el warning */
    orange600: '#e68900',
    orange700: '#cc7a00',
};
const roseColor = {
    pink500: '#e91e63',
    pink400: '#ec407a',
    pink600: '#d81b60',
    pink300: '#f06292',
    pink700: '#c2185b',
};
const grayColor = {
    gray50: '#f6f6f6',
    gray100: '#e6e6e6',
    gray200: '#d7d7d7',
    gray300: '#a8a8a8',
    gray400: '#808080',
    gray500: '#606060', /* color principal para el grayColor */
    gray600: '#565656',
    gray700: '#4d4d4d',
    gray800: '#434343',
    gray900: '#3b3b3b',
};
const whiteColor = '#FFF';
const blackColor = '#000';

const warningCardHeader = {
    color: `${warningColor.orange600}`,
};
const successCardHeader = {
    color: `${successColor[1]}`,
};
const dangerCardHeader = {
    color: `${dangerColor.red600}`,
};
const infoCardHeader = {
    color: `${infoColor.greenLight400}`,
};
const primaryCardHeader = {
    color: `${primaryColor.green800}`,
};
const roseCardHeader = {
    color: `${roseColor.pink600}`,
};

const hexToRgb = (input) => {
    input += '';
    input = input.replace('#', '');
    const hexRegex = /[0-9A-Fa-f]/g;
    if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
        throw new Error('input is not a valid hex color.');
    }
    if (input.length === 3) {
        const first = input[0];
        const second = input[1];
        const last = input[2];
        input = first + first + second + second + last + last;
    }
    input = input.toUpperCase(input);
    const first = input[0] + input[1];
    const second = input[2] + input[3];
    const last = input[4] + input[5];
    return `${parseInt(first, 16)}, ${parseInt(second, 16)}, ${parseInt(
        last,
        16,
    )}`;
};

export {
    primaryColor,
    infoColor,
    successColor,
    dangerColor,
    warningColor,
    roseColor,
    whiteColor,
    blackColor,
    grayColor,
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
    roseCardHeader,
    hexToRgb,
}