import { getWeatherCity } from "./weather";

async function createWeatherCard(city){
    const card = document.createElement('div');
    const content = document.createElement('div');

    let weather = await getWeatherCity(city);

    let contents = [weather.coord, weather.name, weather.visibility, weather.weather, weather.wind]; 

    console.log(weather)
    console.log(contents)
    card.append(content);
}

export default createWeatherCard;