import React from 'react'
import dayBanner from '../assets/images/day.svg'
import nightBanner from '../assets/images/night.svg'
import { ICurrentWeather } from '../types'

interface IProps {
	data: ICurrentWeather
}

const Forecast: React.FC<IProps> = ({ data }) => {
	const now = Math.round(Date.now() / 1000)
	const banner = now > data.sys.sunrise && now < data.sys.sunset ? dayBanner : nightBanner
	const updatedAt = new Date(data.dt * 1000).toLocaleString()

	return (
		<div id="forecast">
			<div className="card">

				<img src={banner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime"/>

				<div className="card-body">
					<h5 className="card-title" id="location">
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
					<ul className="conditions">
						{data.weather.map((obj) => (
							<li key={obj.id}>
								<img 
									src={`https://openweathermap.org/img/wn/${obj.icon}@2x.png`} 
									title={obj.main} 
									alt="current weather icon" 
								/>
							</li>
						))}
					</ul>
					<p className="updated-at"> 
						<span>{updatedAt}</span>	
					</p>
				</div>
			</div>
		</div>
	)
}

export default Forecast
