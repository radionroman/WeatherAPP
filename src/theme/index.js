import { lightColors, darkColors } from './colors';
import { fonts } from './fonts';
import { dims } from './dims';




export const lightTheme = {
    fonts,
    dims,
    colors: lightColors,
    invert: "0",
    hueRotate: "0",

};

export const darkTheme = {
    fonts,
    dims,
    colors: darkColors,
    invert: "1",
    hueRotate: "180deg",
};
