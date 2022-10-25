import './style.css';
import createHeader from "./modules/header";
import {createMainContainer, createLocationForm , createWeatherCard} from './modules/domElements';

createHeader();
createLocationForm();

createMainContainer();
createWeatherCard("brooklyn");
