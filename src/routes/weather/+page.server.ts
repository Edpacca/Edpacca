// import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/* eslint-disable */
const openMeteoBaseUrl = "https://api.open-meteo.com/v1/forecast"
// default to edinburgh
let location = {
	latitude: 55.953251,
	longitude: -3.188267
}

const fetchWeather = async (latitude: number, longitude: number) => {
	const request = `${openMeteoBaseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
	const result = await fetch(request);
	const data = await result.json();
	return data;		
}

export const load = (async () => {
	if (typeof window !== "undefined" && "geolocation" in window.navigator) {
		window.navigator.geolocation.getCurrentPosition(position => {
			location = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			}
		});
	} else {
		console.log("geolocation permissions blocked, getting weather from Edinburgh instead");
	}
	try {
		const weather = await fetchWeather(location.latitude, location.longitude);
	
		return weather.current_weather ?? undefined;
	} catch {
		// throw error(404, "Wasn't able to get any weather data.\n\n It's probably raining");
		return {
			latitude: 55.96,
			longitude: -3.18,
			generationtime_ms: 0.3420114517211914,
			utc_offset_seconds: 0,
			timezone: 'GMT',
			timezone_abbreviation: 'GMT',
			elevation: 69,
			current_weather: {
			  temperature: 16.3,
			  windspeed: 18.4,
			  winddirection: 78,
			  weathercode: 3,
			  is_day: 1,
			  time: '2023-08-31T17:00'
			}
		}
	}
}) satisfies PageServerLoad;

