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
import { bboxSelector, weatherSelector, currentCitiesSelector, filtersSelector } from "./selectors";



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
        newCities: citiesFiltered, 
        oldCities: weatherSelector(state$.value)
        })),
      map(({newCities, oldCities}) => ({newCities: newCities ,citiesToQuery: combineCities(newCities, oldCities), })),
      switchMap(({newCities, citiesToQuery,}) =>{ 
        if (citiesToQuery.length === 0) {
          return of(deleteCities(newCities));
        }
      return forkJoin(citiesToQuery.map(city => weatherQuery(city).then( response => ({...city, ...response}) ) ) ).pipe(

        map((response) => ({cities: parseWeatherData(response), newCities: newCities})),
        map(({cities, newCities}) => fetchDataSuccess( {newCities, cities})),  
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

const getUserLocation = () => new Promise((resolve) => navigator.geolocation.getCurrentPosition(resolve))

const setUserLocationEpic = (action$) =>
    action$.pipe(
        ofType(setUserLocationRequest.type),
        switchMap(() => 
            from(getUserLocation()).pipe(
                map(location => {
                  return setUserLocation(location);
                })
            )
        )
    );

  
 


export const mapEpics = combineEpics(setIsLoadingEpic,fetchDataEpic, setUserLocationEpic, createRegularActionEpic, startTimerEpic);
