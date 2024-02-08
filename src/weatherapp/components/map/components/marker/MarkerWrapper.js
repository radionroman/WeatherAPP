import styled from "styled-components";
import { Icon } from "leaflet";

const sadIcon = new Icon({
  iconUrl: "https://www.flaticon.com/free-icons/sad-face",
  iconSize: [25, 25]
});
export const MarkerWrapper = styled.div`
    background-color: ${({ type }) => {
        if (type === 0) return "red";
        if (type === 1) return "yellow";
        if (type === 2) return "green";
    }};
    `;
