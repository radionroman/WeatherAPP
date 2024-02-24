import styled from 'styled-components';

export const MapWrapper  = styled.div`
width: 60%; /* Adjust the width as needed */
margin: 10px; /* Optional: Add some margin for spacing */
box-sizing: border-box; /* Optional: Include padding and border in the width */

.leaflet-tile {
    filter: invert(${(({theme}) => theme.invert)}) hue-rotate(${(({theme}) => theme.hueRotate)}) !important;
    transition: filter 0.5s;
}
.leaflet-container {
    border-radius: 10px;
    border: 1px solid #ccc;
}
`;

export const lightTheme = {
    invert: "0",
    hueRotate: "0",

}

export const darkTheme = {
    invert: "1",
    hueRotate: "180deg",

}

