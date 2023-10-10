<script lang="ts">
    import type { PageData } from "./$types";
    import Compass from "./Compass.svelte";
    import Scene from "./Scene.svelte";
    import { getDirectionFromAngle, getWeatherFromCode } from "./weatherData";

	export let data: PageData;

	const weather = getWeatherFromCode(data.weathercode);
	const windDirection = getDirectionFromAngle(data.winddirection);
	const time = new Date(data.time);
</script>

<!-- <div class="weather-text">
	<div class="key">Time:</div>
	<div class="val">{time.toLocaleTimeString()}</div>
	<div class="key">Temperature:</div>
	<div class="val">{data.temperature} °C</div>
	<div class="key">Weather:</div>
	<div class="val">{weather}</div>
	<div class="key">Wind speed:</div>
	<div class="val">{data.windspeed} km/h</div>
	<div class="key">Wind direction:</div>
	<div class="val">{windDirection}</div>
</div> -->

<div class="scene-container">
	<Scene time={time}/>
</div>

<!-- <div class="compass">
	<Compass angle={data.winddirection}/>
</div> -->

<style>
	.weather-text {
		display: grid;
		grid-template-columns: auto 1fr;
		font-size: 1.3em;
		column-gap: 0.5em;
		position: absolute;
		top: 80px;
		left: var(--margin);
		background-color: var(--black-50);
		padding: 0.4em;
		border-radius: 6px;
	}

	.key {
		text-align: right;
	}

	.val {
		font-weight: bold;
	}

	.compass {
		width: 8rem;
		position: absolute;
		top: 80px;
		right: var(--margin);
	}
	
	.scene-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;

	}
</style>