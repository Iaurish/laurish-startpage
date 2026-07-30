const weatherIconEl = document.getElementById('weather-icon');
const weatherTempEl = document.getElementById('weather-temp');
const weatherDescEl = document.getElementById('weather-desc');
const locationInputContainer = document.getElementById('location-input-container');
const locationInput = document.getElementById('location-input');

function getWeatherSymbol(code) {
    if (code === 0) return { icon: '[*]', desc: 'clear' };
    if (code >= 1 && code <= 3) return { icon: '[~]', desc: 'clouds' };
    if (code === 45 || code === 48) return { icon: '[-]', desc: 'fog' };
    if (code >= 51 && code <= 67) return { icon: '[/]', desc: 'rain' };
    if (code >= 71 && code <= 77) return { icon: '[+]', desc: 'snow' };
    if (code >= 80 && code <= 82) return { icon: '[/]', desc: 'showers' };
    if (code >= 95 && code <= 99) return { icon: '[!]', desc: 'storm' };
    return { icon: '[?]', desc: 'unknown' };
}

async function fetchWeather(lat, lon) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        const current = data.current_weather;
        const symbol = getWeatherSymbol(current.weathercode);
        
        weatherIconEl.innerText = symbol.icon;
        weatherTempEl.innerText = current.temperature + '°C';
        weatherDescEl.innerText = symbol.desc;
        locationInputContainer.style.display = 'none';
    } catch (e) {
        weatherTempEl.innerText = 'error';
    }
}

async function geocodeAndFetch(city) {
    try {
        weatherTempEl.innerText = 'searching...';
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
            const { latitude, longitude } = data.results[0];
            localStorage.setItem('weather_lat', latitude);
            localStorage.setItem('weather_lon', longitude);
            fetchWeather(latitude, longitude);
        } else {
            weatherTempEl.innerText = 'not found';
        }
    } catch (e) {
        weatherTempEl.innerText = 'error';
    }
}

function promptManualLocation() {
    weatherIconEl.innerText = '';
    weatherTempEl.innerText = '';
    weatherDescEl.innerText = '';
    locationInputContainer.style.display = 'flex';
    locationInput.focus();
}

// Listen for the "Enter" key on the manual input box
locationInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        geocodeAndFetch(this.value);
    }
});

function initWeather() {
    const savedLat = localStorage.getItem('weather_lat');
    const savedLon = localStorage.getItem('weather_lon');

    if (savedLat && savedLon) {
        fetchWeather(savedLat, savedLon);
    } else {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    localStorage.setItem('weather_lat', position.coords.latitude);
                    localStorage.setItem('weather_lon', position.coords.longitude);
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    promptManualLocation();
                }
            );
        } else {
            promptManualLocation();
        }
    }
}

initWeather();

setInterval(initWeather, 30 * 60 * 1000);