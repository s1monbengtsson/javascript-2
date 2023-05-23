import React from 'react'
import forecastBanner from '../assets/images/forecast-banner.png'
import { ICurrentWeather } from '../types'

interface IProps {
	data: ICurrentWeather
}

const Forecast: React.FC<IProps> = ({ data }) => {

	const condition = data.weather[0].icon

	return (
		<div id="forecast">
			<div className="card">

				<img src={forecastBanner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime"/>

				<div className="card-body">
					<h5 className="card-title" id="location">
						<img src={`https://openweathermap.org/img/wn/${condition}@2x.png`} alt="" />
						<span id="city">{data.name}</span>
						<span id="country">{data.sys.country}</span>
					</h5>
					<p className="temp">
						<span id="temperature">{data.main.temp}</span>
						&deg;C
					</p>
					<p className="humidity">
						<span id="humidity">{data.main.humidity}</span> % humidity
					</p>
					<p className="wind">
						<span id="windspeed">{data.wind.speed}</span> m/s
					</p>

					{/*
					<ul className="conditions">
						<li><img src="" title="CONDITION_MAIN" alt="CONDITION_MAIN">CONDITION_DESCRIPTION</li>
					</ul>

					<p className="text-muted small">
						<span>
							1970-01-01 13:37:00
						</span>
					</p>
					*/}
				</div>

			</div>
		</div>
	)
}

export default Forecast
