import { ofType, combineEpics } from "redux-observable";
import { switchMap,mergeMap, map, catchError, take, tap  } from "rxjs/operators";
import { from, Observable, scan, debounce, interval, forkJoin, of, combineLatest  } from "rxjs";
import { overpassQuery, weatherQuery, parseWeatherData } from "./logic";
import {
  updateBBox,
  fetchDataRequest,
  fetchDataSuccess,
  setUserLocationRequest,
  setUserLocation,
  fetchWeatherError,
  fetchOverpassError,
} from "./reducer";
import { bboxSelector } from "./selectors";




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



const fetchDataEpic = (action$, state$) =>
  action$.pipe(
    ofType(fetchDataRequest.type),
    debounce(() => interval(1000)),
    map(() => ({bbox: bboxSelector(state$.value)})),
    switchMap( ({bbox}) => from(overpassQuery(bbox)).pipe(
      switchMap((response1) => forkJoin(weatherQuery(response1, state$)).pipe(
        map((response) => ({cities: parseWeatherData(response)})),
        map(({cities}) => fetchDataSuccess(cities)),  
        catchError((error) => {
          console.error("Weather API Error:", error);
          return fetchWeatherError(error);
        }),
      )),
      catchError((error) => {
        console.error("Overpass API Error:", error);
        return fetchOverpassError(error);
      }),
    )),
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

  
 


export const mapEpics = combineEpics(fetchDataEpic, setUserLocationEpic, createRegularActionEpic, startTimerEpic);
