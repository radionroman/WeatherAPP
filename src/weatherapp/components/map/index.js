import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch } from "react-redux";
import { updateBBox, fetchDataRequest, setUserLocation, setUserLocationRequest, setIsLoadingRequest } from "../../logic/reducer";
import { WeatherMarker } from "./components"
import { useSelector } from "react-redux";
export { Chart, ChartWrapper, FormComponent  } from "./components"

function MyComponent() {
  const dispatch = useDispatch();
  const mymap = useMap();
  mymap.locate();
  const map = useMapEvents({
    moveend: () => {
      const { _northEast, _southWest } = map.getBounds();
      const { lat, lng } = _northEast;
      const lat2 = _southWest.lat;
      const lng2 = _southWest.lng;
      console.log(updateBBox({lat, lng, lat2, lng2}));
      dispatch( updateBBox({lat, lng, lat2, lng2}) );
      dispatch(setIsLoadingRequest(true));
      dispatch( fetchDataRequest() );
      
    },
    load: () => {
      dispatch({type:"start_timer"});
      console.log("Map loaded");
    },
    locationfound: (location) => {
      const { _northEast, _southWest } = location.bounds;
      const lat = _northEast.lat+0.1;
      const lng = _northEast.lng+0.1;
      const lat2 = _southWest.lat-0.1;
      const lng2 = _southWest.lng-0.1;
      console.log("bbox", {lat, lng, lat2, lng2});
      dispatch(setUserLocation(location));
      dispatch(setIsLoadingRequest(true));

      dispatch( updateBBox({lat, lng, lat2, lng2}) );
      console.log("Location found", location);
      dispatch( fetchDataRequest() );
    }
  });

  return null;
}

export const Map = () => {
  const dispatch = useDispatch();
  const userLocation = useSelector(state => state.mapLogic.userLocation);
  
  return (
    <MapContainer
      key={userLocation[0] + userLocation[1]}
      center={userLocation}
      zoom={10}
      scrollWheelZoom={true}
      style={{ height: "70vh", width: "100%" }}
    
   
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyComponent />
      <WeatherMarker />

    </MapContainer>
    
  );
};
