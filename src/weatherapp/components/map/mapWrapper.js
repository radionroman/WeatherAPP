import styled from 'styled-components';

export const MapWrapper  = styled.div`
    width: 50%; /* Adjust the width as needed */
    box-sizing: border-box; /* Optional: Include padding and border in the width */

    .leaflet-tile {
        filter: invert(${(({theme}) => theme.invert)}) hue-rotate(${(({theme}) => theme.hueRotate)}) !important;
        transition: filter 0.5s;
    }
    .leaflet-container {
        border-radius: 10px;
        border: 1px solid ${(({theme}) => theme.colors.border)};
    }
`;

