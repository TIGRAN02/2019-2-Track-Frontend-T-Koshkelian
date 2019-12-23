import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from './Header'
import back from '../images/back.png'
import plus from '../images/plus.png'
import search from '../images/search.png'
import weatherStyles from '../styles/singleWeatherStyles.module.scss'
import weatherListStyles from '../styles/weatherListStyles.module.scss'

const data = [
  {
    id: 707860,
    name: 'Hurzuf',
    country: 'UA',
  },
  {
    id: 519188,
    name: 'Novinki',
    country: 'RU',
  },
  {
    id: 1283378,
    name: 'Gorkhā',
    country: 'NP',
  },
  {
    id: 1270260,
    name: 'State of Haryāna',
    country: 'IN',
  },
  {
    id: 708546,
    name: 'Holubynka',
    country: 'UA',
  },
]

function SingleWeather({ exactPlace, country, degree, humidity, windTo, windSpeed, maxTemp, minTemp, key }) {
  return (
    <div key={key}>
      <Link to={`/`}>
        <div className={weatherStyles.weather}>
          <div className={weatherStyles.first}>
            <div className={weatherStyles.wholePlace}>
              <div className={weatherStyles.exactPlace}>{exactPlace}</div>
              <div className={weatherStyles.country}>{country}</div>
            </div>
            <div className={weatherStyles.currWeather}>{`${degree}˚C`}</div>
          </div>
          <div className={weatherStyles.second}>
            <div className={weatherStyles.info}>{`Humidity ${humidity}% | ${windTo} | ${windSpeed}m/s`}</div>
            <div className={weatherStyles.moreInfo}>{`${maxTemp}/${minTemp}˚C`}</div>
          </div>
        </div>
      </Link>
      <hr />
    </div>
  )
}

SingleWeather.propTypes = {
  exactPlace: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
  windTo: PropTypes.string.isRequired,
  windSpeed: PropTypes.string.isRequired,
  maxTemp: PropTypes.string.isRequired,
  minTemp: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
}

class WeatherList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weathers: [],
    }

    let i = 0
    for (const curr of data) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?id=${curr.id}&appid=8278bbd8b033ad65c4b3390f74f61828`)
        // eslint-disable-next-line
        .then((res) => res.json())
        .then((data) => {
          let props = {}
          props.key = i
          i += 1
          props.exactPlace = curr.name
          props.country = curr.country
          props.degree = String(Math.round(Number(data.main.temp) - 273.15))
          props.humidity = data.main.humidity
          props.windSpeed = data.wind.speed
          props.maxTemp = String(Math.round(Number(data.main.temp_max) - 273.15))
          props.minTemp = String(Math.round(Number(data.main.temp_min) - 273.15))
          const wind = Number(data.wind.deg)
          if (wind < 67.5 && wind >= 22.5) {
            props.windTo = 'NorthEast'
          } else if (wind < 112.5 && wind >= 67.5) {
            props.windTo = 'East'
          } else if (wind < 157.5 && wind >= 112.5) {
            props.windTo = 'SouthEast'
          } else if (wind < 202.5 && wind >= 157.5) {
            props.windTo = 'South'
          } else if (wind < 247.5 && wind >= 202.5) {
            props.windTo = 'SouthWest'
          } else if (wind < 292.5 && wind >= 247.5) {
            props.windTo = 'West'
          } else if (wind < 337.5 && wind >= 292.5) {
            props.windTo = 'NorthWest'
          } else {
            props.windTo = 'North'
          }

          const currWeather = SingleWeather(props)

          this.setState((state) => {
            return { weathers: [...state.weathers, currWeather] }
          })
        })
    }
  }

  render() {
    return (
      <div className={weatherListStyles.container}>
        <Header leftImg={back} rightImg={search} name="Manage cities" />
        <div className={weatherListStyles.weathers}>{this.state.weathers}</div>
        <div className={weatherListStyles.new_weather}>
          <img src={plus} height="70px" alt="" />
        </div>
      </div>
    )
  }
}

export default WeatherList
