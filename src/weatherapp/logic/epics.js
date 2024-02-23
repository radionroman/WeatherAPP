import { ofType, combineEpics } from "redux-observable";
import { switchMap,mergeMap, map, catchError, take, tap  } from "rxjs/operators";
import { from, Observable, scan, debounce, interval, forkJoin, of, combineLatest  } from "rxjs";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  updateBBox,
  fetchDataRequest,
  fetchDataSuccess,
  setUserLocationRequest,
  setUserLocation,
} from "./reducer";
import { bboxSelector } from "./selectors";

const apikey = process.env.REACT_APP_WEATHER_API_KEY;

const api = axios.create({

  baseURL: "https://overpass-api.de",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
const createRegularActionEpic = (action$, state$) =>
  action$.pipe(
    ofType('TRIGGER_EVERY_60_MINUTES'),
    map(() => fetchDataRequest())
  );

const startTimerEpic = (action$, state$) =>
  action$.pipe(
    ofType('start_timer'),
    mergeMap(() =>
      interval(3600000).pipe(
        map(() => ({ type: 'TRIGGER_EVERY_60_MINUTES' }))
      )
    )
  );



const fetchOverpassDataEpic = (action$, state$) =>
  action$.pipe(
    
    ofType(fetchDataRequest.type),
    debounce(() => interval(1000)),
    switchMap( (action) => {

      
      const bbox = bboxSelector(state$.value);
      // Define your Overpass query
      const overpassQuery = `
        [out:json];
        node 
        [place="city"]
                (
                  ${bbox._southWest.lat},${bbox._southWest.lng},${bbox._northEast.lat},${bbox._northEast.lng}
                );
                out;
      `;
      // Construct the URL for Overpass API
      // Use Axios to make the POST request

      const ret2 = from(api.post('/api/interpreter',`${overpassQuery}`)).pipe(
        // Handle the response data as needed
        switchMap((response) => {
          const  payload  = response.data;
          const { elements } = payload;
          var cities = elements.map((element) => {
            const { tags, lat, lon } = element;
            return {
              name:  tags.name || "Unknown",
              population: parseInt(tags.population, 10) || 0, // Convert to integer, default to 0 if conversion fails
              lat,
              lon,
            };
          });
          cities.sort((a, b) => b.population - a.population);
          cities = cities.slice(0, 20);
          console.log("apikey", apikey);

          const cos2 =  cities.map((city) => {
              const url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city.lat},${city.lon}&aqi=no`;
              
              console.log("city", city);
              console.log("state", state$.value.mapLogic.weatherData);
              if ( state$.value.mapLogic.weatherData.find(city1 => city1.name === city.name) === undefined) {
                console.log("City not found", city.name);
                return from(axios.get(url));
              }
          });
          const cos = cos2.filter(element => element !== undefined);
          let weather = [];
          
          const ret = forkJoin(cos).pipe(map((response) => {
            response.map((city) => {
              const name = city.data.location.name;
              const lat = city.data.location.lat;
              const lon = city.data.location.lon;
              const temp_c = city.data.current.temp_c;
              const precip_mm = city.data.current.precip_mm;
              weather = [...weather, {name, lat, lon, temp_c, precip_mm}]
              console.log("Weather", weather);
              
            });
            console.log("Weather", weather);
            return fetchDataSuccess(weather);
          }
          ));
          return ret;
        }),
        // Handle the error if the request fails
        catchError((error) => {
          console.error("Overpass API Error:", error);

          // Dispatch an error action
          return fetchOverpassDataError(error);
        })
      );
      return ret2;
    })

  );

const getUserLocation = () => new Promise((resolve) => navigator.geolocation.getCurrentPosition(resolve))

const setUserLocationEpic = (action$) =>
    action$.pipe(
        ofType(setUserLocationRequest.type),
        switchMap(() => 
            from(getUserLocation()).pipe(
                map(location => {
                  console.log("Location", location);
                  return setUserLocation(location);
                })
            )
        )
    );

  
 


export const mapEpics = combineEpics(fetchOverpassDataEpic, setUserLocationEpic, createRegularActionEpic, startTimerEpic);
