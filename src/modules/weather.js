async function getWeather(lat, lon){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperical&appid=5ce2662ff0808ea4779ba9697ff5dd33`, {mode: 'cors'});
        const weather = await response.json();
        return weather;
    } catch(err){
        console.log("Error 2: " + err);
    }
}

async function getWeatherCity(city){
    try {
        const message = document.querySelector(".form-error-message");
        message.classList.remove('error');

        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&units=imperical&appid=5ce2662ff0808ea4779ba9697ff5dd33`, {mode: 'cors'});
        const weather = await response.json();

        return getWeather(weather[0].lat, weather[0].lon);
    } catch(err){
        console.log("Error 1: " + err);

        const message = document.querySelector('.form-error-message');
        message.classList.add('error');        
    }
}

export {getWeather, getWeatherCity};