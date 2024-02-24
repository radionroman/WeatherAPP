import axios from 'axios';


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
      return api.post('/api/interpreter',`${overpassQuery}`)
}

export const weatherQuery = (city) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city.lat},${city.lon}&aqi=no`;
    return axios.get(url).then((response) => {

        return response;
    });
}

export const parseOverpassData = (response) => {

    const { elements } = response.data;
    return elements.map((element) => {
        const { tags, lat, lon } = element;
        return {
            name:  tags.name || "Unknown",
            population: parseInt(tags.population, 10) || 0, // Convert to integer, default to 0 if conversion fails
            lat,
            lon,
        };
    });
}

export const applyFilters = (cities, filters) => {
    cities.sort((a, b) => b.population - a.population);
    // if (filters.name !== "") {
    //     cities = cities.filter((city) => city.name.toLowerCase().includes(filters.name.toLowerCase()));
    // }
    cities = cities.slice(0, 20);
    return cities;
}

export const combineCities = (newCities, oldCities) => {
    var citiesToQuery = []; 
    newCities.forEach((city) => {
        if (oldCities.find((element) => element.name === city.name) === undefined) {
            citiesToQuery.push(city);
        }
    });
    return citiesToQuery;
}

export const parseWeatherData = (response) => {
    return response.map((element) => {
        const { data } = element;
        const { location, current } = data;
        const { lat, lon } = location;
        const { temp_c, precip_mm, pressure_mb, condition } = current;
        const pressure_smaller = pressure_mb / 100;
        const { icon } = condition;
        let x = 0;
        var type;
        if (temp_c > 18 && temp_c < 25) x++;
        if (precip_mm === 0) x++;
        if (x === 0) {
            type = "BAD";
        }
        if (x === 1) {
            type = "PASSABLE";
        }
        if (x === 2) {
            type = "GOOD";
        }
        return {
            name: element.name,
            lat,
            lon,
            temp_c,
            precip_mm,
            pressure: pressure_mb - 1000,
            icon,
            type: type,
        };
    });
}

          
