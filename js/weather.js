const weatherDisplayEl = document.getElementById('weather-display');
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

async function fetchWeather(lat, lon, cityName = null) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        const current = data.current_weather;
        const symbol = getWeatherSymbol(current.weathercode);
        
        weatherIconEl.innerText = symbol.icon;
        weatherTempEl.innerText = current.temperature + '°C';
        weatherDescEl.innerText = symbol.desc;
        
        if (!cityName) {
            try {
                const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
                const geoData = await geoRes.json();
                cityName = geoData.city || geoData.locality || "Unknown Location";
                localStorage.setItem('weather_city', cityName);
            } catch (e) {
                cityName = "Current Location";
            }
        }
        
        weatherDisplayEl.title = `location: ${cityName.toLowerCase()}`;
        
        weatherDisplayEl.style.display = 'block';
        locationInputContainer.style.display = 'none';
        
    } catch (e) {
        weatherTempEl.innerText = 'error';
    }
}

async function geocodeAndFetch(city) {
    try {
        weatherDisplayEl.style.display = 'block';
        locationInputContainer.style.display = 'none';
        weatherIconEl.innerText = '';
        weatherTempEl.innerText = 'searching...';
        weatherDescEl.innerText = '';
        
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
            const { latitude, longitude, name } = data.results[0];
            localStorage.setItem('weather_lat', latitude);
            localStorage.setItem('weather_lon', longitude);
            localStorage.setItem('weather_city', name);
            fetchWeather(latitude, longitude, name);
        } else {
            promptManualLocation();
            locationInput.value = '';
            locationInput.placeholder = 'not found...';
        }
    } catch (e) {
        weatherTempEl.innerText = 'error';
    }
}

function promptManualLocation() {
    weatherDisplayEl.style.display = 'none';
    locationInputContainer.style.display = 'flex';
    locationInput.value = '';
    locationInput.placeholder = 'enter city...';
    locationInput.focus();
}

locationInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (this.value.trim() !== '') {
            geocodeAndFetch(this.value.trim());
        } else {
            initWeather();
        }
    }
});

locationInput.addEventListener('blur', function () {
    if (localStorage.getItem('weather_lat')) {
        initWeather();
    }
});

function initWeather() {
    const savedLat = localStorage.getItem('weather_lat');
    const savedLon = localStorage.getItem('weather_lon');
    const savedCity = localStorage.getItem('weather_city');

    if (savedLat && savedLon) {
        fetchWeather(savedLat, savedLon, savedCity);
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

// Automatically update the weather every 30 minutes
setInterval(initWeather, 30 * 60 * 1000);