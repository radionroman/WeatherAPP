import styled from 'styled-components';

export const MapWrapper  = styled.div`
.leaflet-tile {
    filter: invert(${(({theme}) => theme.invert)}) hue-rotate(${(({theme}) => theme.hueRotate)}) !important;
    transition: filter 0.5s;
}
`;

export const lightTheme = {
    invert: "0",
    hueRotate: "0",
    background: "white",
}

export const darkTheme = {
    invert: "1",
    hueRotate: "180deg",
    background: "black",
}

