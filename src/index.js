import './style.css';
import {getWeather, getWeatherCity} from "./modules/weather";
import createHeader from "./modules/header";

getWeather(40.6782, -73.9442);
getWeatherCity("Brooklyn");

createHeader();
