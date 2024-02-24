import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMap, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";

import { bboxSelector, citiesSelector, weatherSelector } from "../../../../logic/selectors";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { MarkerWrapper } from "./MarkerWrapper";
import sadIconIm from "./sad-icon.png";
import happyIconIm from "./smile-icon.png";
import neutralIconIm from "./neutral-face-emoji-icon.png";

var sadIcon = L.icon({
    iconUrl: sadIconIm,
    iconSize: [25, 25]
  });
var happyIcon = L.icon({
    iconUrl: happyIconIm,
    iconSize: [25, 25]
    });
var neutralIcon = L.icon({
    iconUrl: neutralIconIm,
    iconSize: [25, 25]
    });



export const WeatherMarker = () => {
    const weatherList = useSelector(weatherSelector);
    let x = 0;
    return (
        <div>
            {weatherList.map((city) => {
                var cityIcon = sadIcon;
                if (city.type === "GOOD") cityIcon = happyIcon;
                if (city.type === "PASSABLE") cityIcon = neutralIcon;
                    return (
                        <Marker position={[city.lat, city.lon]} icon={cityIcon} key={city.name}>
                            <Popup>
                                <div>
                                    <h2>{city.name}</h2>
                                    <p>Temperature: {city.temp_c}</p>
                                    <p>Precipitation: {city.precip_mm}</p>
                                    <p>TYPE: {city.type}</p>
                                </div>
                            </Popup>
                        </Marker>
                    );
    
 
            })}
        </div>
    );

}