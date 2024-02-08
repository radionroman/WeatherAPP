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
    console.log("WeatherList", weatherList);
    let x = 0;
    return (
        <div>
            {weatherList.map((city) => {
                x = 0;
                if (city.temp_c > 18 && city.temp_c < 25) x++;
                if (city.precip_mm === 0) x++;
                if (x === 0) {
                    return (
                        <Marker position={[city.lat, city.lon]} icon={sadIcon}>
                            <Popup>
                                <div>
                                    <h2>{city.name}</h2>
                                    <p>Temperature: {city.temp_c}</p>
                                    <p>Precipitation: {city.precip_mm}</p>
                                    <p>TYPE: BAD</p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                    
                }
                if (x === 1) {
                    return (
                        <Marker position={[city.lat, city.lon]} icon={neutralIcon}>
                            <Popup>
                                <div>
                                    <h2>{city.name}</h2>
                                    <p>Temperature: {city.temp_c}</p>
                                    <p>Precipitation: {city.precip_mm}</p>
                                    <p>TYPE: PASSABLE</p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                }
                if (x === 2) {
                    return (
                        <Marker position={[city.lat, city.lon]} icon={happyIcon}>
                            <Popup>
                                <div>
                                    <h2>{city.name}</h2>
                                    <p>Temperature: {city.temp_c}</p>
                                    <p>Precipitation: {city.precip_mm}</p>
                                    <p>TYPE: GOOD</p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                }
                
 
            })}
        </div>
    );


    // return ({weatherList.map((city) => {
    //     return (
    //         <Marker position={[city.coord.lat, city.coord.lon]}>
    //             <Popup>
    //                         <div>
    //                             <h2>{city.name}</h2>
    //                             <p>Temperature: {city.temp_c}</p>
    //                         </div>
    //                     </Popup>
    //                 </Marker>
    //             );
    //         })
    //     }
    // )
}