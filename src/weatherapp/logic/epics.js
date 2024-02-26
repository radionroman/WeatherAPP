import { ofType, combineEpics } from "redux-observable";
import { switchMap,mergeMap, map, catchError } from "rxjs/operators";
import { from, debounce, interval, forkJoin, of } from "rxjs";
import { overpassQuery, weatherQuery, parseWeatherData, parseOverpassData, applyFilters, combineCities } from "./logic";
import {
  fetchDataRequest,
  fetchDataSuccess,
  setUserLocationRequest,
  setUserLocation,
  fetchWeatherError,
  fetchOverpassError,
  deleteCities,
  setIsLoadingRequest,
  setIsLoading,
} from "./reducer";
import { bboxSelector, weatherSelector, filtersSelector } from "./selectors";



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

const setIsLoadingEpic = (action$, state$) =>
  action$.pipe(
    ofType(setIsLoadingRequest.type),
    debounce(() => interval(1000)),
    map(() => setIsLoading(true)),
  );

const fetchDataEpic = (action$, state$) =>
  action$.pipe(
    ofType(fetchDataRequest.type),
    debounce(() => interval(1000)),
    map(() => ({bbox: bboxSelector(state$.value)})),
    switchMap( ({bbox}) =>
      from(overpassQuery(bbox)).pipe(
      map((response) => ({citiesInBBox: parseOverpassData(response)})),
      map(({citiesInBBox}) => ({citiesFiltered: applyFilters(citiesInBBox, filtersSelector(state$.value))})),
      map(({citiesFiltered}) => ({
        citiesInBBox: citiesFiltered, 
        oldCities: weatherSelector(state$.value)
        })),
      map(({citiesInBBox, oldCities}) => ({citiesInBBox,citiesToQuery: combineCities(citiesInBBox, oldCities), })),
      switchMap(({citiesInBBox, citiesToQuery,}) =>{ 
        if (citiesToQuery.length === 0) {
          return of(deleteCities(citiesInBBox));
        }
        else return forkJoin(citiesToQuery.map(city => weatherQuery(city).then( response => ({...city, ...response}) ) ) ).pipe(

        map((response) => ({citiesInBBox, cities: parseWeatherData(response)})),
        map(({citiesInBBox,cities}) => fetchDataSuccess( {citiesInBBox, cities})),  
        catchError((error) => {
          console.error("Weather API Error:", error);
          return fetchWeatherError(error);
        }),
      )
      }
      ),
      catchError((error) => {
        console.error("Overpass API Error:", error);
        return fetchOverpassError(error);
      }),
    )),
  );



  
 


export const mapEpics = combineEpics(setIsLoadingEpic,fetchDataEpic, createRegularActionEpic, startTimerEpic);
