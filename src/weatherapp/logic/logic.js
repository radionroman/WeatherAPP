import axios from 'axios';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';


const apikey = process.env.REACT_APP_WEATHER_API_KEY;
const api = axios.create({

    baseURL: "https://overpass-api.de",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  export const overpassQuery = (bbox) => {
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

      return api.post('/api/interpreter',`${overpassQuery}`)
}

export const weatherQuery = (response, state$) => {
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
    const cos2 =  cities.map((city) => {
        const url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city.lat},${city.lon}&aqi=no`;
        if ( state$.value.mapLogic.weatherData.find(city1 => city1.name === city.name) === undefined) {
            console.log("City not found", city.name);
            return from(axios.get(url));
        }
    });
    console.log("cos2", cos2);
    return cos2.filter(element => element !== undefined);
}

export const parseWeatherData = (response) => {
    return response.map((element) => {
        const { data } = element;
        const { location, current } = data;
        const { name, lat, lon } = location;
        const { temp_c, precip_mm } = current;
        return {
            name,
            lat,
            lon,
            temp_c,
            precip_mm,
        };
    });
}

          
